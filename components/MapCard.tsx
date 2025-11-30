"use client";

import { MapPin } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface MapCardProps {
  latitude?: number;
  longitude?: number;
  title?: string;
  description?: string;
}

export default function MapCard({
  latitude = 28.6139,
  longitude = 77.209,
  title = "Live Location",
  description = "Real-time GPS tracking",
}: MapCardProps) {
  return (
    <DashboardCard title={title} description={description} icon={MapPin}>
      <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
        {/* Placeholder Map - Replace with actual map integration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-12 w-12 text-primary mx-auto animate-pulse-soft" />
            <p className="text-sm text-muted-foreground">Map View</p>
            <div className="text-xs space-y-1">
              <p>Lat: {latitude.toFixed(6)}°</p>
              <p>Long: {longitude.toFixed(6)}°</p>
            </div>
          </div>
        </div>
        {/* Gradient overlay for aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      </div>
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Last Updated</span>
        <span className="text-primary font-medium">Just now</span>
      </div>
    </DashboardCard>
  );
}
