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

  const featureData = featureSeoData["reply-guru"]?.[isTr ? "tr" : "en"];
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
    name: isTr ? "Mesaj Gurusu YZ" : "The Reply Guru AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr ? `${baseUrl}/tr/reply-guru` : `${baseUrl}/en/reply-guru`,
    description: isTr
      ? "Ekran görüntüsünü sal ve yapay zekamızın o en mükemmel toksik, cool veya risksiz cevabı kurgulamasına izin ver. Bir daha asla 'buna ne yazsam' diye strese girme."
      : "Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
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
      title: "Reply Guru (YZ) — Mükemmel Cevabı Üret | VibeCheckr",
      description:
        "Akıl oyunları mı? Kazandın. Ekran görüntüsünü at, yapay zeka senin için mükemmel toksik, havalı veya güvenli cevabı yazsın. Mesajlaşma stresine son.",
      keywords: [
        "nasıl cevap verilir",
        "reply guru",
        "toksik cevap oluşturucu",
        "mesaj taktikleri",
        "rizz ai türkçe",
        "yapay zeka mesaj cevabı",
        "flörtöz mesaj oluşturucu",
        "kuru mesaja cevap",
        "ai rizz uygulaması",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/reply-guru`,
        languages: {
          en: `${baseUrl}/en/reply-guru`,
          tr: `${baseUrl}/tr/reply-guru`,
          "x-default": `${baseUrl}/en/reply-guru`,
        },
      },
      openGraph: {
        title: "Reply Guru (YZ) — Mükemmel Cevabı Üret",
        description:
          "Akıl oyunları mı? Kazandın. Ekran görüntüsünü at, yapay zeka senin için mükemmel toksik, havalı veya güvenli cevabı yazsın. Mesajlaşma stresine son.",
        url: `${baseUrl}/tr/reply-guru`,
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
    title: "The Reply Guru AI — Craft the Perfect Text | VibeCheckr",
    description:
      "Mind games? Won. Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
    keywords: [
      "rizz ai",
      "text reply generator",
      "how to reply to dry texts",
      "flirty response generator",
      "ai rizz",
      "reply guru app",
      "text game ai",
      "what to text back",
      "toxic reply generator",
    ],
    alternates: {
      canonical: `${baseUrl}/en/reply-guru`,
      languages: {
        en: `${baseUrl}/en/reply-guru`,
        tr: `${baseUrl}/tr/reply-guru`,
        "x-default": `${baseUrl}/en/reply-guru`,
      },
    },
    openGraph: {
      title: "The Reply Guru AI — Craft the Perfect Text",
      description:
        "Mind games? Won. Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
      url: `${baseUrl}/en/reply-guru`,
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
