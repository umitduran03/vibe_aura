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
      title: { absolute: "Aura Savaşı & Aura Hesaplama — Kim Daha Cool? 1v1 Fotoğraf Testi" },
      description:
        "Kimin aurası daha yüksek? Ücretsiz 1v1 Aura Savaşı (Aura Battle) ve fotoğraftan aura hesaplama testi! 2 fotoğraf yükle, yapay zeka kazananı 0-100 seçsin.",
      keywords: [
        "aura savaşı",
        "aura hesaplama",
        "kimin aurası daha yüksek",
        "kim daha cool testi",
        "iki fotoğraf karşılaştırma",
        "hangimiz daha yakışıklı testi",
        "vibe savaşı",
        "kim daha havalı testi",
        "aura puanı karşılaştırma",
        "aura battle yapay zeka",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/aura-battle`,
        languages: {
          en: `${baseUrl}/en/aura-battle`,
          tr: `${baseUrl}/tr/aura-battle`,
          "x-default": `${baseUrl}/en/aura-battle`,
        },
      },
      openGraph: {
        title: "Aura Savaşı — Kim Daha Cool? 1v1 YZ Aura Puanı | VibeCheckr",
        description:
          "İki fotoğraf yükle → yapay zeka ikinizin ayrı ayrı vibe skorunu hesaplasın ve kazananı seçsin! Ücretsiz & hesapsız.",
        url: `${baseUrl}/tr/aura-battle`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Aura Battle AI & Aura Points Calculator — 1v1 Photo Vibe Test" },
    description:
      "Who has more aura? Upload two photos to the free 1v1 AI Aura Battle & aura points calculator! Compare main character energy and settle who wins the mog battle.",
    keywords: [
      "aura battle",
      "aura points calculator",
      "who has more aura",
      "who mogs who photo test",
      "1v1 photo comparison ai",
      "aura battle who is cooler",
      "aura score battle",
      "friend aura comparison ai",
      "aura points test",
      "compare two photos aura ai",
    ],
    alternates: {
      canonical: `${baseUrl}/en/aura-battle`,
      languages: {
        en: `${baseUrl}/en/aura-battle`,
        tr: `${baseUrl}/tr/aura-battle`,
        "x-default": `${baseUrl}/en/aura-battle`,
      },
    },
    openGraph: {
      title: "Aura Battle AI — Who Has More Aura? (1v1 Score) | VibeCheckr",
      description:
        "Upload 2 photos → get individual 0–100 Aura Scores, crown the winner, and end the group chat debate. 100% free & instant!",
      url: `${baseUrl}/en/aura-battle`,
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
    slug: "aura-battle",
    lang,
    name: isTr ? "Aura Savaşı YZ — Kim Daha Cool?" : "Aura Battle AI — Who Has More Aura?",
    breadcrumbName: isTr ? "Aura Savaşı" : "Aura Battle",
    description: isTr
      ? "İki fotoğrafı karşılaştırarak Kişi 1 ve Kişi 2 için ayrı ayrı 0–100 Aura Puanı hesaplayan ve kazananı belirleyen ücretsiz yapay zeka aracı."
      : "Head-to-head AI photo comparison tool that calculates separate 0–100 Aura Scores for Person 1 and Person 2, crowns the winner, and roasts the loser.",
    featureList: isTr
      ? [
          "1v1 İki Fotoğraf Aura Karşılaştırması",
          "1. Kişi ve 2. Kişi İçin Ayrı Ayrı 0–100 Vibe Skoru",
          "Kazanan Tacı ve Kaybeden Roast Yorumu",
          "Paylaşılabilir İkili Skor Tablosu Kartı",
        ]
      : [
          "1v1 Head-to-Head Photo Aura Comparison",
          "Separate 0–100 Vibe Scores for Person 1 & Person 2",
          "Winner Crown & Loser Roast Verdict",
          "Shareable Dual Scoreboard Card",
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
