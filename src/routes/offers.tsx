import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

const offers = [
  { title: "10% OFF", sub: "On all direct bookings", note: "Use code HOUSE10 at checkout." },
  { title: "Free Thali", sub: "On stay of 3 nights", note: "One Normal Thali per night, free." },
  { title: "Early Check-in", sub: "Subject to availability", note: "Check in from 9:00 AM at no extra cost." },
  { title: "Long Stay Deal", sub: "7+ nights", note: "Flat 18% off on weekly stays." },
];

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Deals — House499" },
      {
        name: "description",
        content: "Save more with direct booking offers: 10% off, free thali on 3-night stays and early check-in.",
      },
      { property: "og:title", content: "Offers & Deals — House499" },
      { property: "og:description", content: "Exclusive discounts for guests booking directly with House499." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="section-title text-center">Exclusive Offers</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">For direct bookings only</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {offers.map((o, i) => (
          <Reveal key={o.title} delay={i * 90} className="h-full">
          <div className="hover-lift h-full rounded-lg bg-navy p-6 text-navy-foreground sm:p-7">
            <div className="font-display text-3xl font-extrabold uppercase text-gold">{o.title}</div>
            <div className="mt-1 text-sm font-semibold">{o.sub}</div>
            <p className="mt-3 text-sm text-navy-foreground/70">{o.note}</p>
            <Link
              to="/rooms"
              className="hover-lift mt-5 inline-block rounded-md bg-gold px-5 py-2 text-xs font-extrabold uppercase text-gold-foreground"
            >
              Book Now
            </Link>
          </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
