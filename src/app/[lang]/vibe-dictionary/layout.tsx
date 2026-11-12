import type { Metadata } from "next";
import { buildDictionaryJsonLd } from "@/lib/seo-schema";

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
      title: { absolute: "Vibe Sözlüğü (300+ Terim) — Vibe Check, Ick & Rizz Ne Demek?" },
      description:
        "Vibe check ne demek? Ick nedir, delulu ve rizz ne anlama gelir? 300+ Gen-Z slang, ilişki terimi ve red flag sözlüğü (2026 güncel) → Ücretsiz keşfet!",
      keywords: [
        "vibe check ne demek",
        "ick nedir",
        "ick ne demek",
        "gen-z sözlük",
        "gen-z argot",
        "rizz ne demek",
        "red flag ne demek",
        "situationship ne demek",
        "delulu ne demek",
        "orbiting ne demek",
        "internet jargonu sözlüğü",
        "vibe ne demek",
        "vibe testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/vibe-dictionary`,
        languages: {
          en: `${baseUrl}/en/vibe-dictionary`,
          tr: `${baseUrl}/tr/vibe-dictionary`,
          "x-default": `${baseUrl}/en/vibe-dictionary`,
        },
      },
      openGraph: {
        title: "Vibe Sözlüğü (300+ Terim) — Vibe Check, Ick & Rizz Ne Demek? | VibeCheckr",
        description:
          "Vibe check ne demek, ick nedir, delulu ve situationship ne anlama gelir? 300+ Gen-Z internet jargonu teriminin tam sözlüğü.",
        url: `${baseUrl}/tr/vibe-dictionary`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Gen-Z Slang & Vibe Dictionary — Ick, Delulu & Rizz Meaning" },
    description:
      "What does vibe check mean? What is an ick, delulu, rizz, situationship, or aura points? Search 300+ modern Gen-Z dating & slang definitions free →",
    keywords: [
      "gen z slang dictionary",
      "what does delulu mean",
      "vibe meaning",
      "rizz definition",
      "slay meaning gen z",
      "gen z words 2026",
      "vibe check meaning",
      "what is an ick",
      "situationship meaning",
      "aura points meaning",
      "orbiting meaning dating",
    ],
    alternates: {
      canonical: `${baseUrl}/en/vibe-dictionary`,
      languages: {
        en: `${baseUrl}/en/vibe-dictionary`,
        tr: `${baseUrl}/tr/vibe-dictionary`,
        "x-default": `${baseUrl}/en/vibe-dictionary`,
      },
    },
    openGraph: {
      title: "Gen-Z Slang & Vibe Dictionary (300+ Terms) | VibeCheckr",
      description:
        "What does vibe check mean? Decode 300+ Gen-Z slang & dating terms: the ick, delulu, rizz, situationship, aura points & more.",
      url: `${baseUrl}/en/vibe-dictionary`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function VibeDictionaryLayout({ children, params }: Props) {
  const { lang } = await params;
  const jsonLd = buildDictionaryJsonLd(lang);

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
