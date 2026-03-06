'use client';

import { useEffect, useRef } from 'react';

interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  color?: string;
  popup?: string;
  type?: string;
}

interface MapboxMapProps {
  points?: MapPoint[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showRoutes?: boolean;
  routes?: { lat: number; lng: number }[][];
  interactive?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function MapboxMap({
  points = [],
  center = [28.6, 77.2],
  zoom = 5,
  height = '400px',
  showRoutes = false,
  routes = [],
  interactive = true,
  onMapClick,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      const map = L.map(mapContainer.current!, {
        center: center as [number, number],
        zoom,
        zoomControl: interactive,
        dragging: interactive,
        scrollWheelZoom: interactive,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Color mapping
      const colorMap: Record<string, string> = {
        farm: '#10b981',
        collection: '#f59e0b',
        processing: '#3b82f6',
        co2_capture: '#8b5cf6',
        credit_issuance: '#ec4899',
        buyer: '#ef4444',
        default: '#10b981',
      };

      points.forEach((point) => {
        const color = point.color || colorMap[point.type || 'default'] || '#10b981';
        const icon = L.divIcon({
          html: `<div style="
            width: 14px; height: 14px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 12px ${color}80;
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          className: '',
        });

        const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);
        if (point.popup || point.label) {
          marker.bindPopup(`
            <div style="background:#1a2332;color:white;padding:8px 12px;border-radius:8px;border:1px solid ${color}40;min-width:150px;">
              <strong style="color:${color}">${point.label}</strong>
              ${point.popup ? `<br/><span style="color:#9ca3af;font-size:12px">${point.popup}</span>` : ''}
            </div>
          `, { className: 'custom-popup' });
        }
      });

      // Draw routes
      if (showRoutes && routes.length > 0) {
        routes.forEach((route) => {
          const latLngs = route.map(p => [p.lat, p.lng] as [number, number]);
          L.polyline(latLngs, {
            color: '#10b981',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10',
          }).addTo(map);
        });
      }

      if (onMapClick) {
        map.on('click', (e: L.LeafletMouseEvent) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        });
      }

      mapRef.current = map;
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when points change
  useEffect(() => {
    if (!mapRef.current) return;
    // We'll leave this simple - the map initializes once with given points
  }, [points]);

  return (
    <div ref={mapContainer} style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }} />
  );
}
