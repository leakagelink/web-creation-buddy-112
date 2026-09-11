import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BadgePercent,
  ChevronDown,
  Clock,
  Home,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";
import heroRoom from "@/assets/hero-room.jpg";
import thaliImg from "@/assets/thali.jpg";
import { amenities, rooms, thalis } from "@/lib/site-data";
import { TrustBar } from "@/components/site/TrustBar";
import { Reveal } from "@/components/site/Reveal";
import { Gallery } from "@/components/site/Gallery";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { Reviews } from "@/components/site/Reviews";
import { Faq } from "@/components/site/Faq";
import { LocationMap } from "@/components/site/LocationMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House499 — Clean Room. Safe Stay. Best Price." },
      {
        name: "description",
        content:
          "Book budget hotel rooms starting ₹499 in Varanasi. Hygienic rooms, fresh thali meals, free Wi-Fi and 24x7 support.",
      },
      { property: "og:title", content: "House499 — Clean Room. Safe Stay. Best Price." },
      {
        property: "og:description",
        content: "Comfortable rooms from ₹499 with delicious thali meals delivered to your room.",
      },
    ],
  }),
  component: Index,
});

const heroBadges = [
  { Icon: Home, title: "Clean & Hygienic" },
  { Icon: ShieldCheck, title: "Safe & Secure" },
  { Icon: BadgePercent, title: "Best Price Guarantee" },
  { Icon: Clock, title: "24x7 Support" },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroRoom}
          alt="House499 hotel room with warm lighting"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-45 lg:opacity-70 lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="fade-up">
            <h1 className="text-[2rem] uppercase leading-[1.05] sm:text-5xl">
              Clean Room.
              <br />
              Safe Stay.
              <br />
              <span className="text-gold">Best Price.</span>
            </h1>
            <p className="mt-5 max-w-md text-navy-foreground/80">
              Comfortable rooms. Hygienic stay. Delicious food. All at the best price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroBadges.map(({ Icon, title }) => (
                <div
                  key={title}
                  className="hover-lift w-[calc(50%-0.375rem)] rounded-md border border-gold/40 bg-navy/60 p-3 text-center sm:w-28"
                >
                  <Icon className="mx-auto h-6 w-6 text-gold" strokeWidth={1.6} />
                  <div className="mt-2 text-[11px] font-semibold leading-tight">{title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up self-center rounded-lg border border-gold/25 bg-navy/85 p-5 backdrop-blur sm:p-6" style={{ animationDelay: "120ms" }}>
            <h2 className="text-center text-xl uppercase">Book Your Stay</h2>
            <div className="mt-5 space-y-4">
              <Field label="Check-in">
                <input type="date" className="w-full bg-transparent text-sm outline-none" />
              </Field>
              <Field label="Check-out">
                <input type="date" className="w-full bg-transparent text-sm outline-none" />
              </Field>
              <Field label="Guests" icon={<ChevronDown className="h-4 w-4 text-muted-foreground" />}>
                <select className="w-full appearance-none bg-transparent text-sm outline-none">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                </select>
              </Field>
              <Link
                to="/rooms"
                className="hover-lift block w-full rounded-md bg-gold py-3 text-center text-sm font-extrabold uppercase tracking-wide text-gold-foreground"
              >
                Search Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4">
        <div className="card-surface px-4 py-10 sm:px-6">
          <h2 className="section-title text-center">Choose Your Room</h2>
          <p className="mt-1 text-center text-sm text-muted-foreground">Comfort for every budget</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {rooms.map((room, i) => (
              <Reveal key={room.id} delay={i * 90}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/rooms"
              className="hover-lift inline-block rounded-md bg-navy px-8 py-3 text-sm font-bold uppercase tracking-wide text-navy-foreground"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 bg-navy sm:mt-14 py-10 text-navy-foreground sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <h2 className="text-3xl uppercase">
              House<span className="text-gold">499</span> Thali
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold-soft">
              Fresh · Hygienic · Pocket Friendly
            </p>
            <ul className="mt-6 space-y-3 text-sm text-navy-foreground/80">
              {["Prepared Fresh For You", "Hygienic Kitchen & Quality Ingredients", "Delivered to Your Room", "Affordable & Satisfaction Guaranteed"].map(
                (t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <Link
              to="/thali-menu"
              className="hover-lift mt-6 inline-block rounded-md bg-gold px-6 py-3 text-sm font-extrabold uppercase text-gold-foreground"
            >
              View Full Menu
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {thalis.map((thali, i) => (
              <Reveal key={thali.id} delay={i * 90} className="h-full">
              <div className="hover-lift h-full rounded-lg bg-card p-4 text-card-foreground">
                <div className="text-center">
                  <div className="text-sm font-bold uppercase tracking-wide">{thali.name}</div>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <span className="font-display text-2xl font-extrabold">₹{thali.price}</span>
                    {thali.badge && (
                      <span className="rounded bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-gold-foreground">
                        {thali.badge}
                      </span>
                    )}
                  </div>
                </div>
                <img
                  src={thaliImg}
                  alt={`${thali.name} served in a compartment tray`}
                  width={900}
                  height={700}
                  loading="lazy"
                  className="mt-3 h-32 w-full rounded-md object-cover"
                />
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {thali.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
                <Link
                  to="/thali-menu"
                  className="mt-4 block rounded-md bg-whatsapp py-2 text-center text-xs font-bold uppercase text-navy-foreground"
                >
                  Order Now
                </Link>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProperties />

      <Gallery />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {amenities.map((a) => (
            <div key={a.title} className="group text-center transition-transform duration-300 hover:-translate-y-1">
              <Wifi className="mx-auto h-7 w-7 text-navy transition-colors duration-300 group-hover:text-gold" strokeWidth={1.5} />
              <div className="mt-2 text-sm font-bold">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid sm:mt-12 gap-6 rounded-lg bg-navy px-8 py-8 text-navy-foreground md:grid-cols-4">
          <div>
            <h3 className="text-xl uppercase">Exclusive Offers</h3>
            <p className="text-sm text-gold">For Direct Bookings</p>
            <Link
              to="/offers"
              className="mt-3 inline-block rounded bg-gold px-4 py-2 text-[11px] font-extrabold uppercase text-gold-foreground"
            >
              View Offers
            </Link>
          </div>
          {[
            { title: "10% OFF", sub: "On All Direct Bookings" },
            { title: "Free Thali", sub: "On Stay of 3 Nights" },
            { title: "Early Check-in", sub: "Subject to Availability" },
          ].map((o) => (
            <div key={o.title} className="border-navy-foreground/15 md:border-l md:pl-6">
              <div className="font-display text-lg font-extrabold uppercase text-gold">{o.title}</div>
              <div className="text-sm text-navy-foreground/75">{o.sub}</div>
            </div>
          ))}
        </div>

        <Reviews />

        <Faq />

        <LocationMap />

        <div className="mt-12">
          <TrustBar />
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-navy-foreground/70">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-2 rounded-md bg-card px-3 py-2.5 text-card-foreground">
        {children}
        {icon}
      </div>
    </label>
  );
}

function RoomCard({ room }: { room: (typeof rooms)[number] }) {
  return (
    <article className="hover-lift group h-full overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative overflow-hidden">
        <img
          src={room.image}
          alt={`${room.name} at House499`}
          width={900}
          height={600}
          loading="lazy"
          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {room.badge && (
          <span className="absolute left-0 top-3 bg-gold px-3 py-1 text-[10px] font-extrabold uppercase text-gold-foreground">
            {room.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded bg-navy px-3 py-1 text-sm font-bold text-navy-foreground">
          ₹{room.price}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base uppercase">{room.name}</h3>
        <p className="text-xs text-muted-foreground">{room.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
          {room.tags.map((t) => (
            <span key={t} className="flex items-center gap-1">
              {t.includes("Guest") ? <Users className="h-3.5 w-3.5" /> : <BadgeCheck className="h-3.5 w-3.5" />}
              {t}
            </span>
          ))}
        </div>
        <Link
          to="/rooms/$roomId"
          params={{ roomId: room.id }}
          className="hover-gold mt-4 block rounded-md border border-navy py-2 text-center text-xs font-bold uppercase tracking-wide text-navy hover:bg-navy hover:text-navy-foreground"
        >
          View Property
        </Link>
      </div>
    </article>
  );
}
