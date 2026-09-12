import { useQuery } from "@tanstack/react-query";
import { properties as staticProperties } from "@/lib/site-data";
import { getPublicProperties, type PropertyRow } from "@/lib/properties.functions";

export const propertyFallbackImages: Record<string, string> = Object.fromEntries(
  staticProperties.map((p) => [p.id, p.image]),
);

export const propertyFallbackRows: PropertyRow[] = staticProperties.map((p, i) => ({
  id: p.id,
  slug: p.id,
  name: p.name,
  location: p.location,
  address: null,
  rating: p.rating,
  reviews: p.reviews,
  from_price: p.fromPrice,
  image_url: null,
  coming_soon: Boolean(p.comingSoon),
  visible: true,
  sort_order: i,
}));

export function propertyImage(p: Pick<PropertyRow, "image_url" | "slug">): string {
  return (
    p.image_url ||
    propertyFallbackImages[p.slug] ||
    propertyFallbackImages["varanasi"] ||
    ""
  );
}

/** Visible properties from the database, with the built-in list as fallback. */
export function usePropertyList(): PropertyRow[] {
  const { data } = useQuery({
    queryKey: ["public-properties"],
    queryFn: () => getPublicProperties(),
    staleTime: 60_000,
  });
  return data && data.length > 0 ? data : propertyFallbackRows;
}
