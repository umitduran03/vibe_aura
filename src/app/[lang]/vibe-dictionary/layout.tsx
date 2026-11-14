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
      title: { absolute: "Vibe Check, Rizz, Ick & Delulu Ne Demek? Gen-Z Vibe Sözlüğü" },
      description:
        "Vibe check ne demek? Ick nedir, rizz, 0 rizz, delulu, hard launch ve situationship ne anlama gelir? 300+ terimlik Türkçe Gen-Z sosyal medya ve flört sözlüğü.",
      keywords: [
        "vibe check ne demek",
        "ick nedir",
        "ick ne demek",
        "hard launch ne demek",
        "soft launch ne demek",
        "rizz ne demek",
        "0 rizz ne demek",
        "delulu ne demek",
        "situationship ne demek",
        "red flag ne demek",
        "beige flag ne demek",
        "orbiting ne demek",
        "gen-z sözlük",
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
    title: { absolute: "Vibe Check, Rizz, 0 Rizz & Ick Meaning — Gen-Z Slang Dictionary" },
    description:
      "What does vibe check, 0 rizz, no rizz, the ick, delulu, or hard launch mean? Explore 300+ Gen-Z slang & dating terms in our Urban Dictionary style Vibe Guide.",
    keywords: [
      "vibe check meaning",
      "urban dictionary vibe check",
      "0 rizz meaning",
      "no rizz meaning",
      "what is an ick",
      "ick meaning",
      "what does delulu mean",
      "rizz definition",
      "situationship meaning",
      "aura points meaning",
      "hard launch meaning",
      "gen z slang dictionary",
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
