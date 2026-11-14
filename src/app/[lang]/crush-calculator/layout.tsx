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
      title: { absolute: "Benden Hoşlanıyor mu? Platonik Aşk & Crush Uyum Testi (Ücretsiz)" },
      description:
        "Acaba benden hoşlanıyor mu? Ücretsiz yapay zeka platonik aşk testi ve crush uyum hesaplayıcı! 2 fotoğraf yükle, aranızdaki gizli çekimi ve oluru öğren.",
      keywords: [
        "benden hoşlanıyor mu testi",
        "platonik aşk testi",
        "bana aşık mı testi",
        "crush uyumu",
        "benden hoşlanıyor mu",
        "yapay zeka aşk testi",
        "crush yüzdesi hesaplama",
        "fotoğraftan aşk ölçer",
        "aşk uyumu testi",
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
    title: { absolute: "Crush Calculator AI — Does My Crush Like Me? Free 2-Photo Test" },
    description:
      "Does my crush like me back? Upload two photos to the free AI Crush Calculator for a 0-100 romantic chemistry score, green/red flags, and first-move advice.",
    keywords: [
      "crush calculator",
      "does my crush like me test",
      "is he into me test",
      "do they like me test",
      "photo love calculator",
      "ai love compatibility test",
      "crush percentage calculator",
      "crush compatibility ai",
      "platonic love test",
      "signs my crush likes me test",
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
