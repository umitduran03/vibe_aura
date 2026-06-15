import type { MetadataRoute } from "next";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

const locales = ["en", "tr"];
const baseUrl = "https://thevibecheckr.vercel.app";

const staticRoutes = [
  "",
  "/toxic-ex-scanner",
  "/duo-compatibility",
  "/vibe-dictionary",
  "/trends",
  "/faq",
  "/situationship-clarifier",
  "/mood-reset",
  "/delulu-check",
  "/reply-guru",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Static Routes (Localize them)
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  // 2. Trend Routes EN
  trendsDataEn.forEach((article) => {
    routes.push({
      url: `${baseUrl}/en/trends/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // 3. Trend Routes TR
  trendsDataTr.forEach((article) => {
    routes.push({
      url: `${baseUrl}/tr/trends/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return routes;
}
