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
      description:
        "Arkadaşınla aura savaşına gir! İki fotoğrafı yükle, yapay zeka kimin aura puanının daha yüksek olduğuna karar versin. Vibe checker panel ile arkadaş grubundaki tartışmayı bitir.",
      keywords: [
        "aura savaşı",
        "aura battle",
        "vibe savaşı",
        "vibe checker panel",
        "kim daha cool",
        "aura puanı",
        "aura battle kim kazanır",
        "arkadaş grubu roast",
        "yapay zeka vibe check",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/aura-battle`,
        languages: {
          en: `${baseUrl}/en/aura-battle`,
          tr: `${baseUrl}/tr/aura-battle`,
          "x-default": `${baseUrl}/en/aura-battle`,
        },
      },
      openGraph: {
        title: "Aura Savaşı — Kim Daha Cool? | VibeCheckr",
        description:
          "İki fotoğrafı yükle, yapay zeka kimin aura puanının daha yüksek olduğuna karar versin. Arkadaş grubundaki tartışmayı bitir.",
        url: `${baseUrl}/tr/aura-battle`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Aura Battle — Who Has Higher Aura? AI Vibe Comparison | VibeCheckr",
    description:
      "Who is cooler? Upload two photos and let the AI battle your auras. Find out who has real main character energy and who is secretly an NPC. Free aura comparison tool.",
    keywords: [
      "aura battle",
      "who has higher aura",
      "who is cooler ai",
      "vibe checker panel",
      "aura rating",
      "aura battle who is cooler",
      "friend group roast",
      "vibe compatibility",
      "aura points comparison",
      "main character energy test",
    ],
    alternates: {
      canonical: `${baseUrl}/en/aura-battle`,
      languages: {
        en: `${baseUrl}/en/aura-battle`,
        tr: `${baseUrl}/tr/aura-battle`,
        "x-default": `${baseUrl}/en/aura-battle`,
      },
    },
    openGraph: {
      title: "Aura Battle — Who Has Higher Aura? | VibeCheckr",
      description:
        "Upload two photos and let the AI decide who has more main character energy. The winner takes the crown, the loser gets brutally roasted.",
      url: `${baseUrl}/en/aura-battle`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function AuraBattleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
