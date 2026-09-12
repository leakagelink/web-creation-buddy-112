import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { LocationMap } from "@/components/site/LocationMap";
import { TrustBar } from "@/components/site/TrustBar";
import { propertyImage, usePropertyList } from "@/lib/properties-client";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Our Properties — House499 Varanasi" },
      {
        name: "description",
        content:
          "Explore House499 properties. Clean rooms, safe stays and fresh thali meals — starting at ₹499.",
      },
      { property: "og:title", content: "Our Properties — House499" },
      {
        property: "og:description",
        content: "Standardised rooms, hygiene and service across every House499 property.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const list = usePropertyList();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <h1 className="section-title">Our Properties</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every House499 property follows the same promise — Clean Rooms. Safe Stay. Best Price.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.id}
            to="/properties/$slug"
            params={{ slug: p.slug }}
            className="hover-lift card-surface group block overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={propertyImage(p)}
                alt={`${p.name} property exterior`}
                width={1024}
                height={768}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                  p.coming_soon
                    ? "bg-gold text-gold-foreground"
                    : "bg-whatsapp text-navy-foreground"
                }`}
              >
                {p.coming_soon ? "Coming Soon" : "Now Open"}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold uppercase tracking-wide">{p.name}</h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                {p.location}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1 text-xs font-semibold">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  {p.rating}
                  <span className="font-normal text-muted-foreground">({p.reviews})</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase text-gold">
                  View Property <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <LocationMap />
      </div>
      <div className="mt-10">
        <TrustBar />
      </div>
    </div>
  );
}
