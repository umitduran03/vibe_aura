import type { MetadataRoute } from "next";
import { trendsDataEn, trendsDataTr } from "@/lib/trends-data";

export const dynamic = "force-static";

const baseUrl = "https://thevibecheckr.com";

const tier1Routes = ["/delulu-check","/vibe-dictionary","/aura-battle","/profile-autopsy","/toxic-ex-scanner","/ai-roast-me"];
const tier2Routes = ["/situationship-clarifier","/crush-calculator","/soulmate-radar","/ex-compatibility"];
const tier3Routes = ["/mood-reset","/reply-guru","/bff-vibe-check","/duo-compatibility"];
const utilityRoutes = ["/faq"];
const legalRoutes = ["/privacy", "/terms"];

const topTierTrends = ["what-is-a-vibe-check","what-is-an-ick","are-you-delulu","am-i-being-gaslighted","what-is-limerence","mixed-signals-or-delulu","what-is-rizz","situationship-vs-relationship","what-are-aura-points","biggest-dating-red-flags-2026","gen-z-dating-terms-2026","aura-battle-who-is-cooler","fix-negative-aura-mood","how-to-stop-overthinking-texts","ai-photo-personality-test","zodiac-signs-red-flags"];
const midTierTrends = ["what-is-orbiting","trauma-bonding-signs","dry-texter-signs","main-character-energy","attachment-styles-explained","signs-someone-likes-you-body-language","love-languages-which-one-are-you","soft-launch-hard-launch","emotionally-unavailable-signs","toxic-friendship-signs","how-to-get-over-someone","hyper-independence-in-dating","one-sided-effort-relationship","when-to-walk-away"];

const STATIC_LAST_MODIFIED = new Date("2026-11-06");

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
  for (const r of tier3Routes) routes.push(...makeEntry(r, 0.7, "weekly"));
  for (const r of utilityRoutes) routes.push(...makeEntry(r, 0.7, "weekly"));
  for (const r of legalRoutes) routes.push(...makeEntry(r, 0.3, "yearly"));

  const trSlugSet = new Set(trendsDataTr.map((a: any) => a.slug));
  const enSlugSet = new Set(trendsDataEn.map((a: any) => a.slug));

  trendsDataEn.forEach((article: any) => {
    const { slug } = article;
    const lastMod = STATIC_LAST_MODIFIED;
    let priority = 0.7;
    let freq: "weekly" | "monthly" | "yearly" = "weekly";
    if (topTierTrends.includes(slug)) { priority = 0.8; freq = "weekly"; }
    else if (midTierTrends.includes(slug)) { priority = 0.7; freq = "weekly"; }

    if (trSlugSet.has(slug)) {
      routes.push(...makeEntry(`/trends/${slug}`, priority, freq, lastMod));
    } else {
      routes.push({ url: `${baseUrl}/en/trends/${slug}`, lastModified: lastMod, changeFrequency: freq, priority,
        alternates: { languages: { en: `${baseUrl}/en/trends/${slug}`, "x-default": `${baseUrl}/en/trends/${slug}` } } });
    }
  });

  trendsDataTr.forEach((article: any) => {
    const { slug } = article;
    if (enSlugSet.has(slug)) return;
    const lastMod = STATIC_LAST_MODIFIED;
    let priority = 0.7;
    let freq: "weekly" | "monthly" | "yearly" = "weekly";
    if (topTierTrends.includes(slug)) { priority = 0.8; freq = "weekly"; }
    else if (midTierTrends.includes(slug)) { priority = 0.7; freq = "weekly"; }
    routes.push({ url: `${baseUrl}/tr/trends/${slug}`, lastModified: lastMod, changeFrequency: freq, priority,
      alternates: { languages: { tr: `${baseUrl}/tr/trends/${slug}`, "x-default": `${baseUrl}/en/trends/${slug}` } } });
  });

  return routes;
}
