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
      title: { absolute: "Toksik İlişki & Red Flag Testi — Narsist Ex Tarayıcı (Ücretsiz)" },
      description:
        "Eski sevgilin veya flörtün toksik mi, narsist mi? Ücretsiz Red Flag testi ve toksik ex tarayıcı! Mesaj veya fotoğraf yükle; gaslighting ve manipülasyonu yakala.",
      keywords: [
        "toksik ilişki testi",
        "red flag testi",
        "narsist sevgili testi",
        "toksik eski sevgili testi",
        "toksik ex testi",
        "eski sevgili toksik mi",
        "toksik ilişki belirtileri",
        "mesajdan red flag analizi",
        "manipülasyon testi",
        "gaslighting mesaj testi",
      ],
      alternates: {
        canonical: `${baseUrl}/tr/toxic-ex-scanner`,
        languages: {
          en: `${baseUrl}/en/toxic-ex-scanner`,
          tr: `${baseUrl}/tr/toxic-ex-scanner`,
          "x-default": `${baseUrl}/en/toxic-ex-scanner`,
        },
      },
      openGraph: {
        title: "Toksik Ex Tarayıcı — Red Flag'leri İfşa Et (Ücretsiz YZ) | VibeCheckr",
        description:
          "Fotoğraf veya mesaj ekran görüntüsü yükle → 0–100 toksiklik skoru ve gizli red flag raporu anında gelsin!",
        url: `${baseUrl}/tr/toxic-ex-scanner`,
        siteName: "VibeCheckr",
        type: "website",
        locale: "tr_TR",
        alternateLocale: ["en_US"],
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: { absolute: "Toxic Ex Scanner & Red Flag Test — AI Manipulation Detector" },
    description:
      "Is your ex or partner toxic? Run the free AI Toxic Ex Scanner & Red Flag Test on texts or photos to detect gaslighting, love bombing, and narcissist traits.",
    keywords: [
      "toxic ex scanner",
      "red flag test",
      "red flag detector ai",
      "is my partner toxic quiz",
      "is my ex toxic",
      "narcissist text scanner",
      "toxic relationship signs",
      "gaslighting text checker",
      "chat red flag analyzer",
    ],
    alternates: {
      canonical: `${baseUrl}/en/toxic-ex-scanner`,
      languages: {
        en: `${baseUrl}/en/toxic-ex-scanner`,
        tr: `${baseUrl}/tr/toxic-ex-scanner`,
        "x-default": `${baseUrl}/en/toxic-ex-scanner`,
      },
    },
    openGraph: {
      title: "Toxic Ex Scanner AI — Expose Red Flags Free | VibeCheckr",
      description:
        "Scan your ex's photo or texts for narcissism, gaslighting, and hidden red flags before you reply. Free, instant, no sign-up!",
      url: `${baseUrl}/en/toxic-ex-scanner`,
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
    slug: "toxic-ex-scanner",
    lang,
    name: isTr ? "Toksik Eski Sevgili Tarayıcı YZ" : "Toxic Ex Scanner AI",
    breadcrumbName: isTr ? "Toksik Ex Tarayıcı" : "Toxic Ex Scanner",
    description: isTr
      ? "Fotoğraf veya sohbet ekran görüntülerinden manipülasyon, gaslighting ve gizli red flag sinyallerini yakalayan ücretsiz yapay zeka tarayıcısı."
      : "Free AI red-flag scanner that analyzes photos or chat screenshots to expose toxic patterns, love-bombing, and manipulation.",
    featureList: [
      "Photo & Chat Screenshot Red Flag Detection",
      "0–100 Toxicity & Manipulation Score",
      "Gaslighting & Breadcrumbing Breakdown",
      "1-Click Guest Mode (No Sign-Up Required)",
    ],
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
