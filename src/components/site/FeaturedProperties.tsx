import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { properties as staticProperties } from "@/lib/site-data";
import { getPublicProperties, type PropertyRow } from "@/lib/properties.functions";
import { Reveal } from "@/components/site/Reveal";

const fallbackImages: Record<string, string> = Object.fromEntries(
  staticProperties.map((p) => [p.id, p.image]),
);

const fallbackRows: PropertyRow[] = staticProperties.map((p, i) => ({
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

export function FeaturedProperties() {
  const { data } = useQuery({
    queryKey: ["public-properties"],
    queryFn: () => getPublicProperties(),
  });

  const list = data && data.length > 0 ? data : fallbackRows;

  return (
    <section className="mt-10 bg-navy py-10 text-navy-foreground sm:mt-14 sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              Verified & Trusted
            </p>
            <h2 className="section-title mt-1">Featured Properties</h2>
          </div>
          <Link
            to="/properties"
            className="flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wide text-gold hover:underline"
          >
            View All Properties <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="h-full">
              <article className="hover-lift group h-full overflow-hidden rounded-lg border border-gold/20 bg-navy-foreground/5">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.image_url || fallbackImages[p.slug] || fallbackImages["varanasi"]}
                    alt={`${p.name} property exterior`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.coming_soon ? (
                    <span className="absolute left-3 top-3 rounded bg-gold px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-gold-foreground">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="absolute left-3 top-3 rounded bg-whatsapp px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-navy-foreground">
                      Now Open
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold uppercase tracking-wide">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-navy-foreground/70">
                    <MapPin className="h-3.5 w-3.5 text-gold" />
                    {p.location}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-3">
                    <span className="flex items-center gap-1 text-xs font-semibold">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      {p.rating}
                      <span className="font-normal text-navy-foreground/60">({p.reviews})</span>
                    </span>
                    <span className="text-right text-xs text-navy-foreground/70">
                      From
                      <span className="ml-1 font-display text-lg font-extrabold text-gold">
                        ₹{p.from_price}
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
