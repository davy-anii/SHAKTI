"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone, MessageSquare, Bell, Clock, Navigation, AlertCircle, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/DashboardCard";
import MapCard from "@/components/MapCard";
import NotificationBadge from "@/components/NotificationBadge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { satelliteService } from "@/lib/satellite-service";

export default function GuardianDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [location, setLocation] = useState({ latitude: 28.6139, longitude: 77.2090 });
  const [address, setAddress] = useState("Detecting location...");
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isMounted, isAuthenticated, router]);

  // Get user's live location
  useEffect(() => {
    if (isMounted && isAuthenticated) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            
            // Reverse geocode to get address
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              setAddress(data.display_name || "Address not available");
            } catch (error) {
              setAddress(`${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`);
            }
          },
          (error) => {
            setLocationError(error.message);
            setAddress("Location permission denied");
          }
        );

        // Update location every 10 seconds
        const intervalId = setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (error) => {
              console.error("Location update error:", error);
            }
          );
        }, 10000);

        return () => clearInterval(intervalId);
      } else {
        setLocationError("Geolocation not supported");
        setAddress("Geolocation not supported by your browser");
      }
    }
  }, [isMounted, isAuthenticated]);

  if (!isMounted || !isAuthenticated) {
    return null;
  }
  
  const notifications = [
    { type: "alert", message: `SOS Alert from ${user?.name || 'User'}`, time: "2 mins ago", priority: "high" },
    { type: "location", message: "Location shared", time: "15 mins ago", priority: "medium" },
    { type: "battery", message: "Low battery warning", time: "1 hour ago", priority: "low" },
  ];

  const movementHistory = [
    { location: "Home - Sector 21, Delhi", time: "8:00 AM", status: "Safe Zone" },
    { location: "College - Dwarka, Delhi", time: "9:30 AM", status: "Safe Zone" },
    { location: "Central Mall, Connaught Place", time: "2:15 PM", status: "Public Area" },
    { location: "Moving towards home", time: "5:45 PM", status: "In Transit" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Guardian <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">Monitor and protect your loved ones in real-time</p>
            </div>
            <div className="flex gap-2">
              <NotificationBadge icon={Bell} text="3 Alerts" variant="destructive" />
              <NotificationBadge icon={MapPin} text="Tracking Active" variant="default" className="bg-green-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Map and Location */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Map */}
              <MapCard
                latitude={location.latitude}
                longitude={location.longitude}
                title="Live Location Tracking"
                description="Real-time GPS position"
              />

              {/* Location Details */}
              <DashboardCard title="Location Details" icon={Navigation}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Latitude:</span>
                      <span className="text-muted-foreground">{location.latitude.toFixed(4)}°</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Longitude:</span>
                      <span className="text-muted-foreground">{location.longitude.toFixed(4)}°</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="h-4 w-4 text-primary" />
                      <span className="font-medium">Speed:</span>
                      <span className="text-muted-foreground">12 km/h</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">Last Update:</span>
                      <span className="text-muted-foreground">Just now</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Battery className="h-4 w-4 text-primary" />
                      <span className="font-medium">Battery:</span>
                      <span className="text-muted-foreground">87%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Accuracy:</span>
                      <span className="text-muted-foreground">±5 meters</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-1">Current Address</p>
                  <p className="text-xs text-muted-foreground">
                    {address}
                  </p>
                  {locationError && (
                    <p className="text-xs text-red-500 mt-1">Error: {locationError}</p>
                  )}
                </div>
              </DashboardCard>

              {/* Quick Actions */}
              <DashboardCard title="Quick Actions" description="Emergency response options">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    className="bg-linear-to-r from-green-500 to-green-600 hover:opacity-90"
                    onClick={async () => {
                      try {
                        await satelliteService.makeCall(user?.phone || '+919876543210');
                        alert('📞 Calling via satellite...');
                      } catch (error) {
                        window.location.href = `tel:${user?.phone || '+919876543210'}`;
                      }
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    className="bg-linear-to-r from-blue-500 to-blue-600 hover:opacity-90"
                    onClick={async () => {
                      try {
                        await satelliteService.sendSMS(user?.phone || '+919876543210', 'Please check in. We want to make sure you are safe.');
                        alert('📱 Message sent via satellite!');
                      } catch (error) {
                        window.location.href = `sms:${user?.phone || '+919876543210'}`;
                      }
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => alert('Check-in request sent! The protected user will be notified.')}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Request Check-in
                  </Button>
                </div>
              </DashboardCard>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Emergency Notifications */}
              <DashboardCard title="Emergency Alerts" description="Recent notifications" icon={Bell}>
                <div className="space-y-3">
                  {notifications.map((notif, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        notif.priority === "high"
                          ? "bg-red-500/10 border-red-500/20"
                          : notif.priority === "medium"
                          ? "bg-yellow-500/10 border-yellow-500/20"
                          : "bg-blue-500/10 border-blue-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          className={`h-4 w-4 mt-0.5 ${
                            notif.priority === "high"
                              ? "text-red-500"
                              : notif.priority === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full text-sm">
                  View All Notifications
                </Button>
              </DashboardCard>

              {/* Movement History */}
              <DashboardCard title="Movement Timeline" description="Today's journey" icon={Clock}>
                <div className="space-y-4">
                  {movementHistory.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                          <Badge variant="outline" className="text-xs">
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* User Info */}
              <DashboardCard title="Protected User" description={user?.name || 'User'}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{user?.phone || 'Not available'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Delhi, India</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex gap-2">
                    <Badge className="bg-green-500">
                      Online
                    </Badge>
                    <Badge variant="outline">
                      Device Active
                    </Badge>
                  </div>
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
