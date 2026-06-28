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
    },
  };
}

export default function ProfileAutopsyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
