import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Clock, CreditCard, Lock, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { Stepper } from "@/components/site/Stepper";
import { TrustBar } from "@/components/site/TrustBar";
import { BookingSummary, priceBreakdown } from "@/components/site/BookingSummary";
import { getRoom } from "@/lib/site-data";

export const Route = createFileRoute("/payment")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search["room"] === "string" ? (search["room"] as string) : "premium",
    thali: typeof search["thali"] === "number" ? (search["thali"] as number) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Secure Payment — House499" },
      { name: "description", content: "Pay securely with UPI, cards, net banking, wallets or at the property." },
      { property: "og:title", content: "Secure Payment — House499" },
      { property: "og:description", content: "100% secure payments with instant booking confirmation." },
    ],
  }),
  component: PaymentPage,
});

const methods = [
  { id: "upi", Icon: Smartphone, title: "UPI", sub: "Pay using any UPI app" },
  { id: "card", Icon: CreditCard, title: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay & more" },
  { id: "netbanking", Icon: Building2, title: "Net Banking", sub: "Pay using your bank account" },
  { id: "wallet", Icon: Wallet, title: "Wallets", sub: "Pay using wallet balance" },
  { id: "property", Icon: ShieldCheck, title: "Pay at Property", sub: "Pay during check-in at the hotel" },
];

function PaymentPage() {
  const { room: roomId, thali } = Route.useSearch();
  const room = getRoom(roomId);
  const { total } = priceBreakdown(room, thali);
  const [selected, setSelected] = useState("upi");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Stepper current={3} />

      <div className="card-surface mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h1 className="section-title">Almost There! Complete Your Payment</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your booking is reserved. Please complete the payment within 10:00 minutes.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-gold/50 bg-accent px-4 py-3">
          <Clock className="h-5 w-5 text-gold" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Time Remaining</div>
            <div className="font-display text-lg font-extrabold">09:48</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-surface p-7">
          <h2 className="text-base uppercase">Choose a Payment Method</h2>
          <p className="text-xs text-muted-foreground">All payments are secure and encrypted</p>

          <div className="mt-5 space-y-3">
            {methods.map(({ id, Icon, title, sub }) => (
              <label
                key={id}
                className={`block cursor-pointer rounded-md border px-4 py-4 ${
                  selected === id ? "border-gold bg-accent" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="method"
                    checked={selected === id}
                    onChange={() => setSelected(id)}
                    className="accent-[var(--gold)]"
                  />
                  <Icon className="h-5 w-5 text-navy" />
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="block text-xs text-muted-foreground">{sub}</span>
                  </span>
                </div>

                {id === "upi" && selected === "upi" && (
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
                        <button className="rounded-md bg-navy px-4 text-xs font-bold uppercase text-navy-foreground">
                          Copy
                        </button>
                      </div>
                      <p className="mt-3 text-xs text-success">
                        This payment link will expire in 10:00 minutes.
                      </p>
                    </div>
                  </div>
                )}
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-md border border-border px-4 py-3 text-xs">
              <ShieldCheck className="h-5 w-5 text-success" />
              <span>
                <b className="block text-success">100% Secure Payments</b>
                256-bit SSL encryption for your safety
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border px-4 py-3 text-xs">
              <ShieldCheck className="h-5 w-5 text-success" />
              <span>
                <b className="block text-success">Instant Confirmation</b>
                Get booking confirmation instantly
              </span>
            </div>
          </div>

          <Link
            to="/confirmation"
            search={{ room: room.id, thali }}
            className="mt-6 flex items-center justify-center gap-2 rounded-md bg-gold py-4 text-sm font-extrabold uppercase tracking-wide text-gold-foreground"
          >
            <Lock className="h-4 w-4" /> Pay Securely ₹{total}
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            You will be redirected to a secure payment gateway
          </p>
        </div>

        <div className="space-y-5">
          <BookingSummary room={room} thaliQty={thali} />
          <div className="card-surface p-5">
            <h2 className="text-base uppercase">Need Help?</h2>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>
                <b className="block text-foreground">24x7 Customer Support</b>
                We are here to help you anytime.
              </li>
              <li>
                <b className="block text-foreground">Easy Cancellation</b>
                Cancel before 6 PM on 23 May 2026 for full refund.
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
