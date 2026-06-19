import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toxic Ex Scanner AI — Expose Their Red Flags",
  description:
    "Upload a photo of your ex and let our AI scanner brutally expose their red flags and toxic traits. Free, instant, and savage. Stop texting them back.",
  keywords: [
    "toxic ex scanner",
    "red flag detector ai",
    "ex boyfriend red flags",
    "ex girlfriend red flags",
    "toxic relationship test",
    "ai ex analysis",
    "should i text my ex",
  ],
  alternates: {
    canonical: "https://thevibecheckr.com/toxic-ex-scanner",
  },
  openGraph: {
    title: "Toxic Ex Scanner AI — VibeCheckr",
    description:
      "Still hung up on them? Upload a photo and let our AI read their aura to expose the red flags you completely ignored.",
    url: "https://thevibecheckr.com/toxic-ex-scanner",
    type: "website",
  },
};

export default function ToxicExScannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
