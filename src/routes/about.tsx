import { createFileRoute } from "@tanstack/react-router";
import heroRoom from "@/assets/hero-room.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About House499 — Comfort for Every Budget" },
      {
        name: "description",
        content: "House499 offers clean rooms, safe stays and fresh thali meals at honest prices across India.",
      },
      { property: "og:title", content: "About House499" },
      { property: "og:description", content: "Our story: comfort for every budget, starting at ₹499." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "1000+", label: "Partner Properties" },
  { value: "50+", label: "Cities" },
  { value: "5L+", label: "Happy Guests" },
  { value: "1L+", label: "Bookings Completed" },
];

function AboutPage() {
  return (
    <div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <h1 className="section-title">About House499</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            House499 was built on one simple belief — a clean, safe and comfortable room should not be a
            luxury. We standardise rooms, hygiene and service across every property so that a guest paying
            ₹499 gets the same care as a guest paying ₹1499.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Alongside stays, our House499 Thali kitchen serves fresh, home-style meals delivered straight to
            your room. Clean rooms, safe stay, best price and delicious food — all in one place.
          </p>
        </div>
        <img
          src={heroRoom}
          alt="A House499 room"
          width={1600}
          height={1000}
          loading="lazy"
          className="h-72 w-full rounded-lg object-cover lg:h-full"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="card-surface grid gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-navy">{s.value}</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
