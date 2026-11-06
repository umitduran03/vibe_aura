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
      title: "Yapay Zeka İkili Uyum Testi — 2 Fotoğraftan İlişki Kimyası (Ücretsiz)",
      description:
        "İki fotoğraf yükle → yapay zeka 0–100 çift uyumunuzu, burç kimyanızı, green/red flag'leri ve paylaşılabilir kartınızı anında çıkarsın! Hesapsız & ücretsiz →",
      keywords: [
        "ikili uyum testi",
        "ilişki kimyası",
        "çift uyumu",
        "yapay zeka aşk uyumu",
        "ikili aura eşleşmesi",
        "çift uyum testi yapay zeka",
        "romantik uyum hesaplama",
        "iki kişi aura testi",
        "en iyi arkadaş uyumu",
        "çift kimya analizi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/duo-compatibility`,
        languages: {
          en: `${baseUrl}/en/duo-compatibility`,
          tr: `${baseUrl}/tr/duo-compatibility`,
          "x-default": `${baseUrl}/en/duo-compatibility`,
        },
      },
      openGraph: {
        title: "Yapay Zeka İkili Uyum Testi — Kimyanızı Ölçün | VibeCheckr",
        description:
          "İki fotoğraf yükle → ilişki kimyası, aura uyumu ve romantik potansiyel skorunuz saniyeler içinde gelsin. Ücretsiz & hesapsız!",
        url: `${baseUrl}/tr/duo-compatibility`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "AI Duo Compatibility Test — Free 2-Photo Couple Chemistry Check",
    description:
      "Upload two photos → AI calculates your 0–100% couple chemistry, zodiac match, aura blend & hidden red flags in seconds. Free & no sign-up required →",
    keywords: [
      "duo compatibility",
      "relationship chemistry test",
      "ai couple test",
      "romantic compatibility",
      "duo compatibility AI",
      "best friend aura match",
      "couple compatibility test AI",
      "are we compatible",
      "aura blend test",
      "love chemistry calculator",
      "two photo compatibility test",
    ],
    alternates: {
      canonical: `${baseUrl}/en/duo-compatibility`,
      languages: {
        en: `${baseUrl}/en/duo-compatibility`,
        tr: `${baseUrl}/tr/duo-compatibility`,
        "x-default": `${baseUrl}/en/duo-compatibility`,
      },
    },
    openGraph: {
      title: "AI Duo Compatibility Test — 2-Photo Chemistry Check | VibeCheckr",
      description:
        "Upload two photos & let AI score your relationship chemistry, aura blend & romantic compatibility. Free, instant, no sign-up!",
      url: `${baseUrl}/en/duo-compatibility`,
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
    slug: "duo-compatibility",
    lang,
    name: isTr
      ? "Yapay Zeka İkili Uyum Testi"
      : "AI Duo Compatibility Test",
    breadcrumbName: isTr ? "İkili Uyumluluk" : "Duo Compatibility",
    description: isTr
      ? "İki fotoğraf yükleyerek çift kimyasını, burç uyumunu ve 0–100 ilişki potansiyelini hesaplayan ücretsiz yapay zeka testi."
      : "Free AI couple compatibility platform that analyzes two photos and zodiac signs to calculate 0–100% romantic chemistry and aura harmony.",
    featureList: [
      "Two-Photo AI Chemistry & Aura Match",
      "0–100% Romantic Compatibility Score",
      "Zodiac Sign Synergy & Red Flag Read",
      "Shareable Neon Duo Card",
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
