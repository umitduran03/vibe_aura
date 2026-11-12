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
      title: { absolute: "Aura Savaşı (Aura Battle) — Kim Daha Cool? 1v1 YZ Aura Puanı" },
      description:
        "İki fotoğraf yükle, yapay zeka ikinize ayrı ayrı 0–100 Aura Puanı versin ve kimin kazandığını ilan etsin! Ücretsiz & hesapsız tartışmayı bitir →",
      keywords: [
        "aura savaşı",
        "vibe savaşı",
        "kim daha cool testi",
        "kim daha havalı testi",
        "aura puanı karşılaştırma",
        "aura battle yapay zeka",
        "arkadaş aura testi",
        "aura points testi",
        "iki fotoğraf karşılaştırma ai",
        "1v1 aura testi ücretsiz",
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
    title: { absolute: "Aura Battle AI — Who Has More Aura? Free 1v1 Photo Score" },
    description:
      "Upload two photos → AI scores Person 1 vs Person 2 (0–100 Aura Points), crowns the winner, and roasts the loser. Settle the group chat debate free, no sign-up!",
    keywords: [
      "aura battle",
      "who has more aura",
      "aura battle who is cooler",
      "aura score battle",
      "friend aura comparison ai",
      "aura points test",
      "aura fight",
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
    featureList: [
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
