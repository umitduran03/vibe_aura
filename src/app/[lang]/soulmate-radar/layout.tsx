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
      description:
        "Yapay zeka auranı tarasın ve senin için mükemmel ruh eşinin karakterini, nerede tanışacağınızı ve vibe uyumunuzu söylesin.",
      keywords: [
        "ruh eşi bulma testi",
        "aşk falı yapay zeka",
        "soulmate radar",
        "kiminle evleneceğim testi",
        "vibe uyumu",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/soulmate-radar`,
        languages: {
          en: `${baseUrl}/en/soulmate-radar`,
          tr: `${baseUrl}/tr/soulmate-radar`,
          "x-default": `${baseUrl}/en/soulmate-radar`,
        },
      },
      openGraph: {
        title: "YZ Ruh Eşi Radarı | VibeCheckr",
        description: "Ruh eşin seni nerede bekliyor? Yapay zeka auranı okuyup gelecekteki aşkını tahmin etsin.",
        url: `${baseUrl}/tr/soulmate-radar`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "AI Soulmate Radar & Future Predictor | VibeCheckr",
    description:
      "Let AI scan your aura to predict exactly what your true soulmate acts like and where you will meet them. Free soulmate test.",
    keywords: [
      "ai soulmate test",
      "soulmate predictor",
      "who is my soulmate",
      "aura compatibility",
      "future partner test ai",
    ],
    alternates: {
      canonical: `${baseUrl}/en/soulmate-radar`,
      languages: {
        en: `${baseUrl}/en/soulmate-radar`,
        tr: `${baseUrl}/tr/soulmate-radar`,
        "x-default": `${baseUrl}/en/soulmate-radar`,
      },
    },
    openGraph: {
      title: "AI Soulmate Radar | VibeCheckr",
      description: "Stop wasting time. Scan your aura and let AI accurately predict your exact soulmate.",
      url: `${baseUrl}/en/soulmate-radar`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function SoulmateRadarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
