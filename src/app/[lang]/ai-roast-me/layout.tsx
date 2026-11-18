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
      title: { absolute: "AI Fotoğraf Roast (Beni Göm) — Ücretsiz Selfie Vibe Check Testi" },
      description:
        "Beni göm (AI Roast Me)! Ücretsiz fotoğraf gömmesi ve selfie vibe check testi. Fotoğrafını yükle; acımasız komik roast, ilk izlenim ve 0-100 aura puanı al.",
      keywords: [
        "yapay zeka fotoğraf gömme",
        "fotoğraf yorumlatma ai",
        "fotoğraf puanlama testi",
        "dışarıdan nasıl görünüyorum testi",
        "kaç puanlık biriyim testi",
        "ai roast me türkçe",
        "vibe check fotoğraf",
        "selfie roast",
        "fotoğraftan aura skoru",
        "beni göm yapay zeka",
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
    title: { absolute: "AI Roast Me — Free Selfie Roasts, Photo Vibe Check & Aura Score" },
    description:
      "Get brutal AI selfie roasts and an instant photo vibe check! Upload any picture to AI Roast Me for a savage comedy roast, red flag scan, and 0-100 aura score.",
    keywords: [
      "ai roast me",
      "selfie roasts",
      "vibe check image",
      "photo vibe check",
      "ai photo roast",
      "rate my selfie ai",
      "rate me 1-10 ai",
      "selfie roast ai",
      "aura score from photo",
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
    featureList: isTr
      ? [
          "Anında 0–100 Selfie Aura Skoru",
          "Acımasız Yapay Zeka Fotoğraf Gömmesi (AI Roast)",
          "Vibe Arketipi & İlk İzlenim Analizi",
          "Paylaşılabilir Story Sonuç Kartı",
          "Tek Tıkla Misafir Modu (Kayıt Gerektirmez)",
        ]
      : [
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
