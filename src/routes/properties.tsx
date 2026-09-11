import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Users } from "lucide-react";
import galleryExterior from "@/assets/gallery-exterior.jpg";
import { useRooms, useSettings } from "@/lib/content";
import { LocationMap } from "@/components/site/LocationMap";
import { TrustBar } from "@/components/site/TrustBar";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Our Properties — House499 Varanasi" },
      {
        name: "description",
        content: "Explore House499 properties. Clean rooms, safe stays and fresh thali meals — starting at ₹499 in Varanasi.",
      },
      { property: "og:title", content: "Our Properties — House499" },
      {
        property: "og:description",
        content: "Standardised rooms, hygiene and service across every House499 property.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const rooms = useRooms();
  const contact = useSettings();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <h1 className="section-title">Our Properties</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every House499 property follows the same promise — Clean Rooms. Safe Stay. Best Price.
      </p>

      <article className="card-surface hover-lift mt-8 grid gap-6 p-5 lg:grid-cols-[420px_1fr]">
        <img
          src={galleryExterior}
          alt="House499 Varanasi property exterior"
          width={1200}
          height={800}
          loading="lazy"
          className="h-60 w-full rounded-md object-cover lg:h-full"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg uppercase">House499 Varanasi</h2>
            <span className="rounded bg-gold px-2 py-0.5 text-[10px] font-extrabold uppercase text-gold-foreground">
              Now Open
            </span>
          </div>
          <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {contact.address}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Our flagship property in the holy city of Varanasi — minutes from the ghats, with daily
            housekeeping, fresh linen, power backup and CCTV-secured floors. Home-style thali meals
            delivered straight to your room.
          </p>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-gold">Rooms Available</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {rooms.map((room) => (
              <li key={room.id}>
                <Link
                  to="/rooms"
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
            <Link
              to="/rooms"
              className="hover-lift rounded-md bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-gold-foreground"
            >
              Book a Room
            </Link>
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
