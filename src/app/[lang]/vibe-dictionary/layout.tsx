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

  const featureData = featureSeoData["vibe-dictionary"]?.[isTr ? "tr" : "en"];
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
    name: isTr ? "Vibe Sözlüğü" : "Vibe Dictionary",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr ? `${baseUrl}/tr/vibe-dictionary` : `${baseUrl}/en/vibe-dictionary`,
    description: isTr
      ? "Vibe check ne demek? Rizz nedir? Gen-Z slang ve internet jargonunun tam sözlüğü. Red flag, delulu, situationship ve daha fazlasını öğren."
      : "What does vibe check mean? Complete Gen-Z slang dictionary: rizz, red flag, situationship, delulu, aura points, main character energy and more — all explained.",
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
      title: "Vibe Sözlüğü — Gen-Z Argosunu Öğren: Vibe Check Ne Demek? | VibeCheckr",
      description:
        "Vibe check ne demek? Ick nedir? Rizz ne anlama gelir? Gen-Z slang ve internet jargonunun tam sözlüğü. Red flag, delulu, situationship ve daha fazlasını öğren.",
      keywords: [
        "vibe check ne demek",
        "ick nedir",
        "ick ne demek",
        "gen-z sözlük",
        "gen-z argot",
        "rizz ne demek",
        "red flag ne demek",
        "situationship ne demek",
        "delulu ne demek",
        "internet jargonu sözlüğü",
        "vibe ne demek",
        "vibe testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/vibe-dictionary`,
        languages: {
          en: `${baseUrl}/en/vibe-dictionary`,
          tr: `${baseUrl}/tr/vibe-dictionary`,
          "x-default": `${baseUrl}/en/vibe-dictionary`,
        },
      },
      openGraph: {
        title: "Vibe Sözlüğü — Vibe Check Ne Demek? Gen-Z Argot Rehberi | VibeCheckr",
        description:
          "Vibe check ne demek, ick nedir, rizz nedir? Gen-Z internet jargonunun tam sözlüğü VibeCheckr'da.",
        url: `${baseUrl}/tr/vibe-dictionary`,
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
    title: "Vibe Dictionary — Gen-Z Slang & Vibe Check Meaning Explained | VibeCheckr",
    description:
      "What does vibe check mean? What is an ick? Complete Gen-Z slang dictionary: rizz, red flag, situationship, delulu, aura points, main character energy and more — all explained.",
    keywords: [
      "gen z slang dictionary",
      "what does delulu mean",
      "vibe meaning",
      "rizz definition",
      "slay meaning gen z",
      "gen z words 2026",
      "vibe check meaning",
      "what is an ick",
      "situationship meaning",
      "aura points meaning",
    ],
    alternates: {
      canonical: `${baseUrl}/en/vibe-dictionary`,
      languages: {
        en: `${baseUrl}/en/vibe-dictionary`,
        tr: `${baseUrl}/tr/vibe-dictionary`,
        "x-default": `${baseUrl}/en/vibe-dictionary`,
      },
    },
    openGraph: {
      title: "Vibe Dictionary — What Does Vibe Check Mean? | VibeCheckr",
      description:
        "What does vibe check mean? What is an ick? Complete Gen-Z slang dictionary with rizz, red flag, situationship, delulu, aura points & more.",
      url: `${baseUrl}/en/vibe-dictionary`,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    other: {
      "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
    },
  };
}

export default function VibeDictionaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
