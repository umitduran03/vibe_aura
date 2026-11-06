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
      title: "Ex Uyum Testi & Ayrılık Analizi — Mesaj Atmalı Mıyım? (Ücretsiz YZ)",
      description:
        "Eski sevgiline mesaj atmadan önce dur! İki fotoğraf yükle → ayrılık sebebinizi, ego savaşını kimin kazandığını ve geri dönüş riskini hesapsız & ücretsiz öğren!",
      keywords: [
        "eski sevgili uyumu",
        "ex uyum testi",
        "ayrılık analizi",
        "eski sevgiliye mesaj atılır mı",
        "ex ilişki analizi yapay zeka",
        "geri dönüş riski hesaplama",
        "eski sevgili geri kazanma",
        "ayrılık sebebi analizi",
        "eski sevgili uyum skoru",
        "ego savaşı kim kazandı",
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
        title: "Ex Uyum Testi & Ayrılık Analizi (Ücretsiz YZ) | VibeCheckr",
        description:
          "Eski sevgiline yazmadan önce yapay zekaya sor: Ego savaşını kim kazandı, geri dönüş riski % kaç? Ücretsiz & hesapsız!",
        url: `${baseUrl}/tr/ex-compatibility`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "Ex Compatibility Test AI — Should I Text My Ex? Free Relapse Check",
    description:
      "Thinking of texting your ex? Upload two photos → AI analyzes your breakup, crowns who won the ego war & scores your relapse risk. Free & no sign-up →",
    keywords: [
      "ex compatibility",
      "should i text my ex",
      "breakup analysis",
      "toxic ex relapse",
      "ex compatibility test",
      "should I get back with my ex",
      "ex relationship analyzer AI",
      "breakup reason calculator",
      "ex relapse risk score",
      "who won the breakup",
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
      title: "Ex Compatibility Test AI — Should I Text My Ex? | VibeCheckr",
      description:
        "Analyze your breakup reason, see who won the ego war, and check your 0–100% relapse risk before texting your ex. 100% free!",
      url: `${baseUrl}/en/ex-compatibility`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  const isTr = lang === "tr";
  const jsonLd = buildToolJsonLd({
    slug: "ex-compatibility",
    lang,
    name: isTr
      ? "Eski Sevgili Uyum Testi & Ayrılık Analizi"
      : "Ex Compatibility Test & Breakup Analysis AI",
    breadcrumbName: isTr ? "Eski Sevgili Uyumu" : "Ex Compatibility",
    description: isTr
      ? "Eski sevgilinle iki fotoğrafınızı analiz ederek ayrılık sebebini, ego savaşını ve geri dönüş riskini hesaplayan ücretsiz yapay zeka aracı."
      : "Free AI breakup and ex-compatibility analyzer that scores relapse risk, ego-war winner, and lingering chemistry from two photos.",
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
