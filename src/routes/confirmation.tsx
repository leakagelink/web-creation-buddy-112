import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BellRing,
  CalendarPlus,
  CheckCircle2,
  Copy,
  Download,
  LogIn,
  LogOut,
  MessageCircle,
  Share2,
  Utensils,
} from "lucide-react";
import { Stepper } from "@/components/site/Stepper";
import { TrustBar } from "@/components/site/TrustBar";
import { priceBreakdown } from "@/components/site/BookingSummary";
import { contact, rooms, thalis } from "@/lib/site-data";
import thaliImg from "@/assets/thali.jpg";

export const Route = createFileRoute("/confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search.room === "string" ? search.room : "premium",
    thali: typeof search.thali === "number" ? search.thali : 1,
  }),
  head: () => ({
    meta: [
      { title: "Booking Confirmed — House499" },
      { name: "description", content: "Your House499 stay is confirmed. Check-in details, price summary and support." },
      { property: "og:title", content: "Booking Confirmed — House499" },
      { property: "og:description", content: "Thank you for choosing House499. Your stay is all set." },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { room: roomId, thali: thaliQty } = Route.useSearch();
  const room = rooms.find((r) => r.id === roomId) ?? rooms[2];
  const { tariff, taxes, thali, total } = priceBreakdown(room, thaliQty);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Stepper current={4} />

      <div className="card-surface grid gap-6 p-7 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-12 w-12 shrink-0 text-success" />
            <div>
              <h1 className="text-3xl text-success">Booking Confirmed!</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Thank you for choosing House499. Your stay is all set. We look forward to hosting you.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-md bg-success-soft px-6 py-5 text-center">
            <div className="text-sm font-semibold">Your Booking ID</div>
            <div className="mt-1 flex items-center justify-center gap-3">
              <span className="font-display text-2xl font-extrabold">H499-240526-000123</span>
              <Copy className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              We've sent the booking confirmation to <b>{contact.email}</b> and <b>+91 {contact.phone}</b>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-xs font-bold uppercase text-navy-foreground">
              <Download className="h-4 w-4" /> Download Invoice
            </button>
            <button className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-xs font-bold uppercase">
              <CalendarPlus className="h-4 w-4" /> Add to Calendar
            </button>
            <button className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-xs font-bold uppercase">
              <Share2 className="h-4 w-4" /> Share Booking
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-success-soft px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-success">
              <MessageCircle className="h-5 w-5" /> We've also sent the details on WhatsApp
            </span>
            <button className="rounded-md border border-success/40 px-3 py-1.5 text-xs font-bold uppercase text-success">
              Chat on WhatsApp
            </button>
          </div>
        </div>

        <div>
          <img
            src={room.image}
            alt={`${room.name} at House499`}
            width={900}
            height={600}
            loading="lazy"
            className="h-52 w-full rounded-md object-cover"
          />
          <div className="mt-4 rounded-md border border-gold/40 bg-accent p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gold-foreground">
              <BellRing className="h-4 w-4" /> Important Note
            </div>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• Check-in Time: 12:00 PM onwards</li>
              <li>• Check-out Time: 11:00 AM</li>
              <li>• Valid ID proof is mandatory at check-in.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-base uppercase">Booking Details</h2>
          <div className="mt-4 flex gap-4">
            <img
              src={room.image}
              alt={room.name}
              width={900}
              height={600}
              loading="lazy"
              className="h-24 w-32 rounded-md object-cover"
            />
            <div>
              <div className="text-sm font-bold uppercase">{room.name}</div>
              <div className="text-xs text-muted-foreground">{room.subtitle}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{room.tags.join(" · ")}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Check-in" value="24 May 2026 (Sun)" />
            <Row label="Check-out" value="25 May 2026 (Mon)" />
            <Row label="Duration" value="1 Night" />
            <Row label="Guests" value="1 Guest" />
          </dl>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-base uppercase">Price Details</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Room Tariff" value={`₹${tariff}`} />
            <Row label="Taxes & Fees" value={`₹${taxes}`} />
            {thali > 0 && <Row label={`Thali (${thaliQty} x Normal Thali)`} value={`₹${thali}`} />}
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-base font-bold">Total Paid</span>
            <span className="font-display text-2xl font-extrabold text-success">₹{total}</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-success-soft px-3 py-1.5 text-xs text-success">
            <CheckCircle2 className="h-4 w-4" /> Paid Online
          </div>
        </div>

        {thaliQty > 0 && (
          <div className="card-surface p-6">
            <h2 className="text-base uppercase">House499 Thali (Added)</h2>
            <div className="mt-4 flex gap-4">
              <img
                src={thaliImg}
                alt="Normal thali"
                width={900}
                height={700}
                loading="lazy"
                className="h-28 w-36 rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="text-sm font-bold uppercase">{thalis[1].name}</div>
                <div className="text-xs text-muted-foreground">₹{thalis[1].price} per Thali</div>
                <div className="text-xs text-muted-foreground">Quantity: {thaliQty}</div>
                <div className="mt-3 flex justify-between border-t border-border pt-2 text-sm font-bold">
                  <span>Total</span>
                  <span>₹{thali}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card-surface p-6">
          <h2 className="text-base uppercase">What's Next?</h2>
          <ul className="mt-4 space-y-4 text-sm">
            {[
              { Icon: LogIn, t: "Arrive & Check-in", s: "Show your valid ID proof at the time of check-in." },
              { Icon: CheckCircle2, t: "Enjoy Your Stay", s: "Enjoy your comfortable stay and our amenities." },
              { Icon: Utensils, t: "Thali Order", s: "Your Thali will be delivered to your room." },
              { Icon: LogOut, t: "Check-out", s: "Check-out by 11:00 AM on 25 May 2026." },
            ].map(({ Icon, t, s }) => (
              <li key={t} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>
                  <b className="block">{t}</b>
                  <span className="text-xs text-muted-foreground">{s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <TrustBar dark />
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block rounded-md bg-navy px-8 py-3 text-xs font-bold uppercase text-navy-foreground"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
