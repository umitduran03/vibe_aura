import type { Metadata } from "next";
import { buildToolJsonLd } from "@/lib/seo-schema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  if (isTr) {
    return {
      title: { absolute: "AI Fotoğraf Gömmesi & Selfie Vibe Check (Ücretsiz & Hesapsız)" },
      description:
        "Selfie yükle → 0–100 Aura Skoru, gizli red flag'lerin ve acımasız AI fotoğraf roast kartın 3 saniyede hazır! Ücretsiz, kayıt gerektirmez → Hemen dene!",
      keywords: [
        "yapay zeka fotoğraf gömme",
        "ai roast me türkçe",
        "vibe check uygulaması",
        "aura analizi yapay zeka",
        "selfie roast",
        "fotoğraftan aura skoru",
        "ai fotoğraf analizi",
        "vibe check fotoğraf",
        "yapay zeka aura testi",
        "en dürüst ai uygulaması",
        "beni göm yapay zeka",
        "ücretsiz selfie testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/ai-roast-me`,
        languages: {
          en: `${baseUrl}/en/ai-roast-me`,
          tr: `${baseUrl}/tr/ai-roast-me`,
          "x-default": `${baseUrl}/en/ai-roast-me`,
        },
      },
      openGraph: {
        title: "AI Fotoğraf Gömmesi & Selfie Vibe Check | VibeCheckr",
        description:
          "Selfie yükle → 0–100 Aura Skoru ve acımasız yapay zeka fotoğraf roast analizi saniyeler içinde gelsin. Ücretsiz & hesapsız!",
        url: `${baseUrl}/tr/ai-roast-me`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "AI Roast Me — Free Selfie Roast & 0–100 Aura Score (No Sign-Up)" },
    description:
      "Upload a selfie and get roasted by AI in 3 seconds: 0–100 Aura Score, Vibe Archetype, hidden red flags & shareable roast card. 100% free, no account needed →",
    keywords: [
      "ai roast me",
      "vibe check app",
      "ai photo roast",
      "aura analysis",
      "selfie roast ai",
      "photo vibe check",
      "aura score from photo",
      "brutal ai roast",
      "ai selfie analyzer",
      "vibe check photo analysis",
      "free ai roast generator",
      "roast my picture ai",
    ],
    alternates: {
      canonical: `${baseUrl}/en/ai-roast-me`,
      languages: {
        en: `${baseUrl}/en/ai-roast-me`,
        tr: `${baseUrl}/tr/ai-roast-me`,
        "x-default": `${baseUrl}/en/ai-roast-me`,
      },
    },
    openGraph: {
      title: "AI Roast Me — Free Selfie Roast & 0–100 Aura Score | VibeCheckr",
      description:
        "Drop your selfie → get a brutal AI photo roast, 0–100 aura score, and shareable neon result card instantly. Free & no sign-up!",
      url: `${baseUrl}/en/ai-roast-me`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  const isTr = lang === "tr";
  const jsonLd = buildToolJsonLd({
    slug: "ai-roast-me",
    lang,
    name: isTr
      ? "Yapay Zeka Fotoğraf Gömmesi & Vibe Check"
      : "AI Roast Me & Photo Vibe Check",
    breadcrumbName: isTr ? "AI Fotoğraf Gömmesi" : "AI Roast Me",
    description: isTr
      ? "Selfie fotoğrafından 0–100 aura skoru, kişilik arketipi ve acımasız fotoğraf gömmesi üreten ücretsiz yapay zeka aracı."
      : "Free AI selfie roast and vibe check tool that calculates a 0–100 aura score, personality archetype, and savage first-impression roast.",
    featureList: [
      "Instant 0–100 Selfie Aura Score",
      "Brutal AI Photo Roast",
      "Vibe Archetype & First Impression Read",
      "Shareable Story Result Card",
      "1-Click Guest Mode (No Sign-Up Required)",
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
