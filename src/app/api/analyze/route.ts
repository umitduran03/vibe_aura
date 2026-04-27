import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { adminDb } from "@/lib/firebase-admin";

// 2026 Kütüphanesi ile Başlatma: GoogleGenAI class.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Model fallback zinciri: ilki meşgulse sıradakini dene
const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-3-flash-preview",
];

/* =============================================
   Base64 fotoğraf parçalayıcı
   ============================================= */
function parseBase64Image(photoBase64: string) {
  const mimeTypeMatch = photoBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
  const mimeType = mimeTypeMatch && mimeTypeMatch.length > 1 ? mimeTypeMatch[1] : "image/jpeg";
  const base64Data = photoBase64.replace(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/, "");
  return { mimeType, base64Data };
}

/* =============================================
   Retry with model fallback
   ============================================= */
async function generateWithFallback(params: {
  contents: any[];
  systemInstruction: string;
}) {
  let lastError: any = null;

  for (const model of MODEL_CHAIN) {
    try {

      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          responseMimeType: "application/json",
        },
      });

      return response;
    } catch (err: any) {
      lastError = err;
      const code = err?.status || err?.code || err?.message || "";
      console.warn(`[Gemini] ✗ ${model} başarısız (${code}), sıradaki deneniyor...`);
      // 503 (UNAVAILABLE) veya 429 (QUOTA) ise bir sonraki modeli dene
      if (String(code).includes("503") || String(code).includes("429") || 
          String(code).includes("UNAVAILABLE") || String(code).includes("RESOURCE_EXHAUSTED") ||
          String(err?.message).includes("high demand") || String(err?.message).includes("overloaded")) {
        continue;
      }
      // Farklı bir hata (400, 404 vb.) ise direkt fırlat
      throw err;
    }
  }

  // Tüm modeller başarısız oldu
  throw lastError || new Error("All AI models are currently busy. Please try again later.");
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
    const body = await req.json();
    const mode = body.mode || "solo";
    const userId = body.userId;

    const tokenCost = mode === "duo" ? 2 : 1;

    // Güvenlik: Admin SDK üzerinden jeton bakiyesi ve VIP kontrolü
    if (adminDb && userId) {
      const userDoc = await adminDb.collection("users").doc(userId).get();
      const currentBalance = userDoc.exists ? (userDoc.data()?.token_balance || 0) : 0;
      
      const vipExpiryValue = userDoc.exists ? userDoc.data()?.vipExpiry : null;
      let isVipActive = false;
      
      if (vipExpiryValue) {
        const expiryDate = typeof vipExpiryValue.toDate === 'function' ? vipExpiryValue.toDate() : new Date(vipExpiryValue);
        isVipActive = expiryDate > new Date();
      }
      
      // İlk olarak kullanıcının vipExpiry (VIP Bitiş Tarihi) kontrol edilsin.
      if (isVipActive) {
        // Eğer kullanıcı VIP ise jeton bakiyesi 0 bile olsa işleme izin ver ve atla (pass)
      } else {
        // Jeton bakiyesi yetersizliği durumu SADECE kullanıcı VIP değilse fırlatılsın.
        if (currentBalance < tokenCost) {
          return NextResponse.json({ error: "Insufficient Tokens. Please top up your tokens." }, { status: 403 });
        }
      }
    }



    /* =============================================
       DUO MODE
       ============================================= */
    if (mode === "duo") {
      const { person1, person2, duoRelationType } = body;

      if (!person1?.zodiac || !person2?.zodiac) {
        return NextResponse.json(
          { error: "Zodiac sign is required for both vibes." },
          { status: 400 }
        );
      }

      const relationLabels: Record<string, string> = {
        flirt: "Flirt / Lovers",
        ex: "Ex-Lovers",
        platonic: "Platonic / Crush",
        bff: "BFF / Partner in Crime",
      };

      // İlişki türüne göre dinamik sistem promptu
      const duoSystemPrompts: Record<string, string> = {
        flirt: "You are a savage, sarcastic relationship therapist fluent in global Gen-Z internet slang (like 'delulu', 'red flag', 'ick', 'caught in 4K', 'low-key judging'). Analyze their romantic compatibility, toxicity levels, and who the real 'Red Flag' is. Show no mercy, spit facts. ALWAYS reply in English.",
        ex: "You are a ruthless breakup analyst and toxic relationship archivist fluent in global Gen-Z internet slang. Roast why they didn't work out, who did the most damage, and the real reason for the breakup in a hilarious, savage tone. Analyze the ex-dynamic mercilessly. ALWAYS reply in English.",
        platonic: "You are an empathetic but brutally honest 'delulu' destroyer fluent in Gen-Z slang. Looking at their photo (if provided) and data, analyze if it's a true platonic match, a green flag, or just a completely 'delulu' impossible crush. Tell them the savage truth but make it funny. ALWAYS reply in English.",
        bff: "You are a savage 'partner in crime' analyst fluent in Gen-Z slang. Roast their gossip level, friendship dynamic, and call out who is the 'voice of reason' vs. who is an 'absolute menace'. Decode the level of chaos they create together. ALWAYS reply in English.",
      };

      const systemInstruction = duoSystemPrompts[duoRelationType] || duoSystemPrompts.flirt;

      const promptText = `
Duo Vibe Match Analysis:
- Person 1: Age ${person1.age}, Zodiac: ${person1.zodiac}
- Person 2: Age ${person2.age}, Zodiac: ${person2.zodiac}
- Relationship Type: ${relationLabels[duoRelationType] || duoRelationType}

Based on these details (and photos if any), analyze their vibe, energy, and compatibility. Generate your response ENTIRELY IN ENGLISH using heavy, natural global Gen-Z slang. Your output must be purely JSON and strictly follow this exact structure:
{
  "duoScore": 65,
  "title": "A sassy, Gen-Z title (e.g., Toxic but Iconic)",
  "toxicComment": "Being together is like... (a savage, hilarious one-liner or short paragraph full of Gen-Z slang)",
  "redFlag": "Person 1 (or Person 2) — Explain who is the ultimate red flag and why",
  "analysis_text": "Detailed analysis... (a relentless, highly entertaining, slang-filled paragraph dissecting their dynamic)",
  "theme_color_hex": "#ff6b6b"
}
`;

      const userContents: any[] = [];

      // Kişi 1 fotoğrafı
      if (person1.photoBase64 && person1.photoBase64.startsWith("data:")) {
        const { mimeType, base64Data } = parseBase64Image(person1.photoBase64);
        userContents.push({
          inlineData: { data: base64Data, mimeType },
        });
      }

      // Kişi 2 fotoğrafı
      if (person2.photoBase64 && person2.photoBase64.startsWith("data:")) {
        const { mimeType, base64Data } = parseBase64Image(person2.photoBase64);
        userContents.push({
          inlineData: { data: base64Data, mimeType },
        });
      }

      userContents.push({ text: promptText });

      const response = await generateWithFallback({
        contents: userContents,
        systemInstruction,
      });

      const text = response.text || "";


      let parsedJson;
      try {
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedJson = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error("[Gemini API Duo] JSON Parse Error:", parseError, "Raw:", text);
        return NextResponse.json(
          { error: "Failed to parse AI response." },
          { status: 500 }
        );
      }

      return NextResponse.json(parsedJson);
    }

    /* =============================================
       SOLO MODE (mevcut akış — DOKUNULMADI)
       ============================================= */
    const { age, zodiac, relationship, magicText, photoBase64, soloScenario } = body;

    if (!age || !zodiac) {
      return NextResponse.json(
        { error: "Age and zodiac sign are required." },
        { status: 400 }
      );
    }

    // Senaryoya göre dinamik sistem promptu
    const scenarioSystemPrompts: Record<string, string> = {
      general: "You are an aura reader fluent in global Gen-Z internet slang (like 'delulu', 'main character syndrome', 'caught in 4K', 'serving c*nt'). You are slightly sarcastic, witty, and savage. Roast the user's details and photo (if provided) mercilessly but in a hilarious, entertaining way. ALWAYS reply in English.",
      roast: "You are the ultimate, most ruthless Gen-Z roast master. DESTROY the user. Roast their zodiac sign, age, relationship status, and photo in the harshest, funniest way possible. Serve absolute heat with high-tier stand-up comedy level roasts using global internet slang. Show absolutely zero mercy. ALWAYS reply in English.",
      soulmate: "You are a mystical yet savage soulmate oracle fluent in Gen-Z slang. Based on the user's data and photo, predict their 'ideal partner' profile. Who should they date? What zodiac? What's their vibe? Are they a red flag or a golden retriever? Be mystical but use heavy internet slang. ALWAYS reply in English.",
    };

    const systemInstruction = scenarioSystemPrompts[soloScenario || "general"] || scenarioSystemPrompts.general;

    // Senaryoya göre prompt metni
    const scenarioPromptSuffix: Record<string, string> = {
      general: "Analyze the user's aura. Be mystical, witty, savage, and use Gen-Z slang.",
      roast: "ROAST the user MERCILESSLY. Weaponize every detail against them. Be hilarious but brutal. No mercy.",
      soulmate: "Profile the user's IDEAL SOULMATE. Who should they be with? Predict their zodiac, physical type, personality, and exact vibe.",
    };

    // Kullanıcı için yönlendirme metni
    let promptText = `
User Details:
- Age: ${age}
- Zodiac: ${zodiac}
- Relationship Status: ${relationship || "Not specified"}
- Extra Note (Magic Question): ${magicText || "None"}
- Analysis Type: ${(scenarioPromptSuffix as any)[soloScenario || "general"] || scenarioPromptSuffix.general}

Based on these details (and the attached photo if any), generate your response ENTIRELY IN ENGLISH using heavy, natural global Gen-Z slang. Your output must be purely JSON and strictly follow this exact structure:
{
  "aura_name": "A sassy, savage, Gen-Z title for their aura",
  "aura_score": 85,
  "analysis_text": "Your aura is... (a relentless, hilarious, slang-filled paragraph. Roast the photo if it exists.)",
  "toxicComment": "A one-liner savage roast / ultimate call-out.",
  "traits": ["Overthinker", "Chronically Online", "Delulu"],
  "theme_color_hex": "#c084fc"
}
`;

    // İçerik dizisini hazırlayalım
    const userContents: any[] = [];

    // Fotoğraf Base64 olarak gelmişse
    if (photoBase64 && photoBase64.startsWith("data:")) {
      const { mimeType, base64Data } = parseBase64Image(photoBase64);
      userContents.push({
        inlineData: { data: base64Data, mimeType },
      });
    }

    // En sona metni ekleyelim
    userContents.push({ text: promptText });

    const response = await generateWithFallback({
      contents: userContents,
      systemInstruction,
    });

    const text = response.text || "";


    // Parse the JSON reliably
    let parsedJson;
    try {
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedJson = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("[Gemini API] JSON Parse Error:", parseError, "Raw Text:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedJson);
  } catch (error: any) {
    console.error("[API Error /analyze]", error);
    // Asıl hatayı direkt frontende bas!
    return NextResponse.json(
      { error: error?.message || JSON.stringify(error) },
      { status: 500 }
    );
  }
}
