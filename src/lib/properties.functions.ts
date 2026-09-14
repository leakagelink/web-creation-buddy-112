import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type PropertyRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  address: string | null;
  rating: number;
  reviews: number;
  from_price: number;
  image_url: string | null;
  coming_soon: boolean;
  visible: boolean;
  sort_order: number;
  latitude: number | null;
  longitude: number | null;
};

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

export const getPublicProperties = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publishableClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id,slug,name,location,address,rating,reviews,from_price,image_url,coming_soon,visible,sort_order,latitude,longitude")
    .eq("visible", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as PropertyRow[];
});

// ---------- admin ----------

async function requireAdmin(context: { supabase: unknown; userId: string }) {
  const { data: isAdmin, error } = await (
    context.supabase as {
      rpc: (
        fn: string,
        args: Record<string, unknown>,
      ) => Promise<{ data: boolean | null; error: { message: string } | null }>;
    }
  ).rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || !isAdmin) throw new Error("Forbidden");
}

const propertyInput = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only"),
  name: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(150),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().min(0).max(100000),
  from_price: z.number().int().min(0).max(1000000),
  image_url: z.string().trim().max(500).optional().or(z.literal("")),
  coming_soon: z.boolean(),
  visible: z.boolean(),
  sort_order: z.number().int().min(0).max(999),
  latitude: z.number().min(-90).max(90).optional().or(z.literal("")),
  longitude: z.number().min(-180).max(180).optional().or(z.literal("")),
});

export const getAdminProperties = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context as never);
    const { data, error } = await context.supabase
      .from("properties")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as PropertyRow[];
  });

export const createProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => propertyInput.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context as never);
    const { error } = await context.supabase.from("properties").insert({
      ...data,
      address: data.address || null,
      image_url: data.image_url || null,
      latitude: data.latitude === "" ? null : data.latitude ?? null,
      longitude: data.longitude === "" ? null : data.longitude ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    propertyInput.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context as never);
    const { id, ...fields } = data;
    const { error } = await context.supabase
      .from("properties")
      .update({
        ...fields,
        address: fields.address || null,
        image_url: fields.image_url || null,
        latitude: fields.latitude === "" ? null : fields.latitude ?? null,
        longitude: fields.longitude === "" ? null : fields.longitude ?? null,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context as never);
    const { error } = await context.supabase.from("properties").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
