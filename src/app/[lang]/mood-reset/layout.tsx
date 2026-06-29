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

  const featureData = featureSeoData["mood-reset"]?.[isTr ? "tr" : "en"];
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
      ? "Mood Reset Yapay Zeka — VibeCheckr"
      : "Mood Reset AI — VibeCheckr",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/mood-reset`
      : `${baseUrl}/en/mood-reset`,
    description: isTr
      ? "Kötü bir gün mü geçiriyorsun? Ruh halini düzeltmek, sızlanmayı bırakmak ve vibe'ını şarj etmek için yapay zekadan acımasızca dürüst bir reset al."
      : "Having a bad day? Get a brutally honest wake-up call from our AI to fix your mood, stop complaining, and recharge your vibe instantly.",
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
      title: "Mood Reset (YZ) — Acımasızca Dürüst Uyanış Çağrısı | VibeCheckr",
      description:
        "Kötü bir gün mü geçiriyorsun? Ruh halini düzeltmek, sızlanmayı bırakmak ve vibe'ını şarj etmek için yapay zekadan acımasızca dürüst bir reset al.",
      keywords: [
        "mood reset",
        "ruh hali düzeltici",
        "yapay zeka motivasyon",
        "kötü gün kurtarıcısı",
        "mood reset yapay zeka",
        "duygusal destek yapay zeka",
        "gen-z terapist botu",
        "vibe reset uygulaması",
        "ruh hali şarj et",
        "acımasız motivasyon yapay zeka",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/mood-reset`,
        languages: {
          en: `${baseUrl}/en/mood-reset`,
          tr: `${baseUrl}/tr/mood-reset`,
          "x-default": `${baseUrl}/en/mood-reset`,
        },
      },
      openGraph: {
        title: "Mood Reset (YZ) — Acımasızca Dürüst Uyanış Çağrısı",
        description:
          "Kötü bir gün mü geçiriyorsun? Ruh halini düzeltmek, sızlanmayı bırakmak ve vibe'ını şarj etmek için yapay zekadan acımasızca dürüst bir reset al.",
        url: `${baseUrl}/tr/mood-reset`,
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
    title: "Mood Reset AI — Brutally Honest Wake-up Call | VibeCheckr",
    description:
      "Having a bad day? Get a brutally honest wake-up call from our AI to fix your mood, stop complaining, and recharge your vibe instantly.",
    keywords: [
      "mood reset ai",
      "fix bad mood",
      "vibe recharge",
      "brutal motivation",
      "mood reset app",
      "emotional support AI",
      "gen-z therapist bot",
      "vibe reset app",
      "instant mood fix",
      "ai mental wellness",
    ],
    alternates: {
      canonical: `${baseUrl}/en/mood-reset`,
      languages: {
        en: `${baseUrl}/en/mood-reset`,
        tr: `${baseUrl}/tr/mood-reset`,
        "x-default": `${baseUrl}/en/mood-reset`,
      },
    },
    openGraph: {
      title: "Mood Reset AI — Brutally Honest Wake-up Call",
      description:
        "Having a bad day? Get a brutally honest wake-up call from our AI to fix your mood, stop complaining, and recharge your vibe instantly.",
      url: `${baseUrl}/en/mood-reset`,
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
