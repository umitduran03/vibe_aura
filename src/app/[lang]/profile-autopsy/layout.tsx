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
      title: { absolute: "Profil Otopsisi AI — Tinder, Bumble & IG Profil Analizi" },
      description:
        "Tinder, Bumble, Hinge veya Instagram profil ekran görüntüsünü yükle → 0–100 çekicilik skoru, bio hataları ve Dedektif Modu ile gizli red flag'leri ücretsiz gör!",
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
    title: { absolute: "Profile Autopsy AI — Free Tinder, Hinge & IG Profile Audit" },
    description:
      "Upload a Tinder, Bumble, Hinge, or Instagram screenshot → get a 0–100 profile score, ick fixes, bio tips, or stalk red flags in Detective Mode. Free, no sign-up!",
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
