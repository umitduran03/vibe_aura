import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your VibeCheckr payment was successful.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
