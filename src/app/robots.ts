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
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Amazonbot",
          "Meta-ExternalAgent",
          "Bytespider",
          "cohere-ai",
          "YouBot",
          "Diffbot",
          "Timpibot",
          "DuckAssistBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: [
      "https://thevibecheckr.com/sitemap.xml",
    ],
  };
}
