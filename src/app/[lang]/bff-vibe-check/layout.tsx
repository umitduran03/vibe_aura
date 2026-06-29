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

  const featureData = featureSeoData["bff-vibe-check"]?.[isTr ? "tr" : "en"];
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
      ? "BFF Vibe Check & Kanka Uyumu (YZ)"
      : "BFF Vibe Check & Friendship Compatibility AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/bff-vibe-check`
      : `${baseUrl}/en/bff-vibe-check`,
    description: isTr
      ? "İki fotoğraf yükle ve yapay zeka en yakın arkadaşınla (BFF) aranızdaki kaos seviyesini, gizli rolleri ve dedikodu uyumunuzu ortaya çıkarsın."
      : "Upload two photos and let AI reveal your chaos level, hidden roles, and gossip synergy with your best friend.",
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
      title: "BFF Vibe Check & Kanka Uyumu (YZ) | VibeCheckr",
      description:
        "İki fotoğraf yükle ve yapay zeka en yakın arkadaşınla (BFF) aranızdaki kaos seviyesini, gizli rolleri ve dedikodu uyumunuzu ortaya çıkarsın.",
      keywords: [
        "bff vibe check",
        "kanka uyumu testi",
        "en yakın arkadaş testi",
        "yapay zeka arkadaşlık",
        "bff uyum analizi",
        "arkadaş vibe check",
        "iki fotoğraf uyum testi",
        "en iyi arkadaş yapay zeka",
        "bff chaos seviyesi",
        "dedikodu uyumu testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/bff-vibe-check`,
        languages: {
          en: `${baseUrl}/en/bff-vibe-check`,
          tr: `${baseUrl}/tr/bff-vibe-check`,
          "x-default": `${baseUrl}/en/bff-vibe-check`,
        },
      },
      openGraph: {
        title: "BFF Vibe Check & Kanka Uyumu (YZ)",
        description:
          "İki fotoğraf yükle ve yapay zeka en yakın arkadaşınla (BFF) aranızdaki kaos seviyesini, gizli rolleri ve dedikodu uyumunuzu ortaya çıkarsın.",
        url: `${baseUrl}/tr/bff-vibe-check`,
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
    title: "BFF Vibe Check & Friendship Compatibility AI | VibeCheckr",
    description:
      "Upload two photos and let AI reveal your chaos level, hidden roles, and gossip synergy with your best friend.",
    keywords: [
      "bff vibe check",
      "best friend compatibility test",
      "friendship compatibility ai",
      "duo vibe check",
      "bff compatibility calculator",
      "ai friendship test",
      "best friend chaos level",
      "friendship synergy test",
      "bff ai analyzer",
      "best friend vibe analyzer",
    ],
    alternates: {
      canonical: `${baseUrl}/en/bff-vibe-check`,
      languages: {
        en: `${baseUrl}/en/bff-vibe-check`,
        tr: `${baseUrl}/tr/bff-vibe-check`,
        "x-default": `${baseUrl}/en/bff-vibe-check`,
      },
    },
    openGraph: {
      title: "BFF Vibe Check & Friendship Compatibility AI",
      description:
        "Upload two photos and let AI reveal your chaos level, hidden roles, and gossip synergy with your best friend.",
      url: `${baseUrl}/en/bff-vibe-check`,
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
