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
      title: "Yapay Zeka İkili Uyum Testi — Kimyanızı Ölçün | VibeCheckr",
      description: "İki fotoğraf yükle ve yapay zeka ilişkinizin tam kimyasını, aura uyumunu ve romantik potansiyelini hesaplasın. Ücretsiz, anında ve acımasızca dürüst.",
      keywords: ["ikili uyum testi","ilişki kimyası","çift uyumu","yapay zeka aşk uyumu"],
      alternates: {
        canonical: `${baseUrl}/tr/duo-compatibility`,
        languages: {
          en: `${baseUrl}/en/duo-compatibility`,
          tr: `${baseUrl}/tr/duo-compatibility`,
          "x-default": `${baseUrl}/en/duo-compatibility`,
        },
      },
      openGraph: {
        title: "Yapay Zeka İkili Uyum Testi — Kimyanızı Ölçün",
        description: "İki fotoğraf yükle ve yapay zeka ilişkinizin tam kimyasını, aura uyumunu ve romantik potansiyelini hesaplasın. Ücretsiz, anında ve acımasızca dürüst.",
        url: `${baseUrl}/tr/duo-compatibility`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "AI Duo Compatibility Test — Check Your Chemistry | VibeCheckr",
    description: "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility. Free, instant, and brutally honest.",
    keywords: ["duo compatibility","relationship chemistry test","ai couple test","romantic compatibility"],
    alternates: {
      canonical: `${baseUrl}/en/duo-compatibility`,
      languages: {
        en: `${baseUrl}/en/duo-compatibility`,
        tr: `${baseUrl}/tr/duo-compatibility`,
        "x-default": `${baseUrl}/en/duo-compatibility`,
      },
    },
    openGraph: {
      title: "AI Duo Compatibility Test — Check Your Chemistry",
      description: "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility. Free, instant, and brutally honest.",
      url: `${baseUrl}/en/duo-compatibility`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
