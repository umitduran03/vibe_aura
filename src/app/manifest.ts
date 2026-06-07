import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VibeCheckr.",
    short_name: "VibeCheckr.",
    description: "Brutally honest AI photo analysis, aura reading, and zodiac compatibility for Gen-Z.",
    start_url: "/",
    display: "standalone",
    background_color: "#050510",
    theme_color: "#050510",
    orientation: "portrait",
    icons: [
      {
        src: "/android/launchericon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/android/launchericon-512x512.png",
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
