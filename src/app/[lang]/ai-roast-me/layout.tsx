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
      title: "Yapay Zeka (AI) Fotoğraf Gömmesi & Vibe Check | VibeCheckr",
      description: "Bir selfie yükle ve yapay zekanın acımasız gerçeklerle yüzleşmeni sağlamasına izin ver. En dürüst AI vibe check ve aura analizi uygulaması.",
      keywords: ["yapay zeka fotoğraf gömme","vibe check uygulaması","ai roast","aura analizi"],
      alternates: {
        canonical: `${baseUrl}/tr/ai-roast-me`,
        languages: {
          en: `${baseUrl}/en/ai-roast-me`,
          tr: `${baseUrl}/tr/ai-roast-me`,
          "x-default": `${baseUrl}/en/ai-roast-me`,
        },
      },
      openGraph: {
        title: "Yapay Zeka (AI) Fotoğraf Gömmesi & Vibe Check",
        description: "Bir selfie yükle ve yapay zekanın acımasız gerçeklerle yüzleşmeni sağlamasına izin ver. En dürüst AI vibe check ve aura analizi uygulaması.",
        url: `${baseUrl}/tr/ai-roast-me`,
        type: "website",
        locale: "tr_TR",
      },
    };
  }

  return {
    title: "AI Roast Me & Photo Vibe Check | VibeCheckr",
    description: "Upload a selfie and let the AI roast you with brutal facts. The most honest AI vibe check and aura analysis app.",
    keywords: ["ai roast me","vibe check app","ai photo roast","aura analysis"],
    alternates: {
      canonical: `${baseUrl}/en/ai-roast-me`,
      languages: {
        en: `${baseUrl}/en/ai-roast-me`,
        tr: `${baseUrl}/tr/ai-roast-me`,
        "x-default": `${baseUrl}/en/ai-roast-me`,
      },
    },
    openGraph: {
      title: "AI Roast Me & Photo Vibe Check",
      description: "Upload a selfie and let the AI roast you with brutal facts. The most honest AI vibe check and aura analysis app.",
      url: `${baseUrl}/en/ai-roast-me`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
