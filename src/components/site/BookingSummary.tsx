import { Tag } from "lucide-react";
import type { Room } from "@/lib/site-data";
import { thalis } from "@/lib/site-data";

export function priceBreakdown(room: Room, thaliQty: number) {
  const tariff = room.price;
  const taxes = Math.round(room.price * 0.151);
  const thali = thaliQty * thalis[1].price;
  return { tariff, taxes, thali, total: tariff + taxes + thali };
}

export function BookingSummary({ room, thaliQty }: { room: Room; thaliQty: number }) {
  const { tariff, taxes, thali, total } = priceBreakdown(room, thaliQty);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <h2 className="bg-navy px-5 py-3 text-base uppercase text-navy-foreground">Booking Summary</h2>
      <div className="p-5">
        <div className="flex gap-4">
          <img
            src={room.image}
            alt={room.name}
            width={900}
            height={600}
            loading="lazy"
            className="h-20 w-28 rounded-md object-cover"
          />
          <div>
            <div className="text-sm font-bold uppercase">{room.name}</div>
            <div className="text-xs text-muted-foreground">{room.subtitle}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{room.tags.join(" · ")}</div>
          </div>
        </div>

        <dl className="mt-5 space-y-2 text-sm">
          <Row label="Check-in" value="24 May 2026 (Sun)" />
          <Row label="Check-out" value="25 May 2026 (Mon)" />
          <Row label="Duration" value="1 Night" />
          <Row label="Guests" value="1 Guest" />
          <div className="border-t border-border pt-2" />
          <Row label="Room Tariff" value={`₹${tariff}`} />
          <Row label="Taxes & Fees" value={`₹${taxes}`} />
          {thali > 0 && <Row label={`Thali (${thaliQty} x Normal Thali)`} value={`₹${thali}`} />}
        </dl>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-base font-bold">Total Amount</span>
          <span className="font-display text-2xl font-extrabold">₹{total}</span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md bg-success-soft px-3 py-2 text-xs text-success">
          <Tag className="h-4 w-4" /> You save ₹149 on this booking!
        </div>
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
