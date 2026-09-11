import { Quote, Star } from "lucide-react";
import { useReviews } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";

export function Reviews() {
  const reviews = useReviews();
  return (
    <section className="bg-navy py-10 text-navy-foreground sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="section-title text-center">What Our Guests Say</h2>
        <p className="mt-1 text-center text-sm text-navy-foreground/70">
          Real reviews from real stays at House499
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80} className="h-full">
              <figure className="hover-lift flex h-full flex-col rounded-lg border border-gold/25 bg-navy-soft p-5">
                <Quote className="h-6 w-6 text-gold/60" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy-foreground/85">
                  {r.text}
                </blockquote>
                <figcaption className="mt-4 border-t border-navy-foreground/10 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold">{r.name}</div>
                      <div className="text-[11px] text-navy-foreground/60">
                        {r.city} · {r.stay}
                      </div>
                    </div>
                    <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`h-3.5 w-3.5 ${s < r.rating ? "fill-gold text-gold" : "text-navy-foreground/25"}`}
                        />
                      ))}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
