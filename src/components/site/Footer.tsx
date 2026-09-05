import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { contact } from "@/lib/site-data";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Varanasi Guide", to: "/varanasi-guide" },
      { label: "Offers", to: "/offers" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Partner",
    links: [
      { label: "Partner With Us", to: "/partner" },
      { label: "Book a Stay", to: "/rooms" },
      { label: "Contact Support", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:py-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
            Clean Rooms. Safe Stay.
            <br />
            Best Price. Delicious Food.
            <br />
            All at House499.
          </p>
          <div className="mt-4 flex gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-soft transition-colors hover:bg-gold/20">
              <Facebook className="h-4 w-4 text-gold" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-soft transition-colors hover:bg-gold/20">
              <Instagram className="h-4 w-4 text-gold" />
            </span>
            <a
              href={`https://wa.me/91${contact.phone}?text=${encodeURIComponent("Hello House499! I want to book a room.")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-soft transition-colors hover:bg-gold/20"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm uppercase tracking-widest text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="inline-flex min-h-9 items-center transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
            <li>
              <a
                href={`tel:${contact.phone}`}
                className="flex min-h-9 items-start gap-2 transition-colors hover:text-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0 break-words">{contact.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.altPhone}`}
                className="flex min-h-9 items-start gap-2 transition-colors hover:text-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0 break-words">{contact.altPhone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-9 items-start gap-2 transition-colors hover:text-gold"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0 break-all">{contact.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="min-w-0 break-words">{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 px-4 py-4 text-center text-xs leading-relaxed text-navy-foreground/60">
        © 2026 House499. All Rights Reserved.
      </div>
    </footer>
  );
}
