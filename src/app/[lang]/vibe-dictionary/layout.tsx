import type { Metadata } from "next";

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
      title: "Vibe Sözlüğü — Gen-Z Argosunu Öğren: Vibe Check Ne Demek? | VibeCheckr",
      description:
        "Vibe check ne demek? Ick nedir? Rizz ne anlama gelir? Gen-Z slang ve internet jargonunun tam sözlüğü. Red flag, delulu, situationship ve daha fazlasını öğren.",
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
        title: "Vibe Sözlüğü — Vibe Check Ne Demek? Gen-Z Argot Rehberi | VibeCheckr",
        description:
          "Vibe check ne demek, ick nedir, rizz nedir? Gen-Z internet jargonunun tam sözlüğü VibeCheckr'da.",
        url: `${baseUrl}/tr/vibe-dictionary`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Vibe Dictionary — Gen-Z Slang & Vibe Check Meaning Explained | VibeCheckr",
    description:
      "What does vibe check mean? What is an ick? Complete Gen-Z slang dictionary: rizz, red flag, situationship, delulu, aura points, main character energy and more — all explained.",
    keywords: [
      "vibe check meaning",
      "what does vibe check mean",
      "what is an ick",
      "ick meaning",
      "gen-z slang dictionary",
      "rizz meaning",
      "what is rizz",
      "red flag meaning",
      "situationship meaning",
      "delulu meaning",
      "aura points meaning",
      "gen-z glossary",
      "vibe check definition",
      "internet slang explained",
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
      title: "Vibe Dictionary — What Does Vibe Check Mean? | VibeCheckr",
      description:
        "What does vibe check mean? What is an ick? Complete Gen-Z slang dictionary with rizz, red flag, situationship, delulu, aura points & more.",
      url: `${baseUrl}/en/vibe-dictionary`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function VibeDictionaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
