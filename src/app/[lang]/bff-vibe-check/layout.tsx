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
      description: "İki fotoğraf yükle ve yapay zeka en yakın arkadaşınla (BFF) aranızdaki kaos seviyesini, gizli rolleri ve dedikodu uyumunuzu ortaya çıkarsın.",
      keywords: ["bff vibe check","kanka uyumu","en yakın arkadaş testi","yapay zeka arkadaşlık"],
      alternates: {
        canonical: `${baseUrl}/tr/bff-vibe-check`,
        languages: {
          en: `${baseUrl}/en/bff-vibe-check`,
          tr: `${baseUrl}/tr/bff-vibe-check`,
          "x-default": `${baseUrl}/en/bff-vibe-check`,
        },
      },
      openGraph: {
        title: "BFF Vibe Check & Kanka Uyumu (YZ)",
        description: "İki fotoğraf yükle ve yapay zeka en yakın arkadaşınla (BFF) aranızdaki kaos seviyesini, gizli rolleri ve dedikodu uyumunuzu ortaya çıkarsın.",
        url: `${baseUrl}/tr/bff-vibe-check`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "BFF Vibe Check & Friendship Compatibility AI | VibeCheckr",
    description: "Upload two photos and let AI reveal your chaos level, hidden roles, and gossip synergy with your best friend.",
    keywords: ["bff vibe check","best friend compatibility","friendship ai test","duo vibe"],
    alternates: {
      canonical: `${baseUrl}/en/bff-vibe-check`,
      languages: {
        en: `${baseUrl}/en/bff-vibe-check`,
        tr: `${baseUrl}/tr/bff-vibe-check`,
        "x-default": `${baseUrl}/en/bff-vibe-check`,
      },
    },
    openGraph: {
      title: "BFF Vibe Check & Friendship Compatibility AI",
      description: "Upload two photos and let AI reveal your chaos level, hidden roles, and gossip synergy with your best friend.",
      url: `${baseUrl}/en/bff-vibe-check`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
