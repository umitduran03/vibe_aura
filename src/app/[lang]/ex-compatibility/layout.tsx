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
      title: "Eski Sevgili (Ex) Uyum Testi & Ayrılık Analizi (YZ) | VibeCheckr",
      description:
        "Eski sevgiline mesaj atmadan önce yapay zekaya bir sor. Ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskinizi analiz et.",
      keywords: [
        "eski sevgili testi",
        "ex uyum testi",
        "eski sevgilime mesaj atmalı mıyım",
        "ayrılık analizi",
        "yapay zeka ilişki testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/ex-compatibility`,
        languages: {
          en: `${baseUrl}/en/ex-compatibility`,
          tr: `${baseUrl}/tr/ex-compatibility`,
          "x-default": `${baseUrl}/en/ex-compatibility`,
        },
      },
      openGraph: {
        title: "Eski Sevgili (Ex) Uyum Testi & Ayrılık Analizi | VibeCheckr",
        description: "Ayrılmanız dünya barışı için verilmiş en iyi karar mıydı? Eski sevgiline dönmeden önce YZ ile test et.",
        url: `${baseUrl}/tr/ex-compatibility`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Toxic Ex Breakup Autopsy & Compatibility AI | VibeCheckr",
    description:
      "Before you text your ex, let our AI do a breakup autopsy. Detect the aura mismatch, calculate the relapse risk, and see who won the ego battle.",
    keywords: [
      "should i text my ex quiz",
      "toxic ex test ai",
      "breakup analyzer",
      "ex compatibility test",
      "relationship aura check",
    ],
    alternates: {
      canonical: `${baseUrl}/en/ex-compatibility`,
      languages: {
        en: `${baseUrl}/en/ex-compatibility`,
        tr: `${baseUrl}/tr/ex-compatibility`,
        "x-default": `${baseUrl}/en/ex-compatibility`,
      },
    },
    openGraph: {
      title: "Toxic Ex Breakup Autopsy & Compatibility AI | VibeCheckr",
      description: "Do NOT text them. Let our AI expose why your relationship exploded and calculate your relapse risk.",
      url: `${baseUrl}/en/ex-compatibility`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function ExCompatibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
