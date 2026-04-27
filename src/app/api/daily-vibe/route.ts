import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-3-flash-preview",
];

async function generateWithFallback(systemInstruction: string, promptText: string) {
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
      if (String(code).includes("503") || String(code).includes("429") || 
          String(code).includes("UNAVAILABLE") || String(code).includes("RESOURCE_EXHAUSTED")) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("All models are busy");
}

export async function POST(req: NextRequest) {
  const allowedOrigins = [
    "https://vibeandaura.com",
    "https://vibe-aura.vercel.app",
    "http://localhost:3000"
  ];
  const origin = req.headers.get("origin");

  // CORS / Origin Guard (Vercel preview URL'lerine de izin verir)
  if (
    process.env.NODE_ENV === "production" &&
    origin &&
    !allowedOrigins.includes(origin) &&
    !origin.endsWith(".vercel.app")
  ) {
    return NextResponse.json({ error: "Forbidden. Invalid Origin." }, { status: 403 });
  }

  // App Check Toleransı (Sadece uyarı basıp devam eder, 403 dönmez)
  const appCheckToken = req.headers.get("x-firebase-appcheck");
  if (!appCheckToken) {
    console.warn("[API] App Check token is missing. Tolerance active, bypassing.");
  } else {

  }

  try {
    const body = await req.json().catch(() => ({}));
    const { age, zodiac } = body;

    const systemInstruction = 
      "You are a highly intelligent, sarcastic astrology guru who appeals to Gen-Z, but you are also a master of the 'Passive-Aggressive Compliment'. Instead of just roasting, you frame the user's flaws or toxic traits as if they stem from their perfection, high aura, or being too smart. Inject plenty of ego-stroking mixed with subtle roasts. ALWAYS respond in English, using typical US/Global Gen-Z internet slang (delulu, main character, caught in 4k, etc.).";

    const promptText = `
Client: Age ${age || "Not specified"}, Zodiac ${zodiac || "Not specified"}

Please write the DAILY VIBE for this user. It should be a short, punchy 1-2 sentence message featuring a 'Passive-Aggressive Compliment'. Don't forget to use emojis!
Tone Example: "Your aura is so sharp today that the visionless locals not on your frequency will annoy you again. Put that perfectionist trait on hold just for today, or you're gonna block everyone again 💅✨"
`;

    const response = await generateWithFallback(systemInstruction, promptText);
    const text = response.text || "Your aura is a bit tired today, go drink some water and rest.";

    return NextResponse.json({ vibe: text.trim() });
  } catch (error: any) {
    console.error("[API Error /daily-vibe]", error);
    return NextResponse.json(
      { error: "Couldn't fetch daily vibe." },
      { status: 500 }
    );
  }
}
