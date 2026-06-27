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
      title: "Sıkça Sorulan Sorular (S.S.S) | VibeCheckr YZ Vibe Testi",
      description:
        "VibeCheckr hakkında merak edilen her şey. Yapay zeka nasıl çalışır, fotoğraflar kaydedilir mi, aura testi ücretsiz mi? Tüm cevaplar burada.",
      keywords: [
        "vibecheckr sss",
        "yapay zeka vibe testi",
        "fotoğraf gömme",
        "aura analizi nasıl yapılır",
        "ücretsiz vibe check",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/faq`,
        languages: {
          en: `${baseUrl}/en/faq`,
          tr: `${baseUrl}/tr/faq`,
          "x-default": `${baseUrl}/en/faq`,
        },
      },
      openGraph: {
        title: "Sıkça Sorulan Sorular (S.S.S) | VibeCheckr",
        description:
          "VibeCheckr uygulaması hakkında tüm detaylar, gizlilik politikası ve yapay zekanın auranızı nasıl okuduğu hakkında bilgiler.",
        url: `${baseUrl}/tr/faq`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "FAQ — VibeCheckr AI Vibe Check & Photo Roast",
    description:
      "Frequently asked questions about VibeCheckr — the free AI-powered vibe check, photo roast, and personality analysis app. Learn about features, privacy, and how the AI reads your aura.",
    keywords: [
      "vibecheckr faq",
      "ai vibe check questions",
      "photo roast app help",
      "ai personality analysis faq",
      "zodiac compatibility questions",
    ],
    alternates: {
      canonical: `${baseUrl}/en/faq`,
      languages: {
        en: `${baseUrl}/en/faq`,
        tr: `${baseUrl}/tr/faq`,
        "x-default": `${baseUrl}/en/faq`,
      },
    },
    openGraph: {
      title: "FAQ — VibeCheckr AI Vibe Check & Photo Roast",
      description:
        "Everything you need to know about VibeCheckr. How the AI works, privacy, features, and more.",
      url: `${baseUrl}/en/faq`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
