import logoIcon from "@/assets/logo-icon.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logoIcon}
        alt="House499 logo"
        width={512}
        height={512}
        className="h-10 w-10 rounded-md object-cover"
      />
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
