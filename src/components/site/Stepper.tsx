import { Check } from "lucide-react";

const steps = ["Select Room", "Booking Details", "Payment", "Confirmation"];

export function Stepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div className="mx-auto max-w-4xl px-2 py-6">
      <div className="flex items-start justify-between">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <div key={label} className="flex flex-1 items-start last:flex-none">
              <div className="flex w-24 flex-col items-center gap-2 sm:w-32">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    active
                      ? "bg-gold text-gold-foreground"
                      : done
                        ? "bg-navy text-navy-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {n}
                </div>
                <div className="flex items-center gap-1 text-center text-[11px] font-semibold uppercase tracking-wide">
                  <span className={active || done ? "" : "text-muted-foreground"}>{label}</span>
                  {done && <Check className="h-3.5 w-3.5 text-success" />}
                </div>
              </div>
              {n < steps.length && (
                <div
                  className={`mt-4 h-0.5 flex-1 ${done ? "bg-navy" : active ? "bg-gold" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
