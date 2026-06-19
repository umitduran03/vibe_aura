import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/payment-success", "/history"],
      },
      // YAPAY ZEKA SEO'SU (AIO) İÇİN ÖZEL İZİNLER:
      // Tüm büyük LLM botlarına sitemizi taraması ve llms.txt'yi okuması için açık davetiye.
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "Anthropic-ai", "Claude-Web", "PerplexityBot", "cohere-ai", "OAI-SearchBot"],
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: "https://thevibecheckr.com/sitemap.xml",
  };
}
