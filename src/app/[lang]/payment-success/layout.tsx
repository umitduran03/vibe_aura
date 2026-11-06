import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";
  return {
    title: isTr ? "Ödeme Başarılı" : "Payment Successful",
    description: isTr
      ? "VibeCheckr ödemen başarıyla tamamlandı."
      : "Your VibeCheckr payment was successful.",
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
