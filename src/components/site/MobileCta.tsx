import { Link } from "@tanstack/react-router";
import { CalendarCheck, Phone } from "lucide-react";
import { contact } from "@/lib/site-data";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <a
          href={`tel:${contact.phone}`}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-navy text-xs font-extrabold uppercase tracking-wide text-navy"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <Link
          to="/rooms"
          className="flex min-h-11 flex-[1.4] items-center justify-center gap-2 rounded-md bg-gold text-xs font-extrabold uppercase tracking-wide text-gold-foreground"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Now
        </Link>
      </div>
    </div>
  );
}
