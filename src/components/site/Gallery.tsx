import { Camera } from "lucide-react";
import bathroom from "@/assets/gallery-bathroom.jpg";
import lobby from "@/assets/gallery-lobby.jpg";
import food from "@/assets/gallery-food.jpg";
import exterior from "@/assets/gallery-exterior.jpg";
import heroRoom from "@/assets/hero-room.jpg";
import premium from "@/assets/room-premium.jpg";
import { Reveal } from "@/components/site/Reveal";

const tiles = [
  { src: premium, alt: "Premium AC room with a comfortable bed", label: "Premium Room", span: "sm:col-span-2 sm:row-span-2" },
  { src: bathroom, alt: "Clean modern bathroom with shower", label: "Spotless Bathrooms", span: "" },
  { src: lobby, alt: "Warm and welcoming reception lobby", label: "Reception & Lounge", span: "" },
  { src: food, alt: "Fresh thali served on a compartment tray", label: "Fresh Thali Meals", span: "" },
  { src: exterior, alt: "House499 guesthouse exterior in warm evening light", label: "Our Property", span: "" },
  { src: heroRoom, alt: "Cozy hotel room with warm lighting", label: "Comfortable Rooms", span: "" },
];

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <h2 className="section-title text-center">A Look Inside House499</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Clean rooms, hygienic spaces and a warm welcome
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-4 sm:grid-rows-3">
        {tiles.map((t, i) => (
          <Reveal key={t.label} delay={i * 70} className={t.span}>
            <figure className="group relative h-full min-h-40 overflow-hidden rounded-lg">
              <img
                src={t.src}
                alt={t.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-navy/90 to-transparent px-3 pb-2 pt-8 text-xs font-bold uppercase tracking-wide text-navy-foreground">
                <Camera className="h-3.5 w-3.5 text-gold" />
                {t.label}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
