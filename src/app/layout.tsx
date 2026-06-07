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
  metadataBase: new URL("https://thevibecheckr.vercel.app"),
  title: {
    default: "VibeCheckr — AI Vibe Check, Photo Roast & Personality Analysis",
    template: "%s | VibeCheckr",
  },
  description:
    "Free AI-powered vibe check & photo roast app for Gen-Z. Upload your selfie, get brutally honest personality analysis, savage roasts, zodiac-based compatibility checks, and shareable result cards. Try the viral AI roast trend now!",
  keywords: [
    // Core — High Intent
    "AI vibe check", "AI photo roast", "vibe check app", "roast my selfie",
    "AI personality analysis", "photo analysis AI", "selfie analysis",
    // Zodiac & Compatibility
    "zodiac personality quiz", "zodiac compatibility check", "AI astrology quiz",
    "zodiac sign analysis", "horoscope personality test",
    // Solo Features
    "AI aura reading", "soulmate profile AI", "brutal AI photo roast",
    // Duo Features
    "duo compatibility test", "AI relationship test", "flirt compatibility AI", 
    "ex relationship analyzer", "BFF roast AI", "platonic compatibility AI",
    // Extras Features
    "toxic ex scanner", "situationship clarifier", "delulu check AI", 
    "rizz architect", "reply guru AI", "mood reset AI", "texting assistant AI",
    // Trending / Gen-Z
    "AI roast me", "AI roast generator", "viral AI photo trend",
    "gen-z personality quiz", "funny AI personality test",
    "brutally honest AI feedback", "savage AI roast",
    // Long-Tail
    "best AI vibe check app 2026", "free AI photo roast online",
    "AI personality quiz with photo", "shareable AI roast cards",
    "energy check AI", "daily vibe AI",
  ],
  alternates: {
    canonical: "https://thevibecheckr.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "VibeCheckr — AI Vibe Check, Photo Roast & Personality Analysis",
    description: "Upload your selfie, get brutally honest AI personality analysis & savage roasts. Zodiac compatibility, duo chemistry checks, and viral shareable result cards. Free & instant!",
    url: "https://thevibecheckr.vercel.app",
    siteName: "VibeCheckr",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "VibeCheckr — AI Vibe Check, Photo Roast & Personality Analysis App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeCheckr — AI Vibe Check & Photo Roast 🔥",
    description: "Upload your selfie. Get roasted by AI. Share the chaos. The viral Gen-Z personality analysis app. 💀✨",
    images: ["/opengraph-image.png"],
    creator: "@vibecheckr",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VibeCheckr",
  },
  other: {
    "application-name": "VibeCheckr",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050510",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} style={{ backgroundColor: "#050510" }}>
      <head>
        {/* Preload critical assets for LCP SEO boost */}
        <link rel="preload" as="image" href="/vibecheckr-logo.png" type="image/png" />
        
        {/* JSON-LD Structured Data — WebApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VibeCheckr",
              url: "https://thevibecheckr.vercel.app",
              description: "Free AI-powered vibe check & photo roast app. Upload your selfie, get brutally honest personality analysis, savage roasts, and zodiac-based compatibility checks.",
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Web, Android, iOS",
              browserRequirements: "Requires JavaScript",
              softwareVersion: "2.0",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              creator: {
                "@type": "Organization",
                name: "VibeCheckr",
                url: "https://thevibecheckr.vercel.app",
              },
              featureList: [
                "AI Photo Personality Analysis",
                "Savage AI Photo Roast",
                "AI Soulmate Finder",
                "Duo Flirt Compatibility Check",
                "Ex Relationship Analyzer",
                "BFF Roast",
                "Platonic Compatibility",
                "Zodiac-Based Daily Vibe",
                "Toxic Ex Scanner",
                "Situationship Clarifier",
                "Delulu Check",
                "Rizz Architect",
                "Reply Guru",
                "Mood Reset",
                "Shareable Result Cards",
              ],
              screenshot: "https://thevibecheckr.vercel.app/opengraph-image.png",
            }),
          }}
        />

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
      <body className="min-h-full bg-background text-foreground antialiased" style={{ backgroundColor: "#050510" }}>
        {/* GLOBAL PRE-LOADER: Orijinal Neon V Wave */}
        <div 
          id="global-loader" 
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "#050510",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.6s ease-out"
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            .wave-img {
              width: 250px; /* Boyutunu buradan ayarlayabiliriz */
              height: auto;
              animation: pulse-wave 1.8s ease-in-out infinite alternate;
              filter: drop-shadow(0 0 15px rgba(139,92,246,0.3)); /* Etrafına hafif bir aura glow'u ekler */
            }

            @keyframes pulse-wave {
              0% { transform: scale(0.95); opacity: 0.7; }
              100% { transform: scale(1.02); opacity: 1; filter: drop-shadow(0 0 25px rgba(236,72,153,0.5)); }
            }
          `}} />
          
          <img src="/v-wave.png" alt="Loading Vibe" className="wave-img" />
        </div>

        <TranslateFix />
        <OfflineBanner />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
