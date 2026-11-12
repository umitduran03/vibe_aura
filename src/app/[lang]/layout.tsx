import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OfflineBanner from "@/components/OfflineBanner";
import InstallBanner from "@/components/InstallBanner";
import TranslateFix from "@/components/TranslateFix";
import GlobalLoaderRemover from "@/components/GlobalLoaderRemover";
import PushNotificationManager from "@/components/PushNotificationManager";
import AdBannerController from "@/components/AdBannerController";
import LocaleSync from "@/components/LocaleSync";
import { getDictionary, hasLocale, type Locale, SUPPORTED_LOCALES } from "@/lib/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050510",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  const canonicalBase = "https://thevibecheckr.com";
  const isTr = lang === "tr";

  return {
    metadataBase: new URL("https://thevibecheckr.com"),
    title: {
      absolute: dict.seo.title,
      template: "%s | VibeCheckr",
    },
    description: dict.seo.description,
    keywords: isTr
      ? [
          "vibe check",
          "vibe check testi",
          "vibe check ne demek",
          "vibe testi ücretsiz",
          "yapay zeka vibe check",
          "fotoğraftan aura puanı hesaplama",
          "aura skoru testi",
          "yapay zeka fotoğraf analizi",
          "beni göm ai",
          "delulu testi",
          "delulu check türkçe",
          "ikili çift uyum testi fotoğraflı",
          "hoşlandığım kişi benden hoşlanıyor mu testi",
          "platonik aşk testi",
          "arkadaşlık uyum testi",
          "situationship testi",
          "mesaj ekran görüntüsü analizi",
          "toksik eski sevgili testi",
          "vibecheckr",
        ]
      : [
          "vibe check",
          "AI vibe check",
          "vibe check test free",
          "what is a vibe check",
          "free vibe check online",
          "aura score test from photo",
          "what vibe do I give off quiz",
          "AI photo roast",
          "roast my selfie AI",
          "delulu check test",
          "am I delusional quiz",
          "crush compatibility calculator with photos",
          "does my crush like me test",
          "couple compatibility test from 2 photos",
          "best friend compatibility test",
          "situationship clarifier",
          "text screenshot red flag analyzer",
          "rizz AI reply generator",
          "toxic ex scanner",
          "vibecheckr",
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
    alternates: {
      canonical: `${canonicalBase}/${lang}`,
      languages: {
        en: `${canonicalBase}/en`,
        tr: `${canonicalBase}/tr`,
        "x-default": `${canonicalBase}/en`,
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url: `${canonicalBase}/${lang}`,
      siteName: "VibeCheckr",
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      alternateLocale: isTr ? ["en_US"] : ["tr_TR"],
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
      title: dict.seo.title,
      description: dict.seo.description,
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
}

/**
 * Root Locale Layout — Server Component
 * <html lang> is rendered on the server per locale (en / tr), so crawlers
 * receive the correct document language in the initial HTML.
 * LocaleSync (client) writes locale to Zustand so child components get the
 * correct language automatically.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const isTr = lang === "tr";

  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} h-full`} style={{ backgroundColor: "#050510" }}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="D41h1N2A_WHp7CwkRMW19KP1XYPFdQ6YdXXH_edJ1xQ" />

        {/* JSON-LD Structured Data — WebApplication + WebSite + Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "VibeCheckr",
                alternateName: [
                  "TheVibeCheckr",
                  "thevibecheckr.com",
                  "Vibe Checkr",
                  "VibeCheckr AI",
                  ...(isTr ? ["VibeCheckr Türkçe", "Vibe Check Testi"] : ["Vibe Checker AI"]),
                ],
                url: `https://thevibecheckr.com/${lang}`,
                sameAs: [
                  "https://www.producthunt.com/products/vibecheckr",
                ],
                inLanguage: isTr ? "tr-TR" : "en-US",
                description: isTr
                  ? "VibeCheckr (thevibecheckr.com) — Ücretsiz yapay zeka vibe check testi, 0–100 aura skoru, fotoğraf roast, ikili çift/crush uyumu, WhatsApp/DM mesaj red flag analizi ve cevap üretici (Reply Guru). Kayıtsız tek tıkla Misafir Modu ile 5 ücretsiz jeton."
                  : "VibeCheckr (thevibecheckr.com) — Free AI-powered selfie vibe check, 0–100 aura scoring, chat screenshot red flag analyzer, two-photo duo compatibility platform & photo roast app. Instant access with 1-click Guest Mode (5 free tokens, no registration required).",
                applicationCategory: "EntertainmentApplication",
                operatingSystem: "Web, Android, iOS",
                browserRequirements: "Requires JavaScript",
                softwareVersion: "2.0",
                isAccessibleForFree: true,
                audience: {
                  "@type": "Audience",
                  audienceType: isTr
                    ? "Gen-Z, Genç Yetişkinler, Bekarlar, Çiftler"
                    : "Gen-Z, Young Adults, Singles, Couples",
                },
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  description: isTr
                    ? "Kayıt gerektirmeyen 1-Tıkla Misafir Modu veya Google Girişi ile anında 5 ücretsiz hoş geldin jetonu."
                    : "Free to start with 5 instant welcome tokens via 1-Click Guest Mode (no account required) or Google Sign-In.",
                },
                creator: {
                  "@type": "Organization",
                  name: "VibeCheckr",
                  alternateName: ["TheVibeCheckr", "thevibecheckr.com", "Vibe Checkr"],
                  url: "https://thevibecheckr.com",
                  logo: "https://thevibecheckr.com/v-wave.png",
                  sameAs: [
                    "https://www.producthunt.com/products/vibecheckr",
                  ],
                },
                featureList: isTr
                  ? [
                      "Kayıtsız 1-Tıkla Misafir Modu (5 Ücretsiz Jeton)",
                      "Yapay Zeka Selfie Vibe Check & 0-100 Aura Skoru",
                      "Yapay Zeka Fotoğraf Kişilik Analizi",
                      "Acımasız AI Fotoğraf Roast (Beni Göm)",
                      "WhatsApp & Instagram DM Mesaj Red Flag Analizi",
                      "2 Fotoğraftan İkili Çift & Flört Uyum Testi",
                      "Aura Savaşı (1v1 Kim Daha Cool Testi)",
                      "Tinder, Bumble & Instagram Profil Otopsisi",
                      "Yapay Zeka Ruh Eşi Radarı (Ruh Eşim Kim?)",
                      "Platonik & Crush Uyum Hesaplayıcı",
                      "Eski Sevgili (Ex) Uyum & Dönüş Analizi",
                      "BFF Kanka Uyum Testi",
                      "Toksik Ex Tarayıcı",
                      "Situationship Çözücü (Biz Şimdi Neyiz?)",
                      "Delulu Check Testi",
                      "Reply Guru & Rizz Mesaj Cevap Üretici",
                      "Mood Reset (Eksi Aura Sıfırlayıcı)",
                    ]
                  : [
                      "Instant 1-Click Guest Mode (5 Free Tokens, No Registration Required)",
                      "AI Selfie Vibe Check & 0-100 Aura Score",
                      "AI Photo Personality Analysis",
                      "Savage AI Photo Roast",
                      "Chat Screenshot Red Flag & Mixed Signal Analyzer",
                      "Two-Photo Duo Flirt Compatibility Check",
                      "Aura Battle (Head-to-Head Photo Comparison)",
                      "Tinder, Bumble, Hinge & Instagram Dating Profile Autopsy",
                      "AI Soulmate Finder (Soulmate Radar)",
                      "Crush Calculator",
                      "Ex Relationship & Relapse Analyzer",
                      "BFF Vibe Check & Friendship Compatibility",
                      "Toxic Ex Scanner",
                      "Situationship Clarifier",
                      "Delulu Check",
                      "Rizz Architect & Reply Guru",
                      "Mood Reset",
                      "Shareable Neon Result Cards",
                    ],
                screenshot: "https://thevibecheckr.com/opengraph-image.png",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "VibeCheckr",
                alternateName: ["TheVibeCheckr", "thevibecheckr.com", "Vibe Checkr", "VibeCheckr AI"],
                url: `https://thevibecheckr.com/${lang}`,
                inLanguage: isTr ? "tr-TR" : "en-US",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `https://thevibecheckr.com/${lang}/trends?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
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
        {/* Google AdSense — lazyOnload: Tüm sayfa kaynakları yüklendikten SONRA başlar.
             afterInteractive → lazyOnload geçişi: LCP/FCP etkilenmez, TBT azalır.
             Kullanıcı etkileşimine göre değil, load event'e göre tetiklenir. */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4394628220494584"
          crossOrigin="anonymous"
          strategy="lazyOnload"
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

          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* WebP: ~49 KB | PNG fallback: 73 KB (eski tarayıcılar için) */}
          <picture>
            <source srcSet="/v-wave.webp" type="image/webp" />
            <img src="/v-wave.png" alt="VibeCheckr" className="wave-img" width={250} height={176} />
          </picture>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.replace(/\\/+$/,"");if(p&&p!=="/en"&&p!=="/tr"){var l=document.getElementById("global-loader");if(l)l.style.display="none";}}catch(e){}})();`,
          }}
        />

        <GlobalLoaderRemover />
        <AdBannerController />
        <TranslateFix />
        <OfflineBanner />
        <InstallBanner />
        <PushNotificationManager />
        <LocaleSync lang={lang} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
