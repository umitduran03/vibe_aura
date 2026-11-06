import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";
  return {
    title: isTr ? "Geçmiş Analizler" : "Past Vibes",
    description: isTr
      ? "Geçmiş vibe check sonuçlarını ve analiz geçmişini görüntüle."
      : "View your past vibe check results and analysis history.",
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
