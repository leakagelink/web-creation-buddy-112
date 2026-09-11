/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getRoom, normalThali } from "@/lib/site-data";

// ---------- shared pricing ----------

export async function computePricing(
  supabase: { from: (t: string) => any },
  roomId: string,
  thaliQty: number,
  discountPercent: number,
) {
  const fallback = getRoom(roomId);
  const { data: dbRoom } = await supabase
    .from("rooms")
    .select("name, price")
    .eq("slug", roomId)
    .eq("visible", true)
    .maybeSingle();
  const { data: dbThali } = await supabase
    .from("thalis")
    .select("price")
    .eq("slug", "normal")
    .maybeSingle();
  const room = dbRoom
    ? { name: String(dbRoom["name"]), price: Number(dbRoom["price"]) }
    : { name: fallback.name, price: fallback.price };
  const thaliPrice = dbThali ? Number(dbThali["price"]) : normalThali.price;
  const tariff = room.price;
  const taxes = Math.round(room.price * 0.151);
  const thali = thaliQty * thaliPrice;
  const discount = Math.round(((tariff + thali) * discountPercent) / 100);
  const total = tariff + taxes + thali - discount;
  return { roomName: room.name, tariff, taxes, thali, discount, total };
}

// ---------- public (guest) functions ----------

function publishableClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const bookingInput = z.object({
  roomId: z.string(),
  guestName: z.string().trim().min(2, "Please enter your full name").max(100),
  guestPhone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  guestEmail: z.string().trim().email("Enter a valid email address").max(255),
  guests: z.number().int().min(1).max(4),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a check-in date"),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a check-out date"),
  thaliQty: z.number().int().min(0).max(10),
  specialRequests: z.string().trim().max(500).optional().or(z.literal("")),
  couponCode: z.string().trim().max(20).optional().or(z.literal("")),
});


export const validateCoupon = createServerFn({ method: "POST" })
  .inputValidator((data: { code: string }) => data)
  .handler(async ({ data }) => {
    const code = data.code.trim().toUpperCase();
    if (!code) return { ok: false as const };
    const supabase = publishableClient();
    const { data: coupon } = await supabase
      .from("coupons")
      .select("discount_percent")
      .eq("code", code)
      .eq("active", true)
      .maybeSingle();
    if (!coupon) return { ok: false as const };
    return { ok: true as const, code, discountPercent: coupon.discount_percent };
  });

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingInput.parse(data))
  .handler(async ({ data }) => {
    const supabase = publishableClient();

    let discountPercent = 0;
    let couponCode: string | null = null;
    if (data.couponCode) {
      couponCode = data.couponCode.trim().toUpperCase();
      const { data: coupon } = await supabase
        .from("coupons")
        .select("discount_percent")
        .eq("code", couponCode)
        .eq("active", true)
        .maybeSingle();
      if (!coupon) {
        throw new Error("Invalid or expired coupon code");
      }
      discountPercent = coupon.discount_percent;
    }

    const checkIn = new Date(`${data.checkIn}T12:00:00`);
    const checkOut = new Date(`${data.checkOut}T12:00:00`);
    const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000));
    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()) || checkOut <= checkIn) {
      throw new Error("Check-out date must be after check-in date");
    }

    const pricing = await computePricing(supabase, data.roomId, data.thaliQty, discountPercent);
    const code = `H499-${Date.now().toString().slice(-6)}-${Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4)}`;

    const { error } = await supabase.from("bookings").insert({
      booking_code: code,
      room_id: data.roomId,
      guest_name: data.guestName,
      guest_phone: data.guestPhone,
      guest_email: data.guestEmail,
      guests: data.guests,
      check_in: data.checkIn,
      check_out: data.checkOut,
      nights,
      thali_qty: data.thaliQty,
      special_requests: data.specialRequests || null,
      coupon_code: couponCode,
      discount_amount: pricing.discount,
      total_amount: pricing.total,
      status: "pending",
    });

    if (error) throw new Error("Could not save your booking. Please try again.");
    return { bookingCode: code, total: pricing.total };
  });

// ---------- admin ----------

async function requireAdmin(context: { supabase: unknown; userId: string }) {
  const { data: isAdmin, error } = await (
    context.supabase as { rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: boolean | null; error: { message: string } | null }> }
  ).rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || !isAdmin) throw new Error("Forbidden");
}

export const getBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context as never);
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: string }) =>
    z.object({ id: z.string().uuid(), status: z.enum(["pending", "confirmed", "cancelled"]) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context as never);
    const { error } = await context.supabase
      .from("bookings")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
