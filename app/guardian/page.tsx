"use client";

import { MapPin, Phone, MessageSquare, Bell, Clock, Navigation, AlertCircle, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/DashboardCard";
import MapCard from "@/components/MapCard";
import NotificationBadge from "@/components/NotificationBadge";
import { Separator } from "@/components/ui/separator";

export default function GuardianDashboard() {
  const notifications = [
    { type: "alert", message: "SOS Alert from Priya", time: "2 mins ago", priority: "high" },
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
                latitude={28.6139}
                longitude={77.2090}
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
                      <span className="text-muted-foreground">28.6139°</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Longitude:</span>
                      <span className="text-muted-foreground">77.2090°</span>
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
                    Connaught Place, New Delhi, Delhi 110001, India
                  </p>
                </div>
              </DashboardCard>

              {/* Quick Actions */}
              <DashboardCard title="Quick Actions" description="Emergency response options">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button className="bg-linear-to-r from-green-500 to-green-600 hover:opacity-90">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button className="bg-linear-to-r from-blue-500 to-blue-600 hover:opacity-90">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline">
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
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
              <DashboardCard title="Protected User" description="Priya Sharma">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">+91 98765 43210</span>
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
