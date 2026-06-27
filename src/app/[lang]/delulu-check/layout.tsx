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
      title: "Delulu Check — Delulu Muyum? Yapay Zeka Gerçeklik Testi | VibeCheckr",
      description:
        "Delulu check nedir? Karışık sinyaller mi alıyorsun? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap. O gerçekten seni seviyor mu, yoksa sen mi delusionalsın?",
      keywords: [
        "delulu check",
        "delulu check nedir",
        "delulu muyum",
        "delulu testi",
        "karışık sinyal",
        "çift mesaj atmak",
        "delulu ne demek",
        "gerçeklik testi yapay zeka",
        "beni seviyor mu",
        "delulucheck",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/delulu-check`,
        languages: {
          en: `${baseUrl}/en/delulu-check`,
          tr: `${baseUrl}/tr/delulu-check`,
          "x-default": `${baseUrl}/en/delulu-check`,
        },
      },
      openGraph: {
        title: "Delulu Check — Delulu Muyum? | VibeCheckr",
        description:
          "Karışık sinyaller mi alıyorsun? Çift mesaj atmadan önce yapay zeka gerçeklik testini yap. O gerçekten mi ilgileniyor?",
        url: `${baseUrl}/tr/delulu-check`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Am I Delulu? AI Delulu Check & Reality Test | VibeCheckr",
    description:
      "Am I delusional or are these real mixed signals? Take the free AI delulu check before you double text. Find out if you're being delulu or if they actually like you.",
    keywords: [
      "am i delulu",
      "am i delusional",
      "delulu check",
      "delulucheck",
      "mixed signals meaning",
      "am i delulu test",
      "delulu test",
      "should i text him",
      "should i text her",
      "texting advice ai",
      "reality check relationship",
    ],
    alternates: {
      canonical: `${baseUrl}/en/delulu-check`,
      languages: {
        en: `${baseUrl}/en/delulu-check`,
        tr: `${baseUrl}/tr/delulu-check`,
        "x-default": `${baseUrl}/en/delulu-check`,
      },
    },
    openGraph: {
      title: "Am I Delulu? AI Reality Check | VibeCheckr",
      description:
        "Drop the receipts and get an unfiltered AI reality check before you double text. Are you being delusional or do they actually like you?",
      url: `${baseUrl}/en/delulu-check`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function DeluluCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
