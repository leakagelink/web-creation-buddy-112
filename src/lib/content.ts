import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as SupabaseClient;
import {
  amenities as staticAmenities,
  attractions as staticAttractions,
  contact as staticContact,
  faqs as staticFaqs,
  reviews as staticReviews,
  rooms as staticRooms,
  thalis as staticThalis,
  type Attraction,
  type Faq,
  type Review,
  type Room,
  type Thali,
} from "@/lib/site-data";
import { getRoom as staticGetRoom } from "@/lib/site-data";

import smart from "@/assets/room-smart.jpg";
import comfort from "@/assets/room-comfort.jpg";
import premium from "@/assets/room-premium.jpg";
import signature from "@/assets/room-signature.jpg";

const roomImages: Record<string, string> = { smart, comfort, premium, signature };

export type Collection =
  | "rooms"
  | "thalis"
  | "reviews"
  | "faqs"
  | "amenities"
  | "attractions"
  | "coupons"
  | "properties";

type Row = Record<string, unknown>;

/** Public (visible) rows for a collection. */
export function usePublicRows(table: Collection) {
  return useQuery({
    queryKey: ["public-content", table],
    queryFn: async (): Promise<Row[]> => {
      let q = db.from(table).select("*");
      if (table !== "coupons") q = q.eq("visible", true);
      const { data, error } = await q.order(
        table === "coupons" ? "created_at" : "sort_order",
        { ascending: true },
      );
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
    staleTime: 60_000,
  });
}

/** Admin rows (includes hidden). */
export function useAdminRows(table: Collection) {
  return useQuery({
    queryKey: ["admin-content", table],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await db
        .from(table)
        .select("*")
        .order(table === "coupons" ? "created_at" : "sort_order", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });
}

// ---------- typed public helpers with static fallback ----------

export function useRooms(): Room[] {
  const { data } = usePublicRows("rooms");
  if (!data || data.length === 0) return staticRooms;
  return data.map((r) => {
    const slug = String(r["slug"]);
    return {
      id: slug,
      name: String(r["name"]),
      price: Number(r["price"]),
      subtitle: String(r["subtitle"] ?? ""),
      tags: (r["tags"] as string[]) ?? [],
      ...((r["badge"] ? { badge: String(r["badge"]) } : {}) as { badge?: string }),
      image: (r["image_url"] as string | null) || roomImages[slug] || smart,
      description: String(r["description"] ?? ""),
      highlights: (r["highlights"] as string[]) ?? [],
      size: String(r["size"] ?? ""),
      occupancy: String(r["occupancy"] ?? ""),
    } as Room;
  });
}

export function useThalis(): Thali[] {
  const { data } = usePublicRows("thalis");
  if (!data || data.length === 0) return staticThalis;
  return data.map((t) => ({
    id: String(t["slug"]),
    name: String(t["name"]),
    price: Number(t["price"]),
    items: (t["items"] as string[]) ?? [],
    ...((t["badge"] ? { badge: String(t["badge"]) } : {}) as { badge?: string }),
  }));
}

export function useRoom(id: string): Room {
  const rooms = useRooms();
  return rooms.find((r) => r.id === id) ?? staticGetRoom(id);
}

export function useNormalThali(): Thali {
  const thalis = useThalis();
  return thalis.find((t) => t.id === "normal") ?? thalis[0] ?? staticThalis[1]!;
}

export function useReviews(): Review[] {
  const { data } = usePublicRows("reviews");
  if (!data || data.length === 0) return staticReviews;
  return data.map((r) => ({
    name: String(r["name"]),
    city: String(r["city"] ?? ""),
    rating: Number(r["rating"]),
    text: String(r["text"] ?? ""),
    stay: String(r["stay"] ?? ""),
  }));
}

export function useFaqs(): Faq[] {
  const { data } = usePublicRows("faqs");
  if (!data || data.length === 0) return staticFaqs;
  return data.map((f) => ({ q: String(f["question"]), a: String(f["answer"] ?? "") }));
}

export function useAmenities(): { title: string; sub: string }[] {
  const { data } = usePublicRows("amenities");
  if (!data || data.length === 0) return staticAmenities;
  return data.map((a) => ({ title: String(a["title"]), sub: String(a["sub"] ?? "") }));
}

export function useAttractions(): Attraction[] {
  const { data } = usePublicRows("attractions");
  if (!data || data.length === 0) return staticAttractions;
  return data.map((a) => ({
    name: String(a["name"]),
    distance: String(a["distance"] ?? ""),
    note: String(a["note"] ?? ""),
  }));
}

export type SiteSettings = {
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  whatsappMessage: string;
  whatsappLink: string;
};

const fallbackSettings: SiteSettings = {
  phone: staticContact.phone,
  altPhone: staticContact.altPhone,
  email: staticContact.email,
  address: staticContact.address,
  whatsappMessage: "Hello House499! I want to book a room.",
  whatsappLink: `https://wa.me/91${staticContact.phone}?text=${encodeURIComponent("Hello House499! I want to book a room.")}`,
};

export function useSettings(): SiteSettings {
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 60_000,
  });
  if (!data) return fallbackSettings;
  const msg = data.whatsapp_message || fallbackSettings.whatsappMessage;
  return {
    phone: data.phone || fallbackSettings.phone,
    altPhone: data.alt_phone || fallbackSettings.altPhone,
    email: data.email || fallbackSettings.email,
    address: data.address || fallbackSettings.address,
    whatsappMessage: msg,
    whatsappLink: `https://wa.me/91${data.phone || fallbackSettings.phone}?text=${encodeURIComponent(msg)}`,
  };
}
