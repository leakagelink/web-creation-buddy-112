import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { contact } from "@/lib/site-data";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Rooms", to: "/rooms" },
      { label: "Amenities", to: "/amenities" },
      { label: "Thali Menu", to: "/thali-menu" },
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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
            Clean Rooms. Safe Stay.
            <br />
            Best Price. Delicious Food.
            <br />
            All at House499.
          </p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-soft"
              >
                <Icon className="h-4 w-4 text-gold" />
              </span>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm uppercase tracking-widest text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-gold">
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
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" /> {contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" /> {contact.altPhone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" /> {contact.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" /> {contact.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-4 text-center text-xs text-navy-foreground/60">
        © 2026 House499. All Rights Reserved.
      </div>
    </footer>
  );
}
