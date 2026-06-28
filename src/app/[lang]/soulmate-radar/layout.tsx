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
      title: "YZ Ruh Eşi Radarı & Aşk Falı | VibeCheckr",
      description: "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin karakterini, nerede tanışacağınızı ve vibe uyumunuzu söylesin.",
      keywords: ["ruh eşi bulucu","aşk falı yapay zeka","ruh ikizi testi","kiminle evleneceğim"],
      alternates: {
        canonical: `${baseUrl}/tr/soulmate-radar`,
        languages: {
          en: `${baseUrl}/en/soulmate-radar`,
          tr: `${baseUrl}/tr/soulmate-radar`,
          "x-default": `${baseUrl}/en/soulmate-radar`,
        },
      },
      openGraph: {
        title: "YZ Ruh Eşi Radarı & Aşk Falı",
        description: "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin karakterini, nerede tanışacağınızı ve vibe uyumunuzu söylesin.",
        url: `${baseUrl}/tr/soulmate-radar`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "AI Soulmate Radar & Love Fortune | VibeCheckr",
    description: "Let the AI scan your aura and reveal the personality of your perfect soulmate, where you'll meet, and your ultimate vibe compatibility.",
    keywords: ["soulmate radar","ai love fortune","find my soulmate","aura compatibility"],
    alternates: {
      canonical: `${baseUrl}/en/soulmate-radar`,
      languages: {
        en: `${baseUrl}/en/soulmate-radar`,
        tr: `${baseUrl}/tr/soulmate-radar`,
        "x-default": `${baseUrl}/en/soulmate-radar`,
      },
    },
    openGraph: {
      title: "AI Soulmate Radar & Love Fortune",
      description: "Let the AI scan your aura and reveal the personality of your perfect soulmate, where you'll meet, and your ultimate vibe compatibility.",
      url: `${baseUrl}/en/soulmate-radar`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
