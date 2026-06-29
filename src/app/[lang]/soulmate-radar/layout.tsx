import type { Metadata } from "next";
import { featureSeoData } from "@/lib/seo-feature-data";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  const featureData = featureSeoData["soulmate-radar"]?.[isTr ? "tr" : "en"];
  let faqJsonLd = null;
  if (featureData?.faq?.questions) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: featureData.faq.questions.map((q: any) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr
      ? "YZ Ruh Eşi Radarı & Aşk Falı — VibeCheckr"
      : "AI Soulmate Radar & Love Fortune — VibeCheckr",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/soulmate-radar`
      : `${baseUrl}/en/soulmate-radar`,
    description: isTr
      ? "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin karakterini, nerede tanışacağınızı ve vibe uyumunuzu söylesin."
      : "Let the AI scan your aura and reveal the personality of your perfect soulmate, where you'll meet, and your ultimate vibe compatibility.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "VibeCheckr",
      url: baseUrl,
    },
  };

  if (isTr) {
    return {
      title: "YZ Ruh Eşi Radarı & Aşk Falı | VibeCheckr",
      description:
        "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin karakterini, nerede tanışacağınızı ve vibe uyumunuzu söylesin.",
      keywords: [
        "ruh eşi bulucu",
        "aşk falı yapay zeka",
        "ruh ikizi testi",
        "kiminle evleneceğim",
        "ruh eşi bulucu yapay zeka",
        "ideal tip hesaplayıcı",
        "ruh eşi testi ücretsiz",
        "ruh eşim kim yapay zeka",
        "aura uyum testi",
        "aşk uyumu radarı",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/soulmate-radar`,
        languages: {
          en: `${baseUrl}/en/soulmate-radar`,
          tr: `${baseUrl}/tr/soulmate-radar`,
          "x-default": `${baseUrl}/en/soulmate-radar`,
        },
      },
      openGraph: {
        title: "YZ Ruh Eşi Radarı & Aşk Falı",
        description:
          "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin karakterini, nerede tanışacağınızı ve vibe uyumunuzu söylesin.",
        url: `${baseUrl}/tr/soulmate-radar`,
        type: "website",
        locale: "tr_TR",
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
      other: {
        "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
      },
    };
  }

  return {
    title: "AI Soulmate Radar & Love Fortune | VibeCheckr",
    description:
      "Let the AI scan your aura and reveal the personality of your perfect soulmate, where you'll meet, and your ultimate vibe compatibility.",
    keywords: [
      "soulmate radar",
      "ai love fortune",
      "find my soulmate",
      "aura compatibility",
      "soulmate finder AI",
      "ideal type calculator",
      "soulmate test free",
      "who is my soulmate AI",
      "love compatibility radar",
      "ai aura soulmate match",
    ],
    alternates: {
      canonical: `${baseUrl}/en/soulmate-radar`,
      languages: {
        en: `${baseUrl}/en/soulmate-radar`,
        tr: `${baseUrl}/tr/soulmate-radar`,
        "x-default": `${baseUrl}/en/soulmate-radar`,
      },
    },
    openGraph: {
      title: "AI Soulmate Radar & Love Fortune",
      description:
        "Let the AI scan your aura and reveal the personality of your perfect soulmate, where you'll meet, and your ultimate vibe compatibility.",
      url: `${baseUrl}/en/soulmate-radar`,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    other: {
      "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
