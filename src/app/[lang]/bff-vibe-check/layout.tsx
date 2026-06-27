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
      title: "BFF Vibe Check & Kanka Uyumu (YZ) | VibeCheckr",
      description:
        "İki fotoğraf yükle ve yapay zeka en yakın arkadaşınla (BFF) aranızdaki kaos seviyesini, gizli rolleri ve dedikodu uyumunuzu ortaya çıkarsın.",
      keywords: [
        "bff testi",
        "kanka uyumu testi",
        "arkadaşlık testi yapay zeka",
        "vibe check arkadaş",
        "en yakın arkadaş testi",
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
        title: "BFF Vibe Check & Kanka Uyumu | VibeCheckr",
        description: "En yakın arkadaşınla aranızdaki yıkıcı enerjiyi ve dedikodu potansiyelini YZ ile ölç.",
        url: `${baseUrl}/tr/bff-vibe-check`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "BFF Vibe Check & Friendship Compatibility | VibeCheckr",
    description:
      "Upload two photos and let our AI calculate your friendship chaos level, secret group roles, and gossip sync with your best friend.",
    keywords: [
      "bff test",
      "best friend compatibility",
      "friendship test ai",
      "vibe check friend",
      "duo dynamic test",
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
      title: "BFF Vibe Check & Compatibility | VibeCheckr",
      description: "Measure the exact percentage of destructive energy you emit when together with your BFF.",
      url: `${baseUrl}/en/bff-vibe-check`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function BffVibeCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
