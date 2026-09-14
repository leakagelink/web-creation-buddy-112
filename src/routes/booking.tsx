import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Lock, ShieldCheck, Tag, X } from "lucide-react";
import { useState } from "react";
import { Stepper } from "@/components/site/Stepper";
import { TrustBar } from "@/components/site/TrustBar";
import { BookingSummary } from "@/components/site/BookingSummary";
import { useNormalThali, useRoom } from "@/lib/content";
import { validateCoupon } from "@/lib/bookings.functions";
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

export type BookingDraft = {
  roomId: string;
  guestName: string;
  guestPhone: string;
  whatsappNumber: string;
  idProofType: string;
  idNumber: string;
  guestEmail: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  thaliQty: number;
  specialRequests: string;
  couponCode: string;
  discountPercent: number;
  paymentMethod: "upi" | "property";
};

export const DRAFT_KEY = "h499-booking-draft";

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-gold";

function BookingPage() {
  const { room: roomId } = Route.useSearch();
  const room = useRoom(roomId);
  const normalThali = useNormalThali();
  const navigate = useNavigate();

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [idProofType, setIdProofType] = useState("Aadhaar Card");
  const [idNumber, setIdNumber] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [thaliQty, setThaliQty] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const couponFn = validateCoupon;

  async function applyCoupon() {
    setCouponMsg("");
    if (!couponInput.trim()) return;
    try {
      const res = await couponFn({ data: { code: couponInput } });
      if (res.ok) {
        setCoupon({ code: res.code, discountPercent: res.discountPercent });
        setCouponMsg(`${res.code} applied — ${res.discountPercent}% off!`);
      } else {
        setCoupon(null);
        setCouponMsg("This coupon code is not valid.");
      }
    } catch {
      setCoupon(null);
      setCouponMsg("Could not check the coupon. Please try again.");
    }
  }

  function removeCoupon() {
    setCoupon(null);
    setCouponMsg("");
    setCouponInput("");
  }

  function proceed() {
    setError("");
    if (guestName.trim().length < 2) return setError("Please enter your full name.");
    if (!/^[6-9]\d{9}$/.test(guestPhone.trim())) return setError("Enter a valid 10-digit mobile number.");
    if (whatsappNumber.trim() && !/^[6-9]\d{9}$/.test(whatsappNumber.trim()))
      return setError("Enter a valid 10-digit WhatsApp number (or leave it blank).");
    if (!/^\S+@\S+\.\S+$/.test(guestEmail.trim())) return setError("Enter a valid email address.");
    if (!checkIn || !checkOut) return setError("Please select check-in and check-out dates.");
    if (new Date(checkOut) <= new Date(checkIn)) return setError("Check-out date must be after check-in date.");

    const draft: BookingDraft = {
      roomId: room.id,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      whatsappNumber: whatsappNumber.trim(),
      idProofType,
      idNumber: idNumber.trim(),
      guestEmail: guestEmail.trim(),
      guests,
      checkIn,
      checkOut,
      thaliQty,
      specialRequests: specialRequests.trim(),
      couponCode: coupon?.code ?? "",
      discountPercent: coupon?.discountPercent ?? 0,
      paymentMethod: "property",
    };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    navigate({ to: "/payment", search: { room: room.id, thali: thaliQty } });
  }

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
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your full name"
                className={inputCls}
                autoComplete="name"
                maxLength={100}
              />
            </Field>
            <Field label="Mobile Number *">
              <div className="flex gap-2">
                <select className={`${inputCls} w-20`}>
                  <option>+91</option>
                </select>
                <input
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile"
                  inputMode="numeric"
                  className={inputCls}
                  autoComplete="tel"
                />
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email Address *">
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                  autoComplete="email"
                  maxLength={255}
                />
              </Field>
            </div>
            <Field label="Number of Guests *">
              <select className={inputCls} value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Special Requests (Optional)">
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value.slice(0, 500))}
                  placeholder="Any special request?"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          <h2 className="mt-7 text-base uppercase">Check-in & Check-out</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Check-in Date *">
              <input type="date" value={checkIn} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setCheckIn(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Check-out Date *">
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().slice(0, 10)}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <h2 className="mt-7 text-base uppercase">Coupon Code</h2>
          <div className="mt-3">
            {coupon ? (
              <div className="flex items-center justify-between gap-3 rounded-md bg-success-soft px-4 py-3 text-sm text-success">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> <b>{coupon.code}</b> — {coupon.discountPercent}% off applied
                </span>
                <button onClick={removeCoupon} aria-label="Remove coupon" className="text-success">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. HOUSE10"
                  maxLength={20}
                  className={inputCls}
                />
                <button
                  onClick={applyCoupon}
                  className="shrink-0 rounded-md bg-navy px-5 text-xs font-extrabold uppercase tracking-wide text-navy-foreground"
                >
                  Apply
                </button>
              </div>
            )}
            {couponMsg && (
              <p className={`mt-2 text-xs ${coupon ? "text-success" : "text-destructive"}`}>{couponMsg}</p>
            )}
          </div>

          {error && (
            <p className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
          )}

          <button
            onClick={proceed}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gold py-4 text-sm font-extrabold uppercase tracking-wide text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            Proceed to Payment <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Safe & Secure. Pay at the property or via UPI.
          </p>
        </div>

        <div className="space-y-5">
          <BookingSummary
            room={room}
            thaliQty={thaliQty}
            discountPercent={coupon?.discountPercent ?? 0}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
          />

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}
