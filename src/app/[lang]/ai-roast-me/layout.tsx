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
      title: "Yapay Zeka (AI) Fotoğraf Gömmesi & Vibe Check | VibeCheckr",
      description:
        "Bir selfie yükle ve yapay zekanın acımasız gerçeklerle yüzleşmeni sağlamasına izin ver. En dürüst AI vibe check ve aura analizi uygulaması.",
      keywords: [
        "yapay zeka fotoğraf analizi",
        "ai fotoğraf gömme",
        "roast me yapay zeka",
        "vibe check",
        "aura analizi fotoğraf",
        "kişilik testi",
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
        title: "AI Fotoğraf Gömmesi (Roast) | VibeCheckr",
        description: "Yapay zekanın seni acımasızca eleştirmesine (roast) hazır mısın? Hemen bir selfie yükle.",
        url: `${baseUrl}/tr/ai-roast-me`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "AI Photo Roast & Brutal Vibe Check | VibeCheckr",
    description:
      "Upload a selfie and let our AI ruthlessly roast your aura, expose your insecurities, and highlight your red flags.",
    keywords: [
      "ai photo roast",
      "brutal vibe check",
      "ai aura reader",
      "roast my selfie",
      "personality analysis ai",
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
      title: "AI Photo Roast & Vibe Check | VibeCheckr",
      description: "Ready to get absolutely roasted by AI? Upload a selfie and find out your true vibe.",
      url: `${baseUrl}/en/ai-roast-me`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function AIRoastMeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
