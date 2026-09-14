import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  BadgePercent,
  BedDouble,
  Clock,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import heroRoom from "@/assets/hero-room.jpg";
import thaliImg from "@/assets/thali.jpg";
import { Button } from "@/components/ui/button";
import { useAmenities, useRooms, useThalis } from "@/lib/content";
import { usePropertyList } from "@/lib/properties-client";
import type { Room } from "@/lib/site-data";
import { TrustBar } from "@/components/site/TrustBar";
import { Reveal } from "@/components/site/Reveal";
import { Gallery } from "@/components/site/Gallery";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { Reviews } from "@/components/site/Reviews";

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

const extraPopularCities = ["New Delhi", "Jaipur", "Ayodhya", "Rishikesh", "Goa"];

const heroBadges = [
  { Icon: Home, title: "Clean & Hygienic" },
  { Icon: ShieldCheck, title: "Safe & Secure" },
  { Icon: BadgePercent, title: "Best Price Guarantee" },
  { Icon: Clock, title: "24x7 Support" },
];

function Index() {
  const rooms = useRooms();
  const thalis = useThalis();
  const amenities = useAmenities();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Varanasi");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [searchError, setSearchError] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  function searchStay(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchError("");

    if (checkIn && checkOut && checkOut <= checkIn) {
      setSearchError("Check-out date must be after check-in.");
      return;
    }

    sessionStorage.setItem(
      "h499-stay-search",
      JSON.stringify({ destination, checkIn, checkOut, guests, rooms: roomCount }),
    );
    navigate({ to: "/rooms" });
  }

  return (
    <>
      <section className="relative bg-navy pb-10 text-navy-foreground sm:pb-12 lg:pb-24">
        <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroRoom}
          alt="House499 hotel room with warm lighting"
          width={1600}
          height={1000}
            className="h-full w-full object-cover opacity-45 lg:opacity-70 lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]"
        />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:pb-20 sm:pt-16 lg:pt-20">
          <div className="fade-up max-w-xl">
            <h1 className="text-[2rem] leading-[1.05] sm:text-5xl">
              Comfort for
              <br />
              <span className="text-gold">Every Budget</span>
            </h1>
            <p className="mt-5 max-w-md text-navy-foreground/80">
              Premium stays across India at affordable prices. Clean rooms, safe environment and the best hospitality.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 sm:flex sm:flex-wrap">
              {heroBadges.map(({ Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-2 text-xs font-semibold"
                >
                  <Icon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={searchStay}
          className="fade-up relative z-10 mx-4 mt-8 grid max-w-7xl gap-2 rounded-lg border border-border bg-card p-3 text-card-foreground shadow-[var(--shadow-card)] sm:p-4 lg:absolute lg:inset-x-4 lg:bottom-0 lg:mx-auto lg:mt-0 lg:translate-y-1/2 lg:grid-cols-[1.45fr_1fr_1fr_1.15fr_auto] lg:items-end"
          style={{ animationDelay: "120ms" }}
        >
          <SearchField label="Where are you going?" icon={<MapPin className="h-4 w-4" />}>
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="City, area or property"
              aria-label="Destination"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </SearchField>
          <SearchField label="Check-in">
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              aria-label="Check-in date"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </SearchField>
          <SearchField label="Check-out">
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              aria-label="Check-out date"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </SearchField>
          <SearchField label="Guests & Rooms" icon={<BedDouble className="h-4 w-4" />}>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <select
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
                aria-label="Guests"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              >
                {[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count} Guest{count > 1 ? "s" : ""}</option>)}
              </select>
              <span className="text-muted-foreground">·</span>
              <select
                value={roomCount}
                onChange={(event) => setRoomCount(Number(event.target.value))}
                aria-label="Rooms"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              >
                {[1, 2, 3].map((count) => <option key={count} value={count}>{count} Room{count > 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </SearchField>
          <Button type="submit" size="lg" className="h-12 bg-navy px-6 font-extrabold uppercase text-navy-foreground hover:bg-navy-soft">
            <Search className="h-4 w-4" /> Search Stay
          </Button>
          {searchError && <p role="alert" className="text-xs font-semibold text-destructive lg:col-span-5">{searchError}</p>}
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 lg:pt-20">
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

      {/* Thali banner — click to open the full thali menu */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:pb-14">
        <Link
          to="/thali-menu"
          className="hover-lift group flex flex-col items-center gap-6 overflow-hidden rounded-xl border border-border bg-gold-soft/20 p-5 sm:p-6 lg:flex-row lg:gap-8"
        >
          <div className="flex w-full items-center gap-4 sm:gap-6 lg:w-auto">
            <img
              src={thaliImg}
              alt="House499 thali with roti, rice, dal and sabzi"
              width={900}
              height={700}
              loading="lazy"
              className="h-28 w-44 shrink-0 rounded-lg object-cover sm:h-36 sm:w-64"
            />
            {thalis[0] && (
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full bg-navy text-navy-foreground sm:h-24 sm:w-24">
                <span className="font-display text-xl font-extrabold text-gold sm:text-2xl">
                  ₹{thalis[0].price}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wide sm:text-[10px]">
                  {thalis[0].name}
                </span>
              </div>
            )}
          </div>
          <div className="w-full flex-1 text-center lg:text-left">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold">
              House499 Thali
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold uppercase text-navy sm:text-3xl">
              Tasty. Fresh. Pocket Friendly.
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Delicious homely meals delivered to your room.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
              {["Hygienic", "Freshly Prepared", "On Time Delivery", "Pocket Friendly"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-bold text-navy">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-navy px-6 py-3 text-sm font-extrabold uppercase text-gold transition-colors group-hover:bg-navy-soft">
            Order Thali Now
          </span>
        </Link>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-8 text-center">
          <h2 className="section-title">
            <span className="text-gold">Why Choose</span>{" "}
            <span className="text-navy">HOUSE499?</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Everything you need for a comfortable stay</p>
        </div>
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

        <LocationMap />

        <div className="mt-12">
          <TrustBar />
        </div>
      </section>
    </>
  );
}

function SearchField({
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
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="mt-1 flex h-12 items-center gap-2 rounded-md border border-input bg-background px-3 text-foreground focus-within:border-gold focus-within:ring-1 focus-within:ring-gold">
        {children}
        <span className="shrink-0 text-muted-foreground">{icon}</span>
      </div>
    </label>
  );
}

function RoomCard({ room }: { room: Room }) {
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
