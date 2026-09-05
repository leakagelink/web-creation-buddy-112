import { Link } from "@tanstack/react-router";
import { Menu, Phone, UserCircle2, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { contact } from "@/lib/site-data";

const nav = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Thali Menu", to: "/thali-menu" },
  { label: "Amenities", to: "/amenities" },
  { label: "Offers", to: "/offers" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Partner", to: "/partner" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold border-gold" }}
              className="border-b-2 border-transparent pb-1 text-[13px] font-semibold uppercase tracking-wide text-navy-foreground/85 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${contact.phone}`}
            className="hidden items-center gap-2 text-sm font-semibold md:flex"
          >
            <Phone className="h-4 w-4 text-gold" />
            {contact.phone}
          </a>
          <Link
            to="/rooms"
            className="hover-lift rounded-md bg-gold px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-gold-foreground sm:px-4 sm:text-xs"
          >
            Book Now
          </Link>
          <UserCircle2 className="hidden h-8 w-8 text-navy-foreground/80 md:block" strokeWidth={1.4} />
          <button
            aria-label="Menu"
            className="transition-transform duration-200 hover:scale-110 xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="fade-up grid gap-1 border-t border-navy-foreground/10 px-4 pb-4 xl:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-semibold uppercase tracking-wide text-navy-foreground/85 transition-colors hover:bg-navy-soft hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
