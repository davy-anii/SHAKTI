import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t border-primary/10 mt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-50" />
                <div className="relative bg-gradient-primary p-2 rounded-xl">
                  <Shield className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">Shakti</span>
                <p className="text-xs text-muted-foreground font-medium">Smart Safety</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering women with smart safety solutions. Your protection, our priority.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth border border-transparent hover:border-primary/20"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth border border-transparent hover:border-primary/20"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth border border-transparent hover:border-primary/20"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 gradient-text">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/guardian"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Guardian
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Emergency Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6 gradient-text">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contacts"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth inline-flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-smooth">→</span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 gradient-text">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground group cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-smooth">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <span className="group-hover:text-primary transition-smooth">support@shakti.com</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground group cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-smooth">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Emergency</p>
                  <span className="group-hover:text-primary transition-smooth">+91 100 (24/7)</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground group cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-smooth">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Coverage</p>
                  <span className="group-hover:text-primary transition-smooth">Available Nationwide</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="font-semibold gradient-text">Shakti Smart Safety</span>. All rights reserved. Made with <span className="text-red-500 animate-pulse">♡</span> for women's safety.
          </p>
        </div>
      </div>
    </footer>
  );
}
