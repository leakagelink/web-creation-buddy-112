import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Users } from "lucide-react";
import { rooms } from "@/lib/site-data";
import { TrustBar } from "@/components/site/TrustBar";
import { Stepper } from "@/components/site/Stepper";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms from ₹499 — House499 Varanasi" },
      {
        name: "description",
        content: "Smart, Comfort, Premium and Signature rooms at House499. Clean, safe and pocket friendly.",
      },
      { property: "og:title", content: "Rooms from ₹499 — House499" },
      { property: "og:description", content: "Pick the room that fits your budget and book in minutes." },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Stepper current={1} />
      <h1 className="section-title text-center">Select Your Room</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">Comfort for every budget</p>

      <div className="mt-8 space-y-5">
        {rooms.map((room, i) => (
          <Reveal key={room.id} delay={i * 80}>
          <article className="card-surface hover-lift group grid gap-5 p-4 md:grid-cols-[280px_1fr_200px]">
            <img
              src={room.image}
              alt={`${room.name} at House499`}
              width={900}
              height={600}
              loading="lazy"
              className="h-44 w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg uppercase">{room.name}</h2>
                {room.badge && (
                  <span className="rounded bg-gold px-2 py-0.5 text-[10px] font-extrabold uppercase text-gold-foreground">
                    {room.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{room.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                {room.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1">
                    {t.includes("Guest") ? <Users className="h-4 w-4" /> : <BadgeCheck className="h-4 w-4" />}
                    {t}
                  </span>
                ))}
              </div>
              <ul className="mt-4 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                {["Daily housekeeping", "Fresh linen & towels", "Power backup", "CCTV secured floor"].map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end justify-between gap-3 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <div className="text-right">
                <div className="font-display text-3xl font-extrabold">₹{room.price}</div>
                <div className="text-xs text-muted-foreground">per night + taxes</div>
              </div>
              <Link
                to="/rooms/$roomId"
                params={{ roomId: room.id }}
                className="hover-lift w-full rounded-md bg-gold py-3 text-center text-xs font-extrabold uppercase tracking-wide text-gold-foreground"
              >
                View Details
              </Link>
            </div>
          </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <TrustBar />
      </div>
    </div>
  );
}
