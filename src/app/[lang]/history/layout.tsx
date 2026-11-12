import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";
  const base = "https://thevibecheckr.com";
  return {
    title: isTr ? "Geçmiş Analizler" : "Past Vibes",
    description: isTr
      ? "Geçmiş vibe check sonuçlarını ve analiz geçmişini görüntüle."
      : "View your past vibe check results and analysis history.",
    alternates: {
      canonical: `${base}/${isTr ? "tr" : "en"}/history`,
      languages: {
        en: `${base}/en/history`,
        tr: `${base}/tr/history`,
        "x-default": `${base}/en/history`,
      },
    },
    openGraph: {
      url: `${base}/${isTr ? "tr" : "en"}/history`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
