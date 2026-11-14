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
      title: { absolute: "Sıkça Sorulan Sorular (S.S.S) — Ücretsiz YZ Vibe & Aura Testi" },
      description:
        "VibeCheckr ücretsiz mi, fotoğraflar siliniyor mu? Ruh eşi testi (portresi), delulu check, rizz mesaj üretici ve 0–100 aura skoru hakkında tüm yanıtlar.",
      keywords: [
        "vibecheckr sss",
        "vibecheckr nedir",
        "yapay zeka vibe testi",
        "vibe check ne demek",
        "ücretsiz vibe check testi",
        "ruh eşi testi nasıl yapılır",
        "ruh eşi portresi nedir",
        "delulu check nedir",
        "mesaja ne cevap yazılır",
        "fotoğraf gömme ai",
        "aura analizi nasıl yapılır",
        "vibecheckr güvenli mi",
        "fotoğraflar kaydediliyor mu",
        "ücretsiz aura testi",
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
        title: "Sıkça Sorulan Sorular (S.S.S) — Ücretsiz YZ Vibe Testi | VibeCheckr",
        description:
          "VibeCheckr ücretsiz mi, fotoğraflar kaydedilir mi, yapay zeka auranı nasıl okur? Merak edilen tüm soruların net yanıtları.",
        url: `${baseUrl}/tr/faq`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "FAQ — Free AI Vibe Check Test, Soulmate Radar & Delulu Check" },
    description:
      "Is VibeCheckr free without signing up? Are selfies or chats stored? Answers on our AI vibe checker, soulmate radar, delulu test, rizz reply & 0–100 aura score.",
    keywords: [
      "vibecheckr faq",
      "ai vibe check questions",
      "vibe checker faq",
      "vibe check test help",
      "delulu check app faq",
      "soulmate radar faq",
      "rizz reply generator help",
      "photo roast app help",
      "ai personality analysis faq",
      "zodiac compatibility questions",
      "is vibecheckr free",
      "is vibecheckr safe",
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
      title: "FAQ — Free AI Vibe Check, Aura Score & Privacy | VibeCheckr",
      description:
        "Everything you need to know about VibeCheckr: 1-Click Guest Mode, zero photo storage, 0–100 aura scoring, and chat red flag tools.",
      url: `${baseUrl}/en/faq`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
