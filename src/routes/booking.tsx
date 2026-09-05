import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, ShieldCheck, Tag } from "lucide-react";
import { useState } from "react";
import { Stepper } from "@/components/site/Stepper";
import { TrustBar } from "@/components/site/TrustBar";
import { BookingSummary } from "@/components/site/BookingSummary";
import { getRoom, normalThali } from "@/lib/site-data";
import thaliImg from "@/assets/thali.jpg";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search["room"] === "string" ? (search["room"] as string) : "premium",
  }),
  head: () => ({
    meta: [
      { title: "Booking Details — House499" },
      { name: "description", content: "Confirm your guest details, dates and thali add-on for your House499 stay." },
      { property: "og:title", content: "Booking Details — House499" },
      { property: "og:description", content: "Just a few details and your stay is booked." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { room: roomId } = Route.useSearch();
  const room = getRoom(roomId);
  const [thaliQty, setThaliQty] = useState(1);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Stepper current={2} />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-surface p-7">
          <h1 className="section-title">Let's Confirm Your Booking</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Almost there! Just a few details and your stay is booked.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-success-soft px-4 py-3 text-sm text-success">
            <ShieldCheck className="h-5 w-5" /> Your booking is secure and your data is protected.
          </div>

          <h2 className="mt-7 text-base uppercase">Guest Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *">
              <input placeholder="Enter your full name" className={inputCls} />
            </Field>
            <Field label="Mobile Number *">
              <div className="flex gap-2">
                <select className={`${inputCls} w-20`}>
                  <option>+91</option>
                </select>
                <input placeholder="Enter mobile number" className={inputCls} />
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email Address *">
                <input type="email" placeholder="you@example.com" className={inputCls} />
              </Field>
            </div>
            <Field label="Number of Guests *">
              <select className={inputCls}>
                <option>1 Guest</option>
                <option>2 Guests</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Special Requests (Optional)">
                <textarea rows={3} placeholder="Any special request?" className={inputCls} />
              </Field>
            </div>
          </div>

          <h2 className="mt-7 text-base uppercase">Check-in & Check-out</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Check-in Date *">
              <input type="date" className={inputCls} />
            </Field>
            <Field label="Check-out Date *">
              <input type="date" className={inputCls} />
            </Field>
          </div>

          <h2 className="mt-7 text-base uppercase">Payment Method</h2>
          <div className="mt-4 space-y-3">
            {[
              { t: "Pay Online Now", s: "UPI, Cards, Net Banking, Wallets" },
              { t: "Pay at Property", s: "Pay during check-in at the hotel" },
              { t: "Partial Pay (Advance)", s: "Pay now and rest at property" },
            ].map((m, i) => (
              <label
                key={m.t}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-border px-4 py-3 has-[:checked]:border-gold has-[:checked]:bg-accent"
              >
                <input type="radio" name="pay" defaultChecked={i === 0} className="accent-[var(--gold)]" />
                <span>
                  <span className="block text-sm font-bold">{m.t}</span>
                  <span className="block text-xs text-muted-foreground">{m.s}</span>
                </span>
              </label>
            ))}
          </div>

          <Link
            to="/payment"
            search={{ room: room.id, thali: thaliQty }}
            className="mt-6 flex items-center justify-center gap-2 rounded-md bg-gold py-4 text-sm font-extrabold uppercase tracking-wide text-gold-foreground"
          >
            Proceed to Payment <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Safe & Secure Payments. Cancel for Free*
          </p>
        </div>

        <div className="space-y-5">
          <BookingSummary room={room} thaliQty={thaliQty} />

          <div className="card-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base uppercase">Add House499 Thali</h2>
              <Link to="/thali-menu" className="text-xs font-semibold text-navy underline">
                View Menu
              </Link>
            </div>
            <div className="mt-4 flex gap-4">
              <img
                src={thaliImg}
                alt="Normal thali"
                width={900}
                height={700}
                loading="lazy"
                className="h-24 w-28 rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="text-sm font-bold uppercase">{normalThali.name}</div>
                <div className="text-xs text-muted-foreground">₹{normalThali.price} per Thali</div>
                <div className="text-xs text-muted-foreground">Delicious & Hygienic</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      className="px-3 py-1"
                      onClick={() => setThaliQty((q) => Math.max(0, q - 1))}
                      aria-label="Decrease thali quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{thaliQty}</span>
                    <button
                      className="px-3 py-1"
                      onClick={() => setThaliQty((q) => q + 1)}
                      aria-label="Increase thali quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-bold">₹{thaliQty * normalThali.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-accent p-5">
            <h2 className="text-sm font-bold uppercase">
              Why <span className="text-navy">Choose House499?</span>
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {[
                "Clean Room & Hygienic Stay",
                "Best Price Guarantee",
                "24x7 Customer Support",
                "Easy Booking & Free Cancellation*",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gold" /> {t}
                </li>
              ))}
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

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}
