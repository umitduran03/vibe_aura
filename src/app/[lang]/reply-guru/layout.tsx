import type { Metadata } from "next";
import { buildToolJsonLd } from "@/lib/seo-schema";

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
      title: "Mesaja Ne Cevap Yazılır? YZ Rizz & Mesaj Cevap Üretici (Reply Guru)",
      description:
        "'Buna ne yazsam?' derdi bitti! WhatsApp veya Instagram DM ekran görüntüsünü at → yapay zeka flörtöz, cool, toksik veya güvenli cevabı 3 saniyede yazsın. Ücretsiz & hesapsız →",
      keywords: [
        "mesaja ne cevap yazılır",
        "nasıl cevap verilir",
        "reply guru",
        "rizz ai türkçe",
        "yapay zeka mesaj cevabı",
        "flörtöz mesaj oluşturucu",
        "kuru mesaja cevap",
        "toksik cevap oluşturucu",
        "ai rizz uygulaması",
        "sohbet ekran görüntüsü cevap üretici",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/reply-guru`,
        languages: {
          en: `${baseUrl}/en/reply-guru`,
          tr: `${baseUrl}/tr/reply-guru`,
          "x-default": `${baseUrl}/en/reply-guru`,
        },
      },
      openGraph: {
        title: "Reply Guru (Rizz YZ) — Mükemmel Mesaj Cevabını Üret | VibeCheckr",
        description:
          "Sohbet ekran görüntüsünü yükle → flörtöz, cool, toksik veya güvenli en iyi cevabı 3 saniyede al! Ücretsiz & hesapsız.",
        url: `${baseUrl}/tr/reply-guru`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "AI Text Reply & Rizz Generator — What to Text Back Free (Reply Guru)",
    description:
      "Stuck on what to text back? Upload a chat screenshot → Reply Guru AI crafts the smoothest flirty, cool, savage, or safe reply in 3 seconds. 100% free, no sign-up →",
    keywords: [
      "ai text reply generator",
      "what to text back ai",
      "rizz ai generator",
      "text reply generator",
      "how to reply to dry texts",
      "flirty response generator",
      "ai rizz app",
      "reply guru",
      "chat screenshot reply generator",
      "toxic reply generator",
    ],
    alternates: {
      canonical: `${baseUrl}/en/reply-guru`,
      languages: {
        en: `${baseUrl}/en/reply-guru`,
        tr: `${baseUrl}/tr/reply-guru`,
        "x-default": `${baseUrl}/en/reply-guru`,
      },
    },
    openGraph: {
      title: "Reply Guru AI — Free Rizz & Text Reply Generator | VibeCheckr",
      description:
        "Upload your chat screenshot → get instant flirty, cool, or savage text replies crafted by AI. 100% free & no sign-up!",
      url: `${baseUrl}/en/reply-guru`,
      siteName: "VibeCheckr",
      type: "website",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  const isTr = lang === "tr";
  const jsonLd = buildToolJsonLd({
    slug: "reply-guru",
    lang,
    name: isTr ? "Mesaj Gurusu (Reply Guru YZ)" : "The Reply Guru — AI Rizz Assistant",
    breadcrumbName: isTr ? "Mesaj Gurusu" : "Reply Guru",
    description: isTr
      ? "Sohbet ekran görüntülerinden flörtöz, cool, toksik veya güvenli hazır mesaj cevapları üreten ücretsiz Rizz yapay zeka asistanı."
      : "Free AI rizz and texting assistant that reads chat screenshots to generate tailored flirty, cool, savage, or safe replies.",
  });

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
