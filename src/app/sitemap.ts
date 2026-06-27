import type { MetadataRoute } from "next";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

export const dynamic = "force-static";

const locales = ["en", "tr"];
const baseUrl = "https://thevibecheckr.com";

// Sayfaların önem sırasına göre gruplandı
// Priority 1.0 → Ana sayfa
// Priority 0.9 → Search Console'da gösterim alan yüksek değerli sayfalar
// Priority 0.8 → İkincil önemli sayfalar
// Priority 0.6 → Yasal / yardımcı sayfalar
const highPriorityRoutes = [
  "/delulu-check",      // 12 gösterim - en yüksek
  "/vibe-dictionary",   // 8+6 gösterim
  "/aura-battle",       // 3 gösterim - "aura-battle who is cooler" sorgusu
  "/trends",            // Blog hub - organik trafik kaynağı
];

const standardRoutes = [
  "",                       // Ana sayfa (priority 1.0)
  "/toxic-ex-scanner",
  "/duo-compatibility",
  "/faq",
  "/situationship-clarifier",
  "/mood-reset",
  "/reply-guru",
];

const legalRoutes = [
  "/privacy",
  "/terms",
];

// Search Console'da gösterim alan trend makaleleri (yüksek öncelik)
const highImpactTrendSlugs = [
  "fix-negative-aura-mood",       // 4 gösterim
  "aura-battle-who-is-cooler",    // 3 gösterim
  "ai-photo-personality-test",    // 3 gösterim
  "what-is-an-ick",               // Yeni - hedef keyword
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

  // 1. Yüksek öncelikli sayfalar (her dil için)
  locales.forEach((locale) => {
    highPriorityRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  });

  // 2. Standart önemli sayfalar (her dil için)
  locales.forEach((locale) => {
    standardRoutes.forEach((route) => {
      routes.push({
        url: route === "" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  // 3. Yasal sayfalar (her dil için)
  locales.forEach((locale) => {
    legalRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.4,
      });
    });
  });

  // 4. Trend makaleleri EN
  trendsDataEn.forEach((article) => {
    const isHighImpact = highImpactTrendSlugs.includes(article.slug);
    routes.push({
      url: `${baseUrl}/en/trends/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: isHighImpact ? "weekly" : "monthly",
      priority: isHighImpact ? 0.8 : 0.7,
    });
  });

  // 5. Trend makaleleri TR
  trendsDataTr.forEach((article) => {
    const isHighImpact = highImpactTrendSlugs.includes(article.slug);
    routes.push({
      url: `${baseUrl}/tr/trends/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: isHighImpact ? "weekly" : "monthly",
      priority: isHighImpact ? 0.8 : 0.7,
    });
  });

  return routes;
}
