import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OfflineBanner from "@/components/OfflineBanner";
import InstallBanner from "@/components/InstallBanner";
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
    default: "VibeCheckr — AI Vibe Check, Photo Analysis, Roast & Personality Test",
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
    title: "VibeCheckr — AI Vibe Check, Photo Analysis, Roast & Personality Test",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} style={{ backgroundColor: "#050510" }}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="5WQv53ToxbScdljghDXjmUz50ddX1OcHNDde--iuz0A" />

        {/* Preload critical fonts and images */}
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

        {/* Preconnect to Critical Firebase APIs (Lighthouse Fix: Max 2-3 preconnects) */}
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        
        {/* Sadece DNS-prefetch yap (Network'ü tıkamaz ama DNS'i hazır eder) */}
        <link rel="dns-prefetch" href="https://firebaseinstallations.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://securetoken.googleapis.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onerror = function(msg, url, lineNo, columnNo, error) {
                var d = document.createElement('div');
                d.style.position = 'fixed';
                d.style.top = '0'; d.style.left = '0'; d.style.right = '0';
                d.style.backgroundColor = 'red'; d.style.color = 'white';
                d.style.zIndex = '9999999'; d.style.padding = '10px'; d.style.fontSize = '12px'; d.style.wordWrap = 'break-word';
                d.innerHTML = '<b>JS ERROR:</b> ' + msg + '<br/>' + (error && error.stack ? error.stack : url + ':' + lineNo);
                if (document.body) document.body.appendChild(d);
                else document.addEventListener('DOMContentLoaded', function() { document.body.appendChild(d); });
                return false;
              };
              window.addEventListener('unhandledrejection', function(event) {
                var d = document.createElement('div');
                d.style.position = 'fixed';
                d.style.bottom = '0'; d.style.left = '0'; d.style.right = '0';
                d.style.backgroundColor = 'orange'; d.style.color = 'black';
                d.style.zIndex = '9999999'; d.style.padding = '10px'; d.style.fontSize = '12px'; d.style.wordWrap = 'break-word';
                var reason = event.reason;
                d.innerHTML = '<b>PROMISE REJECTION:</b> ' + (reason && reason.message ? reason.message : reason);
                if (document.body) document.body.appendChild(d);
                else document.addEventListener('DOMContentLoaded', function() { document.body.appendChild(d); });
              });
            `,
          }}
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

        <TranslateFix />
        <OfflineBanner />
        <InstallBanner />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
