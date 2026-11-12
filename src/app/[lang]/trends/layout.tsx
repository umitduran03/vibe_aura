import type { Metadata } from "next";

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
      title: { absolute: "İlişki Rehberleri, Red Flag, Rizz & Vibe Check Trendleri" },
      description:
        "Situationship ne demek, ick nedir, rizz nasıl yapılır, delulu belirtileri ve 0–100 aura puanı rehberleri. 30+ analiz yazısını oku ve ücretsiz YZ testlerini dene!",
      keywords: [
        "vibe trendleri",
        "gen-z trendleri 2026",
        "situationship ne demek",
        "toksik ilişki işaretleri",
        "aura nedir",
        "ick nedir",
        "delulu ne demek",
        "rizz ne demek",
        "ilişki psikolojisi",
        "yapay zeka vibe check",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/trends`,
        languages: {
          en: `${baseUrl}/en/trends`,
          tr: `${baseUrl}/tr/trends`,
          "x-default": `${baseUrl}/en/trends`,
        },
      },
      openGraph: {
        title: "Vibe Kültür Merkezi — Gen-Z İlişki & Aura Trendleri | VibeCheckr",
        description:
          "Situationship, ick, delulu, aura savaşları ve toksik ilişki psikolojisi üzerine 30+ derinlemesine analiz rehberi.",
        url: `${baseUrl}/tr/trends`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Gen-Z Dating, Red Flags, Rizz & Aura Guides | VibeCheckr" },
    description:
      "What is a vibe check, rizz, the ick, delulu & aura points? Read 30+ Gen-Z dating psychology & texting guides — plus try our free instant AI vibe tests!",
    keywords: [
      "gen-z trends 2026",
      "vibe check culture",
      "situationship explained",
      "toxic relationship signs",
      "aura points trend",
      "what is an ick",
      "rizz explained",
      "delulu meaning",
      "relationship psychology gen-z",
      "dating advice 2026",
      "viral tiktok trends",
      "vibe culture articles",
    ],
    alternates: {
      canonical: `${baseUrl}/en/trends`,
      languages: {
        en: `${baseUrl}/en/trends`,
        tr: `${baseUrl}/tr/trends`,
        "x-default": `${baseUrl}/en/trends`,
      },
    },
    openGraph: {
      title: "Vibe Culture Hub — Gen-Z Dating & Aura Guides | VibeCheckr",
      description:
        "Explore 30+ guides on Gen-Z dating trends, aura battles, situationships, toxic red flags, rizz & viral vibe culture.",
      url: `${baseUrl}/en/trends`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default function TrendsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
