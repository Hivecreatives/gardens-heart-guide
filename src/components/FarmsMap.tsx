import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { Farm } from "@/data/site";

export default function FarmsMap({ farms }: { farms: Farm[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !ref.current) return;

      if (!mapRef.current) {
        mapRef.current = L.map(ref.current, { scrollWheelZoom: true }).setView([62.5, 16.5], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          maxZoom: 18,
        }).addTo(mapRef.current);
      }
      const map = mapRef.current;
      // clear existing markers
      map.eachLayer((l: any) => { if (l instanceof L.Marker) map.removeLayer(l); });

      const icon = L.divIcon({
        className: "",
        html: '<div style="width:14px;height:14px;border-radius:50%;background:hsl(var(--primary,142 40% 30%));border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const points: [number, number][] = [];
      for (const f of farms) {
        if (!f.lat || !f.lng) continue;
        points.push([f.lat, f.lng]);
        const m = L.marker([f.lat, f.lng], { icon }).addTo(map);
        m.bindPopup(
          `<div style="font-family:inherit;min-width:180px"><strong>${f.name}</strong><br/><span style="color:#666;font-size:12px">${f.category} · ${f.region}</span><br/><a href="/gardar/${f.slug}" style="color:#1a6d3a;text-decoration:underline">Visa producent →</a></div>`
        );
      }
      if (points.length) map.fitBounds(points as any, { padding: [30, 30] });
    })();
    return () => { cancelled = true; };
  }, [farms]);

  return <div ref={ref} className="absolute inset-0" />;
}
