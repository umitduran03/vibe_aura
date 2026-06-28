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
      title: "Situationship Netleştirici (YZ) — Sinyalleri Çöz | VibeCheckr",
      description: "Aranızdaki durumu anlamıyor musun? Yapay zeka situationship'ini netleştirsin. Acımasız uyum istatistiklerini al ve 'Biz neyiz?' gizemini anında çöz.",
      keywords: ["situationship nedir","biz neyiz testi","karışık sinyaller","ilişki analizi"],
      alternates: {
        canonical: `${baseUrl}/tr/situationship-clarifier`,
        languages: {
          en: `${baseUrl}/en/situationship-clarifier`,
          tr: `${baseUrl}/tr/situationship-clarifier`,
          "x-default": `${baseUrl}/en/situationship-clarifier`,
        },
      },
      openGraph: {
        title: "Situationship Netleştirici (YZ) — Sinyalleri Çöz",
        description: "Aranızdaki durumu anlamıyor musun? Yapay zeka situationship'ini netleştirsin. Acımasız uyum istatistiklerini al ve 'Biz neyiz?' gizemini anında çöz.",
        url: `${baseUrl}/tr/situationship-clarifier`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Situationship Clarifier AI — Decode the Mixed Signals | VibeCheckr",
    description: "Confused about what you are? Let our AI clarify your situationship. Get brutal compatibility stats and decode the 'What are we?' mystery instantly.",
    keywords: ["situationship clarifier","decode mixed signals","what are we test","situationship ai"],
    alternates: {
      canonical: `${baseUrl}/en/situationship-clarifier`,
      languages: {
        en: `${baseUrl}/en/situationship-clarifier`,
        tr: `${baseUrl}/tr/situationship-clarifier`,
        "x-default": `${baseUrl}/en/situationship-clarifier`,
      },
    },
    openGraph: {
      title: "Situationship Clarifier AI — Decode the Mixed Signals",
      description: "Confused about what you are? Let our AI clarify your situationship. Get brutal compatibility stats and decode the 'What are we?' mystery instantly.",
      url: `${baseUrl}/en/situationship-clarifier`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
