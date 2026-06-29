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

  const featureData = featureSeoData["ex-compatibility"]?.[isTr ? "tr" : "en"];
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
      ? "Eski Sevgili Uyum Testi & Ayrılık Analizi — VibeCheckr"
      : "Ex Compatibility Test & Breakup Analysis AI — VibeCheckr",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/ex-compatibility`
      : `${baseUrl}/en/ex-compatibility`,
    description: isTr
      ? "Eski sevgiline mesaj atmadan önce yapay zekaya bir sor. Ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskinizi analiz et."
      : "Ask the AI before texting your ex. Analyze your breakup reason, see who won the ego war, and calculate your relapse risk.",
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
      title: "Eski Sevgili (Ex) Uyum Testi & Ayrılık Analizi (YZ) | VibeCheckr",
      description:
        "Eski sevgiline mesaj atmadan önce yapay zekaya bir sor. Ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskinizi analiz et.",
      keywords: [
        "eski sevgili uyumu",
        "ex uyum testi",
        "ayrılık analizi",
        "eski sevgiliye mesaj atılır mı",
        "ex ilişki analizi yapay zeka",
        "geri dönüş riski hesaplama",
        "eski sevgili geri kazanma",
        "ayrılık sebebi analizi",
        "eski sevgili uyum skoru",
        "ego savaşı kim kazandı",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/ex-compatibility`,
        languages: {
          en: `${baseUrl}/en/ex-compatibility`,
          tr: `${baseUrl}/tr/ex-compatibility`,
          "x-default": `${baseUrl}/en/ex-compatibility`,
        },
      },
      openGraph: {
        title: "Eski Sevgili (Ex) Uyum Testi & Ayrılık Analizi (YZ)",
        description:
          "Eski sevgiline mesaj atmadan önce yapay zekaya bir sor. Ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskinizi analiz et.",
        url: `${baseUrl}/tr/ex-compatibility`,
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
    title: "Ex Compatibility Test & Breakup Analysis AI | VibeCheckr",
    description:
      "Ask the AI before texting your ex. Analyze your breakup reason, see who won the ego war, and calculate your relapse risk.",
    keywords: [
      "ex compatibility",
      "should i text my ex",
      "breakup analysis",
      "toxic ex relapse",
      "ex compatibility test",
      "should I get back with my ex",
      "ex relationship analyzer AI",
      "breakup reason calculator",
      "ex relapse risk score",
      "who won the breakup",
    ],
    alternates: {
      canonical: `${baseUrl}/en/ex-compatibility`,
      languages: {
        en: `${baseUrl}/en/ex-compatibility`,
        tr: `${baseUrl}/tr/ex-compatibility`,
        "x-default": `${baseUrl}/en/ex-compatibility`,
      },
    },
    openGraph: {
      title: "Ex Compatibility Test & Breakup Analysis AI",
      description:
        "Ask the AI before texting your ex. Analyze your breakup reason, see who won the ego war, and calculate your relapse risk.",
      url: `${baseUrl}/en/ex-compatibility`,
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
