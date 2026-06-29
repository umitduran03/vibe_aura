import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Image from "next/image";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OfflineBanner from "@/components/OfflineBanner";
import InstallBanner from "@/components/InstallBanner";
import TranslateFix from "@/components/TranslateFix";
import GlobalLoaderRemover from "@/components/GlobalLoaderRemover";
import PushNotificationManager from '@/components/PushNotificationManager';
import DesktopAdBanner from "@/components/DesktopAdBanner";
import StickyAdBanner from "@/components/StickyAdBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thevibecheckr.com"),
  title: {
    default: "VibeCheckr — AI Vibe Check, Photo Analysis, Roast & Personality Test",
    template: "%s | VibeCheckr",
  },
  description:
    "Free AI-powered vibe check & photo roast app for Gen-Z. Upload your selfie, get brutally honest personality analysis, savage roasts, zodiac-based compatibility checks, and shareable result cards. Try the viral AI roast trend now!",
  keywords: [
    // Core — High Intent (Search Console Validated)
    "vibe check", "vibe testi", "vibe check ne demek", "vibe checker",
    "AI vibe check", "vibe check test", "vibe check image",
    "AI photo roast", "vibe check app", "roast my selfie",
    "AI personality analysis", "photo analysis AI", "selfie analysis",
    // Gen-Z Terms (Search Console Validated)
    "ick nedir", "ick ne demek", "what is an ick", "ick meaning",
    "delulucheck", "delulu check", "am i delulu", "delulu testi",
    "vibe checker panel", "vibe check image",
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
    title: "VibeCheckr — AI Vibe Check, Photo Analysis, Roast & Personality Test",
    description: "Upload your selfie, get brutally honest AI personality analysis & savage roasts. Zodiac compatibility, duo chemistry checks, and viral shareable result cards. Free & instant!",
    url: "https://thevibecheckr.com",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} style={{ backgroundColor: "#050510" }}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="D41h1N2A_WHp7CwkRMW19KP1XYPFdQ6YdXXH_edJ1xQ" />

        {/* Preload critical fonts and images */}
        {/* JSON-LD Structured Data — WebApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VibeCheckr",
              url: "https://thevibecheckr.com",
              description: "Free AI-powered vibe check & photo roast app. Upload your selfie, get brutally honest personality analysis, savage roasts, and zodiac-based compatibility checks.",
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Web, Android, iOS",
              browserRequirements: "Requires JavaScript",
              softwareVersion: "2.0",
              isAccessibleForFree: true,
              audience: {
                "@type": "Audience",
                audienceType: "Gen-Z, Young Adults, Singles, Couples"
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              creator: {
                "@type": "Organization",
                name: "VibeCheckr",
                url: "https://thevibecheckr.com",
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
              screenshot: "https://thevibecheckr.com/opengraph-image.png",
            }),
          }}
        />

        {/* Preconnect to Critical Firebase APIs (Lighthouse Fix: Max 2-3 preconnects) */}
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        
        {/* Sadece DNS-prefetch yap (Network'ü tıkamaz ama DNS'i hazır eder) */}
        <link rel="dns-prefetch" href="https://firebaseinstallations.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://securetoken.googleapis.com" />

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4394628220494584"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased" style={{ backgroundColor: "#050510" }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.deferredPWAEvent = null;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.deferredPWAEvent = e;
              });
            `,
          }}
        />
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
              filter: drop-shadow(0 0 15px rgba(139,92,246,0.5)); /* Sabit aura glow'u */
            }

            @keyframes pulse-wave {
              0% { transform: scale(0.95); opacity: 0.7; }
              100% { transform: scale(1.02); opacity: 1; }
            }
          `}} />
          
          <Image src="/v-wave.png" alt="Loading Vibe" className="wave-img" width={250} height={176} priority style={{ width: "auto", height: "auto" }} />
        </div>

        <GlobalLoaderRemover />
        <DesktopAdBanner />
        <StickyAdBanner />
        <TranslateFix />
        <OfflineBanner />
        <InstallBanner />
        <PushNotificationManager />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
