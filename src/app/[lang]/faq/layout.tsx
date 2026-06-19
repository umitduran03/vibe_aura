import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — VibeCheckr AI Vibe Check & Photo Roast",
  description:
    "Frequently asked questions about VibeCheckr — the free AI-powered vibe check, photo roast, and personality analysis app. Learn about features, privacy, and how the AI reads your aura.",
  keywords: [
    "vibecheckr faq",
    "ai vibe check questions",
    "photo roast app help",
    "ai personality analysis faq",
    "zodiac compatibility questions",
  ],
  alternates: {
    canonical: "https://thevibecheckr.com/faq",
  },
  openGraph: {
    title: "FAQ — VibeCheckr AI Vibe Check & Photo Roast",
    description:
      "Everything you need to know about VibeCheckr. How the AI works, privacy, features, and more.",
    url: "https://thevibecheckr.com/faq",
    type: "website",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
