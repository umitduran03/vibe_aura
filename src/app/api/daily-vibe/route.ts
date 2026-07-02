import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

const ZODIAC_TR: Record<string, string> = { aries: "Koç", taurus: "Boğa", gemini: "İkizler", cancer: "Yengeç", leo: "Aslan", virgo: "Başak", libra: "Terazi", scorpio: "Akrep", sagittarius: "Yay", capricorn: "Oğlak", aquarius: "Kova", pisces: "Balık" };
const ZODIAC_EN: Record<string, string> = { aries: "Aries", taurus: "Taurus", gemini: "Gemini", cancer: "Cancer", leo: "Leo", virgo: "Virgo", libra: "Libra", scorpio: "Scorpio", sagittarius: "Sagittarius", capricorn: "Capricorn", aquarius: "Aquarius", pisces: "Pisces" };

function tVal(val: string | undefined, mapEn: Record<string, string>, mapTr: Record<string, string>, locale: string) {
  if (!val) return "Unknown";
  const key = val.toLowerCase();
  return locale === "tr" ? (mapTr[key] || val) : (mapEn[key] || val);
}

// ─── Gemini Client ───────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// ─── Groq Client (OpenAI SDK uyumlu — Nihai Kurtarıcı) ──────
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

// Model fallback zinciri: ilki meşgulse sıradakini dene
const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-3-flash-preview",
];

/* =============================================
   Aşama 1: Gemini Model Fallback Zinciri
   ============================================= */
async function generateWithGeminiFallback(
  systemInstruction: string,
  promptText: string
) {
  let lastError: any = null;

  for (const model of MODEL_CHAIN) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ text: promptText }],
        config: {
          systemInstruction,
        },
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const code = err?.status || err?.code || err?.message || "";
      console.warn(
        `[DailyVibe/Gemini] ✗ ${model} başarısız (${code}), sıradaki deneniyor...`
      );
      if (
        String(code).includes("503") ||
        String(code).includes("429") ||
        String(code).includes("500") ||
        String(code).includes("UNAVAILABLE") ||
        String(code).includes("RESOURCE_EXHAUSTED") ||
        String(code).includes("INTERNAL") ||
        String(err?.message).includes("high demand") ||
        String(err?.message).includes("overloaded") ||
        String(err?.message).includes("timeout") ||
        String(err?.message).includes("TIMEOUT")
      ) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("All Gemini models are currently busy.");
}

/* =============================================
   Aşama 2: Groq Fallback (Nihai Kurtarıcı)
   GPT OSS 120B via OpenAI-uyumlu API
   ============================================= */
async function generateWithGroqFallback(
  systemInstruction: string,
  promptText: string
): Promise<{ text: string }> {
  const completion = await groq.chat.completions.create({
    model: "gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: systemInstruction,
      },
      {
        role: "user",
        content: promptText,
      },
    ],
    temperature: 0.95,
    max_tokens: 800,
  });

  const responseText = completion.choices?.[0]?.message?.content || "";
  return { text: responseText };
}

/* =============================================
   Şelale (Waterfall) Orkestratörü
   Daily-vibe text-only → Gemini önce, Groq fallback
   ============================================= */
async function generateWithWaterfall(
  systemInstruction: string,
  promptText: string
) {
  // ─── Gemini önce: Ana modelimiz ─────────────────
  try {
    const response = await generateWithGeminiFallback(systemInstruction, promptText);
    console.log("[DailyVibe/Waterfall] ✅ Gemini başarılı.");
    return response;
  } catch (geminiError: any) {
    console.warn(
      `[DailyVibe/Waterfall] ⚠️ Gemini başarısız, Groq Llama'ya geçiliyor...`
    );

    // ─── Groq fallback ─────────────────────────────────────
    try {
      const groqResponse = await generateWithGroqFallback(systemInstruction, promptText);
      console.log("[DailyVibe/Waterfall] ✅ Groq fallback başarılı.");
      return groqResponse;
    } catch (groqError: any) {
      console.error(
        "[DailyVibe/Waterfall] ❌ Her iki servis de başarısız:",
        groqError?.message || groqError
      );
      throw geminiError;
    }
  }
}

export async function POST(req: NextRequest) {
  const allowedOrigins = [
    "https://vibecheckr.com",
    "https://thevibecheckr.com",
    "http://localhost:3000",
  ];
  const origin = req.headers.get("origin");

  // CORS / Origin Guard (Vercel preview URL'lerine de izin verir)
  if (
    process.env.NODE_ENV === "production" &&
    origin &&
    !allowedOrigins.includes(origin) &&
    !origin.endsWith(".vercel.app")
  ) {
    return NextResponse.json(
      { error: "Forbidden. Invalid Origin." },
      { status: 403 }
    );
  }

  // App Check Toleransı (Sadece uyarı basıp devam eder, 403 dönmez)
  const appCheckToken = req.headers.get("x-firebase-appcheck");
  if (!appCheckToken) {
    console.warn(
      "[API] App Check token is missing. Tolerance active, bypassing."
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { age, zodiac, gender, locale } = body;
    
    const isTr = locale === "tr";

    // TR hitap kelimeleri — AI'ya Türkçe karşılıkları ver, İngilizce ağzıyla hitap etmesin
    const trAddressStyle = isTr ? `
   - Erkek için: "Abi", "Aga", "Len", "Kral", "Bro", "Çocuk", "Aslan" veya yaratıcı benzerler.
   - Kadın için: "Canım", "Bestie", "Kızım", "Tatlım", "Güzelim", "Prenses", "Annem" veya yaratıcı benzerler.
   - Belirsiz: "Bestie", "Aga", "Can", "Kardeşim", "Evren İkonasi" veya benzer Gen-Z terimleri.` : `
   - Male: "King", "Bro", "My guy", "Chief", "Boss", "Dude", "Legend", "Champ", or other creative fits.
   - Female: "Queen", "Bestie", "Girl", "Babe", "Pookie", "Sweetie", "Girly", "Diva", or other creative fits.
   - Unspecified/Other: "Icon", "Bestie", "Legend", "Champ", "Vibe", or other creative fits.`;

    const langInstruction = isTr
      ? `ZORUNLU: Tüm yanıtı Türkçe yaz. Direkt çeviri yapma. Gerçek Türk Gen-Z internet argosu ve Twitter/TikTok dili kullan. ÖNEMLİ KURAL: Sürekli aynı argoları (örn: "kafanda kuruyorsun", "ghost moduna geç", "rezalet") TEKRAR ETME. Kelime dağarcığını çok geniş tut. Bazen evrensel terimleri (delulu, red flag, aura, pick-me) Türkçe içinde harmanla, bazen güncel yerel jargon (patladın, kilit, NPC gibi, boş yapma) kullan. Örnekleri BİREBİR KULLANMA, her seferinde ŞAŞIRTICI ve YENİ kelimeler seç. KESİNLİKLE Farsça, Arapça veya başka bir dil kullanma ("خودش" vb. YASAKTIR).`
      : `MANDATORY: Write entirely in English. Use authentic global Gen-Z slang and TikTok/X vocabulary. CRITICAL RULE: Do NOT repeat the same slang words every time. Keep your vocabulary extremely diverse, unpredictable, and fresh. Do NOT just copy the typical examples, surprise the user with niche internet terms. NEVER use Persian, Arabic or any other languages.`;

    // ─── PROMPT v4: Silent Analysis + Locale-aware address style ───────────
    const systemInstruction = `You are a sassy, intuitive AI vibe reader for Gen-Z. You are NOT an astrologer, NOT a fortune teller. You simply read the user's current energy and aura for today.

ABSOLUTE RULES:
1. SILENT ANALYSIS (CRITICAL): NEVER explicitly mention the user's age, zodiac sign, or gender in your output. Use these data points ONLY silently in the background to calibrate your tone, slang, and the reading's nature. NEVER start with "As a 22yo Scorpio..." or similar.
2. ADDRESS STYLE: Start by directly addressing the user with a creative Gen-Z term based on their gender. NEVER repeat the same address word — be creative and fresh each time!${trAddressStyle}
3. NO COSMIC WORDS: Words like "stars", "planets", "universe", "cosmos", "Mercury retrograde", "celestial" are STRICTLY BANNED.
4. FORMAT: Maximum 2-3 punchy, punchy sentences. Each sentence should pack maximum energy. (Today's aura reading + a specific, actionable vibe warning or advice).
5. TONE: Brutally honest, chaotic, savage, relatable, and funny. Include 2-3 emojis naturally in the text.
6. QUALITY: Make it feel personal and eerily accurate — not generic horoscope fluff. Reference real human behaviors (overthinking, phone addiction, ghosting, avoidant behavior, etc.).
7. ${langInstruction}`;

    const g = String(gender || "").toLowerCase();
    const genderHint = 
      (g === "male" || g === "guy" || g === "man" || g === "boy") ? "Male" : 
      (g === "female" || g === "girl" || g === "woman") ? "Female" : 
      "Not specified";

    const THEMES_TR = [
      "Kaos ve Drama (Eski flörtü stalklamak, magazin, kaostan beslenmek, toksik dedikodu)",
      "Aşk ve Delulu (Mesaj bekleme krizleri, 'acaba benden mi hoşlanıyor' hezeyanları, toksik flört)",
      "Tükenmişlik ve İzolasyon (Sosyal pilin bitmesi, planları iptal edip yatağa dönmek, herkesi ghostlamak)",
      "Kariyer ve Hustle (Duygusuzlaşıp sadece işe/paraya odaklanmak, hedeflere kilitlenmek, NPC'leri umursamamak)",
      "Özgüven Patlaması (Main character enerjisi, kimseye eyvallahı olmamak, narsisizm sınırlarında gezmek)"
    ];

    const THEMES_EN = [
      "Chaos and Drama (Stalking exes, sipping tea, thriving on toxic gossip)",
      "Love and Delulu (Waiting for replies, making up fake scenarios, toxic situationships)",
      "Burnout and Isolation (Zero social battery, canceling plans to rot in bed, ghosting the group chat)",
      "Hustle and Focus (Locking in, ignoring distractions, purely focused on securing the bag)",
      "Main Character Energy (Unbothered, untouchable aura, borderline narcissistic confidence)"
    ];

    const selectedTheme = isTr 
      ? THEMES_TR[Math.floor(Math.random() * THEMES_TR.length)]
      : THEMES_EN[Math.floor(Math.random() * THEMES_EN.length)];

    const promptText = `
[BACKGROUND DATA — DO NOT REVEAL IN OUTPUT]
Age: ${age || "Not specified"}, Zodiac: ${tVal(zodiac, ZODIAC_EN, ZODIAC_TR, locale)}, Gender: ${genderHint}

[TODAY'S VIBE THEME — STRICTLY FOCUS ON THIS TOPIC]
Theme: ${selectedTheme}

Write a DAILY VIBE reading for this user focusing EXCLUSIVELY on today's theme. 
Use the background data SILENTLY to shape the accuracy — never mention it explicitly. 
2-3 sentences MAX. Include emojis. ${langInstruction}
`;

    const response = await generateWithWaterfall(systemInstruction, promptText);
    const text =
      response.text ||
      "Your vibe today is literally just existing and hoping nobody texts you. 💀";

    return NextResponse.json({ vibe: text.trim() });
  } catch (error: any) {
    console.error("[API Error /daily-vibe]", error);
    return NextResponse.json(
      { error: "Couldn't fetch daily vibe." },
      { status: 500 }
    );
  }
}
