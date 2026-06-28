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
      title: "Aura Savaşı — Kim Daha Cool? Yapay Zeka Aura Battle | VibeCheckr",
      description: "Arkadaşınla aura savaşına gir! İki fotoğrafı yükle, yapay zeka kimin aura puanının daha yüksek olduğuna karar versin. Arkadaş grubundaki tartışmayı bitir.",
      keywords: ["aura savaşı","kim daha cool","aura battle yapay zeka","aura puanı"],
      alternates: {
        canonical: `${baseUrl}/tr/aura-battle`,
        languages: {
          en: `${baseUrl}/en/aura-battle`,
          tr: `${baseUrl}/tr/aura-battle`,
          "x-default": `${baseUrl}/en/aura-battle`,
        },
      },
      openGraph: {
        title: "Aura Savaşı — Kim Daha Cool? Yapay Zeka Aura Battle",
        description: "Arkadaşınla aura savaşına gir! İki fotoğrafı yükle, yapay zeka kimin aura puanının daha yüksek olduğuna karar versin. Arkadaş grubundaki tartışmayı bitir.",
        url: `${baseUrl}/tr/aura-battle`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Aura Battle — Who is Cooler? AI Aura Clash | VibeCheckr",
    description: "Enter an aura battle with your friend! Upload two photos and let the AI decide who has a higher aura score. End the debate in your group chat.",
    keywords: ["aura battle","who has more aura","ai vibe check match","aura score test"],
    alternates: {
      canonical: `${baseUrl}/en/aura-battle`,
      languages: {
        en: `${baseUrl}/en/aura-battle`,
        tr: `${baseUrl}/tr/aura-battle`,
        "x-default": `${baseUrl}/en/aura-battle`,
      },
    },
    openGraph: {
      title: "Aura Battle — Who is Cooler? AI Aura Clash",
      description: "Enter an aura battle with your friend! Upload two photos and let the AI decide who has a higher aura score. End the debate in your group chat.",
      url: `${baseUrl}/en/aura-battle`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
