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
      title: "Reply Guru (Rizz YZ) — Sohbet Ekran Görüntüsünden Hazır Cevap Üret",
      description:
        "'Buna ne yazsam?' derdi bitti! WhatsApp veya DM ekran görüntüsünü at → yapay zeka en cool, flörtöz veya güvenli cevabı saniyede yazsın. Ücretsiz & hesapsız →",
      keywords: [
        "nasıl cevap verilir",
        "reply guru",
        "toksik cevap oluşturucu",
        "mesaj taktikleri",
        "rizz ai türkçe",
        "yapay zeka mesaj cevabı",
        "flörtöz mesaj oluşturucu",
        "kuru mesaja cevap",
        "ai rizz uygulaması",
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
    title: "Reply Guru AI — Free Rizz & Text Reply Generator from Screenshots",
    description:
      "Stuck on what to text back? Drop a chat screenshot → AI crafts the smoothest flirty, cool, savage, or safe reply in 3 seconds. Free & no sign-up required →",
    keywords: [
      "rizz ai",
      "text reply generator",
      "how to reply to dry texts",
      "flirty response generator",
      "ai rizz",
      "reply guru app",
      "text game ai",
      "what to text back",
      "toxic reply generator",
      "chat screenshot reply ai",
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
