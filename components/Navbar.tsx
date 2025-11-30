"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, User, Bell, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const storedUser = localStorage.getItem('shakti_user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setIsAuthenticated(true);
          setUserName(user.name || "User");
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    // Check periodically for auth changes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shakti_user');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full z-50 nav-glass border-b transition-smooth backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-smooth" />
              <div className="relative bg-gradient-primary p-2 rounded-xl">
                <Shield className="h-7 w-7 text-white transition-spring group-hover:scale-110 group-hover:rotate-6" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold gradient-text tracking-tight">Shakti</span>
              <p className="text-xs text-muted-foreground font-medium">Smart Safety</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-foreground/70 hover:text-primary hover:bg-primary/10 transition-smooth font-medium"
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl text-foreground/70 hover:text-primary hover:bg-primary/10 transition-smooth font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/guardian"
                  className="px-4 py-2 rounded-xl text-foreground/70 hover:text-primary hover:bg-primary/10 transition-smooth font-medium"
                >
                  Guardian
                </Link>
                <Link
                  href="/contacts"
                  className="px-4 py-2 rounded-xl text-foreground/70 hover:text-primary hover:bg-primary/10 transition-smooth font-medium"
                >
                  Contacts
                </Link>
              </>
            )}
            <div className="flex items-center space-x-3 ml-4">
              {isAuthenticated && (
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-xl transition-smooth">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-primary text-white border-0 text-xs font-bold">
                    3
                  </Badge>
                </Button>
              )}
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-xl hover:bg-primary/10 transition-smooth">
                      <Avatar className="h-11 w-11 border-2 border-primary/30">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                        <AvatarFallback className="bg-gradient-primary text-white font-bold">{userName[0]?.toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 glass border-primary/20" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal py-3">
                      <div className="flex flex-col space-y-2">
                        <p className="text-base font-semibold leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Shakti Protected User
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer py-2.5">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/guardian" className="cursor-pointer py-2.5">
                        Guardian View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/contacts" className="cursor-pointer py-2.5">
                        Emergency Contacts
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive py-2.5">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-xl transition-smooth">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="bg-gradient-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-spring text-white font-semibold px-6 rounded-xl">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 rounded-xl hover:bg-primary/10 transition-smooth"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-2 animate-in slide-in-from-top duration-300">
            <Link
              href="/"
              className="block px-4 py-3 text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-xl transition-smooth font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-xl transition-smooth font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/guardian"
                  className="block px-4 py-3 text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-xl transition-smooth font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Guardian
                </Link>
                <Link
                  href="/contacts"
                  className="block px-4 py-3 text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-xl transition-smooth font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contacts
                </Link>
              </>
            )}
            <div className="pt-4 space-y-3 border-t border-border mt-4">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-4 bg-primary/5 rounded-xl mb-3 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/30">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                        <AvatarFallback className="bg-gradient-primary text-white font-bold">{userName[0]?.toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{userName}</p>
                        <p className="text-xs text-muted-foreground">Shakti Protected User</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-primary/10">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/guardian" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-primary/10">
                      Guardian View
                    </Button>
                  </Link>
                  <Link href="/contacts" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-primary/10">
                      Emergency Contacts
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive rounded-xl hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl hover:bg-primary/10">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
