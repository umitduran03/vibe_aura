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
      description:
        "Platonik aşkınla aranızda gerçekten bir kıvılcım var mı, yoksa hepsi senin kafanda mı? İki fotoğraf yükle, yapay zeka delulu seviyeni ölçsün.",
      keywords: [
        "crush uyumu testi",
        "platonik aşk testi",
        "hoşlandığım kişi beni seviyor mu",
        "delulu testi",
        "yapay zeka ilişki uyumu",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/crush-calculator`,
        languages: {
          en: `${baseUrl}/en/crush-calculator`,
          tr: `${baseUrl}/tr/crush-calculator`,
          "x-default": `${baseUrl}/en/crush-calculator`,
        },
      },
      openGraph: {
        title: "Crush Uyumu & Platonik Aşk Testi | VibeCheckr",
        description: "Aranızdaki enerji gerçek mi yoksa tamamen delulu musun? YZ ile öğren.",
        url: `${baseUrl}/tr/crush-calculator`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "AI Crush Compatibility Calculator | VibeCheckr",
    description:
      "Is there a real spark between you and your crush, or is it all in your head? Test your compatibility with our AI and get a reality check.",
    keywords: [
      "crush compatibility test",
      "does my crush like me quiz",
      "delulu check ai",
      "ai relationship compatibility",
      "crush calculator",
    ],
    alternates: {
      canonical: `${baseUrl}/en/crush-calculator`,
      languages: {
        en: `${baseUrl}/en/crush-calculator`,
        tr: `${baseUrl}/tr/crush-calculator`,
        "x-default": `${baseUrl}/en/crush-calculator`,
      },
    },
    openGraph: {
      title: "AI Crush Compatibility Calculator | VibeCheckr",
      description: "Upload two photos and let AI analyze the platonic energy between you and your crush.",
      url: `${baseUrl}/en/crush-calculator`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function CrushCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
