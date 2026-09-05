import { BadgePercent, CalendarX2, Headphones, ShieldCheck } from "lucide-react";

const items = [
  { Icon: BadgePercent, title: "Best Price Guarantee", sub: "Get the best price or we match it." },
  { Icon: ShieldCheck, title: "Safe & Secure Booking", sub: "Your data is protected with 256-bit SSL." },
  { Icon: Headphones, title: "24x7 Customer Support", sub: "We are here to help you anytime." },
  { Icon: CalendarX2, title: "Easy Cancellation", sub: "Free cancellation on select bookings." },
];

export function TrustBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "rounded-lg bg-navy px-4 py-6 text-navy-foreground sm:px-6"
          : "card-surface px-4 py-6 sm:px-6"
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {items.map(({ Icon, title, sub }) => (
          <div key={title} className="flex min-w-0 items-start gap-3">
            <Icon className="mt-0.5 h-7 w-7 shrink-0 text-gold" strokeWidth={1.6} />
            <div className="min-w-0">
              <div className="text-sm font-bold uppercase tracking-wide">{title}</div>
              <p className={dark ? "text-xs text-navy-foreground/70" : "text-xs text-muted-foreground"}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
