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
      title: { absolute: "Situationship Çözücü — Biz Neyiz & Karışık Sinyal Testi (YZ)" },
      description:
        "'Biz şimdi neyiz?' diye sormadan önce mesajları yapay zekaya okut! Gerçek ilişkiye mi gidiyor yoksa yedek kulübesi mi? Ücretsiz & hesapsız öğren →",
      keywords: [
        "situationship nedir",
        "biz neyiz testi",
        "karışık sinyaller",
        "ilişki analizi",
        "situationship mi ilişki mi",
        "biz neyiz yapay zeka",
        "situationship testi ücretsiz",
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
    title: { absolute: "Situationship Clarifier AI — Free 'What Are We?' & Signal Test" },
    description:
      "In a talking stage or dead-end situationship? Paste texts or upload chat screenshots → AI decodes mixed signals & commitment odds. Free & no sign-up →",
    keywords: [
      "situationship clarifier",
      "what is a situationship",
      "situationship or relationship",
      "decode mixed signals",
      "what are we test",
      "situationship ai",
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
