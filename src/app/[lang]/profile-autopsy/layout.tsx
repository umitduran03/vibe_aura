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

  const featureData = featureSeoData["profile-autopsy"]?.[isTr ? "tr" : "en"];
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
    name: isTr ? "Profil Otopsisi AI" : "Profile Autopsy AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr ? `${baseUrl}/tr/profile-autopsy` : `${baseUrl}/en/profile-autopsy`,
    description: isTr
      ? "Instagram, Tinder, Bumble, Hinge, X ve BeReal profilinizi yapay zeka ile analiz edin. 0-100 puan, green flag’ler ve red flag düzeltmeleri."
      : "Let AI dissect your Instagram, Tinder, Bumble, Hinge, X, and BeReal profiles. Get a brutal 0-100 score, green flags, red flags, and exactly how to fix them.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Self Audit Mode — Analyze your own dating profile",
      "Detective Mode — Stalk someone else's profile",
      "0-100 Vibe Score",
      "Red Flag & Ick Detection",
      "Green Flag Analysis",
      "Bio Strength Score",
      "First Impression Rating",
      "Supports Tinder, Bumble, Hinge, Instagram, X, BeReal",
    ],
    screenshot: `${baseUrl}/opengraph-image.png`,
    creator: {
      "@type": "Organization",
      name: "VibeCheckr",
      url: baseUrl,
    },
  };

  if (isTr) {
    return {
      title: "Profil Otopsisi AI | Instagram, Tinder, Bumble Profil Analizi | VibeCheckr",
      description:
        "Instagram, Tinder, Bumble profilini analiz et veya Dedektif Modu ile başkasının profilini stalkla. Yapay zeka ile green/red flag'leri ve gerçek vibe'ı öğren.",
      keywords: [
        "profil analizi yapay zeka",
        "tinder profil otopsisi",
        "bumble profil kontrolü",
        "hinge profil analizi",
        "instagram profil değerlendirme",
        "bereal profil kontrolü",
        "x twitter profil analizi",
        "dating profil ipuçları",
        "ai profil değerlendirme",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/profile-autopsy`,
        languages: {
          en: `${baseUrl}/en/profile-autopsy`,
          tr: `${baseUrl}/tr/profile-autopsy`,
          "x-default": `${baseUrl}/en/profile-autopsy`,
        },
      },
      openGraph: {
        title: "Profil Otopsisi AI | VibeCheckr",
        description: "Kendi profilindeki hataları gör veya Dedektif Modu ile flörtünün profilindeki toksik sinyalleri stalkla. Yapay zeka destekli acımasız profil analizi.",
        url: `${baseUrl}/tr/profile-autopsy`,
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
    title: "Profile Autopsy AI | Instagram, Tinder, Bumble & Hinge Profile Analyzer | VibeCheckr",
    description:
      "Audit your own Instagram/Tinder profile for red flags, or use Detective Mode to stalk someone else's vibe. Get a brutal AI score and relationship advice.",
    keywords: [
      "profile autopsy ai",
      "tinder profile analyzer",
      "bumble profile checker",
      "hinge profile review ai",
      "instagram profile audit",
      "bereal profile check",
      "x twitter profile analyzer",
      "dating profile tips ai",
      "social media profile score",
    ],
    alternates: {
      canonical: `${baseUrl}/en/profile-autopsy`,
      languages: {
        en: `${baseUrl}/en/profile-autopsy`,
        tr: `${baseUrl}/tr/profile-autopsy`,
        "x-default": `${baseUrl}/en/profile-autopsy`,
      },
    },
    openGraph: {
      title: "Profile Autopsy AI | VibeCheckr",
      description: "Fix your own profile's red flags or use Detective Mode to stalk someone else. Brutally honest AI analysis for Instagram, Tinder, Bumble, and more.",
      url: `${baseUrl}/en/profile-autopsy`,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    other: {
      "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
    },
  };
}

export default function ProfileAutopsyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
