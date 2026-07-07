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

  const featureData = featureSeoData["toxic-ex-scanner"]?.[isTr ? "tr" : "en"];
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
    name: isTr ? "Toksik Eski Sevgili Tarayıcı YZ" : "Toxic Ex Scanner AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr
      ? "Eski sevgilinin fotoğrafını yükle ve yapay zeka red flag'lerini ve toksik özelliklerini acımasızca ifşa etsin. Ona mesaj atmayı bırak."
      : "Upload a photo of your ex and let our AI brutally expose their red flags and toxic traits. Free, instant, and savage.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  if (isTr) {
    return {
      title: "Toksik Ex Tarayıcı — Red Flag'leri İfşa Et | VibeCheckr",
      description: "Eski sevgilinin fotoğrafını yükle, yapay zeka red flag'lerini acımasızca ifşa etsin. Ona mesaj atmayı bırak. → Hemen dene!",
      keywords: ["toksik eski sevgili", "red flag testi", "eski sevgili toksik mi", "narsist testi", "toksik ilişki belirtileri"],
      alternates: {
        canonical: `${baseUrl}/tr/toxic-ex-scanner`,
        languages: {
          en: `${baseUrl}/en/toxic-ex-scanner`,
          tr: `${baseUrl}/tr/toxic-ex-scanner`,
          "x-default": `${baseUrl}/en/toxic-ex-scanner`,
        },
      },
      openGraph: {
        title: "Toksik Ex Tarayıcı — Red Flag'leri İfşa Et | VibeCheckr",
        description: "Eski sevgilinin fotoğrafını yükle, yapay zeka red flag'lerini acımasızca ifşa etsin. Ona mesaj atmayı bırak. → Hemen dene!",
        url: `${baseUrl}/tr/toxic-ex-scanner`,
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
    title: "Toxic Ex Scanner AI — Expose Red Flags | VibeCheckr",
    description: "Upload your ex's photo and let AI brutally expose their red flags and toxic traits. Free, instant, savage. Stop texting them back. → Try free!",
    keywords: ["toxic ex scanner", "red flag detector ai", "is my ex toxic", "narcissist test", "toxic relationship signs", "ex red flags", "is he toxic"],
    alternates: {
      canonical: `${baseUrl}/en/toxic-ex-scanner`,
      languages: {
        en: `${baseUrl}/en/toxic-ex-scanner`,
        tr: `${baseUrl}/tr/toxic-ex-scanner`,
        "x-default": `${baseUrl}/en/toxic-ex-scanner`,
      },
    },
    openGraph: {
      title: "Toxic Ex Scanner AI — Expose Red Flags | VibeCheckr",
      description: "Upload your ex's photo and let AI brutally expose their red flags and toxic traits. Free, instant, savage. Stop texting them back. → Try free!",
      url: `${baseUrl}/en/toxic-ex-scanner`,
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
