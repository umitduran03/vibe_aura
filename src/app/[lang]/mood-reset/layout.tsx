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
      title: { absolute: "Mood Reset YZ — Eksi Auranı Sıfırla & Modunu Yükselt (Ücretsiz)" },
      description:
        "Modun yerlerde mi? Kafana taktığın şeyi yaz → yapay zeka sızlanmayı bitiren acımasız bir uyanış planı ve enerji reseti versin! Ücretsiz & hesapsız →",
      keywords: [
        "mood reset",
        "ruh hali düzeltici",
        "yapay zeka motivasyon",
        "kötü gün kurtarıcısı",
        "mood reset yapay zeka",
        "duygusal destek yapay zeka",
        "gen-z terapist botu",
        "vibe reset uygulaması",
        "ruh hali şarj et",
        "acımasız motivasyon yapay zeka",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/mood-reset`,
        languages: {
          en: `${baseUrl}/en/mood-reset`,
          tr: `${baseUrl}/tr/mood-reset`,
          "x-default": `${baseUrl}/en/mood-reset`,
        },
      },
      openGraph: {
        title: "Mood Reset YZ — Eksi Auranı Sıfırla & Modunu Yükselt | VibeCheckr",
        description:
          "Kötü bir gün mü? Yapay zekadan 3 saniyede acımasız uyanış çağrısı ve vibe şarjı al. Ücretsiz & hesapsız!",
        url: `${baseUrl}/tr/mood-reset`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Mood Reset AI — Fix Negative Aura & Stop Spiraling (Free)" },
    description:
      "Woke up with negative aura? Vent what's draining you → get a brutally honest AI wake-up call & step-by-step vibe recharge in seconds. Free & no sign-up →",
    keywords: [
      "mood reset ai",
      "fix bad mood",
      "vibe recharge",
      "brutal motivation",
      "mood reset app",
      "emotional support AI",
      "gen-z therapist bot",
      "vibe reset app",
      "instant mood fix",
      "ai mental wellness",
      "fix negative aura",
    ],
    alternates: {
      canonical: `${baseUrl}/en/mood-reset`,
      languages: {
        en: `${baseUrl}/en/mood-reset`,
        tr: `${baseUrl}/tr/mood-reset`,
        "x-default": `${baseUrl}/en/mood-reset`,
      },
    },
    openGraph: {
      title: "Mood Reset AI — Fix Negative Aura & Recharge Your Vibe | VibeCheckr",
      description:
        "Having a rough day? Get a brutally honest AI wake-up call to stop spiraling and reset your energy instantly. 100% free!",
      url: `${baseUrl}/en/mood-reset`,
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
    slug: "mood-reset",
    lang,
    name: isTr ? "Mood Reset Yapay Zeka" : "Mood Reset AI",
    breadcrumbName: isTr ? "Mod Sıfırlama" : "Mood Reset",
    description: isTr
      ? "Eksi aurayı ve aşırı düşünme sarmalını kırmak için acımasızca dürüst aksiyon adımları sunan ücretsiz yapay zeka mod sıfırlama aracı."
      : "Free AI mood reset tool delivering a tough-love wake-up call and actionable steps to break overthinking spirals and recharge your aura.",
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
