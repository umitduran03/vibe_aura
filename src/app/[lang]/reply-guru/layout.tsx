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
      title: "Reply Guru (YZ) — Mükemmel Cevabı Üret | VibeCheckr",
      description: "Akıl oyunları mı? Kazandın. Ekran görüntüsünü at, yapay zeka senin için mükemmel toksik, havalı veya güvenli cevabı yazsın. Mesajlaşma stresine son.",
      keywords: ["nasıl cevap verilir","reply guru","toksik cevap oluşturucu","mesaj taktikleri"],
      alternates: {
        canonical: `${baseUrl}/tr/reply-guru`,
        languages: {
          en: `${baseUrl}/en/reply-guru`,
          tr: `${baseUrl}/tr/reply-guru`,
          "x-default": `${baseUrl}/en/reply-guru`,
        },
      },
      openGraph: {
        title: "Reply Guru (YZ) — Mükemmel Cevabı Üret",
        description: "Akıl oyunları mı? Kazandın. Ekran görüntüsünü at, yapay zeka senin için mükemmel toksik, havalı veya güvenli cevabı yazsın. Mesajlaşma stresine son.",
        url: `${baseUrl}/tr/reply-guru`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "The Reply Guru AI — Craft the Perfect Text | VibeCheckr",
    description: "Mind games? Won. Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
    keywords: ["reply guru ai","what to text back","toxic reply generator","rizz text ai"],
    alternates: {
      canonical: `${baseUrl}/en/reply-guru`,
      languages: {
        en: `${baseUrl}/en/reply-guru`,
        tr: `${baseUrl}/tr/reply-guru`,
        "x-default": `${baseUrl}/en/reply-guru`,
      },
    },
    openGraph: {
      title: "The Reply Guru AI — Craft the Perfect Text",
      description: "Mind games? Won. Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
      url: `${baseUrl}/en/reply-guru`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
