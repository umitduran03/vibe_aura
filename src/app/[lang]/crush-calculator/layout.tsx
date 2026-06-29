import type { Metadata } from "next";
import { featureSeoData } from "@/lib/seo-feature-data";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = "https://thevibecheckr.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  const featureData = featureSeoData["crush-calculator"]?.[isTr ? "tr" : "en"];
  let faqJsonLd = null;
  if (featureData?.faq?.questions) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: featureData.faq.questions.map((q: any) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTr
      ? "Crush Uyumu & Platonik Aşk Testi (YZ)"
      : "Crush Calculator & Platonic Love Test AI",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web, Android, iOS",
    url: isTr
      ? `${baseUrl}/tr/crush-calculator`
      : `${baseUrl}/en/crush-calculator`,
    description: isTr
      ? "Platonik aşkınla aranızda gerçekten bir kıvılcım var mı, yoksa hepsi senin kafanda mı? İki fotoğraf yükle, yapay zeka delulu seviyeni ölçsün."
      : "Is there a real spark, or is it all in your head? Upload two photos and let the AI measure your delulu level with your crush.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "VibeCheckr",
      url: baseUrl,
    },
  };

  if (isTr) {
    return {
      title: "Crush Uyumu & Platonik Aşk Testi (YZ) | VibeCheckr",
      description:
        "Platonik aşkınla aranızda gerçekten bir kıvılcım var mı, yoksa hepsi senin kafanda mı? İki fotoğraf yükle, yapay zeka delulu seviyeni ölçsün.",
      keywords: [
        "crush uyumu",
        "platonik aşk testi",
        "benden hoşlanıyor mu",
        "yapay zeka aşk testi",
        "crush yüzdesi hesaplama",
        "delulu seviyesi testi",
        "crush analizi yapay zeka",
        "aşk uyumu testi",
        "crush vibe check",
        "platonik çekim testi",
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
        title: "Crush Uyumu & Platonik Aşk Testi (YZ)",
        description:
          "Platonik aşkınla aranızda gerçekten bir kıvılcım var mı, yoksa hepsi senin kafanda mı? İki fotoğraf yükle, yapay zeka delulu seviyeni ölçsün.",
        url: `${baseUrl}/tr/crush-calculator`,
        type: "website",
        locale: "tr_TR",
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
      other: {
        "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
      },
    };
  }

  return {
    title: "Crush Calculator & Platonic Love Test AI | VibeCheckr",
    description:
      "Is there a real spark, or is it all in your head? Upload two photos and let the AI measure your delulu level with your crush.",
    keywords: [
      "crush calculator",
      "does my crush like me test",
      "ai love compatibility test",
      "delulu level calculator",
      "crush percentage calculator",
      "crush compatibility ai",
      "do they like me test",
      "platonic love test",
      "ai crush analyzer",
      "crush vibe check",
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
      title: "Crush Calculator & Platonic Love Test AI",
      description:
        "Is there a real spark, or is it all in your head? Upload two photos and let the AI measure your delulu level with your crush.",
      url: `${baseUrl}/en/crush-calculator`,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    other: {
      "application-ld+json": JSON.stringify(faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
