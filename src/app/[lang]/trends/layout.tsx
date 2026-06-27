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
      title: "Vibe Kültür Merkezi — Gen-Z Trendleri, Aura & İlişki Analizleri | VibeCheckr",
      description:
        "Gen-Z internet trendleri, aura savaşları, situationship psikolojisi, toksik ilişki rehberleri ve daha fazlası. Vibe kültürünün merkezine hoş geldin.",
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
        title: "Vibe Kültür Merkezi — Gen-Z Trend Analizleri | VibeCheckr",
        description:
          "Situationship, ick, delulu, aura savaşları ve daha fazlası. Gen-Z internet kültürünün tüm trendlerini analiz ediyoruz.",
        url: `${baseUrl}/tr/trends`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Vibe Culture Hub — Gen-Z Trends, Aura & Relationship Analysis | VibeCheckr",
    description:
      "The internet's pulse on Gen-Z dating trends, aura battles, situationship psychology, toxic red flags, rizz guides, and viral vibe culture. Stay ahead of the trends.",
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
      title: "Vibe Culture Hub — Gen-Z Trends & Relationship Insights | VibeCheckr",
      description:
        "Deep dives into Gen-Z dating trends, aura battles, situationships, toxic red flags, rizz, and viral vibe culture. Stay ahead of the trends.",
      url: `${baseUrl}/en/trends`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function TrendsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
