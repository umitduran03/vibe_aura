import type { Metadata } from "next";

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
      title: "Profil Otopsisi AI | Instagram, Tinder, Bumble Profil Analizi | VibeCheckr",
      description:
        "Instagram, Tinder, Bumble, Hinge, X ve BeReal profilinizi yapay zeka ile analiz edin. 0-100 puan, green flag'ler, red flag'ler ve gerçek düzeltme önerileri.",
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
        description: "Yapay zeka profilini mercek altına alıyor. Instagram, Tinder, Bumble, Hinge, X, BeReal — hangi platform olursa olsun red flag'leri bulur, fix'leri verir.",
        url: `${baseUrl}/tr/profile-autopsy`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Profile Autopsy AI | Instagram, Tinder, Bumble & Hinge Profile Analyzer | VibeCheckr",
    description:
      "Let AI dissect your Instagram, Tinder, Bumble, Hinge, X, and BeReal profiles. Get a brutal 0-100 score, your green flags, your red flags, and exactly how to fix them.",
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
      description: "AI puts your profile on the operating table. Instagram, Tinder, Bumble, Hinge, X, BeReal — it finds every red flag and tells you exactly how to fix them.",
      url: `${baseUrl}/en/profile-autopsy`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function ProfileAutopsyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
