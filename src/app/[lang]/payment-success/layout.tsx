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
    title: isTr ? "Ödeme Başarılı" : "Payment Successful",
    description: isTr
      ? "VibeCheckr ödemen başarıyla tamamlandı."
      : "Your VibeCheckr payment was successful.",
    alternates: {
      canonical: `${base}/${isTr ? "tr" : "en"}/payment-success`,
      languages: {
        en: `${base}/en/payment-success`,
        tr: `${base}/tr/payment-success`,
        "x-default": `${base}/en/payment-success`,
      },
    },
    openGraph: {
      url: `${base}/${isTr ? "tr" : "en"}/payment-success`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
