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
      title: { absolute: "Situationship Testi — Biz Şimdi Neyiz & Flört Analizi (Ücretsiz)" },
      description:
        "Biz şimdi neyiz? Belirsiz ilişki (situationship) testi ile seni oyalıyor mu yoksa ciddi mi öğren! Mesaj veya fotoğraf yükle, yapay zeka niyetini çözsün.",
      keywords: [
        "situationship testi",
        "biz şimdi neyiz testi",
        "beni ciddi düşünüyor mu testi",
        "beni oyalıyor mu",
        "flört mü sevgili mi testi",
        "situationship nedir",
        "situationship ne demek",
        "biz neyiz testi",
        "karışık sinyaller testi",
        "belirsiz ilişki analizi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/situationship-clarifier`,
        languages: {
          en: `${baseUrl}/en/situationship-clarifier`,
          tr: `${baseUrl}/tr/situationship-clarifier`,
          "x-default": `${baseUrl}/en/situationship-clarifier`,
        },
      },
      openGraph: {
        title: "Situationship Çözücü — Biz Neyiz Testi (Ücretsiz YZ) | VibeCheckr",
        description:
          "Karışık sinyalleri çöz, ilişkinin nereye gittiğini 0–100 netlik skoruyla anında gör! Ücretsiz & hesapsız.",
        url: `${baseUrl}/tr/situationship-clarifier`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Situationship Test & Clarifier AI — Free 'What Are We?' Decoder" },
    description:
      "Stuck in a situationship asking 'what are we?' Take the free AI Situationship Test & Clarifier! Decode mixed signals, breadcrumbing, and true intentions fast.",
    keywords: [
      "situationship test",
      "situationship clarifier",
      "what are we quiz",
      "what are we test",
      "is he stringing me along",
      "what is a situationship",
      "situationship or relationship",
      "decode mixed signals",
      "am i in a situationship",
      "situationship quiz free",
    ],
    alternates: {
      canonical: `${baseUrl}/en/situationship-clarifier`,
      languages: {
        en: `${baseUrl}/en/situationship-clarifier`,
        tr: `${baseUrl}/tr/situationship-clarifier`,
        "x-default": `${baseUrl}/en/situationship-clarifier`,
      },
    },
    openGraph: {
      title: "Situationship Clarifier AI — Decode 'What Are We?' | VibeCheckr",
      description:
        "Upload texts or describe your talking stage → AI exposes breadcrumbing, mixed signals, and real commitment odds for free!",
      url: `${baseUrl}/en/situationship-clarifier`,
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
    slug: "situationship-clarifier",
    lang,
    name: isTr ? "Situationship Netleştirici YZ" : "Situationship Clarifier AI",
    breadcrumbName: isTr ? "Situationship Çözücü" : "Situationship Clarifier",
    description: isTr
      ? "'Biz neyiz?' belirsizliğini, karışık sinyalleri ve bağlanma ihtimalini mesajlardan analiz eden ücretsiz yapay zeka aracı."
      : "Free AI situationship analyzer that decodes mixed signals, breadcrumbing, and emotional availability to answer 'What are we?'.",
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
