import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, BedDouble, Check, Maximize, Users, Wifi } from "lucide-react";
import { rooms } from "@/lib/site-data";
import { TrustBar } from "@/components/site/TrustBar";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = rooms.find((r) => r.id === params["roomId"]);
    if (!room) throw notFound();
    return room;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ₹${loaderData.price}/night — House499 Varanasi` },
          { name: "description", content: loaderData.description.slice(0, 150) },
          { property: "og:title", content: `${loaderData.name} — House499 Varanasi` },
          { property: "og:description", content: loaderData.description.slice(0, 150) },
        ]
      : [{ title: "Room Not Found — House499" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: RoomNotFound,
  component: RoomDetailPage,
});

function RoomNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="section-title">Room Not Found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The room you are looking for does not exist.</p>
      <Link
        to="/rooms"
        className="hover-lift mt-6 inline-block rounded-md bg-gold px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-gold-foreground"
      >
        View All Rooms
      </Link>
    </div>
  );
}

function RoomDetailPage() {
  const room = Route.useLoaderData();
  const similar = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Link
        to="/rooms"
        className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Rooms
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <img
              src={room.image}
              alt={`${room.name} at House499 Varanasi`}
              width={900}
              height={600}
              className="h-72 w-full rounded-xl object-cover md:h-96"
            />
          </Reveal>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="section-title !mt-0">{room.name}</h1>
            {room.badge && (
              <span className="rounded bg-gold px-2 py-1 text-[10px] font-extrabold uppercase text-gold-foreground">
                {room.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">{room.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-gold" /> {room.size}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gold" /> {room.occupancy}
            </span>
            {room.tags.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                {t.includes("Wi-Fi") ? (
                  <Wifi className="h-4 w-4 text-gold" />
                ) : (
                  <BadgeCheck className="h-4 w-4 text-gold" />
                )}
                {t}
              </span>
            ))}
          </div>

          <h2 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">About This Room</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.description}</p>

          <h2 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">Room Highlights</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {room.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-gold" /> {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking card */}
        <aside className="card-surface h-fit p-6 lg:sticky lg:top-24">
          <div className="font-display text-4xl font-extrabold">₹{room.price}</div>
          <div className="text-xs text-muted-foreground">per night + taxes</div>

          <ul className="mt-5 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-gold" /> Free cancellation at check-in counter
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-gold" /> Pay at property or online via UPI
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-gold" /> Thali meals delivered to your room
            </li>
          </ul>

          <Link
            to="/booking"
            search={{ room: room.id }}
            className="hover-lift mt-6 block w-full rounded-md bg-gold py-3.5 text-center text-xs font-extrabold uppercase tracking-wide text-gold-foreground"
          >
            Proceed to Booking
          </Link>
          <Link
            to="/rooms"
            className="mt-3 block w-full rounded-md border border-border py-3 text-center text-xs font-bold uppercase tracking-wide text-foreground hover:border-gold"
          >
            Compare Rooms
          </Link>
        </aside>
      </div>

      {/* Similar rooms */}
      <h2 className="section-title mt-14">Similar Rooms</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {similar.map((r, i) => (
          <Reveal key={r.id} delay={i * 80}>
            <Link
              to="/rooms/$roomId"
              params={{ roomId: r.id }}
              className="card-surface hover-lift group block overflow-hidden"
            >
              <img
                src={r.image}
                alt={`${r.name} at House499`}
                width={900}
                height={600}
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm uppercase">{r.name}</h3>
                  <span className="font-display text-lg font-extrabold">₹{r.price}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.subtitle}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <TrustBar />
      </div>
    </div>
  );
}
