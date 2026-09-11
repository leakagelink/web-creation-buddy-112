import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Share2,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Stepper } from "@/components/site/Stepper";
import { TrustBar } from "@/components/site/TrustBar";
import { priceBreakdown } from "@/components/site/BookingSummary";
import { getRoom } from "@/lib/site-data";
import { useNormalThali, useSettings } from "@/lib/content";
import { DRAFT_KEY, type BookingDraft } from "@/routes/booking";

export const Route = createFileRoute("/confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    ref: typeof search["ref"] === "string" ? (search["ref"] as string) : "",
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
  const contact = useSettings();
  const thaliItem = useNormalThali();
  const whatsappLink = contact.whatsappLink;
  const { ref } = Route.useSearch();
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw) as BookingDraft);
    } catch {
      /* ignore */
    }
  }, []);

  const room = draft ? getRoom(draft.roomId) : null;
  const pricing = room
    ? priceBreakdown(room, draft!.thaliQty, draft!.discountPercent, thaliItem.price)
    : null;

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
                Thank you for choosing House499. Your booking has been saved — our team will contact
                you shortly to confirm.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-md bg-success-soft px-6 py-5 text-center">
            <div className="text-sm font-semibold">Your Booking ID</div>
            <div className="mt-1 font-display text-2xl font-extrabold">{ref || "H499-PENDING"}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              Show this ID at check-in. Questions? Call <b>{contact.phone}</b>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(ref)}
              className="flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-xs font-bold uppercase text-navy-foreground"
            >
              Copy Booking ID
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "My House499 Booking", text: `My booking ID is ${ref}` }).catch(() => {});
                }
              }}
              className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-xs font-bold uppercase"
            >
              <Share2 className="h-4 w-4" /> Share Booking
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-success-soft px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-success">
              <MessageCircle className="h-5 w-5" /> Want to confirm on WhatsApp?
            </span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-success/40 px-3 py-1.5 text-xs font-bold uppercase text-success"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div>
          {room && (
            <img
              src={room.image}
              alt={`${room.name} at House499`}
              width={900}
              height={600}
              loading="lazy"
              className="h-52 w-full rounded-md object-cover"
            />
          )}
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

      {room && draft && pricing && (
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
              <Row label="Guest" value={draft.guestName} />
              <Row label="Mobile" value={`+91 ${draft.guestPhone}`} />
              <Row label="Check-in" value={formatDate(draft.checkIn)} />
              <Row label="Check-out" value={formatDate(draft.checkOut)} />
              <Row label="Guests" value={`${draft.guests} Guest${draft.guests > 1 ? "s" : ""}`} />
            </dl>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-base uppercase">Price Details</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Room Tariff" value={`₹${pricing.tariff}`} />
              <Row label="Taxes & Fees" value={`₹${pricing.taxes}`} />
              {pricing.thali > 0 && <Row label={`Thali (${draft.thaliQty} x Normal Thali)`} value={`₹${pricing.thali}`} />}
              {pricing.discount > 0 && (
                <Row label={`Coupon ${draft.couponCode}`} value={`− ₹${pricing.discount}`} />
              )}
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-base font-bold">Total</span>
              <span className="font-display text-2xl font-extrabold text-success">₹{pricing.total}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-xs text-gold-foreground">
              <CalendarDays className="h-4 w-4" />
              {draft.paymentMethod === "upi" ? "To be paid via UPI" : "Pay at Property"}
            </div>
          </div>

          {draft.thaliQty > 0 && (
            <div className="card-surface p-6">
              <h2 className="text-base uppercase">House499 Thali (Added)</h2>
              <div className="mt-4 flex items-center gap-4">
                <UtensilsCrossed className="h-10 w-10 shrink-0 text-gold" />
                <div className="flex-1">
                  <div className="text-sm font-bold uppercase">Normal Thali</div>
                  <div className="text-xs text-muted-foreground">₹120 per Thali</div>
                  <div className="text-xs text-muted-foreground">Quantity: {draft.thaliQty}</div>
                  <div className="mt-3 flex justify-between border-t border-border pt-2 text-sm font-bold">
                    <span>Total</span>
                    <span>₹{pricing.thali}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {draft.specialRequests && (
            <div className="card-surface p-6">
              <h2 className="text-base uppercase">Special Requests</h2>
              <p className="mt-3 rounded bg-accent px-4 py-3 text-sm text-muted-foreground">
                “{draft.specialRequests}”
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <TrustBar dark />
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          onClick={() => sessionStorage.removeItem(DRAFT_KEY)}
          className="inline-block rounded-md bg-navy px-8 py-3 text-xs font-bold uppercase text-navy-foreground"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-semibold ${highlight ? "text-success" : ""}`}>{value}</dd>
    </div>
  );
}
