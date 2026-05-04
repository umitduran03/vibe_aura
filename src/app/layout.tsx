import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OfflineBanner from "@/components/OfflineBanner";
import TranslateFix from "@/components/TranslateFix";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe & Aura — AI Personality Entertainment",
  description:
    "The most savage Gen-Z AI personality quiz. Get your vibe analyzed based on your zodiac, relationship status, and hidden details. For entertainment only — are you ready?",
  keywords: ["personality quiz", "zodiac", "entertainment", "gen-z", "vibe", "AI analysis"],
  openGraph: {
    title: "Vibe & Aura",
    description: "Get your vibe analyzed by AI and face the facts 💜 Entertainment app.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* Preconnect to Firebase & Google APIs — reduces DNS+TLS latency */}
        <link rel="preconnect" href="https://firebaseinstallations.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://apis.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://securetoken.googleapis.com" crossOrigin="anonymous" />
        {/* DNS-prefetch as fallback for browsers that don't support preconnect */}
        <link rel="dns-prefetch" href="https://firebaseinstallations.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased">
        <TranslateFix />
        <OfflineBanner />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
