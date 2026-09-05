import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, Camera, Headphones, KeyRound, Sparkles, Wifi } from "lucide-react";
import { TrustBar } from "@/components/site/TrustBar";
import { Reveal } from "@/components/site/Reveal";

const items = [
  { Icon: Wifi, title: "Free Wi-Fi", sub: "High speed internet in every room." },
  { Icon: Headphones, title: "24x7 Support", sub: "Our team is always here for you." },
  { Icon: BatteryCharging, title: "Power Backup", sub: "Uninterrupted comfort, day and night." },
  { Icon: Sparkles, title: "Daily Housekeeping", sub: "Clean and hygienic rooms, every day." },
  { Icon: Camera, title: "CCTV Security", sub: "Monitored common areas for your safety." },
  { Icon: KeyRound, title: "Easy Check-in", sub: "Hassle free check-in with valid ID." },
];

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities — House499 Varanasi" },
      {
        name: "description",
        content: "Free Wi-Fi, power backup, daily housekeeping, CCTV security and 24x7 support at House499.",
      },
      { property: "og:title", content: "Amenities — House499" },
      { property: "og:description", content: "Everything you need for a clean, safe and comfortable stay." },
    ],
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="section-title text-center">Amenities</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Everything you need for a comfortable stay
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, title, sub }, i) => (
          <Reveal key={title} delay={i * 80} className="h-full">
          <div className="card-surface hover-lift group h-full p-6">
            <Icon className="h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
            <h2 className="mt-4 text-base uppercase">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
          </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-12">
        <TrustBar dark />
      </div>
    </div>
  );
}
