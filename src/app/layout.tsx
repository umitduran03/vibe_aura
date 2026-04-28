import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import OfflineBanner from "@/components/OfflineBanner";
import TranslateFix from "@/components/TranslateFix";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vibe & Aura — Discover Your Aura",
  description:
    "The most savage Gen-Z aura analysis. We analyze your aura based on your zodiac, relationship status, and hidden details. Are you ready?",
  keywords: ["aura", "zodiac", "analysis", "gen-z", "vibe"],
  openGraph: {
    title: "Vibe & Aura",
    description: "Analyze your aura and face the facts 💜",
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
      <body className="min-h-full bg-background text-foreground antialiased">
        <TranslateFix />
        <OfflineBanner />
        {children}
      </body>
    </html>
  );
}
