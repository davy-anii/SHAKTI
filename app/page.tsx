"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, AlertCircle, MapPin, Phone, Users, Heart, Star, ArrowRight, Zap, Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted || isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-60 pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/30 hover-lift animate-float">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Empowering Women Safety with Advanced Technology</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
              <span className="gradient-text text-shadow animate-float">Shakti Smart</span>
              <br />
              <span className="text-foreground text-shadow">Safety Ecosystem</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              A revolutionary IoT-based women protection ecosystem with <span className="text-primary font-semibold">SOS alerts</span>, <span className="text-primary font-semibold">live GPS tracking</span>, 
              and <span className="text-primary font-semibold">instant emergency notifications</span> to keep you safe, always.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-primary hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-spring text-lg px-10 py-7 text-white font-semibold rounded-2xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 hover:bg-primary/10 hover:border-primary transition-spring rounded-2xl font-semibold">
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Hero Visual */}
            <div className="relative mt-20">
              <div className="glass rounded-3xl p-10 max-w-5xl mx-auto border-2 border-primary/30 hover-lift premium-card shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center space-y-3 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center mx-auto transition-spring group-hover:scale-110 group-hover:shadow-lg">
                      <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 animate-pulse-soft" />
                      <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl group-hover:bg-red-500/30 transition-smooth" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-smooth">SOS Alert</p>
                  </div>
                  <div className="text-center space-y-3 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto transition-spring group-hover:scale-110 group-hover:shadow-lg">
                      <MapPin className="h-10 w-10 text-primary" />
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl group-hover:bg-primary/30 transition-smooth" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-smooth">GPS Tracking</p>
                  </div>
                  <div className="text-center space-y-3 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto transition-spring group-hover:scale-110 group-hover:shadow-lg">
                      <Phone className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl group-hover:bg-blue-500/30 transition-smooth" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-smooth">Auto Call</p>
                  </div>
                  <div className="text-center space-y-3 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto transition-spring group-hover:scale-110 group-hover:shadow-lg">
                      <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                      <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-2xl group-hover:bg-purple-500/30 transition-smooth" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-smooth">Guardian App</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10 rounded-full scale-150" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-50" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm font-semibold text-primary">POWERFUL FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text text-shadow">Advanced Technology</span> for Your Safety
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Cutting-edge features designed to protect and empower women in any situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={AlertCircle}
              title="SOS Button Alert"
              description="One-press emergency alert system that instantly notifies your guardians and authorities."
              gradient="from-red-500/20 to-pink-500/20"
            />
            <FeatureCard
              icon={MapPin}
              title="Live GPS Tracking"
              description="Real-time location tracking with GSM/GPS module for precise location sharing."
              gradient="from-primary/20 to-accent/20"
            />
            <FeatureCard
              icon={Phone}
              title="Emergency SMS/Call"
              description="Automatic SMS and voice calls to pre-configured emergency contacts with location details."
              gradient="from-purple-500/20 to-pink-500/20"
            />
            <FeatureCard
              icon={Users}
              title="Guardian Dashboard"
              description="Dedicated app for guardians to monitor location, receive alerts, and respond quickly."
              gradient="from-pink-500/20 to-rose-500/20"
            />
            <FeatureCard
              icon={Bell}
              title="Smart Notifications"
              description="Intelligent alert system with priority notifications and sound alerts."
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={Lock}
              title="Secure & Private"
              description="End-to-end encryption and secure data handling to protect your privacy."
              gradient="from-indigo-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={Zap}
              title="Battery Backup"
              description="Long-lasting battery with power-saving mode for extended protection."
              gradient="from-yellow-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={Shield}
              title="24/7 Protection"
              description="Round-the-clock monitoring and instant response system for complete peace of mind."
              gradient="from-green-500/20 to-emerald-500/20"
            />
          </div>
        </div>
      </section>

      {/* Impact & Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Making a <span className="gradient-text">Real Impact</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by thousands of women across the country
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center space-y-3 p-8 rounded-2xl glass border border-primary/20 hover-lift premium-card">
              <div className="text-5xl md:text-6xl font-bold gradient-text text-shadow">10,000+</div>
              <p className="text-muted-foreground font-medium">Active Users</p>
            </div>
            <div className="text-center space-y-3 p-8 rounded-2xl glass border border-primary/20 hover-lift premium-card">
              <div className="text-5xl md:text-6xl font-bold gradient-text text-shadow">99.9%</div>
              <p className="text-muted-foreground font-medium">Alert Success Rate</p>
            </div>
            <div className="text-center space-y-3 p-8 rounded-2xl glass border border-primary/20 hover-lift premium-card">
              <div className="text-5xl md:text-6xl font-bold gradient-text text-shadow">&lt;30s</div>
              <p className="text-muted-foreground font-medium">Average Response Time</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "College Student",
                content: "Shakti has given me the confidence to travel alone. My parents feel secure knowing they can track my location anytime.",
                rating: 5,
              },
              {
                name: "Anita Desai",
                role: "Working Professional",
                content: "The SOS feature is incredibly fast and reliable. It's like having a guardian angel with me 24/7.",
                rating: 5,
              },
              {
                name: "Meera Patel",
                role: "Teacher",
                content: "Easy to use and very effective. The guardian app helps my family stay connected and feel assured about my safety.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="glass border-primary/20 hover-lift premium-card shadow-lg">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-base">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="glass rounded-3xl p-10 md:p-16 text-center space-y-8 border-2 border-primary/30 hover-lift premium-card shadow-2xl">
            <div className="relative inline-block">
              <Heart className="h-20 w-20 text-primary mx-auto animate-pulse-soft" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Experience <span className="gradient-text text-shadow">True Safety</span>?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join thousands of women who trust Shakti for their safety. Get started today and experience peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-primary hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-spring text-lg px-10 py-7 text-white font-semibold rounded-2xl">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 hover:bg-primary/10 hover:border-primary transition-spring rounded-2xl font-semibold">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
