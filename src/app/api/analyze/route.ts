import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { adminDb } from "@/lib/firebase-admin";
import OpenAI from "openai";

export const maxDuration = 60;

// ─── TRANSLATION MAPS ───────────────────────────────────────────
const ZODIAC_TR: Record<string, string> = { aries: "Koç", taurus: "Boğa", gemini: "İkizler", cancer: "Yengeç", leo: "Aslan", virgo: "Başak", libra: "Terazi", scorpio: "Akrep", sagittarius: "Yay", capricorn: "Oğlak", aquarius: "Kova", pisces: "Balık" };
const ZODIAC_EN: Record<string, string> = { aries: "Aries", taurus: "Taurus", gemini: "Gemini", cancer: "Cancer", leo: "Leo", virgo: "Virgo", libra: "Libra", scorpio: "Scorpio", sagittarius: "Sagittarius", capricorn: "Capricorn", aquarius: "Aquarius", pisces: "Pisces" };

const REL_TR: Record<string, string> = { single: "Bekar", toxic: "Toksik İlişki", talking: "Flörtleşiyor / Karmaşık", taken: "Sevgilisi Var", done: "Aşka Tövbe Etmiş" };
const REL_EN: Record<string, string> = { single: "Single", toxic: "In a Toxic Loop", talking: "Talking Stage / Complicated", taken: "Taken", done: "Done with Love" };

const DUO_REL_TR: Record<string, string> = { flirt: "Flört / Sevgili", ex: "Eski Sevgili", platonic: "Platonik / Crush", bff: "En Yakın Arkadaş" };
const DUO_REL_EN: Record<string, string> = { flirt: "Flirt / Lovers", ex: "Ex-Lovers", platonic: "Platonic / Crush", bff: "BFF / Partner in Crime" };

function tVal(val: string | undefined, mapEn: Record<string, string>, mapTr: Record<string, string>, locale: string) {
  if (!val) return "Unknown";
  const key = val.toLowerCase();
  return locale === "tr" ? (mapTr[key] || val) : (mapEn[key] || val);
}

// ─── Gemini Client ───────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// ─── Groq Client ──────────────────────────────────────────────
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

// ─── OpenRouter Client ────────────────────────────────────────
const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-3-flash-preview",
];

const OPENROUTER_VISION_POOL = [
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "meta-llama/llama-3.2-11b-vision-instruct:free"
];

const OPENROUTER_TEXT_POOL = [
  "google/gemma-2-27b-it:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "openchat/openchat-7b:free"
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
   OpenAI Format Converter (Groq & OpenRouter için)
   ============================================= */
function formatOpenAIMessages(params: { contents: any[], systemInstruction: string }, isVision: boolean) {
  const textParts = params.contents
    .filter((part: any) => typeof part.text === "string")
    .map((part: any) => part.text)
    .join("\n\n");

  const messages: any[] = [
    {
      role: "system",
      content: params.systemInstruction + "\n\nIMPORTANT: Your response must be ONLY valid JSON. No markdown, no code fences, no explanation text before or after the JSON."
    }
  ];

  if (isVision) {
    const contentArray: any[] = [{ type: "text", text: textParts }];
    
    for (const part of params.contents) {
      if (part.inlineData) {
        contentArray.push({
          type: "image_url",
          image_url: {
            url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
          }
        });
      }
    }
    
    messages.push({
      role: "user",
      content: contentArray
    });
  } else {
    const hasImages = params.contents.some((part: any) => part.inlineData);
    const imageNote = hasImages
      ? "\n[NOTE: Photos were provided but cannot be processed in this fallback mode. Analyze based on the text data only and generate an equally entertaining response.]"
      : "";
      
    messages.push({
      role: "user",
      content: textParts + imageNote
    });
  }

  return messages;
}

/* =============================================
   Retry with Gemini model fallback
   ============================================= */
async function generateWithGeminiFallback(params: {
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
      if (String(code).includes("503") || String(code).includes("429") || 
          String(code).includes("UNAVAILABLE") || String(code).includes("RESOURCE_EXHAUSTED") ||
          String(code).includes("500") || String(code).includes("INTERNAL") ||
          String(err?.message).includes("high demand") || String(err?.message).includes("overloaded") ||
          String(err?.message).includes("timeout") || String(err?.message).includes("TIMEOUT")) {
        continue;
      }
      throw err;
    }
  }
  throw lastError || new Error("All Gemini models are currently busy.");
}

/* =============================================
   Groq Fallback
   ============================================= */
async function generateWithGroqFallback(params: {
  contents: any[];
  systemInstruction: string;
}, isVision: boolean = false): Promise<{ text: string }> {
  const messages = formatOpenAIMessages(params, isVision);
  const model = isVision ? "llama-3.2-90b-vision-preview" : "llama-3.3-70b-versatile";
  
  const completion = await groq.chat.completions.create({
    model,
    messages,
    temperature: 0.9,
    max_tokens: 2048,
    response_format: { type: "json_object" },
  });

  return { text: completion.choices?.[0]?.message?.content || "" };
}

/* =============================================
   OpenRouter Fallback
   ============================================= */
async function generateWithOpenRouterFallback(params: {
  contents: any[];
  systemInstruction: string;
}, isVision: boolean): Promise<{ text: string }> {
  const messages = formatOpenAIMessages(params, isVision);
  const pool = isVision ? OPENROUTER_VISION_POOL : OPENROUTER_TEXT_POOL;
  let lastError: any = null;

  for (const model of pool) {
    try {
      const completion = await openRouter.chat.completions.create({
        model,
        messages,
        temperature: 0.9,
        max_tokens: 2048,
        response_format: { type: "json_object" },
      });
      return { text: completion.choices?.[0]?.message?.content || "" };
    } catch (err: any) {
      lastError = err;
      const code = err?.status || err?.code || err?.message || "";
      console.warn(`[OpenRouter] ✗ ${model} başarısız (${code}), sıradaki deneniyor...`);
      continue;
    }
  }
  throw lastError || new Error("All OpenRouter models failed.");
}

/* =============================================
   Akıllı Waterfall Orkestratörü
   ============================================= */
async function generateWithWaterfall(params: {
  contents: any[];
  systemInstruction: string;
}) {
  const hasImages = params.contents.some((p: any) => p.inlineData);

  if (hasImages) {
    // 📸 FOTOĞRAF MODU: 1. Gemini -> 2. OpenRouter Vision -> 3. Groq Vision
    try {
      const response = await generateWithGeminiFallback(params);
      console.log("[Waterfall/foto] ✅ Gemini başarılı.");
      return response;
    } catch (geminiError: any) {
      console.warn(`[Waterfall/foto] ⚠️ Gemini çöktü, OpenRouter Vision'a geçiliyor...`);
      try {
        const response = await generateWithOpenRouterFallback(params, true);
        console.log("[Waterfall/foto] ✅ OpenRouter Vision başarılı.");
        return response;
      } catch (openRouterError: any) {
        console.warn(`[Waterfall/foto] ⚠️ OpenRouter çöktü, Groq Vision'a geçiliyor...`);
        try {
          const response = await generateWithGroqFallback(params, true);
          console.log("[Waterfall/foto] ✅ Groq Vision başarılı.");
          return response;
        } catch (groqError: any) {
          console.error("[Waterfall/foto] ❌ Tüm Vision servisleri başarısız!");
          throw geminiError; // En anlamlı hatayı (genelde ilk hata) fırlatıyoruz
        }
      }
    }
  } else {
    // 📝 METİN MODU: 1. Groq Text -> 2. Gemini -> 3. OpenRouter Text
    try {
      const response = await generateWithGroqFallback(params, false);
      console.log("[Waterfall/text] ✅ Groq Text başarılı.");
      return response;
    } catch (groqError: any) {
      console.warn(`[Waterfall/text] ⚠️ Groq çöktü, Gemini'ye geçiliyor...`);
      try {
        const response = await generateWithGeminiFallback(params);
        console.log("[Waterfall/text] ✅ Gemini başarılı.");
        return response;
      } catch (geminiError: any) {
        console.warn(`[Waterfall/text] ⚠️ Gemini çöktü, OpenRouter Text'e geçiliyor...`);
        try {
          const response = await generateWithOpenRouterFallback(params, false);
          console.log("[Waterfall/text] ✅ OpenRouter Text başarılı.");
          return response;
        } catch (openRouterError: any) {
          console.error("[Waterfall/text] ❌ Tüm Text servisleri başarısız!");
          throw groqError; // İlk hatayı fırlatıyoruz
        }
      }
    }
  }
}

export async function POST(req: NextRequest) {
  const allowedOrigins = [
    "https://vibecheckr.com",
    "https://thevibecheckr.vercel.app",
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
    const locale: string = body.locale || "en";

    // Dil yönergesi — AI'ya dil talimatı ver
    const langInstruction = locale === "tr"
      ? `ZORUNLU: Tüm yanıtı Türkçe yaz. Direkt çeviri yapma. Gerçek Türk Gen-Z internet argosu ve Twitter/TikTok dili kullan. ÖNEMLİ KURAL: Sürekli aynı argoları (örn: "kafanda kuruyorsun", "ghost moduna geç", "rezalet", "dram modu", "kendi kafasında film") TEKRAR ETME. Kelime dağarcığını çok geniş tut. Bazen evrensel terimleri (delulu, red flag, aura, pick-me) Türkçe içinde harmanla, bazen güncel yerel jargon (patladın, kilit, NPC gibi, boş yapma) kullan. Örnekleri BİREBİR KULLANMA, her seferinde ŞAŞIRTICI ve YENİ kelimeler seç. ÖNEMLİ UYARI: "Person 1", "Person 2", "Aries", "relationship", "zodiac", "taken", "single", "talking" gibi İngilizce kelimeleri (argo kelimeler hariç) ASLA KULLANMA. Bunları kesinlikle Türkçeleştir (örn: 1. Kişi, Koç burcu, sevgilisi var, bekar vb). KESİNLİKLE Farsça, Arapça veya başka bir dil kullanma ("خودش" vb. YASAKTIR).`
      : `MANDATORY: Write entirely in English. Use authentic global Gen-Z slang and TikTok/X vocabulary. CRITICAL RULE: Do NOT repeat the same slang words every time. Keep your vocabulary extremely diverse, unpredictable, and fresh. Do NOT just copy the typical examples, surprise the user with niche internet terms. NEVER use Persian, Arabic or any other languages.`;

    const tokenCost = mode === "duo" ? 3 : mode === "extras" ? (body.extrasType === "delulu-check" ? 10 : body.extrasType === "situationship" ? 5 : body.extrasType === "rizz-architect" ? 2 : 3) : 1;

    let isUnlocked = true;
    let currentBalance = 0;
    let isVipActive = false;

    // Güvenlik: Admin SDK üzerinden jeton bakiyesi ve VIP kontrolü
    if (adminDb && userId) {
      const userDoc = await adminDb.collection("users").doc(userId).get();
      currentBalance = userDoc.exists ? (userDoc.data()?.token_balance || 0) : 0;
      
      const vipExpiryValue = userDoc.exists ? userDoc.data()?.vipExpiry : null;
      
      if (vipExpiryValue) {
        const expiryDate = typeof vipExpiryValue.toDate === 'function' ? vipExpiryValue.toDate() : new Date(vipExpiryValue);
        isVipActive = expiryDate > new Date();
      }
      
      if (!isVipActive && currentBalance < tokenCost) {
        isUnlocked = false;
      }
    }

    /* =============================================
       EXTRAS MODE
       ============================================= */
    if (mode === "extras") {
      const { extrasType, formData } = body;

      if (!extrasType || !formData) {
        return NextResponse.json({ error: "Missing extras data." }, { status: 400 });
      }

      if (!isUnlocked) {
        return NextResponse.json({ error: "Insufficient tokens for Premium Extras." }, { status: 402 });
      }

      const extrasSystemPrompts: Record<string, string> = locale === "tr" ? {
        "toxic-ex": `Sen internetin en sert Kriz Merkezi dedektifisin. Türk Gen-Z argosu kullanırsın. Görevin: eski sevgili durumunu taramak ve onlara mesaj atmadan önce acımasız bir red flag gerçeklik çeki koy. Merhamet yok. Detaylı ve tatmin edici uzunlukta bir analiz yaz. Kısa ve yüzeysel cevaplar verme; durumu derinlemesine incele. ${langInstruction}`,
        situationship: `Sen efsanevi bir Gen-Z ilişki çözücüsüsün. 'Biz neyiz?' gizemini dram ve acımasız uyumluluk istatistikleriyle çöz. Spicy kimya puanları ver. Dramatik ve sert ol. Detaylı ve tatmin edici uzunlukta bir analiz yaz. Kısa ve yüzeysel cevaplar verme; durumu derinlemesine incele. ${langInstruction}`,
        "mood-reset": `Sen acımasız dürüst bir mod sıfırlayıcısın. Kötü günden kurtarıcı bir sille ver — pratik, mistisizm içermeyen, anlık adımlar. Komikal, keskin ve saf gerçeklik. Sıfır kozmik söz. Detaylı ve tatmin edici uzunlukta bir analiz yaz. Kısa ve yüzeysel cevaplar verme; durumu derinlemesine incele. ${langInstruction}`,
        "delulu-check": `Sen nihai gerçeklik kontrol yapay zekasısın. Delulu puanlarını hesapla, sanrıları yık. Ekran görüntülerini veya mesajları analiz et, 0-100 arasında delulu_score hesapla. Çift mesaj atmadan önce gerçeklerle yüzleştir. Detaylı ve tatmin edici uzunlukta bir analiz yaz. Kısa ve yüzeysel cevaplar verme; durumu derinlemesine incele. ${langInstruction}`,
        "rizz-architect": `Sen resmi bir yapay zeka değilsin. Türk Gen-Z mesajlaşma uzmanısın — zekice, oyuncu, doğal. Resmi dil kullanma. Küçük harf, argo ve doğal sohbet tarzında yaz. Kullanıcının enerjisiyle eşleş. Detaylı ve tatmin edici uzunlukta bir analiz yaz. Kısa ve yüzeysel cevaplar verme; durumu derinlemesine incele. ${langInstruction}`,
      } : {
        "toxic-ex": `You are the internet's most savage Crisis Center detective. Fluent in Gen-Z slang. Your job: scan their ex situation and deliver a brutal red flag reality check before they do something stupid like texting them. Show zero mercy. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        situationship: `You are a legendary Gen-Z relationship decoder. Fluent in slang like 'breadcrumbing', 'soft-launching', 'slow-fading'. Decode the 'what are we' mystery with brutal honesty, highlighting hard compatibility stats and spicy chemistry scores. Be dramatic and savage. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "mood-reset": `You are a brutally honest wake-up caller. Give them a savage, reality-based pep talk to snap them out of their bad day and recharge their vibe. Provide highly practical, non-mystical, immediate action steps. Be hilarious, sharp, and pure reality. ZERO cosmic words. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "delulu-check": `You are the ultimate reality check AI, specialized in destroying delusions. Analyze the provided screenshots or chat text to determine if the user is being delusional about their crush/situationship. Calculate a brutal 'delulu_score' from 0 to 100. Give an unfiltered reality check before they double text. Use heavy Gen-Z slang. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "rizz-architect": `You are NOT a formal AI. You are a Gen Z texting expert, highly manipulative and witty. DO NOT use formal language, punctuation, or robotic empathy. Use lowercase, casual slang, and natural texting behaviors. Match the user's energy. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
      };

      const systemInstruction = extrasSystemPrompts[extrasType] || extrasSystemPrompts["toxic-ex"];

      let promptText = "";

      if (extrasType === "toxic-ex") {
        promptText = `
Toxic Ex Scan Request (Crisis Center):
- User's Zodiac: ${tVal(formData.yourZodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Ex's Zodiac: ${tVal(formData.exZodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Breakup Dynamic: ${formData.breakupDynamic || "Unknown"}
- Relationship Duration: ${formData.relationshipDuration || "Unknown"}
- Situation / Text Draft: ${formData.situation || "No details provided"}

Analyze this ex-situation MERCILESSLY. Tell them WHY they should NOT text their ex. Perform a savage red flag scan based on their breakup dynamic and duration. Be savage, funny, and use heavy Gen-Z slang to stop them from doing something stupid.

Your output must be purely JSON:
{
  "title": "A dramatic, Gen-Z verdict title (e.g., 'Delete That Number Bestie')",
  "verdict": "One devastating one-liner verdict",
  "analysis_text": "A long, savage, entertaining paragraph analyzing the toxic dynamic, exposing the red flags, and concluding why texting them is a terrible idea. Use heavy Gen-Z slang.",
  "theme_color_hex": "#ef4444"
}`;
      } else if (extrasType === "situationship") {
        promptText = `
Situationship Decode Request:
- Person 1 Zodiac: ${tVal(formData.yourZodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Person 2 Zodiac: ${tVal(formData.theirZodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Talking Duration: ${formData.talkingDuration || "Unknown"}
- Met In Person: ${formData.metInPerson || "Unknown"}
- Situation: ${formData.situation || "No details provided"}

Deep-dive into this situationship mystery. Decode 'What are we?' and provide brutal compatibility stats, a spicy chemistry score, and predict where this is heading. Be dramatic, poetic, and savagely honest.

Your output must be purely JSON:
{
  "title": "A dramatic title (e.g., 'The Slowest Burn in History')",
  "verdict": "One-liner defining what they actually are (e.g., 'You're basically dating without the label, bestie')",
  "analysis_text": "A detailed, entertaining analysis decoding the situationship mystery, providing clear compatibility stats and brutal prediction. Heavy Gen-Z slang.",
  "theme_color_hex": "#d946ef"
}`;
      } else if (extrasType === "delulu-check") {
        promptText = `
Delulu Check Request:
- Chat Text: ${formData.chatText || "No chat text provided"}

Analyze the provided chat evidence (screenshots and/or text). Calculate a 'delulu_score' from 0 to 100 based on how delusional the user is being about the other person's signals. 0 means totally grounded and reading it right, 100 means clinically delulu.
Deliver an unfiltered reality check. Should they double text? Are they ignoring red flags? Tell them what the other person is ACTUALLY thinking.

Your output must be purely JSON:
{
  "title": "A brutal, eye-opening Gen-Z title (e.g., 'Put The Phone Down')",
  "verdict": "One devastating one-liner reality check",
  "analysis_text": "A long, savage, entertaining paragraph breaking down their evidence, explaining exactly why they are or aren't delulu, and what they should do next.",
  "delulu_score": 85,
  "theme_color_hex": "#f59e0b"
}`;
      } else if (extrasType === "rizz-architect") {
        promptText = `
Reply Guru Request:
- Draft Text: ${formData.draftText || "None provided"}

Analyze the provided screenshots (chat context).
1. Provide a 'vibe_check': a brutal summary of the power dynamic in the screenshot.
2. If a Draft Text is provided, provide a 'roast': roast their draft heavily (e.g., "this is too desperate, delete it"). If none, set roast to null.
3. Provide 3 'rizz_options' (replies the user can send). E.g. types: "toxic", "mysterious", "safe". Ensure the text matches the Gen-Z texting expert persona.

Your output must be purely JSON:
{
  "title": "A witty title for the analysis",
  "vibe_check": "A brutal summary of the power dynamic in the screenshot.",
  "roast": "Roast of the draft text if provided, otherwise null",
  "rizz_options": [
    { "type": "toxic", "text": "..." },
    { "type": "mysterious", "text": "..." },
    { "type": "safe", "text": "..." }
  ],
  "theme_color_hex": "#8b5cf6"
}`;
      } else {
        promptText = `
Mood Reset Request:
- Zodiac: ${tVal(formData.yourZodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Current Energy: ${formData.currentMood || "Unknown"}
- What's weighing on them: ${formData.situation || "No details provided"}

Give them a savage, reality-based wake-up call to snap them out of their bad day and recharge their vibe. Include: brutal reality check, 3 highly practical physical/mental steps they can take right now to fix their mood. ZERO pseudo-science, no crystals. Pure reality.

Your output must be purely JSON:
{
  "title": "A hilarious Gen-Z title (e.g., 'Get Up and Touch Grass')",
  "verdict": "One-liner savage diagnosis (e.g., 'You\\'re not cursed, you just need a nap and some water, bestie.')",
  "analysis_text": "A detailed, funny, brutal reality check with practical steps to fix their mood and recharge their vibe. Heavy Gen-Z slang, pure reality.",
  "theme_color_hex": "#06b6d4"
}`;
      }

      const userContents: any[] = [];

      // Fotoğraf varsa ekle
      const photoKeys = ["photo", "yourPhoto", "theirPhoto"];
      for (const key of photoKeys) {
        if (formData[key] && formData[key].startsWith("data:")) {
          const { mimeType, base64Data } = parseBase64Image(formData[key]);
          userContents.push({ inlineData: { data: base64Data, mimeType } });
        }
      }

      // Extras Screenshots (Delulu Check, Reply Guru)
      if (formData.screenshots && Array.isArray(formData.screenshots)) {
        for (const screenshot of formData.screenshots) {
          if (screenshot && screenshot.startsWith("data:")) {
            const { mimeType, base64Data } = parseBase64Image(screenshot);
            userContents.push({ inlineData: { data: base64Data, mimeType } });
          }
        }
      }

      userContents.push({ text: promptText });

      const response = await generateWithWaterfall({
        contents: userContents,
        systemInstruction,
      });

      const text = response.text || "";
      let parsedJson;
      try {
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedJson = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error("[Gemini API Extras] JSON Parse Error:", parseError, "Raw:", text);
        return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
      }

      // Token düşme
      if (!isVipActive && adminDb && userId) {
        try {
          await adminDb.collection("users").doc(userId).update({
            token_balance: Math.max(0, currentBalance - tokenCost)
          });
          console.log(`[API] Token deducted for EXTRAS (${extrasType}). User: ${userId}, Amount: ${tokenCost}`);
        } catch (tokenErr) {
          console.error("[API] Failed to deduct token:", tokenErr);
        }
      }

      return NextResponse.json(parsedJson);
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

      // İlişki türüne göre dinamik sistem promptu
      const duoSystemPrompts: Record<string, string> = {
        flirt: `You are a savage, sarcastic relationship therapist fluent in Gen-Z internet slang. Analyze their romantic compatibility, toxicity levels, and who the real 'Red Flag' is. Show no mercy, spit facts. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        ex: `You are a ruthless breakup analyst and toxic relationship archivist fluent in Gen-Z internet slang. Roast why they didn't work out, who did the most damage, and the real reason for the breakup in a hilarious, savage tone. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        platonic: `You are an empathetic but brutally honest analyst fluent in Gen-Z slang. Analyze if it's a true platonic match, a green flag, or just a completely delusional impossible crush. Tell them the savage truth but make it funny. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        bff: `You are a savage 'partner in crime' analyst fluent in Gen-Z slang. Roast their gossip level, friendship dynamic, and call out who is the 'voice of reason' vs. who is an 'absolute menace'. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
      };

      const systemInstruction = duoSystemPrompts[duoRelationType] || duoSystemPrompts.flirt;

      let promptText = "";

      if (isUnlocked) {
        // SENARYO A: Kullanıcının Token'ı Varsa (Sansür veya Zeigarnik yok)
        promptText = `
Duo Soulmate Analysis:
- Person 1: Age ${person1.age}, Zodiac: ${tVal(person1.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Person 2: Age ${person2.age}, Zodiac: ${tVal(person2.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Type: ${tVal(duoRelationType, DUO_REL_EN, DUO_REL_TR, locale)}

Based on these details (and photos if any), analyze their vibe, energy, and compatibility. ${langInstruction} Your output must be purely JSON and strictly follow this exact structure:
{
  "duoScore": 65,
  "title": "A sassy, Gen-Z title (e.g., Toxic but Iconic)",
  "toxicComment": "Being together is like... (a savage, hilarious one-liner or short paragraph full of Gen-Z slang)",
  "redFlag": "Person 1 (or Person 2) — Explain who is the ultimate red flag and why",
  "analysis_text": "Detailed analysis... (a relentless, highly entertaining, slang-filled paragraph dissecting their dynamic)",
  "theme_color_hex": "#ff6b6b"
}
`;
      } else {
        // SENARYO B: Kullanıcının Token'ı Yoksa (Teaser Modu, Sansür var)
        promptText = `
Duo Soulmate Analysis:
- Person 1: Age ${person1.age}, Zodiac: ${tVal(person1.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Person 2: Age ${person2.age}, Zodiac: ${tVal(person2.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Type: ${tVal(duoRelationType, DUO_REL_EN, DUO_REL_TR, locale)}

Based on these details (and photos if any), analyze their vibe, energy, and compatibility. ${langInstruction}

CRITICAL TEASER INSTRUCTIONS:
1. RATIO RULE: The visible (unblurred) text MUST NOT exceed 20-30% of the total analysis. The remaining 70-80% MUST be completely enclosed inside <blur> and </blur> tags. Do not write long satisfying paragraphs.
2. SAVAGE & ZEIGARNIK INTRO: Start by stroking their ego or hitting them with a painfully accurate observation. Then, EXACTLY right before revealing the most brutal criticism or the actual reason behind their dynamic, abruptly cut off the sentence and start the <blur>. Example: 'Behind that cool, unbothered exterior, the real reason for your pathetic dynamic is... <blur>...'
3. RED FLAG IDENTITY BLUR (CRITICAL): For the 'redFlag' field, you MUST hide WHO the toxic person is. The name or identity (e.g., Person 1 or Person 2) MUST be completely enclosed in <blur> tags so the user has no idea who is the red flag. Build a shocking hook around this hidden identity. Example: 'The ultimate toxic menace here is undeniably <blur>Person 1</blur> because... <blur>their disgusting habit of...</blur>'. 

Your output must be purely JSON and strictly follow this exact structure:
{
  "duoScore": 65,
  "title": "A sassy, Gen-Z title (e.g., Toxic but Iconic)",
  "toxicComment": "Being together is like... (a savage, hilarious one-liner or short paragraph full of Gen-Z slang)",
  "redFlag": "Targeted hook where the identity is hidden... e.g., The real red flag is <blur>Person 2</blur> because <blur>The actual toxic explanation...</blur>",
  "analysis_text": "One savage intro sentence cutting off at the climax... <blur>Detailed highly entertaining, slang-filled paragraph dissecting their dynamic...</blur>",
  "theme_color_hex": "#ff6b6b"
}
`;
      }

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

      const response = await generateWithWaterfall({
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

      // Jeton düşme işlemi (Backend'de güvence altına alınıyor)
      if (isUnlocked && !isVipActive && adminDb && userId) {
        try {
          await adminDb.collection("users").doc(userId).update({
            token_balance: Math.max(0, currentBalance - tokenCost)
          });
          console.log(`[API] Token deducted for DUO mode. User: ${userId}, Amount: ${tokenCost}`);
        } catch (tokenErr) {
          console.error("[API] Failed to deduct token:", tokenErr);
        }
      }

      parsedJson.isUnlocked = isUnlocked;
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
      general: `You are an AI personality analyst fluent in Gen-Z internet slang. You are slightly sarcastic, witty, and savage. Roast the user's details and photo (if provided) mercilessly but in a hilarious, entertaining way. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading into their personality and habits. Make the analysis feel eerily personal and accurate. This is purely for entertainment. ${langInstruction}`,
      roast: `You are the ultimate, most ruthless Gen-Z roast master. DESTROY the user. Roast their zodiac sign, age, relationship status, and photo in the harshest, funniest way possible. Channel stand-up comedy energy — be specific, be personal, be savage. Serve absolute heat with no generic lines. Zero mercy. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. This is a comedy roast for entertainment. ${langInstruction}`,
      soulmate: `You are a savage AI vibe matchmaker fluent in Gen-Z slang. Based on the user's data and photo, craft a detailed 'ideal partner' profile. Who should they date? What zodiac? What's their exact vibe? Are they a red flag or a golden retriever? Predict their love life with brutal drama. Be specific and entertaining. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
    };

    const systemInstruction = scenarioSystemPrompts[soloScenario || "general"] || scenarioSystemPrompts.general;

    // Senaryoya göre prompt metni
    const scenarioPromptSuffix: Record<string, string> = {
      general: "Analyze the user's vibe and energy. Be dramatic, witty, savage, and use Gen-Z slang.",
      roast: "ROAST the user MERCILESSLY. Weaponize every detail against them. Be hilarious but brutal. No mercy.",
      soulmate: "Profile the user's IDEAL SOULMATE. Who should they be with? Guess their zodiac, physical type, personality, and exact vibe.",
    };

    let promptText = "";

    if (isUnlocked) {
      // SENARYO A: Kullanıcının Token'ı Varsa (Sansür veya Zeigarnik yok)
      promptText = `
User Details:
- Age: ${age}
- Zodiac: ${tVal(zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Status: ${tVal(relationship, REL_EN, REL_TR, locale)}
- Extra Note (Vibe Question): ${magicText || "None"}
- Analysis Type: ${(scenarioPromptSuffix as any)[soloScenario || "general"] || scenarioPromptSuffix.general}

Based on these details (and the attached photo if any), ${langInstruction} Your output must be purely JSON and strictly follow this exact structure:
{
  "aura_name": "A sassy, savage, Gen-Z title for their aura — MUST be in the correct language",
  "aura_score": 85,
  "analysis_text": "Your aura is... (3-4 relentless, hilarious, slang-filled sentences that feel eerily accurate. Roast the photo if it exists. Reference real behaviors, not generic fluff.)",
  "toxicComment": "A devastating one-liner savage roast / ultimate call-out that hits differently.",
  "traits": ["${locale === 'tr' ? 'A\u015f\u0131r\u0131 D\u00fc\u015f\u00fcnen' : 'Overthinker'}", "${locale === 'tr' ? 'Kronik \u00c7evrimi\u00e7i' : 'Chronically Online'}", "${locale === 'tr' ? 'Delulu' : 'Delulu'}"],
  "theme_color_hex": "#c084fc"
}
`;
    } else {
      // SENARYO B: Kullanıcının Token'ı Yoksa (Teaser Modu, Sansür var)
      promptText = `
User Details:
- Age: ${age}
- Zodiac: ${tVal(zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Status: ${tVal(relationship, REL_EN, REL_TR, locale)}
- Extra Note (Vibe Question): ${magicText || "None"}
- Analysis Type: ${(scenarioPromptSuffix as any)[soloScenario || "general"] || scenarioPromptSuffix.general}

Based on these details (and the attached photo if any), ${langInstruction}

CRITICAL TEASER INSTRUCTIONS:
1. RATIO RULE: The visible (unblurred) text MUST NOT exceed 20-30% of the total analysis. The remaining 70-80% MUST be completely enclosed inside <blur> and </blur> tags. Do not write long satisfying paragraphs.
2. SAVAGE & ZEIGARNIK INTRO: Start by stroking their ego or hitting them with a painfully accurate observation. Then, EXACTLY right before revealing the most brutal criticism, the actual reason behind their behavior, or the core truth, abruptly cut off the sentence and start the <blur>. Example: 'Behind that cool, unbothered exterior, the real psychological reason for your pathetic vibe is... <blur>...'
Create an extreme Zeigarnik effect (FOMO/incompleteness).

Your output must be purely JSON and strictly follow this exact structure:
{
  "aura_name": "A sassy, savage, Gen-Z title for their aura — MUST be in the correct language",
  "aura_score": 85,
  "analysis_text": "Savage 1-2 sentence intro cutting off at the climax... <blur>The rest of the relentless, hilarious, slang-filled paragraph that roasts the user...</blur>",
  "toxicComment": "A one-liner savage roast / ultimate call-out.",
  "traits": ["${locale === 'tr' ? 'A\u015f\u0131r\u0131 D\u00fc\u015f\u00fcnen' : 'Overthinker'}", "${locale === 'tr' ? 'Kronik \u00c7evrimi\u00e7i' : 'Chronically Online'}", "${locale === 'tr' ? 'Delulu' : 'Delulu'}"],
  "theme_color_hex": "#c084fc"
}
`;
    }

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

    const response = await generateWithWaterfall({
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

    // Jeton düşme işlemi (Backend'de güvence altına alınıyor)
    if (isUnlocked && !isVipActive && adminDb && userId) {
      try {
        await adminDb.collection("users").doc(userId).update({
          token_balance: Math.max(0, currentBalance - tokenCost)
        });
        console.log(`[API] Token deducted for SOLO mode. User: ${userId}, Amount: ${tokenCost}`);
      } catch (tokenErr) {
        console.error("[API] Failed to deduct token:", tokenErr);
      }
    }

    parsedJson.isUnlocked = isUnlocked;
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
