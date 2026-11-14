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
      title: { absolute: "Eski Sevgiliye Mesaj Atmalı Mıyım? Ex Uyum & Barışma Testi (YZ)" },
      description:
        "Eski sevgiliye mesaj atmalı mıyım, geri döner mi? Ücretsiz yapay zeka ex uyum ve barışma testi! 2 fotoğraf yükle; ayrılık nedenini ve barışma ihtimalini gör.",
      keywords: [
        "eski sevgiliye mesaj atmalı mıyım",
        "eski sevgilim döner mi testi",
        "barışır mıyız testi",
        "ex uyum testi",
        "eski sevgili uyumu",
        "ayrılık analizi",
        "eski sevgiliye mesaj atılır mı",
        "no contact bozulmalı mı",
        "geri dönüş riski hesaplama",
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
    title: { absolute: "Ex Compatibility Test AI — Should I Text My Ex or Move On?" },
    description:
      "Should I text my ex or move on? Take the free AI Ex Compatibility Test with two photos to see if they're 'the one that got away' or a lesson you already learned.",
    keywords: [
      "ex compatibility",
      "ex compatibility test",
      "should i text my ex",
      "will my ex come back quiz",
      "should i break no contact quiz",
      "breakup analysis",
      "toxic ex relapse",
      "should I get back with my ex",
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
