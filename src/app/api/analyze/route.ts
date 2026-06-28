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

const DUO_REL_TR: Record<string, string> = { flirt: "Flört / Sevgili", ex: "Eski Sevgili", platonic: "Platonik / Crush", bff: "En Yakın Arkadaş", battle: "Vibe Savaşı / Kıyaslama" };
const DUO_REL_EN: Record<string, string> = { flirt: "Flirt / Lovers", ex: "Ex-Lovers", platonic: "Platonic / Crush", bff: "BFF / Partner in Crime", battle: "Aura Battle / Comparison" };

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
      // Bütün hatalarda bir sonraki Gemini modelini dene
      continue;
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
  
  const options: any = {
    model,
    messages,
    temperature: 0.9,
    max_tokens: 2048,
  };
  
  // Groq Vision modelleri json_object formatını desteklemez, sadece Text modellerinde kullanıyoruz
  if (!isVision) {
    options.response_format = { type: "json_object" };
  }

  const completion = await groq.chat.completions.create(options);

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
        // Ücretsiz OpenRouter modellerinin hepsi strict JSON formatını desteklemediği için bunu kaldırıyoruz.
        // Zaten System Prompt'ta sadece JSON döndürmesi talimatı verildi.
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
    "https://thevibecheckr.com",
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

    const tokenCost = mode === "duo" ? 3 : mode === "extras" ? (body.extrasType === "delulu-check" ? 10 : body.extrasType === "situationship" ? 5 : body.extrasType === "rizz-architect" ? 2 : body.extrasType === "profile-autopsy" ? 8 : 3) : 1;

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
        "profile-autopsy": `Sen dünyanın en iyi sosyal medya ve dating profil danışmanısın — hem acımasız dürüstsün hem de gerçekten yararlı tavsiyelerin var. Görünüşe göre iyi olan şeyleri de takdir edersin, kötü olanları ise hiç acımadan gösterirsin. Ne aşırı övücü ne de saf roast yapan birisin. Verilen profil ekran görüntülerini analiz et, gerçekçi ve dengeli bir denetim yap. Türk Gen-Z argo ve internet dilini kullan. ${langInstruction}`,
      } : {
        "toxic-ex": `You are the internet's most savage Crisis Center detective. Fluent in Gen-Z slang. Your job: scan their ex situation and deliver a brutal red flag reality check before they do something stupid like texting them. Show zero mercy. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        situationship: `You are a legendary Gen-Z relationship decoder. Fluent in slang like 'breadcrumbing', 'soft-launching', 'slow-fading'. Decode the 'what are we' mystery with brutal honesty, highlighting hard compatibility stats and spicy chemistry scores. Be dramatic and savage. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "mood-reset": `You are a brutally honest wake-up caller. Give them a savage, reality-based pep talk to snap them out of their bad day and recharge their vibe. Provide highly practical, non-mystical, immediate action steps. Be hilarious, sharp, and pure reality. ZERO cosmic words. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "delulu-check": `You are the ultimate reality check AI, specialized in destroying delusions. Analyze the provided screenshots or chat text to determine if the user is being delusional about their crush/situationship. Calculate a brutal 'delulu_score' from 0 to 100. Give an unfiltered reality check before they double text. Use heavy Gen-Z slang. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "rizz-architect": `You are NOT a formal AI. You are a Gen Z texting expert, highly manipulative and witty. DO NOT use formal language, punctuation, or robotic empathy. Use lowercase, casual slang, and natural texting behaviors. Match the user's energy. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
        "profile-autopsy": `You are the world's best social media and dating profile consultant — brutally honest but genuinely helpful and balanced. You praise what actually works, and you demolish what doesn't. You are NOT just a roast machine, and NOT a cheerleader. You are the friend who tells the hard truth. Analyze the provided profile screenshot(s) and deliver a balanced, actionable audit. Use authentic Gen-Z slang. ${langInstruction}`,
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
      } else if (extrasType === "profile-autopsy") {
        const profileMode = formData.profileMode || "self";
        const platform = formData.platform || "Unknown";
        const context = formData.situation || "";
        const isSelfMode = profileMode === "self";

        const selfPromptEN = `
Profile Autopsy Request — SELF MODE (analyzing your own profile):
- Platform: ${platform}
- Context from user: ${context || "None"}

You have been given ${formData.screenshots?.length || 0} screenshot(s) of this user's own ${platform} profile.
Perform a brutally honest but BALANCED profile audit. You MUST:
1. Identify genuine strengths (green flags) — things that are actually working well.
2. Identify real weaknesses (red flags) — things that are hurting their performance.
3. Give a specific, actionable top 3 fixes ranked by priority.
4. Give an overall score from 0 to 100 (be realistic, most profiles are 40-75).
5. Write a memorable, one-line verdict that captures their profile's energy.
6. Write a detailed analysis explaining your reasoning.

Platform-specific criteria:
- Instagram: aesthetic consistency, bio quality, caption engagement, posting strategy
- Tinder/Bumble/Hinge: photo order (first photo is most important), bio hook, conversation starters
- X (Twitter): bio brevity, pinned post quality, overall identity clarity
- BeReal: authenticity, frequency, engagement

Your output must be purely JSON:
{
  "title": "A memorable, Gen-Z verdict title for their profile (e.g., 'A 7 Hiding in a 5's Profile')",
  "verdict": "One savage but fair one-liner summarizing the profile's energy",
  "analysis_text": "A detailed, entertaining, balanced paragraph explaining the audit findings. Mention what works and what doesn't. Use Gen-Z slang.",
  "profile_overall_score": 68,
  "profile_green_flags": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
  "profile_red_flags": ["Specific weakness 1", "Specific weakness 2"],
  "profile_top_fixes": ["Priority fix #1 (most impactful)", "Priority fix #2", "Priority fix #3"],
  "profile_platform": "${platform}",
  "profile_mode": "self",
  "theme_color_hex": "#7c3aed"
}`;

        const selfPromptTR = `
Profil Otopsisi İsteği — KENDİ PROFİLİN (kendi profilini analiz ediyoruz):
- Platform: ${platform}
- Bağlam: ${context || "Yok"}

${formData.screenshots?.length || 0} adet ${platform} profil ekran görüntüsü verildi.
Hem acımasız dürüst hem de dengeli bir profil denetimi yap:
1. Gerçekten işe yarayan güçlü yanları (green flag'leri) belirle.
2. Profilini mahveden gerçek zayıflıkları (red flag'leri) ortaya koy.
3. Öncelik sırasına göre 3 acil düzeltme (top fix) öner.
4. 0-100 arasında genel puan ver (gerçekçi ol, çoğu profil 40-75 aralığındadır).
5. Profilin enerjisini özetleyen unutulmaz bir karar cümlesi yaz.

Platform'a özel kriterler:
- Instagram: estetik tutarlılık, bio kalitesi, caption'lar, vibe
- Tinder/Bumble/Hinge: fotoğraf sırası (ilk fotoğraf en önemlisi), bio hook'u, sohbet açıcı ipuçları
- X (Twitter): bio özlülüğü, pin'li gönderi kalitesi, genel aura
- BeReal: samimiyet, aura

Çıktın sadece JSON olmalı ve İÇERİĞİ TAMAMEN GEN-Z TÜRKÇESİ OLMALI:
{
  "title": "Unutulmaz, Gen-Z tarzı profil başlığı (örn: '7'lik Biri 5'lik Profilinde Saklanıyor')",
  "verdict": "Profil enerjisini özetleyen tek bir sert ama adil cümle",
  "analysis_text": "Detaylı, eğlenceli ve dengeli analiz paragrafı. Neyin işe yaradığını ve neyin patladığını açıkla. Gen-Z argosunu (red flag, green flag, aura, pick-me vb.) bolca kullan.",
  "profile_overall_score": 68,
  "profile_green_flags": ["Spesifik iyi yan 1 (Gen-Z diliyle)", "Spesifik iyi yan 2"],
  "profile_red_flags": ["Spesifik sıkıntı 1 (Gen-Z diliyle)", "Spesifik sıkıntı 2"],
  "profile_top_fixes": ["Öncelikli fix #1", "Öncelikli fix #2", "Öncelikli fix #3"],
  "profile_platform": "${platform}",
  "profile_mode": "self",
  "theme_color_hex": "#7c3aed"
}`;

        const otherPromptEN = `
Profile Autopsy Request — DETECTIVE MODE (analyzing someone else's profile):
- Platform: ${platform}
- Context from user: ${context || "None"}

You have been given ${formData.screenshots?.length || 0} screenshot(s) of SOMEONE ELSE's ${platform} profile.
Perform a brutally honest personality and vibe read based purely on their profile. You MUST:
1. Identify genuine green flags — things that suggest they're worth engaging with.
2. Identify red flags — patterns that suggest potential issues (e.g., commitment phobia, attention-seeking, low effort).
3. Give a personality read — what type of person does this profile suggest they are?
4. Give an engagement score (0-100): how likely is this person to swipe right / follow back / respond?
5. Write a detailed, entertaining analysis.

Your output must be purely JSON:
{
  "title": "A dramatic Gen-Z title for the vibe read (e.g., 'Main Character Energy, NPC Execution')",
  "verdict": "One devastating one-liner summarizing this person's profile vibe",
  "analysis_text": "A detailed, entertaining, brutally honest paragraph reading this person's profile. What are they giving? What are they hiding? Use Gen-Z slang.",
  "profile_overall_score": 55,
  "profile_green_flags": ["Genuine green flag from their profile", "Another genuine positive signal"],
  "profile_red_flags": ["Specific red flag from profile", "Another red flag pattern"],
  "profile_top_fixes": ["Should you engage? Here's tip 1 for approaching them", "Tip 2", "Tip 3 (warning sign to watch)"],
  "profile_platform": "${platform}",
  "profile_mode": "other",
  "theme_color_hex": "#7c3aed"
}`;

        const otherPromptTR = `
Profil Otopsisi İsteği — DEDEKTİF MODU (başkasının profilini analiz ediyoruz):
- Platform: ${platform}
- Bağlam: ${context || "Yok"}

${formData.screenshots?.length || 0} adet BAŞKASININ ${platform} profil ekran görüntüsü verildi.
Bu kişinin profilinden acımasızca kişilik ve vibe okuması yap:
1. Green flag'ler — bu kişiyle etkileşime girmeye değer olduğunu gösteren sinyaller.
2. Red flag'ler — arkana bakmadan kaçman veya dikkat etmen gereken toksik kalıplar (ör: bağlama sorunu, pick-me enerjisi).
3. Kişilik okuması — bu profil nasıl bir aura veriyor?
4. Etkileşim skoru (0-100): Bu kişi sağa kaydırır/takip eder/yanıt verir mi?

Çıktın sadece JSON olmalı ve İÇERİĞİ TAMAMEN GEN-Z TÜRKÇESİ OLMALI:
{
  "title": "Dramatik Gen-Z tarzı bir başlık (örn: 'Main Character Enerjisi, NPC İcraatı')",
  "verdict": "Bu kişinin profil vibe'ını özetleyen tek bir acımasız cümle",
  "analysis_text": "Bu kişinin profilini okuyan detaylı, eğlenceli ve acımasız dürüst analiz paragrafı. Bize ne veriyor? Neyi saklıyor? Gen-Z argosu (red flag, ghosting vb.) kullan.",
  "profile_overall_score": 55,
  "profile_green_flags": ["Profilden gerçek green flag 1", "Gerçek pozitif sinyal 2"],
  "profile_red_flags": ["Profilden spesifik red flag", "Başka bir toksik işaret"],
  "profile_top_fixes": ["Bu kişiye nasıl yaklaşmalısın? İpucu 1", "Dikkat etmen gereken uyarı işareti"],
  "profile_platform": "${platform}",
  "profile_mode": "other",
  "theme_color_hex": "#7c3aed"
}`;

        if (isSelfMode) {
          promptText = locale === "tr" ? selfPromptTR : selfPromptEN;
        } else {
          promptText = locale === "tr" ? otherPromptTR : otherPromptEN;
        }
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
      const { person1, person2, duoRelationType, magicText } = body;

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
        battle: `You are an AI Aura Judge fluent in Gen-Z internet slang. Your job is to compare both people and definitively decide who is cooler / has a higher aura. You MUST roast the loser mercilessly, and briefly praise the winner without spoiling them too much. The comparison should be highly entertaining, dramatic, and savage. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
      };

      const systemInstruction = duoSystemPrompts[duoRelationType] || duoSystemPrompts.flirt;

      let promptText = "";
      const isBattle = duoRelationType === "battle";
      const titleStr = isBattle ? "Aura Battle Analysis" : "Duo Soulmate Analysis";
      const baseInstruction = isBattle 
        ? `Based on these details (and photos if any), compare their auras, decide who has the higher aura, and brutally roast the loser. DO NOT treat this as a romantic relationship or compatibility test. This is a pure vibe competition.` 
        : `Based on these details (and photos if any), analyze their vibe, energy, and compatibility.`;
      
      const redFlagUnlocked = isBattle
        ? `"redFlag": "Person 1 (or Person 2) — Explicitly state who LOST the battle and aggressively roast them."`
        : `"redFlag": "Person 1 (or Person 2) — Explain who is the ultimate red flag and why"`;

      const redFlagLocked = isBattle
        ? `"redFlag": "Targeted hook where the loser's identity is hidden... e.g., The undeniable loser of this battle is <blur>Person 2</blur> because <blur>The savage reason they have zero aura...</blur>"`
        : `"redFlag": "Targeted hook where the identity is hidden... e.g., The real red flag is <blur>Person 2</blur> because <blur>The actual toxic explanation...</blur>"`;

      if (isUnlocked) {
        // SENARYO A: Kullanıcının Token'ı Varsa (Sansür veya Zeigarnik yok)
        promptText = `
${titleStr}:
- Person 1: Age ${person1.age}, Zodiac: ${tVal(person1.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Person 2: Age ${person2.age}, Zodiac: ${tVal(person2.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Type: ${tVal(duoRelationType, DUO_REL_EN, DUO_REL_TR, locale)}
${magicText ? `- User's Context / Note: ${magicText}\n` : ""}
${baseInstruction} ${langInstruction} Your output must be purely JSON and strictly follow this exact structure:
{
  "duoScore": 65,
  "title": "A sassy, Gen-Z title (e.g., Toxic but Iconic)",
  "toxicComment": "Being together is like... (a savage, hilarious one-liner or short paragraph full of Gen-Z slang)",
  ${redFlagUnlocked},
  "analysis_text": "Detailed analysis... (a relentless, highly entertaining, slang-filled paragraph dissecting their dynamic)",
  "theme_color_hex": "#ff6b6b"
}
`;
      } else {
        // SENARYO B: Kullanıcının Token'ı Yoksa (Teaser Modu, Sansür var)
        promptText = `
${titleStr}:
- Person 1: Age ${person1.age}, Zodiac: ${tVal(person1.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Person 2: Age ${person2.age}, Zodiac: ${tVal(person2.zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Type: ${tVal(duoRelationType, DUO_REL_EN, DUO_REL_TR, locale)}
${magicText ? `- User's Context / Note: ${magicText}\n` : ""}
${baseInstruction} ${langInstruction}

CRITICAL TEASER INSTRUCTIONS:
1. RATIO RULE: The visible (unblurred) text MUST NOT exceed 20-30% of the total analysis. The remaining 70-80% MUST be completely enclosed inside <blur> and </blur> tags. Do not write long satisfying paragraphs.
2. SAVAGE & ZEIGARNIK INTRO: Start by stroking their ego or hitting them with a painfully accurate observation. Then, EXACTLY right before revealing the most brutal criticism or the actual reason behind their dynamic, abruptly cut off the sentence and start the <blur>. Example: 'Behind that cool, unbothered exterior, the real reason for your pathetic dynamic is... <blur>...'
3. RED FLAG / LOSER IDENTITY BLUR (CRITICAL): For the 'redFlag' field, you MUST hide WHO the loser/toxic person is. The name or identity (e.g., Person 1 or Person 2) MUST be completely enclosed in <blur> tags so the user has no idea who is the loser. Build a shocking hook around this hidden identity. 

Your output must be purely JSON and strictly follow this exact structure:
{
  "duoScore": 65,
  "title": "A sassy, Gen-Z title (e.g., Toxic but Iconic)",
  "toxicComment": "Being together is like... (a savage, hilarious one-liner or short paragraph full of Gen-Z slang)",
  ${redFlagLocked},
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
      general: `You are an AI personality analyst fluent in Gen-Z internet slang. You are slightly sarcastic, witty, and savage, acting like the user's brutally honest best friend. Tell them the truth in a fun, entertaining way. If their vibe is cool, praise them and give them credit. If they have flaws or toxic traits, playfully poke fun at them. Do not blindly roast them, but keep it balanced, sharp, and highly observant. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading into their personality and habits. Make the analysis feel eerily personal and accurate. This is purely for entertainment. ${langInstruction}`,
      roast: `You are the ultimate, most ruthless Gen-Z roast master. DESTROY the user. Roast their zodiac sign, age, relationship status, and photo in the harshest, funniest way possible. Channel stand-up comedy energy — be specific, be personal, be savage. Serve absolute heat with no generic lines. Zero mercy. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. This is a comedy roast for entertainment. ${langInstruction}`,
      soulmate: `You are a savage AI vibe matchmaker fluent in Gen-Z slang. Based on the user's data and photo, craft a detailed 'ideal partner' profile. Who should they date? What zodiac? What's their exact vibe? Are they a red flag or a golden retriever? Predict their love life with brutal drama. Be specific and entertaining. Write a detailed and satisfyingly long analysis. Do not give short generic answers; provide an in-depth reading. ${langInstruction}`,
    };

    const systemInstruction = scenarioSystemPrompts[soloScenario || "general"] || scenarioSystemPrompts.general;

    // Senaryoya göre prompt metni
    const scenarioPromptSuffix: Record<string, string> = {
      general: "Analyze the user's vibe and energy. Be a brutally honest best friend. Praise their cool traits, playfully poke fun at their flaws, and use Gen-Z slang.",
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

Based on these details (and the attached photo if any), ${langInstruction} 

CRITICAL SCORING RULE: The aura_score MUST NOT default to 85. 90% of the time, give a highly realistic and wildly varied score between 1 and 100 (e.g. 12, 47, 63, 88). ONLY if the vibe is RARELY and EXTREMELY terrible/toxic, you are allowed to give negative scores (like -100 or -999). ONLY if the vibe is RARELY and FLAWLESSLY god-tier, you can give 999. Use extreme scores sparingly as a rare Easter egg!

Your output must be purely JSON and strictly follow this exact structure:
{
  "aura_name": "A sassy, savage, Gen-Z title for their aura — MUST be in the correct language",
  "aura_score": 62,
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

CRITICAL SCORING RULE: The aura_score MUST NOT default to 85. 90% of the time, give a highly realistic and wildly varied score between 1 and 100 (e.g. 12, 47, 63, 88). ONLY if the vibe is RARELY and EXTREMELY terrible/toxic, you are allowed to give negative scores (like -100 or -999). ONLY if the vibe is RARELY and FLAWLESSLY god-tier, you can give 999. Use extreme scores sparingly as a rare Easter egg!

CRITICAL TEASER INSTRUCTIONS:
1. RATIO RULE: The visible (unblurred) text MUST NOT exceed 20-30% of the total analysis. The remaining 70-80% MUST be completely enclosed inside <blur> and </blur> tags. Do not write long satisfying paragraphs.
2. SAVAGE & ZEIGARNIK INTRO: Start by stroking their ego or hitting them with a painfully accurate observation. Then, EXACTLY right before revealing the most brutal criticism, the actual reason behind their behavior, or the core truth, abruptly cut off the sentence and start the <blur>. Example: 'Behind that cool, unbothered exterior, the real psychological reason for your pathetic vibe is... <blur>...'
Create an extreme Zeigarnik effect (FOMO/incompleteness).

Your output must be purely JSON and strictly follow this exact structure:
{
  "aura_name": "A sassy, savage, Gen-Z title for their aura — MUST be in the correct language",
  "aura_score": 38,
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
