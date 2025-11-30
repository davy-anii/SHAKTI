import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shakti Smart Safety - IoT-based Women Protection System",
  description: "Revolutionary IoT-based women protection ecosystem with SOS alerts, live GPS tracking, and instant emergency notifications. Empowering women safety with advanced technology.",
  keywords: ["women safety", "IoT safety", "GPS tracking", "emergency alert", "guardian app", "women protection"],
  authors: [{ name: "Shakti Team" }],
  creator: "Shakti Smart Safety",
  openGraph: {
    title: "Shakti Smart Safety - Empowering Women with Technology",
    description: "Revolutionary IoT-based women protection ecosystem with SOS alerts and live GPS tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
