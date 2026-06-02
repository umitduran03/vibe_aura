import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Situationship Clarifier AI — Decode the Mixed Signals",
  description:
    "Confused about what you are? Let our AI clarify your situationship. Get brutal compatibility stats and decode the 'What are we?' mystery instantly.",
  keywords: [
    "situationship clarifier",
    "what are we test",
    "mixed signals test",
    "are we dating or friends",
    "situationship advice ai",
    "toxic situationship test",
  ],
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/situationship-clarifier",
  },
  openGraph: {
    title: "Situationship Clarifier AI — VibeCheckr",
    description:
      "Decoding the 'What are we?' mystery. Brutal compatibility stats included. Drop your photos and get the unfiltered reality check.",
    url: "https://thevibecheckr.vercel.app/situationship-clarifier",
    type: "website",
  },
};

export default function SituationshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
