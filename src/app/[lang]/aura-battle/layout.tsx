import type { Metadata } from "next";
import { featureSeoData } from "@/lib/seo-feature-data";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  const featureData = featureSeoData["aura-battle"]?.[isTr ? "tr" : "en"];
  let faqJsonLd = null;
  if (featureData?.faq?.questions) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: featureData.faq.questions.map((q: any) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr ? "Aura Savaşı YZ — Kim Daha Cool?" : "Aura Battle AI — Who Has More Aura?",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    description: isTr
      ? "Arkadaşınla aura savaşına gir! İki fotoğrafı yükle, yapay zeka kimin aura puanının daha yüksek olduğuna karar versin."
      : "Enter an aura battle with your friend! Upload two photos and let the AI decide who has a higher aura score.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  if (isTr) {
    return {
      title: "Aura Savaşı — Kim Daha Cool? Yapay Zeka Aura Battle | VibeCheckr",
      description: "Arkadaşınla aura savaşına gir! İki fotoğrafı yükle, yapay zeka kimin aura puanının daha yüksek olduğuna karar versin. Arkadaş grubundaki tartışmayı bitir.",
      keywords: ["aura savaşı", "kim daha cool", "aura puanı karşılaştırma", "aura battle yapay zeka", "arkadaş aura testi"],
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
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
      other: {
        "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
      },
    };
  }

  return {
    title: "Aura Battle — Who is Cooler? AI Aura Clash | VibeCheckr",
    description: "Enter an aura battle with your friend! Upload two photos and let the AI decide who has a higher aura score. End the debate in your group chat.",
    keywords: ["aura battle", "who has more aura", "aura battle who is cooler", "aura score battle", "friend aura comparison ai", "aura points test", "aura fight"],
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
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    other: {
      "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
