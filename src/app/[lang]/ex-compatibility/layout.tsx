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
      description: "Eski sevgiline mesaj atmadan önce yapay zekaya bir sor. Ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskinizi analiz et.",
      keywords: ["eski sevgili uyumu","ex uyum testi","ayrılık analizi","eski sevgiliye mesaj atılır mı"],
      alternates: {
        canonical: `${baseUrl}/tr/ex-compatibility`,
        languages: {
          en: `${baseUrl}/en/ex-compatibility`,
          tr: `${baseUrl}/tr/ex-compatibility`,
          "x-default": `${baseUrl}/en/ex-compatibility`,
        },
      },
      openGraph: {
        title: "Eski Sevgili (Ex) Uyum Testi & Ayrılık Analizi (YZ)",
        description: "Eski sevgiline mesaj atmadan önce yapay zekaya bir sor. Ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskinizi analiz et.",
        url: `${baseUrl}/tr/ex-compatibility`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Ex Compatibility Test & Breakup Analysis AI | VibeCheckr",
    description: "Ask the AI before texting your ex. Analyze your breakup reason, see who won the ego war, and calculate your relapse risk.",
    keywords: ["ex compatibility","should i text my ex","breakup analysis","toxic ex relapse"],
    alternates: {
      canonical: `${baseUrl}/en/ex-compatibility`,
      languages: {
        en: `${baseUrl}/en/ex-compatibility`,
        tr: `${baseUrl}/tr/ex-compatibility`,
        "x-default": `${baseUrl}/en/ex-compatibility`,
      },
    },
    openGraph: {
      title: "Ex Compatibility Test & Breakup Analysis AI",
      description: "Ask the AI before texting your ex. Analyze your breakup reason, see who won the ego war, and calculate your relapse risk.",
      url: `${baseUrl}/en/ex-compatibility`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
