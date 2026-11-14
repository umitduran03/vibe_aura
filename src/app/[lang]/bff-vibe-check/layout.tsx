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
      title: { absolute: "Arkadaşlık Testi & BFF Kanka Uyumu — En İyi Arkadaş Testi (YZ)" },
      description:
        "Gerçek dost musunuz? Ücretsiz yapay zeka arkadaşlık testi ve BFF kanka uyumu! İki fotoğraf yükle; arkadaşlık puanınızı, kaos seviyenizi ve gizli dinamikleri gör.",
      keywords: [
        "arkadaşlık testi",
        "en iyi arkadaş testi",
        "en yakın arkadaş uyum testi",
        "kanka testi",
        "bff vibe check",
        "kanka uyumu testi",
        "yapay zeka arkadaşlık",
        "bff uyum analizi",
        "iki fotoğraf uyum testi",
        "dedikodu uyumu testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/bff-vibe-check`,
        languages: {
          en: `${baseUrl}/en/bff-vibe-check`,
          tr: `${baseUrl}/tr/bff-vibe-check`,
          "x-default": `${baseUrl}/en/bff-vibe-check`,
        },
      },
      openGraph: {
        title: "BFF Vibe Check — Kanka Uyumu & Arkadaşlık Testi | VibeCheckr",
        description:
          "İki fotoğraf yükle → BFF kaos seviyenizi, gizli rollerinizi ve dedikodu uyumunuzu anında öğrenin. Ücretsiz & hesapsız!",
        url: `${baseUrl}/tr/bff-vibe-check`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "BFF Vibe Check — Free AI Best Friend Quiz & Friendship Test" },
    description:
      "Are you real besties or chaotic duo partners? Take the free AI BFF Vibe Check & friendship test with two photos to score your best friend compatibility 0-100.",
    keywords: [
      "bff vibe check",
      "best friend compatibility test",
      "friendship test",
      "best friend quiz",
      "friendship compatibility ai",
      "duo vibe check",
      "bff compatibility calculator",
      "ai friendship test",
      "best friend chaos level",
      "friendship synergy test",
    ],
    alternates: {
      canonical: `${baseUrl}/en/bff-vibe-check`,
      languages: {
        en: `${baseUrl}/en/bff-vibe-check`,
        tr: `${baseUrl}/tr/bff-vibe-check`,
        "x-default": `${baseUrl}/en/bff-vibe-check`,
      },
    },
    openGraph: {
      title: "BFF Vibe Check — Free AI Friendship Compatibility Test | VibeCheckr",
      description:
        "Upload two photos with your BFF → reveal your chaos level, hidden roles, and friendship synergy instantly. Free & no sign-up!",
      url: `${baseUrl}/en/bff-vibe-check`,
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
    slug: "bff-vibe-check",
    lang,
    name: isTr
      ? "BFF Vibe Check & Kanka Uyumu (YZ)"
      : "BFF Vibe Check & Friendship Compatibility AI",
    breadcrumbName: isTr ? "BFF Kanka Uyumu" : "BFF Vibe Check",
    description: isTr
      ? "İki fotoğraf yükleyerek en yakın arkadaşınla kaos seviyenizi, gizli rollerinizi ve kanka uyum skorunuzu ölçen ücretsiz yapay zeka testi."
      : "Free two-photo AI friendship compatibility test revealing chaos rating, hidden duo roles, and best-friend synergy.",
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
