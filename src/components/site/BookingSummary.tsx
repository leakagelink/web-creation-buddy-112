import { Tag } from "lucide-react";
import type { Room } from "@/lib/site-data";
import { normalThali } from "@/lib/site-data";

export function priceBreakdown(room: Room, thaliQty: number, discountPercent = 0) {
  const tariff = room.price;
  const taxes = Math.round(room.price * 0.151);
  const thali = thaliQty * normalThali.price;
  const discount = Math.round(((tariff + thali) * discountPercent) / 100);
  const total = tariff + taxes + thali - discount;
  return { tariff, taxes, thali, discount, total };
}

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function BookingSummary({
  room,
  thaliQty,
  discountPercent = 0,
  checkIn,
  checkOut,
  guests,
}: {
  room: Room;
  thaliQty: number;
  discountPercent?: number;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}) {
  const { tariff, taxes, thali, discount, total } = priceBreakdown(room, thaliQty, discountPercent);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <h2 className="bg-navy px-4 py-3 sm:px-5 text-base uppercase text-navy-foreground">Booking Summary</h2>
      <div className="p-4 sm:p-5">
        <div className="flex gap-4">
          <img
            src={room.image}
            alt={room.name}
            width={900}
            height={600}
            loading="lazy"
            className="h-20 w-24 shrink-0 rounded-md object-cover sm:w-28"
          />
          <div className="min-w-0">
            <div className="text-sm font-bold uppercase">{room.name}</div>
            <div className="text-xs text-muted-foreground">{room.subtitle}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{room.tags.join(" · ")}</div>
          </div>
        </div>

        <dl className="mt-5 space-y-2 text-sm">
          <Row label="Check-in" value={formatDate(checkIn)} />
          <Row label="Check-out" value={formatDate(checkOut)} />
          <Row label="Guests" value={guests ? `${guests} Guest${guests > 1 ? "s" : ""}` : "—"} />
          <div className="border-t border-border pt-2" />
          <Row label="Room Tariff" value={`₹${tariff}`} />
          <Row label="Taxes & Fees" value={`₹${taxes}`} />
          {thali > 0 && <Row label={`Thali (${thaliQty} x Normal Thali)`} value={`₹${thali}`} />}
          {discount > 0 && (
            <Row label={`Coupon Discount (${discountPercent}%)`} value={`− ₹${discount}`} highlight />
          )}
        </dl>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-base font-bold">Total Amount</span>
          <span className="font-display text-2xl font-extrabold">₹{total}</span>
        </div>
        {discount > 0 ? (
          <div className="mt-3 flex items-center gap-2 rounded-md bg-success-soft px-3 py-2 text-xs text-success">
            <Tag className="h-4 w-4" /> You save ₹{discount} with your coupon!
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-xs text-muted-foreground">
            <Tag className="h-4 w-4 text-gold" /> Have a coupon? Apply it on the booking page.
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="min-w-0 text-muted-foreground">{label}</dt>
      <dd className={`min-w-0 text-right font-semibold ${highlight ? "text-success" : ""}`}>{value}</dd>
    </div>
  );
}
