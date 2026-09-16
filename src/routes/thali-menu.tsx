import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, QrCode } from "lucide-react";
import thaliImg from "@/assets/thali.jpg";
import { useThalis } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";
import { ThaliOrderDialog } from "@/components/site/ThaliOrderDialog";

export const Route = createFileRoute("/thali-menu")({
  head: () => ({
    meta: [
      { title: "House499 Thali Menu — Fresh Meals from ₹80" },
      {
        name: "description",
        content: "Mini, Normal and Special thali from ₹80. Freshly prepared, hygienic and delivered to your room.",
      },
      { property: "og:title", content: "House499 Thali Menu" },
      { property: "og:description", content: "Fresh, hygienic and pocket friendly thali delivered to your room." },
    ],
  }),
  component: ThaliMenu,
});

function ThaliMenu() {
  const thalis = useThalis();
  return (
    <div className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h1 className="fade-up text-center text-2xl uppercase sm:text-3xl">
          House<span className="text-gold">499</span> Thali Menu
        </h1>
        <p className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-gold-soft">
          Fresh · Hygienic · Pocket Friendly
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {thalis.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} className="h-full">
            <div className="hover-lift group h-full rounded-lg bg-card p-5 text-card-foreground">
              <div className="flex items-center justify-between">
                <h2 className="text-base uppercase">{t.name}</h2>
                {t.badge && (
                  <span className="rounded bg-gold px-2 py-0.5 text-[10px] font-extrabold uppercase text-gold-foreground">
                    {t.badge}
                  </span>
                )}
              </div>
              <div className="font-display text-3xl font-extrabold">₹{t.price}</div>
              <img
                src={thaliImg}
                alt={`${t.name} thali`}
                width={900}
                height={700}
                loading="lazy"
                className="mt-3 h-40 w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {t.items.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
              <ThaliOrderDialog defaultThaliId={t.id}>
                <button className="hover-lift mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp py-2.5 text-xs font-bold uppercase text-navy-foreground">
                  Order Now <MessageCircle className="h-4 w-4" />
                </button>
              </ThaliOrderDialog>
            </div>
            </Reveal>
          ))}

          <Reveal delay={240} className="h-full"><div className="hover-lift h-full rounded-lg border border-gold/40 p-5 text-center">
            <h2 className="text-base uppercase text-gold">Quick Order</h2>
            <p className="mt-2 text-sm text-navy-foreground/75">
              Scan the QR code to view menu and order on WhatsApp
            </p>
            <div className="mx-auto mt-4 flex h-40 w-40 items-center justify-center rounded-md bg-card">
              <QrCode className="h-28 w-28 text-navy" strokeWidth={1.2} />
            </div>
            <ThaliOrderDialog>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp py-2.5 text-xs font-bold uppercase">
                Order Now <MessageCircle className="h-4 w-4" />
              </button>
            </ThaliOrderDialog>
          </div></Reveal>
        </div>
      </div>
    </div>
  );
}
