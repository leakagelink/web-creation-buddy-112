import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Star, Users } from "lucide-react";
import { LocationMap } from "@/components/site/LocationMap";
import { TrustBar } from "@/components/site/TrustBar";
import { useRooms, useSettings } from "@/lib/content";
import { propertyImage, usePropertyList } from "@/lib/properties-client";

export const Route = createFileRoute("/properties/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} — House499 Property`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "See rooms, location, amenities and starting price for this House499 property. Clean rooms from ₹499.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Rooms, location and prices for this House499 property.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useParams();
  const list = usePropertyList();
  const rooms = useRooms();
  const contact = useSettings();
  const property = list.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl uppercase">Property not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This property is not available right now.
        </p>
        <Link
          to="/properties"
          className="mt-6 inline-block rounded-md bg-navy px-6 py-3 text-xs font-bold uppercase text-navy-foreground"
        >
          See all properties
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Link
        to="/properties"
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All Properties
      </Link>

      <article className="card-surface mt-4 grid gap-6 p-5 lg:grid-cols-[480px_1fr]">
        <img
          src={propertyImage(property)}
          alt={`${property.name} property exterior`}
          width={1200}
          height={800}
          className="h-64 w-full rounded-md object-cover lg:h-full"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl uppercase">{property.name}</h1>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                property.coming_soon
                  ? "bg-gold text-gold-foreground"
                  : "bg-success-soft text-success"
              }`}
            >
              {property.coming_soon ? "Coming Soon" : "Now Open"}
            </span>
          </div>

          <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {property.address || property.location}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-gold text-gold" />
              {property.rating}
              <span className="font-normal text-muted-foreground">({property.reviews} reviews)</span>
            </span>
            <span className="text-sm text-muted-foreground">
              From{" "}
              <span className="font-display text-xl font-extrabold text-navy">
                ₹{property.from_price}
              </span>{" "}
              / night
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Daily housekeeping, fresh linen, power backup and CCTV-secured floors. Home-style thali
            meals delivered straight to your room — with the same House499 promise at every
            property: Clean Rooms. Safe Stay. Best Price.
          </p>

          <h2 className="mt-6 text-xs font-bold uppercase tracking-widest text-gold">
            Rooms Available
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {rooms.map((room) => (
              <li key={room.id}>
                <Link
                  to="/rooms/$roomId"
                  params={{ roomId: room.id }}
                  className="flex min-h-11 items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-gold"
                >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gold" />
                    {room.name}
                  </span>
                  <span className="font-display font-extrabold">₹{room.price}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {property.coming_soon ? (
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hover-lift rounded-md bg-whatsapp px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-navy-foreground"
              >
                Notify Me on WhatsApp
              </a>
            ) : (
              <Link
                to="/rooms"
                className="hover-lift rounded-md bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-gold-foreground"
              >
                Book a Room
              </Link>
            )}
            <Link
              to="/thali-menu"
              className="hover-lift rounded-md border border-gold px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-gold"
            >
              View Thali Menu
            </Link>
          </div>
        </div>
      </article>

      <div className="mt-10">
        <LocationMap />
      </div>
      <div className="mt-10">
        <TrustBar />
      </div>
    </div>
  );
}
