import type { MetadataRoute } from "next";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

export const dynamic = "force-static";

const locales = ["en", "tr"];
const baseUrl = "https://thevibecheckr.com";

// SEO Priority Pyramid:
// 1.0 -> Homepage
// 0.9 -> Tier 1 (Flagship features & hubs)
// 0.8 -> Tier 2 (Highly popular tools & Top 7 viral articles)
// 0.7 -> Tier 3 (Niche tools & Medium impact articles)
// 0.6 -> Default articles
// 0.5 -> Utility (FAQ)
// 0.3 -> Legal

const tier1Routes = [
  "/delulu-check",      
  "/vibe-dictionary",   
  "/aura-battle",       
  "/profile-autopsy",   
  "/toxic-ex-scanner",
  "/ai-roast-me",
];

const tier2Routes = [
  "/situationship-clarifier",
  "/crush-calculator",
  "/soulmate-radar",
  "/ex-compatibility",
];

const tier3Routes = [
  "/mood-reset",
  "/reply-guru",
  "/bff-vibe-check",
  "/duo-compatibility", // Moved down slightly to balance weight
];

const utilityRoutes = [
  "/faq",
];

const legalRoutes = [
  "/privacy",
  "/terms",
];

// TOP viral articles (Strict limit to ~10 items for true high priority)
const topTierTrends = [
  "what-is-an-ick",
  "are-you-delulu",
  "am-i-being-gaslighted",
  "what-is-limerence",
  "mixed-signals-or-delulu",
  "what-is-rizz",
  "situationship-vs-relationship",
  "what-are-aura-points",
  "biggest-dating-red-flags-2026",
  "gen-z-dating-terms-2026",
];

// Secondary popular articles
const midTierTrends = [
  "fix-negative-aura-mood",           
  "aura-battle-who-is-cooler",        
  "ai-photo-personality-test",        
  "what-is-orbiting",
  "trauma-bonding-signs",
  "dry-texter-signs",
  "main-character-energy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Root redirect için canonical entry
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Helper to add static routes
  const addRoutes = (routeList: string[], priority: number, freq: "daily" | "weekly" | "monthly" | "yearly") => {
    locales.forEach((locale) => {
      routeList.forEach((route) => {
        routes.push({
          url: `${baseUrl}/${locale}${route}`,
          lastModified: new Date(),
          changeFrequency: freq,
          priority,
        });
      });
    });
  };

  // Add the Homepage locale roots explicitly
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });

    // Add /trends as daily explicitly for faster indexing of new articles
    routes.push({
      url: `${baseUrl}/${locale}/trends`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
  });

  addRoutes(tier1Routes, 0.9, "weekly");
  addRoutes(tier2Routes, 0.8, "weekly");
  addRoutes(tier3Routes, 0.7, "monthly");
  addRoutes(utilityRoutes, 0.5, "monthly");
  addRoutes(legalRoutes, 0.3, "yearly");

  // Trend articles logic
  const processArticle = (article: any, locale: string) => {
    let priority = 0.6; // Default
    let freq: "weekly" | "monthly" | "yearly" = "monthly";

    if (topTierTrends.includes(article.slug)) {
      priority = 0.8;
      freq = "weekly";
    } else if (midTierTrends.includes(article.slug)) {
      priority = 0.7;
      freq = "monthly";
    }

    routes.push({
      url: `${baseUrl}/${locale}/trends/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: freq,
      priority,
    });
  };

  trendsDataEn.forEach((article) => processArticle(article, "en"));
  trendsDataTr.forEach((article) => processArticle(article, "tr"));

  return routes;
}
