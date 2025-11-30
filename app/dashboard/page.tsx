"use client";

import { useState } from "react";
import { AlertCircle, User, Phone, MapPin, Clock, Battery, Signal, Wifi, Bell, Shield, Activity, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/DashboardCard";
import { Separator } from "@/components/ui/separator";
import LiveLocationMap from "@/components/LiveLocationMap";

const defaultCoordinates = {
  lat: 22.706213,
  lng: 88.394997,
};

export default function Dashboard() {
  const [sosActive, setSosActive] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSOS = () => {
    setSosActive(true);
    setIsLocating(true);
    setLocationError(null);

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        () => {
          setUserLocation(defaultCoordinates);
          setLocationError("Unable to fetch device GPS. Showing last known coordinates.");
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    } else {
      setUserLocation(defaultCoordinates);
      setLocationError("Geolocation not supported on this device. Using default location.");
      setIsLocating(false);
    }

    setTimeout(() => setSosActive(false), 4000);
  };

  const emergencyContacts = [
    { name: "Mom", phone: "+91 98765 43210", relation: "Mother" },
    { name: "Dad", phone: "+91 98765 43211", relation: "Father" },
    { name: "Best Friend", phone: "+91 98765 43212", relation: "Friend" },
  ];

  const activityLog = [
    { action: "Location shared", time: "2 mins ago", status: "success" },
    { action: "SOS test successful", time: "1 hour ago", status: "success" },
    { action: "Battery charging", time: "3 hours ago", status: "info" },
    { action: "Device connected", time: "5 hours ago", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-radial">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome back, <span className="gradient-text text-shadow">Priya</span>
            </h1>
            <p className="text-muted-foreground text-lg">Monitor your safety status and manage your profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <DashboardCard title="Your Profile" icon={User}>
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-primary/30 shadow-lg">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold text-2xl">PS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-4 border-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1">Priya Sharma</h3>
                    <p className="text-sm text-muted-foreground mb-1">priya.sharma@email.com</p>
                    <p className="text-sm text-muted-foreground mb-4">+91 98765 43210</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 px-3 py-1">
                        <Shield className="h-3 w-3 mr-1.5" />
                        Protected
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                        Premium User
                      </Badge>
                    </div>
                  </div>
                </div>
              </DashboardCard>

              {/* SOS Button */}
              <DashboardCard title="Emergency SOS" description="Press and hold for 3 seconds to activate" icon={AlertCircle}>
                <div className="text-center space-y-6 py-4">
                  <button
                    onClick={handleSOS}
                    className={`relative w-56 h-56 mx-auto rounded-full transition-all duration-300 shadow-2xl hover-lift ${
                      sosActive
                        ? "bg-red-600 scale-95"
                        : "bg-gradient-primary hover:scale-105 hover:shadow-primary/50"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white">
                        <AlertCircle className="h-20 w-20 mx-auto mb-3" />
                        <p className="text-2xl font-bold tracking-wide">SOS</p>
                        <p className="text-sm font-medium mt-1">{sosActive ? "ALERT SENT!" : "PRESS NOW"}</p>
                      </div>
                    </div>
                    {!sosActive && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-soft" />
                      </>
                    )}
                  </button>
                  {sosActive && (
                    <div className="text-base text-green-600 dark:text-green-400 font-semibold bg-green-500/10 px-6 py-3 rounded-2xl border border-green-500/20">
                      ✓ Emergency contacts notified with your exact location
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Your guardians will be immediately notified with your exact GPS coordinates and live tracking link
                  </p>
                </div>
              </DashboardCard>

              {(isLocating || userLocation) && (
                <DashboardCard title="Live Location" description="Shared instantly with your guardians" icon={MapPin}>
                  {isLocating ? (
                    <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-sm font-medium">Fetching your live coordinates in secure mode…</p>
                    </div>
                  ) : (
                    userLocation && (
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">Latitude: {userLocation.lat.toFixed(6)}</p>
                            <p className="text-sm font-semibold text-foreground">Longitude: {userLocation.lng.toFixed(6)}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">Live</span>
                        </div>
                        <LiveLocationMap coordinates={userLocation} />
                        {locationError && (
                          <p className="text-xs text-amber-600 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-2">
                            {locationError}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </DashboardCard>
              )}

              {/* Device Status */}
              <DashboardCard title="Device Status" description="Real-time hardware monitoring" icon={Activity}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-5 rounded-2xl bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover-lift premium-card">
                    <Battery className="h-10 w-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
                    <p className="text-3xl font-bold gradient-text">87%</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Battery</p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 hover-lift premium-card">
                    <Signal className="h-10 w-10 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold gradient-text">Good</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">GPS Signal</p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover-lift premium-card">
                    <Wifi className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <p className="text-3xl font-bold gradient-text">4G</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">GSM</p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-linear-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 hover-lift premium-card">
                    <MapPin className="h-10 w-10 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                    <p className="text-3xl font-bold gradient-text">Active</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Tracking</p>
                  </div>
                </div>
              </DashboardCard>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Emergency Contacts */}
              <DashboardCard title="Emergency Contacts" description="Quick access" icon={Phone}>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                          <AvatarFallback>{contact.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.relation}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full" asChild>
                  <a href="/contacts">Manage Contacts</a>
                </Button>
              </DashboardCard>

              {/* Activity Timeline */}
              <DashboardCard title="Recent Activity" description="Last 24 hours" icon={Clock}>
                <div className="space-y-4">
                  {activityLog.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success" ? "bg-green-500" :
                        activity.status === "info" ? "bg-blue-500" : "bg-gray-400"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Quick Actions */}
              <DashboardCard title="Quick Actions" icon={Bell}>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/guardian">
                      <Users className="h-4 w-4 mr-2" />
                      View Guardian Dashboard
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Share Live Location
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Safety Tips
                  </Button>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
