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

  const featureData = featureSeoData["situationship-clarifier"]?.[isTr ? "tr" : "en"];
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
    name: isTr ? "Situationship Netleştirici YZ" : "Situationship Clarifier AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr
      ? "'Biz şimdi neyiz?' gizemini çözüyoruz. Karışık sinyalleri çöz, acımasız uyumluluk istatistikleri dahildir."
      : "Decoding the 'What are we?' mystery. Decode mixed signals and find out if you're in a situationship or relationship.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  if (isTr) {
    return {
      title: "Situationship Netleştirici (YZ) — Sinyalleri Çöz | VibeCheckr",
      description: "Aranızdaki durumu anlamıyor musun? Yapay zeka situationship'ini netleştirsin. Acımasız uyum istatistiklerini al ve 'Biz neyiz?' gizemini anında çöz.",
      keywords: ["situationship nedir", "biz neyiz testi", "karışık sinyaller", "ilişki analizi", "situationship mi ilişki mi", "biz neyiz yapay zeka"],
      alternates: {
        canonical: `${baseUrl}/tr/situationship-clarifier`,
        languages: {
          en: `${baseUrl}/en/situationship-clarifier`,
          tr: `${baseUrl}/tr/situationship-clarifier`,
          "x-default": `${baseUrl}/en/situationship-clarifier`,
        },
      },
      openGraph: {
        title: "Situationship Netleştirici (YZ) — Sinyalleri Çöz",
        description: "Aranızdaki durumu anlamıyor musun? Yapay zeka situationship'ini netleştirsin. Acımasız uyum istatistiklerini al ve 'Biz neyiz?' gizemini anında çöz.",
        url: `${baseUrl}/tr/situationship-clarifier`,
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
    title: "Situationship Clarifier AI — Decode the Mixed Signals | VibeCheckr",
    description: "Confused about what you are? Let our AI clarify your situationship. Get brutal compatibility stats and decode the 'What are we?' mystery instantly.",
    keywords: ["situationship clarifier", "what is a situationship", "situationship or relationship", "decode mixed signals", "what are we test", "situationship ai", "am i in a situationship"],
    alternates: {
      canonical: `${baseUrl}/en/situationship-clarifier`,
      languages: {
        en: `${baseUrl}/en/situationship-clarifier`,
        tr: `${baseUrl}/tr/situationship-clarifier`,
        "x-default": `${baseUrl}/en/situationship-clarifier`,
      },
    },
    openGraph: {
      title: "Situationship Clarifier AI — Decode the Mixed Signals",
      description: "Confused about what you are? Let our AI clarify your situationship. Get brutal compatibility stats and decode the 'What are we?' mystery instantly.",
      url: `${baseUrl}/en/situationship-clarifier`,
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
