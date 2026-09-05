import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, Clock, Copy, Lock, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Stepper } from "@/components/site/Stepper";
import { TrustBar } from "@/components/site/TrustBar";
import { BookingSummary } from "@/components/site/BookingSummary";
import { getRoom } from "@/lib/site-data";
import { createBooking } from "@/lib/bookings.functions";
import { DRAFT_KEY, type BookingDraft } from "@/routes/booking";

export const Route = createFileRoute("/payment")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search["room"] === "string" ? (search["room"] as string) : "premium",
    thali: typeof search["thali"] === "number" ? (search["thali"] as number) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Confirm & Pay — House499" },
      { name: "description", content: "Pay via UPI or at the property — confirm your House499 booking in one tap." },
      { property: "og:title", content: "Confirm & Pay — House499" },
      { property: "og:description", content: "Pay securely via UPI or pay at the property during check-in." },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const { room: roomId } = Route.useSearch();
  const room = getRoom(roomId);
  const navigate = useNavigate();

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [method, setMethod] = useState<"upi" | "property">("property");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as BookingDraft;
        setDraft(d);
        setMethod(d.paymentMethod === "upi" ? "upi" : "property");
      }
    } catch {
      /* no draft */
    }
  }, []);

  async function confirm() {
    if (!draft) return;
    setError("");
    setBusy(true);
    try {
      const result = await createBooking({
        data: {
          roomId: draft.roomId,
          guestName: draft.guestName,
          guestPhone: draft.guestPhone,
          guestEmail: draft.guestEmail,
          guests: draft.guests,
          checkIn: draft.checkIn,
          checkOut: draft.checkOut,
          thaliQty: draft.thaliQty,
          specialRequests: draft.specialRequests,
          couponCode: draft.couponCode,
        },
      });
      navigate({ to: "/confirmation", search: { ref: result.bookingCode } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not confirm your booking. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!draft) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <Stepper current={3} />
        <div className="card-surface mx-auto mt-8 max-w-lg p-10 text-center">
          <h1 className="section-title">No Booking in Progress</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please fill your booking details first, then come back here to confirm.
          </p>
          <a
            href="/booking"
            className="mt-6 inline-block rounded-md bg-gold px-8 py-3 text-xs font-extrabold uppercase text-gold-foreground"
          >
            Start Booking
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Stepper current={3} />

      <div className="card-surface mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h1 className="section-title">Almost There! Confirm Your Booking</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how you'd like to pay — you can also pay during check-in.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-gold/50 bg-accent px-4 py-3">
          <Clock className="h-5 w-5 text-gold" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Guest</div>
            <div className="text-sm font-bold">{draft.guestName}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-surface p-7">
          <h2 className="text-base uppercase">Choose a Payment Method</h2>
          <p className="text-xs text-muted-foreground">Your booking is confirmed instantly either way</p>

          <div className="mt-5 space-y-3">
            <label
              className={`block cursor-pointer rounded-md border px-4 py-4 ${
                method === "property" ? "border-gold bg-accent" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="method"
                  checked={method === "property"}
                  onChange={() => setMethod("property")}
                  className="accent-[var(--gold)]"
                />
                <ShieldCheck className="h-5 w-5 text-navy" />
                <span>
                  <span className="block text-sm font-bold">Pay at Property</span>
                  <span className="block text-xs text-muted-foreground">Pay during check-in at the hotel — cash or UPI</span>
                </span>
              </div>
            </label>

            <label
              className={`block cursor-pointer rounded-md border px-4 py-4 ${
                method === "upi" ? "border-gold bg-accent" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="method"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                  className="accent-[var(--gold)]"
                />
                <Smartphone className="h-5 w-5 text-navy" />
                <span>
                  <span className="block text-sm font-bold">UPI — Scan & Pay</span>
                  <span className="block text-xs text-muted-foreground">Pay now using any UPI app</span>
                </span>
              </div>

              {method === "upi" && (
                <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr]">
                  <div className="flex h-40 w-40 items-center justify-center rounded-md border border-border bg-card">
                    <div className="grid grid-cols-6 gap-0.5 p-3">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-3 w-3 ${i % 3 === 0 || i % 7 === 0 ? "bg-navy" : "bg-transparent"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Scan & Pay</div>
                    <p className="text-xs text-muted-foreground">
                      Scan the QR code using any UPI app, or pay to the UPI ID below.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <input
                        readOnly
                        value="bookinghouse499@okicici"
                        className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText("bookinghouse499@okicici");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="rounded-md bg-navy px-4 text-xs font-bold uppercase text-navy-foreground"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-md border border-border px-4 py-3 text-xs">
              <ShieldCheck className="h-5 w-5 text-success" />
              <span>
                <b className="block text-success">No Advance Needed</b>
                Reserve now, pay at check-in
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border px-4 py-3 text-xs">
              <Wallet className="h-5 w-5 text-success" />
              <span>
                <b className="block text-success">Easy Cancellation</b>
                Free cancellation up to 24h before check-in
              </span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
          )}

          <button
            onClick={confirm}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gold py-4 text-sm font-extrabold uppercase tracking-wide text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {busy ? "Confirming…" : "Confirm Booking"}
          </button>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" /> You'll get a booking ID instantly
          </p>
        </div>

        <div className="space-y-5">
          <BookingSummary
            room={room}
            thaliQty={draft.thaliQty}
            discountPercent={draft.discountPercent}
            checkIn={draft.checkIn}
            checkOut={draft.checkOut}
            guests={draft.guests}
          />
          <div className="card-surface p-5">
            <h2 className="text-base uppercase">Need Help?</h2>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>
                <b className="block text-foreground">24x7 Customer Support</b>
                We are here to help you anytime.
              </li>
              <li>
                <b className="block text-foreground">Best Price Guarantee</b>
                Find a lower price? We'll match it.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TrustBar />
      </div>
    </div>
  );
}
