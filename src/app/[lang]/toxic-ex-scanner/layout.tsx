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
      title: "Toksik Ex Tarayıcı (YZ) — Red Flag'leri İfşa Et | VibeCheckr",
      description: "Eski sevgilinin fotoğrafını yükle ve yapay zeka red flag'lerini ve toksik özelliklerini acımasızca ifşa etsin. Ona mesaj atmayı bırak.",
      keywords: ["toksik eski sevgili","red flag testi","eski sevgili analizi","toksik ilişki"],
      alternates: {
        canonical: `${baseUrl}/tr/toxic-ex-scanner`,
        languages: {
          en: `${baseUrl}/en/toxic-ex-scanner`,
          tr: `${baseUrl}/tr/toxic-ex-scanner`,
          "x-default": `${baseUrl}/en/toxic-ex-scanner`,
        },
      },
      openGraph: {
        title: "Toksik Ex Tarayıcı (YZ) — Red Flag'leri İfşa Et",
        description: "Eski sevgilinin fotoğrafını yükle ve yapay zeka red flag'lerini ve toksik özelliklerini acımasızca ifşa etsin. Ona mesaj atmayı bırak.",
        url: `${baseUrl}/tr/toxic-ex-scanner`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Toxic Ex Scanner AI — Expose Their Red Flags | VibeCheckr",
    description: "Upload a photo of your ex and let our AI scanner brutally expose their red flags and toxic traits. Free, instant, and savage. Stop texting them back.",
    keywords: ["toxic ex scanner","red flag detector ai","ex boyfriend red flags","ex girlfriend red flags","toxic relationship test"],
    alternates: {
      canonical: `${baseUrl}/en/toxic-ex-scanner`,
      languages: {
        en: `${baseUrl}/en/toxic-ex-scanner`,
        tr: `${baseUrl}/tr/toxic-ex-scanner`,
        "x-default": `${baseUrl}/en/toxic-ex-scanner`,
      },
    },
    openGraph: {
      title: "Toxic Ex Scanner AI — Expose Their Red Flags",
      description: "Upload a photo of your ex and let our AI scanner brutally expose their red flags and toxic traits. Free, instant, and savage. Stop texting them back.",
      url: `${baseUrl}/en/toxic-ex-scanner`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
