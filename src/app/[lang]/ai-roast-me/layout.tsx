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

  const featureData = featureSeoData["ai-roast-me"]?.[isTr ? "tr" : "en"];
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
      ? "Yapay Zeka Fotoğraf Gömmesi & Vibe Check"
      : "AI Roast Me & Photo Vibe Check",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/ai-roast-me`
      : `${baseUrl}/en/ai-roast-me`,
    description: isTr
      ? "Bir selfie yükle ve yapay zekanın acımasız gerçeklerle yüzleşmeni sağlamasına izin ver. En dürüst AI vibe check ve aura analizi uygulaması."
      : "Upload a selfie and let the AI roast you with brutal facts. The most honest AI vibe check and aura analysis app.",
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
      title: "Yapay Zeka (AI) Fotoğraf Gömmesi & Vibe Check | VibeCheckr",
      description:
        "Bir selfie yükle ve yapay zekanın acımasız gerçeklerle yüzleşmeni sağlamasına izin ver. En dürüst AI vibe check ve aura analizi uygulaması.",
      keywords: [
        "yapay zeka fotoğraf gömme",
        "ai roast me türkçe",
        "vibe check uygulaması",
        "aura analizi yapay zeka",
        "selfie roast",
        "fotoğraftan aura skoru",
        "ai fotoğraf analizi",
        "vibe check fotoğraf",
        "yapay zeka aura testi",
        "en dürüst ai uygulaması",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/ai-roast-me`,
        languages: {
          en: `${baseUrl}/en/ai-roast-me`,
          tr: `${baseUrl}/tr/ai-roast-me`,
          "x-default": `${baseUrl}/en/ai-roast-me`,
        },
      },
      openGraph: {
        title: "Yapay Zeka (AI) Fotoğraf Gömmesi & Vibe Check",
        description:
          "Bir selfie yükle ve yapay zekanın acımasız gerçeklerle yüzleşmeni sağlamasına izin ver. En dürüst AI vibe check ve aura analizi uygulaması.",
        url: `${baseUrl}/tr/ai-roast-me`,
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
    title: "AI Roast Me & Photo Vibe Check | VibeCheckr",
    description:
      "Upload a selfie and let the AI roast you with brutal facts. The most honest AI vibe check and aura analysis app.",
    keywords: [
      "ai roast me",
      "vibe check app",
      "ai photo roast",
      "aura analysis",
      "selfie roast ai",
      "photo vibe check",
      "aura score from photo",
      "brutal ai roast",
      "ai selfie analyzer",
      "vibe check photo analysis",
    ],
    alternates: {
      canonical: `${baseUrl}/en/ai-roast-me`,
      languages: {
        en: `${baseUrl}/en/ai-roast-me`,
        tr: `${baseUrl}/tr/ai-roast-me`,
        "x-default": `${baseUrl}/en/ai-roast-me`,
      },
    },
    openGraph: {
      title: "AI Roast Me & Photo Vibe Check",
      description:
        "Upload a selfie and let the AI roast you with brutal facts. The most honest AI vibe check and aura analysis app.",
      url: `${baseUrl}/en/ai-roast-me`,
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
