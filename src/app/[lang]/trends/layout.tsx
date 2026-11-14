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
      title: { absolute: "İlişki Rehberleri: Vibe Check, Rizz, Ick & Delulu Ne Demek?" },
      description:
        "Vibe check ne demek, ick nedir, rizz ve hard launch ne demek, situationship belirtileri neler? 30+ flört psikolojisi rehberini oku ve ücretsiz YZ testlerini çöz!",
      keywords: [
        "vibe check ne demek",
        "rizz ne demek",
        "ick nedir",
        "delulu ne demek",
        "hard launch ne demek",
        "soft launch ne demek",
        "situationship ne demek",
        "gaslighting nedir",
        "orbiting nedir",
        "limerence nedir",
        "toksik ilişki işaretleri",
        "aura puanı nedir",
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
    title: { absolute: "Gen-Z Dating Guides: Vibe Check, Rizz, Ick & Delulu Meanings" },
    description:
      "What does vibe check, rizz (0 rizz), the ick, delulu & aura points mean? Read 30+ Gen-Z dating psychology & texting guides — plus try our free AI vibe tests!",
    keywords: [
      "what is a vibe check",
      "urban dictionary vibe check",
      "what does rizz mean",
      "0 rizz meaning",
      "no rizz meaning",
      "what is an ick",
      "am i delulu",
      "soft launch vs hard launch",
      "situationship explained",
      "toxic relationship signs",
      "aura points trend",
      "relationship psychology gen-z",
      "dating advice 2026",
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
