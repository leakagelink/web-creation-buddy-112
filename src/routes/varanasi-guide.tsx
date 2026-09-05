import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, CalendarClock, Camera, MapPin, TrainFront, Utensils } from "lucide-react";
import ghatImg from "@/assets/guide-ghats.jpg";
import { attractions } from "@/lib/site-data";
import { TrustBar } from "@/components/site/TrustBar";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/varanasi-guide")({
  head: () => ({
    meta: [
      { title: "Varanasi Travel Guide 2026 — Where to Go, What to Eat | House499" },
      {
        name: "description",
        content:
          "Free Varanasi travel guide: Kashi Vishwanath, the ghats, Ganga Aarti, Sarnath, best time to visit and how to reach — plus budget rooms from ₹499 at House499.",
      },
      { property: "og:title", content: "Varanasi Travel Guide — House499" },
      {
        property: "og:description",
        content: "Temples, ghats, food and travel tips for Varanasi — plan your trip with House499.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

const tips = [
  "Best time to visit: October to March — pleasant weather for ghat walks and sightseeing.",
  "Book Ganga Aarti viewing early at Dashashwamedh Ghat; it gets crowded at sunset.",
  "Auto-rickshaws and e-rickshaws are the easiest way to move around the old city.",
  "Carry cash — many small shops and boat rides are cash only.",
  "Dress modestly at temples; leather items and phones aren't allowed inside Kashi Vishwanath.",
  "Try the street food: kachori-sabzi breakfast, tamatar chaat and Banarasi paan.",
];

function GuidePage() {
  return (
    <div className="pb-0">
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={ghatImg}
          alt="Sunrise over the ghats of Varanasi and the Ganges river"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Free Travel Guide</p>
          <h1 className="mt-3 max-w-2xl text-3xl uppercase leading-tight sm:text-5xl">
            Varanasi: The Complete <span className="text-gold">First-Timer's Guide</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-navy-foreground/85 sm:text-base">
            Temples, ghats, food and practical tips — everything you need to plan your trip to the
            world's oldest living city.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h2 className="section-title">Top Places to Visit</h2>
        <p className="mt-1 text-sm text-muted-foreground">Distances are from House499 — you're never far from the action.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a, i) => (
            <Reveal key={a.name} delay={i * 70} className="h-full">
              <article className="hover-lift h-full rounded-lg border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-extrabold uppercase leading-snug">{a.name}</h3>
                  <span className="shrink-0 rounded bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-gold-foreground">
                    {a.distance}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy py-10 text-navy-foreground sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl uppercase">
              Travel <span className="text-gold">Tips</span>
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/85">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Camera className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-gold/25 bg-navy-soft p-5">
              <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase">
                <CalendarClock className="h-4 w-4 text-gold" /> Suggested 2-Day Plan
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-navy-foreground/80">
                <li><b>Day 1:</b> Morning aarti at Assi Ghat → Kashi Vishwanath → evening Ganga Aarti at Dashashwamedh.</li>
                <li><b>Day 2:</b> Sunrise boat ride → Sarnath → silk weaving markets → thali dinner at House499.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gold/25 bg-navy-soft p-5">
              <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase">
                <TrainFront className="h-4 w-4 text-gold" /> How to Reach
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-navy-foreground/80">
                <li><b>By train:</b> Varanasi Junction (3 km) or Banaras Station (~10 km).</li>
                <li><b>By air:</b> LBS Airport (26 km) — pre-paid taxis available.</li>
                <li><b>By road:</b> Well connected from Lucknow (300 km), Patna (250 km), Delhi (~800 km).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid items-center gap-6 rounded-lg bg-accent p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl uppercase">Staying in Varanasi?</h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              House499 is minutes from the ghats and the station — clean rooms from ₹499, fresh
              thali meals and 24x7 support. Use coupon <b className="text-navy">HOUSE10</b> for 10% off direct bookings.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="hover-lift flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-xs font-extrabold uppercase text-gold-foreground"
              >
                <BedDouble className="h-4 w-4" /> Book a Room
              </Link>
              <Link
                to="/thali-menu"
                className="hover-lift flex items-center gap-2 rounded-md border border-navy px-6 py-3 text-xs font-extrabold uppercase text-navy"
              >
                <Utensils className="h-4 w-4" /> See Thali Menu
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" /> Varanasi, Uttar Pradesh
            <ArrowRight className="h-4 w-4" /> 10 min to Ghats
          </div>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}
