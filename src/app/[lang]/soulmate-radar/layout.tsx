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
      title: { absolute: "Ruh Eşi Testi & Portresi — Ruh Eşim Kim? (Soulmate Radar YZ)" },
      description:
        "Ruh eşim kim? Ücretsiz yapay zeka ruh eşi testi ve ruh ikizini bulma testi! Selfie yükle; ruh eşi portresi, burç uyumu ve tanışma senaryonu anında öğren.",
      keywords: [
        "ruh eşi testi",
        "ruh eşi portresi",
        "ruh ikizini bulma testi",
        "ruh eşim kim",
        "ruh esim kim",
        "ruh eşi bulucu",
        "aşk falı yapay zeka",
        "ruh ikizi testi",
        "kiminle evleneceğim",
        "müstakbel eşim nasıl biri",
        "kaderimdeki kişi kim testi",
        "soulmate radar",
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
        title: "Ruh Eşi Radarı & YZ Aşk Falı (Ücretsiz) | VibeCheckr",
        description:
          "Auranı tarat → mükemmel ruh eşinin karakterini, burç uyumunu ve nerede karşılaşacağınızı saniyeler içinde öğren!",
        url: `${baseUrl}/tr/soulmate-radar`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "AI Soulmate Radar & Test — Who Is My Soulmate? Portrait & Aura" },
    description:
      "Who is my soulmate? Take the free AI Soulmate Radar test from a selfie! Get your soulmate portrait description, twin flame aura match, and how you'll meet.",
    keywords: [
      "soulmate radar",
      "soulmate test free",
      "who is my soulmate test",
      "ai soulmate portrait",
      "twin flame test",
      "who will i marry test",
      "future spouse predictor ai",
      "find my soulmate",
      "aura compatibility",
      "soulmate finder AI",
      "ideal type calculator",
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
      title: "AI Soulmate Radar — Reveal Your Ideal Match | VibeCheckr",
      description:
        "Let AI scan your aura to reveal your soulmate's archetype, zodiac sign, and meeting scenario. Free & instant!",
      url: `${baseUrl}/en/soulmate-radar`,
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
    slug: "soulmate-radar",
    lang,
    name: isTr
      ? "YZ Ruh Eşi Radarı & Aşk Falı"
      : "AI Soulmate Radar & Love Fortune",
    breadcrumbName: isTr ? "Ruh Eşi Radarı" : "Soulmate Radar",
    description: isTr
      ? "Selfie auranızı ve burcunuzu analiz ederek ideal ruh eşi profilinizi ve tanışma senaryonuzu çıkaran ücretsiz yapay zeka aracı."
      : "Free AI soulmate finder that scans your selfie aura and zodiac traits to predict your ideal partner archetype and meeting vibe.",
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
