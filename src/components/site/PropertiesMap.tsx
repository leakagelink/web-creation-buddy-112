import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { PropertyRow } from "@/lib/properties.functions";

declare global {
  interface Window {
    initPropertiesMap?: () => void;
  }
}

function formatPrice(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n}`;
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

    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
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

    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(containerRef.current, {
        center: { lat: items[0].latitude!, lng: items[0].longitude! },
        zoom: 5,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
      });
    }

    // clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();

    items.forEach((p) => {
      const position = { lat: p.latitude!, lng: p.longitude! };
      const marker = new google.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0,
          fillOpacity: 0,
          strokeOpacity: 0,
        },
        label: {
          text: formatPrice(p.from_price),
          color: "#0f172a",
          fontSize: "12px",
          fontWeight: "700",
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
