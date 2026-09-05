import { MapPin, Navigation } from "lucide-react";
import { attractions, contact } from "@/lib/site-data";
import { Reveal } from "@/components/site/Reveal";

export function LocationMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <h2 className="section-title text-center">Where You'll Stay</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Prime location in Varanasi — everything close by
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="House499 location on Google Maps"
              src="https://www.google.com/maps?q=Varanasi%2C%20Uttar%20Pradesh%2C%20India&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 sm:h-96"
            />
          </div>
        </Reveal>
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {attractions.slice(0, 6).map((a, i) => (
              <Reveal key={a.name} delay={i * 60}>
                <li className="hover-lift h-full rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-bold leading-snug">{a.name}</div>
                    <span className="shrink-0 rounded bg-accent px-2 py-0.5 text-[10px] font-extrabold uppercase text-gold-foreground">
                      {a.distance}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.note}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Varanasi%2C%20Uttar%20Pradesh%2C%20India"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift mt-4 flex items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-navy-foreground"
          >
            <Navigation className="h-4 w-4 text-gold" /> Get Directions
          </a>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-gold" /> {contact.address}
          </p>
        </div>
      </div>
    </section>
  );
}
