import type { MetadataRoute } from "next";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

export const dynamic = "force-static";

const baseUrl = "https://thevibecheckr.com";

const tier1Routes = ["/delulu-check","/vibe-dictionary","/aura-battle","/profile-autopsy","/toxic-ex-scanner","/ai-roast-me"];
const tier2Routes = ["/situationship-clarifier","/crush-calculator","/soulmate-radar","/ex-compatibility"];
const tier3Routes = ["/mood-reset","/reply-guru","/bff-vibe-check","/duo-compatibility"];
const utilityRoutes = ["/faq"];
const legalRoutes = ["/privacy", "/terms"];

const topTierTrends = ["what-is-an-ick","are-you-delulu","am-i-being-gaslighted","what-is-limerence","mixed-signals-or-delulu","what-is-rizz","situationship-vs-relationship","what-are-aura-points","biggest-dating-red-flags-2026","gen-z-dating-terms-2026"];
const midTierTrends = ["fix-negative-aura-mood","aura-battle-who-is-cooler","ai-photo-personality-test","what-is-orbiting","trauma-bonding-signs","dry-texter-signs","main-character-energy"];

const STATIC_LAST_MODIFIED = new Date("2026-07-06");

/** Build EN + TR sitemap entries with hreflang alternates. */
function makeEntry(
  route: string,
  priority: number,
  freq: "daily" | "weekly" | "monthly" | "yearly",
  lastMod: Date = STATIC_LAST_MODIFIED
): MetadataRoute.Sitemap[number][] {
  const languages: Record<string, string> = {
    en: `${baseUrl}/en${route}`,
    tr: `${baseUrl}/tr${route}`,
    "x-default": `${baseUrl}/en${route}`,
  };
  return [
    { url: `${baseUrl}/en${route}`, lastModified: lastMod, changeFrequency: freq, priority, alternates: { languages } },
    { url: `${baseUrl}/tr${route}`, lastModified: lastMod, changeFrequency: freq, priority, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  routes.push(...makeEntry("", 1.0, "daily"));
  routes.push(...makeEntry("/trends", 0.9, "daily"));

  for (const r of tier1Routes) routes.push(...makeEntry(r, 0.9, "weekly"));
  for (const r of tier2Routes) routes.push(...makeEntry(r, 0.8, "weekly"));
  for (const r of tier3Routes) routes.push(...makeEntry(r, 0.7, "monthly"));
  for (const r of utilityRoutes) routes.push(...makeEntry(r, 0.5, "monthly"));
  for (const r of legalRoutes) routes.push(...makeEntry(r, 0.3, "yearly"));

  const trSlugSet = new Set(trendsDataTr.map((a: any) => a.slug));
  const enSlugSet = new Set(trendsDataEn.map((a: any) => a.slug));

  trendsDataEn.forEach((article: any) => {
    const { slug, publishDate } = article;
    const lastMod = new Date(publishDate);
    let priority = 0.6;
    let freq: "weekly" | "monthly" | "yearly" = "monthly";
    if (topTierTrends.includes(slug)) { priority = 0.8; freq = "weekly"; }
    else if (midTierTrends.includes(slug)) { priority = 0.7; freq = "monthly"; }

    if (trSlugSet.has(slug)) {
      routes.push(...makeEntry(`/trends/${slug}`, priority, freq, lastMod));
    } else {
      routes.push({ url: `${baseUrl}/en/trends/${slug}`, lastModified: lastMod, changeFrequency: freq, priority,
        alternates: { languages: { en: `${baseUrl}/en/trends/${slug}`, "x-default": `${baseUrl}/en/trends/${slug}` } } });
    }
  });

  trendsDataTr.forEach((article: any) => {
    const { slug, publishDate } = article;
    if (enSlugSet.has(slug)) return;
    const lastMod = new Date(publishDate);
    let priority = 0.6;
    let freq: "weekly" | "monthly" | "yearly" = "monthly";
    if (topTierTrends.includes(slug)) { priority = 0.8; freq = "weekly"; }
    else if (midTierTrends.includes(slug)) { priority = 0.7; freq = "monthly"; }
    routes.push({ url: `${baseUrl}/tr/trends/${slug}`, lastModified: lastMod, changeFrequency: freq, priority,
      alternates: { languages: { tr: `${baseUrl}/tr/trends/${slug}`, "x-default": `${baseUrl}/en/trends/${slug}` } } });
  });

  return routes;
}
