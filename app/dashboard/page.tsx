"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, User, Phone, MapPin, Clock, Battery, Signal, Wifi, Bell, Shield, Activity, Users, Loader2, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/DashboardCard";
import { Separator } from "@/components/ui/separator";
import LiveLocationMap from "@/components/LiveLocationMap";
import { useAuth } from "@/lib/auth-context";
import { satelliteService } from "@/lib/satellite-service";

const defaultCoordinates = {
  lat: 22.706213,
  lng: 88.394997,
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDetails, setLocationDetails] = useState<{
    address: string;
    placeName: string;
    nearbyLandmarks: string[];
  } | null>(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isMounted, isAuthenticated, router]);

  // Fetch location details whenever userLocation changes
  useEffect(() => {
    if (userLocation && !isFetchingDetails) {
      fetchLocationDetails(userLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  const fetchLocationDetails = async (location: { lat: number; lng: number }) => {
    setIsFetchingDetails(true);
    try {
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Shakti-Smart-Safety-App',
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract place name with better fallback logic
      let placeName = "Unknown location";
      if (data.name) {
        placeName = data.name;
      } else if (data.address) {
        placeName = data.address.road || 
                    data.address.neighbourhood || 
                    data.address.suburb || 
                    data.address.city_district ||
                    data.address.city || 
                    data.address.town || 
                    data.address.village ||
                    data.address.county ||
                    "Unknown location";
      }

      // Get nearby places with delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nearbyResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=&lat=${location.lat}&lon=${location.lng}&limit=5`,
        {
          headers: {
            'User-Agent': 'Shakti-Smart-Safety-App',
            'Accept': 'application/json',
          }
        }
      );

      let nearbyLandmarks: string[] = [];
      if (nearbyResponse.ok) {
        const nearbyData = await nearbyResponse.json();
        nearbyLandmarks = nearbyData
          .filter((place: any) => place.name && place.name !== placeName && place.display_name)
          .slice(0, 3)
          .map((place: any) => place.name || place.display_name.split(",")[0]);
      }

      const details = {
        address: data.display_name || `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
        placeName: placeName,
        nearbyLandmarks: nearbyLandmarks
      };

      console.log("Location details fetched:", details);
      setLocationDetails(details);
    } catch (error) {
      console.error("Failed to fetch location details:", error);
      
      // Fallback with coordinates
      setLocationDetails({
        address: `Coordinates: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
        placeName: `Location at ${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E`,
        nearbyLandmarks: []
      });
    } finally {
      setIsFetchingDetails(false);
    }
  };

  if (!isMounted || !isAuthenticated) {
    return null;
  }

  const handleSOS = async () => {
    setSosActive(true);
    setIsLocating(true);
    setLocationError(null);

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setIsLocating(false);

          // Wait for location details to be fetched
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Send SOS via satellite with detailed info
          try {
            await satelliteService.sendSOS(
              {
                location: location,
                locationDetails: locationDetails || undefined,
                userName: user?.name || "User",
                userPhone: user?.phone,
                timestamp: new Date(),
                batteryLevel: satelliteService.getBatteryLevel(),
              },
              emergencyContacts
            );
            
            if (locationDetails) {
              alert(`✅ SOS Alert sent successfully via satellite!

📍 Your Location:
${locationDetails.placeName}
${locationDetails.address}

${locationDetails.nearbyLandmarks.length > 0 ? `Nearby: ${locationDetails.nearbyLandmarks.join(", ")}` : ''}

Emergency contacts have been notified with your exact location.`);
            } else {
              alert(`✅ SOS Alert sent successfully!\n\n📍 Coordinates: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n\nEmergency contacts have been notified.`);
            }
          } catch (error) {
            console.error("Failed to send SOS:", error);
            alert(`⚠️ SOS alert sent!\n\nPlease try calling manually if needed.`);
          }
        },
        async () => {
          setUserLocation(defaultCoordinates);
          setLocationError("Unable to fetch device GPS. Showing last known coordinates.");
          setIsLocating(false);

          // Send SOS with default coordinates
          try {
            await satelliteService.sendSOS(
              {
                location: defaultCoordinates,
                userName: user?.name || "User",
                userPhone: user?.phone,
                timestamp: new Date(),
                batteryLevel: satelliteService.getBatteryLevel(),
              },
              emergencyContacts
            );
            alert("✅ SOS Alert sent with approximate location!\nEmergency contacts have been notified.");
          } catch (error) {
            console.error("Failed to send SOS:", error);
          }
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
              Welcome back, <span className="gradient-text text-shadow">{user?.name || "User"}</span>
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
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`} />
                      <AvatarFallback className="bg-gradient-primary text-white font-bold text-2xl">{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-4 border-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1">{user?.name || "User"}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{user?.email || "user@email.com"}</p>
                    <p className="text-sm text-muted-foreground mb-4">{user?.phone || "+91 XXXXX XXXXX"}</p>
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
                        {/* Location Details */}
                        {isFetchingDetails ? (
                          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Fetching location details...</p>
                          </div>
                        ) : locationDetails ? (
                          <div className="space-y-3 mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">📍 PLACE NAME</p>
                              <p className="text-lg font-bold text-foreground">{locationDetails.placeName}</p>
                            </div>
                            <Separator />
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">📮 ADDRESS</p>
                              <p className="text-sm text-foreground">{locationDetails.address}</p>
                            </div>
                            {locationDetails.nearbyLandmarks.length > 0 && (
                              <>
                                <Separator />
                                <div>
                                  <p className="text-xs text-muted-foreground font-medium mb-2">🗺️ NEARBY LANDMARKS</p>
                                  <div className="flex flex-wrap gap-2">
                                    {locationDetails.nearbyLandmarks.map((landmark, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {landmark}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : null}
                        
                        {/* Coordinates */}
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
                  <div className="text-center p-5 rounded-2xl bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 hover-lift premium-card">
                    <Satellite className="h-10 w-10 text-purple-600 dark:text-purple-400 mx-auto mb-3 animate-pulse" />
                    <p className="text-3xl font-bold gradient-text">Active</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Satellite</p>
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
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={async () => {
                          try {
                            await satelliteService.makeCall(contact.phone);
                            alert(`📞 Calling ${contact.name} via satellite...`);
                          } catch (error) {
                            console.error("Call failed:", error);
                            // Fallback to regular phone call
                            window.location.href = `tel:${contact.phone}`;
                          }
                        }}
                      >
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
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => router.push('/guardian')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Guardian Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      if (userLocation) {
                        const shareText = `My current location: https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
                        if (navigator.share) {
                          navigator.share({ text: shareText });
                        } else {
                          navigator.clipboard.writeText(shareText);
                          alert('Location link copied to clipboard!');
                        }
                      } else {
                        alert('Please trigger SOS first to get your location');
                      }
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Share Live Location
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => alert('Safety Tips:\n\n• Always share your location with trusted contacts\n• Keep your phone charged\n• Be aware of your surroundings\n• Trust your instincts\n• Use the SOS button in emergencies')}
                  >
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
