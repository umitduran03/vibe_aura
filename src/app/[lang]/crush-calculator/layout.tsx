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
      title: "Crush Uyumu & Platonik Aşk Testi (YZ) | VibeCheckr",
      description: "Platonik aşkınla aranızda gerçekten bir kıvılcım var mı, yoksa hepsi senin kafanda mı? İki fotoğraf yükle, yapay zeka delulu seviyeni ölçsün.",
      keywords: ["crush uyumu","platonik aşk testi","benden hoşlanıyor mu","yapay zeka aşk testi"],
      alternates: {
        canonical: `${baseUrl}/tr/crush-calculator`,
        languages: {
          en: `${baseUrl}/en/crush-calculator`,
          tr: `${baseUrl}/tr/crush-calculator`,
          "x-default": `${baseUrl}/en/crush-calculator`,
        },
      },
      openGraph: {
        title: "Crush Uyumu & Platonik Aşk Testi (YZ)",
        description: "Platonik aşkınla aranızda gerçekten bir kıvılcım var mı, yoksa hepsi senin kafanda mı? İki fotoğraf yükle, yapay zeka delulu seviyeni ölçsün.",
        url: `${baseUrl}/tr/crush-calculator`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "Crush Calculator & Platonic Love Test AI | VibeCheckr",
    description: "Is there a real spark, or is it all in your head? Upload two photos and let the AI measure your delulu level with your crush.",
    keywords: ["crush calculator","does my crush like me test","ai love test","delulu level"],
    alternates: {
      canonical: `${baseUrl}/en/crush-calculator`,
      languages: {
        en: `${baseUrl}/en/crush-calculator`,
        tr: `${baseUrl}/tr/crush-calculator`,
        "x-default": `${baseUrl}/en/crush-calculator`,
      },
    },
    openGraph: {
      title: "Crush Calculator & Platonic Love Test AI",
      description: "Is there a real spark, or is it all in your head? Upload two photos and let the AI measure your delulu level with your crush.",
      url: `${baseUrl}/en/crush-calculator`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
