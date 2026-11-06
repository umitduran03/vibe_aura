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
      title: "Crush Uyumu & Platonik Aşk Testi — Benden Hoşlanıyor mu? (Ücretsiz YZ)",
      description:
        "Gerçek bir kıvılcım var mı yoksa kafanda mı kuruyorsun? İki fotoğraf yükle, yapay zeka 0–100 crush uyum yüzdesini ve çekimi ölçsün! Hesapsız & ücretsiz →",
      keywords: [
        "crush uyumu",
        "platonik aşk testi",
        "benden hoşlanıyor mu",
        "yapay zeka aşk testi",
        "crush yüzdesi hesaplama",
        "delulu seviyesi testi",
        "crush analizi yapay zeka",
        "aşk uyumu testi",
        "crush vibe check",
        "platonik çekim testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/crush-calculator`,
        languages: {
          en: `${baseUrl}/en/crush-calculator`,
          tr: `${baseUrl}/tr/crush-calculator`,
          "x-default": `${baseUrl}/en/crush-calculator`,
        },
      },
      openGraph: {
        title: "Crush Uyumu & Platonik Aşk Testi (Ücretsiz YZ) | VibeCheckr",
        description:
          "İki fotoğraf yükle → yapay zeka platonik aşkınla 0–100 çekim yüzdesini ve delulu seviyeni anında hesaplasın!",
        url: `${baseUrl}/tr/crush-calculator`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "Crush Calculator AI — Does My Crush Like Me? Free 2-Photo Test",
    description:
      "Real spark or all in your head? Upload two photos → AI calculates your 0–100% crush compatibility, unspoken tension & delulu level. Free & no sign-up →",
    keywords: [
      "crush calculator",
      "does my crush like me test",
      "ai love compatibility test",
      "delulu level calculator",
      "crush percentage calculator",
      "crush compatibility ai",
      "do they like me test",
      "platonic love test",
      "ai crush analyzer",
      "crush vibe check",
    ],
    alternates: {
      canonical: `${baseUrl}/en/crush-calculator`,
      languages: {
        en: `${baseUrl}/en/crush-calculator`,
        tr: `${baseUrl}/tr/crush-calculator`,
        "x-default": `${baseUrl}/en/crush-calculator`,
      },
    },
    openGraph: {
      title: "Crush Calculator AI — Does My Crush Like Me? | VibeCheckr",
      description:
        "Upload two photos and let AI measure your 0–100% crush spark, attraction signs, and delulu score instantly. 100% free!",
      url: `${baseUrl}/en/crush-calculator`,
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
    slug: "crush-calculator",
    lang,
    name: isTr
      ? "Crush Uyumu & Platonik Aşk Testi (YZ)"
      : "Crush Calculator & Platonic Love Test AI",
    breadcrumbName: isTr ? "Platonik / Crush Testi" : "Crush Calculator",
    description: isTr
      ? "İki fotoğraftan platonik çekim yüzdesini, aura uyumunu ve delulu seviyesini hesaplayan ücretsiz yapay zeka aşk testi."
      : "Free AI crush compatibility calculator that analyzes two photos to score mutual spark, chemistry percentage, and delusion risk.",
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
