import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { PropertyRow } from "@/lib/properties.functions";

declare global {
  interface Window {
    initPropertiesMap?: () => void;
    google?: typeof google;
  }
}

function formatPrice(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n}`;
}

function makePriceIcon(price: number) {
  const text = formatPrice(price);
  const width = Math.max(48, text.length * 9 + 18);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28"><rect x="1" y="1" width="${width - 2}" height="26" rx="13" fill="#0f172a" stroke="#fbbf24" stroke-width="1.5"/><text x="50%" y="50%" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function PropertiesMap({ properties }: { properties: PropertyRow[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  const items = properties.filter((p) => p.latitude && p.longitude && !p.coming_soon);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.google?.maps) {
      setReady(true);
      return;
    }

    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
    if (!key) {
      console.error("Google Maps browser key is missing");
      return;
    }

    window.initPropertiesMap = () => setReady(true);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initPropertiesMap${channel ? `&channel=${channel}` : ""}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.initPropertiesMap;
    };
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current || !window.google?.maps || items.length === 0) return;

    const first = items[0]!;
    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(containerRef.current, {
        center: { lat: first.latitude!, lng: first.longitude! },
        zoom: 5,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
      });
    }

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();

    items.forEach((p) => {
      const position = { lat: p.latitude!, lng: p.longitude! };
      const marker = new google.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          url: makePriceIcon(p.from_price),
          anchor: new google.maps.Point(Math.round(Math.max(48, formatPrice(p.from_price).length * 9 + 18) / 2), 14),
        },
        title: p.name,
      });

      marker.addListener("click", () => {
        navigate({ to: "/properties/$slug", params: { slug: p.slug } });
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
    }
  }, [ready, items, navigate]);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No properties have map coordinates yet. Add latitude/longitude in the admin panel.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
      <div ref={containerRef} className="h-80 w-full sm:h-[28rem]" />
    </div>
  );
}
