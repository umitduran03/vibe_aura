import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/payment-success", "/history"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "Anthropic-ai", "Claude-Web", "PerplexityBot", "cohere-ai", "OAI-SearchBot"],
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: [
      "https://thevibecheckr.com/sitemap.xml",
    ],
  };
}
