import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VibeCheckr - AI Vibe Check",
    short_name: "VibeCheckr",
    description: "Brutally honest AI photo analysis, aura reading, and zodiac compatibility for Gen-Z.",
    start_url: "/",
    display: "standalone",
    background_color: "#050510",
    theme_color: "#050510",
    orientation: "portrait",
    icons: [
      {
        src: "/va-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/va-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    screenshots: [
      {
        src: "/opengraph-image.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "/opengraph-image.png",
        sizes: "1200x630",
        type: "image/png"
      }
    ]
  };
}
