import { Home } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Home className="h-7 w-7 text-gold" strokeWidth={2.2} />
      <div className="leading-none">
        <div className="font-display text-xl font-extrabold tracking-tight text-navy-foreground">
          HOUSE<span className="text-gold">499</span>
        </div>
        {!compact && (
          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold-soft/80">
            Comfort for Every Budget
          </div>
        )}
      </div>
    </div>
  );
}
