import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site-data";
import { Reveal } from "@/components/site/Reveal";

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h2 className="section-title text-center">Frequently Asked Questions</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Sab kuch jo aap jaanna chahte hain
      </p>
      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="group rounded-lg border border-border bg-card open:border-gold/50">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
