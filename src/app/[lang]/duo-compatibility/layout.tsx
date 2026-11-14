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
      title: { absolute: "Çift & Sevgili Uyum Testi — 2 Fotoğraftan İlişki Kimyası (YZ)" },
      description:
        "Sevgilinle veya flörtünle ne kadar uyumlusunuz? Ücretsiz 2 fotoğraftan çift uyum testi, sevgili uyumu ve burç kimyası analizi. Hesapsız anında sonuç al.",
      keywords: [
        "çift uyum testi",
        "sevgili uyum testi",
        "bizden olur mu testi",
        "iki fotoğraf uyum testi",
        "ikili uyum testi",
        "ilişki kimyası",
        "çift uyumu",
        "yapay zeka aşk uyumu",
        "romantik uyum hesaplama",
        "iki kişi aura testi",
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
    title: { absolute: "AI Couple & Duo Compatibility Test — 2-Photo Relationship Check" },
    description:
      "Are you two actually compatible? Upload two photos for a free AI couple & duo compatibility test! Check relationship chemistry, zodiac match, and vibe scores.",
    keywords: [
      "couple compatibility test",
      "duo compatibility",
      "are we compatible quiz",
      "relationship chemistry test",
      "ai couple test",
      "romantic compatibility",
      "duo compatibility AI",
      "couple compatibility test AI",
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
