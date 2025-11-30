"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

interface LiveLocationMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function LiveLocationMap({ coordinates, zoom = 17 }: LiveLocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    mapInstanceRef.current = L.map(mapContainerRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution,
    }).addTo(mapInstanceRef.current);

    markerRef.current = L.marker([coordinates.lat, coordinates.lng]).addTo(mapInstanceRef.current);
    markerRef.current.bindPopup("Live SOS location").openPopup();

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [coordinates.lat, coordinates.lng, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], zoom);
    if (markerRef.current) {
      markerRef.current.setLatLng([coordinates.lat, coordinates.lng]);
    } else {
      markerRef.current = L.marker([coordinates.lat, coordinates.lng]).addTo(mapInstanceRef.current);
    }
  }, [coordinates.lat, coordinates.lng, zoom]);

  return <div ref={mapContainerRef} className="h-72 w-full rounded-3xl overflow-hidden shadow-inner" />;
}
