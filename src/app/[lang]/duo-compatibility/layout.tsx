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

  const featureData = featureSeoData["duo-compatibility"]?.[isTr ? "tr" : "en"];
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
      ? "Yapay Zeka İkili Uyum Testi — VibeCheckr"
      : "AI Duo Compatibility Test — VibeCheckr",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/duo-compatibility`
      : `${baseUrl}/en/duo-compatibility`,
    description: isTr
      ? "İki fotoğraf yükle ve yapay zeka ilişkinizin tam kimyasını, aura uyumunu ve romantik potansiyelini hesaplasın. Ücretsiz, anında ve acımasızca dürüst."
      : "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility. Free, instant, and brutally honest.",
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
      title: "Yapay Zeka İkili Uyum Testi — Kimyanızı Ölçün | VibeCheckr",
      description:
        "İki fotoğraf yükle ve yapay zeka ilişkinizin tam kimyasını, aura uyumunu ve romantik potansiyelini hesaplasın. Ücretsiz, anında ve acımasızca dürüst.",
      keywords: [
        "ikili uyum testi",
        "ilişki kimyası",
        "çift uyumu",
        "yapay zeka aşk uyumu",
        "ikili aura eşleşmesi",
        "çift uyum testi yapay zeka",
        "romantik uyum hesaplama",
        "iki kişi aura testi",
        "en iyi arkadaş uyumu",
        "çift kimya analizi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/duo-compatibility`,
        languages: {
          en: `${baseUrl}/en/duo-compatibility`,
          tr: `${baseUrl}/tr/duo-compatibility`,
          "x-default": `${baseUrl}/en/duo-compatibility`,
        },
      },
      openGraph: {
        title: "Yapay Zeka İkili Uyum Testi — Kimyanızı Ölçün",
        description:
          "İki fotoğraf yükle ve yapay zeka ilişkinizin tam kimyasını, aura uyumunu ve romantik potansiyelini hesaplasın. Ücretsiz, anında ve acımasızca dürüst.",
        url: `${baseUrl}/tr/duo-compatibility`,
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
    title: "AI Duo Compatibility Test — Check Your Chemistry | VibeCheckr",
    description:
      "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility. Free, instant, and brutally honest.",
    keywords: [
      "duo compatibility",
      "relationship chemistry test",
      "ai couple test",
      "romantic compatibility",
      "duo compatibility AI",
      "best friend aura match",
      "couple compatibility test AI",
      "are we compatible",
      "aura blend test",
      "love chemistry calculator",
    ],
    alternates: {
      canonical: `${baseUrl}/en/duo-compatibility`,
      languages: {
        en: `${baseUrl}/en/duo-compatibility`,
        tr: `${baseUrl}/tr/duo-compatibility`,
        "x-default": `${baseUrl}/en/duo-compatibility`,
      },
    },
    openGraph: {
      title: "AI Duo Compatibility Test — Check Your Chemistry",
      description:
        "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility. Free, instant, and brutally honest.",
      url: `${baseUrl}/en/duo-compatibility`,
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
