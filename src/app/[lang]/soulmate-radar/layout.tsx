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
      title: "Ruh Eşi Radarı & YZ Aşk Falı — Ruh Eşim Kim? (Ücretsiz Selfie Testi)",
      description:
        "Selfie yükle → yapay zeka auranı tarasın; ideal ruh eşinin burcunu, karakterini ve nerede tanışacağınızı anında açıklasın! Ücretsiz & hesapsız →",
      keywords: [
        "ruh eşi bulucu",
        "aşk falı yapay zeka",
        "ruh ikizi testi",
        "kiminle evleneceğim",
        "ruh eşi bulucu yapay zeka",
        "ideal tip hesaplayıcı",
        "ruh eşi testi ücretsiz",
        "ruh eşim kim yapay zeka",
        "aura uyum testi",
        "aşk uyumu radarı",
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
    title: "AI Soulmate Radar — Who Is My Soulmate? Free Selfie Aura Match",
    description:
      "Upload a selfie → AI scans your aura to reveal your ideal soulmate's personality, best zodiac match, and where you'll meet. 100% free, no sign-up →",
    keywords: [
      "soulmate radar",
      "ai love fortune",
      "find my soulmate",
      "aura compatibility",
      "soulmate finder AI",
      "ideal type calculator",
      "soulmate test free",
      "who is my soulmate AI",
      "love compatibility radar",
      "ai aura soulmate match",
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
