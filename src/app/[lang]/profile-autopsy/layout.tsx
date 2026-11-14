import type { Metadata } from "next";
import { buildToolJsonLd } from "@/lib/seo-schema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  if (isTr) {
    return {
      title: { absolute: "Tinder, Hinge & Instagram Profil Analizi — Profil Otopsisi YZ" },
      description:
        "Neden eşleşme gelmiyor? Ücretsiz yapay zeka Tinder, Bumble, Hinge ve Instagram profil analizi (Profil Otopsisi). Ekran görüntüsü yükle, ilk izlenimini öğren.",
      keywords: [
        "instagram profil analizi",
        "tinder profil analizi",
        "hinge profil analizi",
        "bumble profil kontrolü",
        "sosyal medya profil puanlama",
        "neden eşleşme alamıyorum",
        "profil analizi yapay zeka",
        "tinder profil otopsisi",
        "instagram profil değerlendirme",
        "dating profil ipuçları",
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
        title: "Profil Otopsisi AI — Tinder & Instagram Analizi | VibeCheckr",
        description:
          "Kendi flört profilini puanlat veya Dedektif Modu ile karşı tarafın gizli red flag'lerini yakala! Ücretsiz & hesapsız.",
        url: `${baseUrl}/tr/profile-autopsy`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Hinge, Tinder & IG Profile Review AI — Free Profile Autopsy" },
    description:
      "Get an instant AI Hinge, Tinder, Bumble & Instagram profile review! Upload a screenshot to Profile Autopsy for a brutal bio audit, photo score, and match fixes.",
    keywords: [
      "hinge profile review ai",
      "tinder profile analyzer",
      "instagram profile audit",
      "rate my dating profile ai",
      "profile autopsy ai",
      "bumble profile checker",
      "x twitter profile analyzer",
      "dating profile tips ai",
      "social media profile score",
      "free dating profile review ai",
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
      title: "Profile Autopsy AI — Free Tinder, Hinge & IG Audit | VibeCheckr",
      description:
        "Audit your dating profile for hidden icks & red flags—or use Detective Mode to decode someone else's vibe. 100% free!",
      url: `${baseUrl}/en/profile-autopsy`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ProfileAutopsyLayout({ children, params }: Props) {
  const { lang } = await params;
  const isTr = lang === "tr";
  const jsonLd = buildToolJsonLd({
    slug: "profile-autopsy",
    lang,
    name: isTr ? "Profil Otopsisi AI" : "Profile Autopsy AI",
    breadcrumbName: isTr ? "Profil Otopsisi" : "Profile Autopsy",
    description: isTr
      ? "Instagram, Tinder, Bumble, Hinge ve X profillerini analiz ederek 0–100 puan, bio gücü ve red/green flag raporu sunan ücretsiz yapay zeka aracı."
      : "Free AI profile analyzer for Tinder, Bumble, Hinge, Instagram, and X with Self Audit Mode, Detective Mode, and 0–100 vibe scoring.",
    featureList: [
      "Self Audit Mode — Fix Your Own Dating Profile",
      "Detective Mode — Scan Someone Else's Profile for Red Flags",
      "0–100 First Impression & Bio Strength Score",
      "Supports Tinder, Bumble, Hinge, Instagram, X & BeReal",
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
