import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Handshake,
  Headphones,
  IndianRupee,
  Mail,
  Monitor,
  Phone,
  ShieldCheck,
  Target,
  Wrench,
} from "lucide-react";
import heroRoom from "@/assets/hero-room.jpg";
import { contact } from "@/lib/site-data";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With House499 — Grow Your Hotel Business" },
      {
        name: "description",
        content:
          "Join the House499 partner network. Standardised operations, technology, pan-India marketing and 15% commission only on confirmed bookings.",
      },
      { property: "og:title", content: "Partner With House499" },
      { property: "og:description", content: "Grow together. Earn together. Zero joining fee, weekly payouts." },
    ],
  }),
  component: PartnerPage,
});

const steps = [
  { Icon: Handshake, title: "Partner Onboarding", sub: "Share your property details and complete a quick verification." },
  { Icon: ClipboardCheck, title: "Standardization", sub: "We help you standardize rooms, quality, pricing & amenities." },
  { Icon: Monitor, title: "Go Live on House499", sub: "Your property goes live and starts receiving bookings." },
  { Icon: BarChart3, title: "Grow & Earn More", sub: "Benefit from more visibility, more guests & higher occupancy." },
  { Icon: IndianRupee, title: "Timely Payouts", sub: "Get regular payouts with complete transparency & reports." },
];

const benefits = [
  { Icon: Target, title: "More Bookings", sub: "Access our wide customer base & marketing channels." },
  { Icon: BarChart3, title: "Better Visibility", sub: "List your property on House499 & multiple channels." },
  { Icon: IndianRupee, title: "Higher Revenue", sub: "Increase occupancy & average room revenue." },
  { Icon: Wrench, title: "Operational Support", sub: "Standardization, training, technology & 24x7 assistance." },
  { Icon: Monitor, title: "Transparent Earnings", sub: "Real-time dashboard, reports & on-time payouts." },
  { Icon: ShieldCheck, title: "Trusted Brand", sub: "Be associated with a growing & trusted hospitality brand." },
];

function PartnerPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroRoom}
          alt="House499 partner hotel room"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-40 lg:opacity-70 lg:[mask-image:linear-gradient(to_right,transparent,black_40%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-[2rem] uppercase leading-tight sm:text-5xl">
              Partner With
              <br />
              House499
            </h1>
            <p className="mt-3 font-display text-xl font-extrabold uppercase text-gold">
              Grow Together. Earn Together.
            </p>
            <p className="mt-4 max-w-md text-sm text-navy-foreground/80">
              Join the House499 Partner Network and grow your hotel business with our brand, technology,
              marketing & support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { Icon: ShieldCheck, t: "Stronger Brand" },
                { Icon: Building2, t: "More Bookings" },
                { Icon: BarChart3, t: "Higher Revenue" },
                { Icon: Headphones, t: "End to End Support" },
              ].map(({ Icon, t }) => (
                <div key={t} className="w-28 rounded-md border border-gold/40 p-3 text-center">
                  <Icon className="mx-auto h-6 w-6 text-gold" strokeWidth={1.6} />
                  <div className="mt-2 text-[11px] font-semibold leading-tight">{t}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${contact.phone}`}
                className="rounded-md bg-gold px-6 py-3 text-xs font-extrabold uppercase text-gold-foreground"
              >
                Become a Partner
              </a>
              <Link
                to="/about"
                className="rounded-md border border-navy-foreground/40 px-6 py-3 text-xs font-extrabold uppercase"
              >
                Know More
              </Link>
            </div>
          </div>

          <div className="self-center rounded-lg border border-gold/25 bg-navy/85 p-6 backdrop-blur">
            <h2 className="text-lg uppercase text-gold">
              Trusted Brand.
              <br />
              Proven Results.
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              {[
                { Icon: Wrench, t: "Standardized Quality & Operations" },
                { Icon: Monitor, t: "Technology Powered Platform" },
                { Icon: Target, t: "Pan India Marketing Support" },
                { Icon: Headphones, t: "24x7 Partner Assistance" },
              ].map(({ Icon, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h2 className="section-title text-center">Our Partner Model</h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">Simple. Transparent. Profitable.</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ Icon, title, sub }, i) => (
            <div key={title} className="text-center">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border">
                <Icon className="h-9 w-9 text-gold" strokeWidth={1.5} />
                <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-sm uppercase">{title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        <div className="card-surface mt-14 p-8">
          <h2 className="section-title text-center">Partner Benefits</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ Icon, title, sub }) => (
              <div key={title} className="rounded-lg border border-border p-5 text-center">
                <Icon className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
                <h3 className="mt-3 text-sm uppercase">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 rounded-lg bg-navy px-8 py-10 text-navy-foreground lg:grid-cols-4">
          <div>
            <h3 className="text-xl uppercase">Fair & Transparent Revenue Model</h3>
            <p className="mt-2 text-sm text-navy-foreground/70">
              We believe in win-win partnerships. Our revenue model is simple and partner-friendly.
            </p>
          </div>
          {[
            { big: "15%", title: "Commission Model", sub: "Pay only on confirmed bookings." },
            { big: "₹0", title: "No Joining Fee", sub: "No hidden charges. No monthly fee." },
            { big: "Weekly", title: "Timely Payouts", sub: "Payouts directly to your bank account." },
          ].map((c) => (
            <div key={c.title} className="text-center lg:border-l lg:border-navy-foreground/15">
              <div className="font-display text-3xl font-extrabold text-gold">{c.big}</div>
              <div className="mt-1 text-sm font-bold uppercase">{c.title}</div>
              <p className="text-xs text-navy-foreground/70">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="card-surface p-6">
            <h3 className="text-base uppercase">Who Can Partner?</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {["Hotels", "Guest Houses", "Homestays", "Boutique Hotels", "Service Apartments", "Resorts"].map((w) => (
                <li key={w}>✓ {w}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-base uppercase">Partner Testimonial</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              “Partnering with House499 has increased our bookings by 40% and our occupancy is now better than
              ever. Their support & technology is excellent.”
            </p>
            <div className="mt-4 text-sm font-bold">- Rajeev Sharma</div>
            <div className="text-xs text-muted-foreground">Hotel Ganga View, Varanasi</div>
          </div>
          <div className="rounded-lg bg-navy p-6 text-center text-navy-foreground">
            <h3 className="text-base uppercase text-gold">Ready to grow with House499?</h3>
            <p className="mt-2 text-sm text-navy-foreground/75">
              Join our partner network today and take your hotel business to the next level.
            </p>
            <a
              href={`tel:${contact.phone}`}
              className="mt-5 inline-block rounded-md bg-gold px-6 py-3 text-xs font-extrabold uppercase text-gold-foreground"
            >
              Become a Partner
            </a>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> {contact.phone}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-gold" /> {contact.email}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
