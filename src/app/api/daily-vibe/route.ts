import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

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
   Llama 3.3 70B via OpenAI-uyumlu API
   ============================================= */
async function generateWithGroqFallback(
  systemInstruction: string,
  promptText: string
): Promise<{ text: string }> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
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
    max_tokens: 512,
  });

  const responseText = completion.choices?.[0]?.message?.content || "";
  return { text: responseText };
}

/* =============================================
   Şelale (Waterfall) Fallback Orkestratörü
   Gemini Zinciri → Groq Llama 3.3 70B
   ============================================= */
async function generateWithWaterfall(
  systemInstruction: string,
  promptText: string
) {
  // ─── Aşama 1: Gemini Model Zinciri ─────────────────────────
  try {
    const response = await generateWithGeminiFallback(
      systemInstruction,
      promptText
    );
    return response;
  } catch (geminiError: any) {
    const errorInfo =
      geminiError?.status ||
      geminiError?.code ||
      geminiError?.message ||
      "Unknown";
    console.warn(
      `[DailyVibe/Waterfall] ⚠️ Tüm Gemini modelleri başarısız (${errorInfo}), Groq Llama 3.3 70B'ye geçiliyor...`
    );

    // ─── Aşama 2: Groq Nihai Kurtarıcı ─────────────────────
    try {
      const groqResponse = await generateWithGroqFallback(
        systemInstruction,
        promptText
      );
      console.log(
        "[DailyVibe/Waterfall] ✅ Groq Llama 3.3 70B başarılı — yanıt alındı."
      );
      return groqResponse;
    } catch (groqError: any) {
      console.error(
        "[DailyVibe/Waterfall] ❌ Groq da başarısız:",
        groqError?.message || groqError
      );
      // Her iki aşama da çöktü — orijinal Gemini hatasını fırlat
      throw geminiError;
    }
  }
}

export async function POST(req: NextRequest) {
  const allowedOrigins = [
    "https://vibecheckr.com",
    "https://thevibecheckr.vercel.app",
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
    const { age, zodiac, gender } = body;

    // ─── PROMPT v3: Sessiz Analiz + Esnek Hitap ───────────
    const systemInstruction = `You are a sassy, intuitive AI vibe reader for Gen-Z. You are NOT an astrologer, NOT a fortune teller. You simply read the user's current energy/aura.

ABSOLUTE RULES:
1. SILENT ANALYSIS (CRITICAL): NEVER explicitly mention the user's age, zodiac sign, or gender in your output. Use these data points ONLY silently in the background to calibrate your tone, slang, and the nature of your reading. NEVER start with "As a 22yo Scorpio..." or similar.
2. ADDRESS STYLE: Start by directly addressing the user with creative, varied Gen-Z terms based on their gender. NEVER repeat the same address word every time — be creative!
   - Male: "King", "Bro", "My guy", "Chief", "Boss", "Dude", "Legend", "Champ", or other creative fits.
   - Female: "Queen", "Bestie", "Girl", "Babe", "Pookie", "Sweetie", "Girly", "Diva", or other creative fits.
   - Unspecified/Other: "Icon", "Bestie", "Legend", "Champ", "Vibe", or other creative fits.
3. NO COSMIC WORDS: Words like "stars", "planets", "universe", "cosmos", "Mercury retrograde", "celestial" are STRICTLY BANNED.
4. FORMAT: Maximum 1-2 punchy sentences. Pill-format. (Today's aura reading + Advice/Warning).
5. TONE: Brutally honest, chaotic, savage, relatable, and funny. Use Gen-Z slang (delulu, brain rot, red flag, era, main character, etc.). Include emojis.
6. ALWAYS respond in English.`;

    const genderHint = gender === "male" ? "Male" : gender === "female" ? "Female" : "Not specified";

    const promptText = `
[BACKGROUND DATA — DO NOT REVEAL IN OUTPUT]
Age: ${age || "Not specified"}, Zodiac: ${zodiac || "Not specified"}, Gender: ${genderHint}

Write a DAILY VIBE for this user. Use the background data SILENTLY to shape the tone — never mention it explicitly. Max 1-2 sentences. Include emojis.
Tone Examples:
- (Male): "Bro, your energy today is giving 'replying to texts in my head but never actually hitting send'. Mute the group chat and survive until 5 PM without ghosting everyone. 🎧"
- (Female): "Pookie, the aura you're radiating right now is screaming 'I need an iced matcha and zero human interaction'. Don't let anyone ruin your unbothered era today. 💅🍵"
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
