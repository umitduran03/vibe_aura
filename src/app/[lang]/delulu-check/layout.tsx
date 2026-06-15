import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delulu Check AI — Are You Delusional?",
  description:
    "Mixed signals? Drop the receipts and get an unfiltered reality check before you double text. Find out if you're being delusional or if they actually like you.",
  keywords: [
    "delulu check",
    "am i delusional",
    "mixed signals meaning",
    "texting advice ai",
    "should i text him",
    "should i text her",
  ],
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/delulu-check",
  },
  openGraph: {
    title: "Delulu Check AI — VibeCheckr",
    description:
      "Mixed signals? Drop the receipts and get an unfiltered reality check before you double text.",
    url: "https://thevibecheckr.vercel.app/delulu-check",
    type: "website",
  },
};

export default function DeluluCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
