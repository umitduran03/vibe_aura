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

// Son canlı kontrol: 2026-10-16
const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-3-flash-preview",
  "gemini-flash-lite-latest", // gemini-2.0-flash ve 2.5-flash-lite 404 döndüğü için aktif lite takma adı
];

// Groq model id'leri artık "openai/" ön ekli — eski "gpt-oss-120b" model_not_found veriyordu.
// Groq'ta şu an görsel destekli model YOK (llama-3.2-90b-vision-preview kaldırıldı);
// fotoğraf modunda Groq son çare olarak fotoğrafsız (sadece metin verisiyle) çalışır.
const GROQ_TEXT_MODEL = "openai/gpt-oss-120b";

// ─── Zaman Bütçesi ────────────────────────────────────────────
// Vercel maxDuration = 60 sn. Aşılırsa Vercel fonksiyonu öldürür ve kullanıcı HİÇ yanıt alamaz.
// Waterfall'a 50 sn veriyoruz; kalan ~10 sn JSON parse + Firestore token düşümü için.
const WATERFALL_BUDGET_MS = 50_000;
const MIN_ATTEMPT_MS = 4_000;       // Bundan az süre kaldıysa yeni deneme başlatma
const MAX_ATTEMPTS_PER_MODEL = 2;   // İlk deneme + 1 tekrar

// NOT: Ücretsiz OpenRouter modelleri sık kaldırılıyor. Güncel liste:
// https://openrouter.ai/api/v1/models  (id'si ":free" ile bitenler)
// Son kontrol: 2026-10-16
// Sıralama canlı teste göre: çalışanlar önde, sık rate-limit yiyen Gemma'lar yedekte.
const OPENROUTER_VISION_POOL = [
  "nvidia/nemotron-3.5-super-vl:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
];

const OPENROUTER_TEXT_POOL = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
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
   Ortak Deneme Motoru (retry + zaman bütçesi)
   ============================================= */
type AIParams = { contents: any[]; systemInstruction: string };
type AIResult = { text: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isTimeoutError(err: any) {
  const name = String(err?.name || "");
  const msg = String(err?.message || "").toLowerCase();
  return (
    name === "TimeoutError" ||
    name === "AbortError" ||
    name === "APIConnectionTimeoutError" ||
    msg.includes("timed out") ||
    msg.includes("timeout") ||
    msg.includes("aborted")
  );
}

/**
 * Aynı modeli bir kez daha denemeye değer mi?
 * - 429 / 5xx / ağ hatası / boş ya da bozuk JSON → EVET (geçici sorun, 2. deneme sık sık tutuyor)
 * - Zaman aşımı → HAYIR (model yavaş; tekrar beklemek bütçeyi yer, sıradaki modele geç)
 * - Diğer 4xx (404 model yok, 400 geçersiz istek) → HAYIR (tekrar denense de aynı sonuç)
 */
function isRetryable(err: any) {
  if (isTimeoutError(err)) return false;
  const status = Number(err?.status);
  if (!status || Number.isNaN(status)) return true;
  return status === 408 || status === 429 || status >= 500;
}

/** Çağıran kodun parse mantığıyla birebir aynı kontrol — bozuk çıktı kullanıcıya 500 olarak gitmesin. */
function assertParsableJson(text: string) {
  const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
  if (!clean) throw new Error("Empty response");
  JSON.parse(clean);
}

/**
 * Model listesini sırayla dener. Her model en fazla MAX_ATTEMPTS_PER_MODEL kez denenir,
 * her deneme hem attemptCapMs hem de kalan süre (deadline) ile sınırlıdır.
 */
async function tryModels(
  label: string,
  models: string[],
  deadline: number,
  attemptCapMs: number,
  call: (model: string, timeoutMs: number) => Promise<string>
): Promise<AIResult> {
  let lastError: any = new Error(`[${label}] time budget exhausted before any attempt`);

  for (const model of models) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_MODEL; attempt++) {
      const left = deadline - Date.now();
      if (left < MIN_ATTEMPT_MS) throw lastError;

      try {
        const text = await call(model, Math.min(attemptCapMs, left));
        assertParsableJson(text);
        if (attempt > 1) console.log(`[${label}] ✓ ${model} ${attempt}. denemede başarılı`);
        return { text };
      } catch (err: any) {
        lastError = err;
        const code = err?.status || err?.code || err?.name || err?.message || "";
        const willRetry = attempt < MAX_ATTEMPTS_PER_MODEL && isRetryable(err);
        console.warn(
          `[${label}] ✗ ${model} deneme ${attempt} başarısız (${code})` +
            (willRetry ? ", tekrar deneniyor..." : ", sıradaki modele geçiliyor...")
        );
        if (!willRetry) break;
        await sleep(err?.status === 429 ? 1500 : 500);
      }
    }
  }
  throw lastError;
}

/* =============================================
   Sağlayıcılar
   ============================================= */
function runGemini(params: AIParams, deadline: number) {
  return tryModels("Gemini", MODEL_CHAIN, deadline, 25_000, async (model, timeoutMs) => {
    const response = await ai.models.generateContent({
      model,
      contents: params.contents,
      config: {
        systemInstruction: params.systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.95,
        abortSignal: AbortSignal.timeout(timeoutMs),
      },
    });
    return response.text || "";
  });
}

function runGroq(params: AIParams, deadline: number) {
  // Groq'ta görsel model olmadığı için her zaman metin formatı; fotoğraf varsa
  // formatOpenAIMessages "fotoğraflar işlenemiyor, metne göre analiz et" notunu ekler.
  const messages = formatOpenAIMessages(params, false);
  return tryModels("Groq", [GROQ_TEXT_MODEL], deadline, 20_000, async (model, timeoutMs) => {
    const completion = await groq.chat.completions.create(
      {
        model,
        messages,
        temperature: 0.9,
        max_tokens: 4096,
        // gpt-oss bir reasoning modeli; düşünme token'ları max_tokens'tan yer, JSON yarım kalmasın
        reasoning_effort: "low",
        response_format: { type: "json_object" },
      },
      { timeout: timeoutMs, maxRetries: 0 }
    );
    return completion.choices?.[0]?.message?.content || "";
  });
}

function runOpenRouter(params: AIParams, deadline: number, isVision: boolean) {
  const messages = formatOpenAIMessages(params, isVision);
  const pool = isVision ? OPENROUTER_VISION_POOL : OPENROUTER_TEXT_POOL;
  return tryModels("OpenRouter", pool, deadline, 25_000, async (model, timeoutMs) => {
    const completion = await openRouter.chat.completions.create(
      {
        model,
        messages,
        temperature: 0.9,
        max_tokens: 2048,
        // Ücretsiz OpenRouter modellerinin hepsi strict JSON formatını desteklemediği için response_format yok.
        // System Prompt'ta sadece JSON döndürmesi talimatı var; çıktı assertParsableJson ile doğrulanıyor.
      },
      // Tekrar denemeyi SDK değil tryModels yönetiyor (bütçeye duyarlı olsun diye)
      { timeout: timeoutMs, maxRetries: 0 }
    );
    return completion.choices?.[0]?.message?.content || "";
  });
}

/* =============================================
   Akıllı Waterfall Orkestratörü
   ---------------------------------------------
   📸 Fotoğraf: Gemini → OpenRouter Vision → Groq (fotoğrafsız, son çare)
   📝 Metin:    Groq → Gemini → OpenRouter
   Her aşamanın kendi süre tavanı var; böylece yavaş bir aşama
   sonrakilerin süresini yiyip toplamı 60 sn'yi aşmıyor.
   ============================================= */
async function generateWithWaterfall(params: AIParams): Promise<AIResult> {
  const hasImages = params.contents.some((p: any) => p.inlineData);
  const mode = hasImages ? "foto" : "text";
  const start = Date.now();
  const deadline = start + WATERFALL_BUDGET_MS;
  const stageUntil = (ms: number) => Math.min(deadline, Date.now() + ms);

  const stages: { name: string; run: () => Promise<AIResult> }[] = hasImages
    ? [
        { name: "Gemini", run: () => runGemini(params, stageUntil(28_000)) },
        { name: "OpenRouter Vision", run: () => runOpenRouter(params, deadline - 8_000, true) },
        { name: "Groq (fotoğrafsız)", run: () => runGroq(params, deadline) },
      ]
    : [
        { name: "Groq", run: () => runGroq(params, stageUntil(15_000)) },
        { name: "Gemini", run: () => runGemini(params, stageUntil(20_000)) },
        { name: "OpenRouter", run: () => runOpenRouter(params, deadline, false) },
      ];

  let firstError: any = null;
  for (const stage of stages) {
    try {
      const result = await stage.run();
      console.log(`[Waterfall/${mode}] ✅ ${stage.name} başarılı (${Date.now() - start}ms)`);
      return result;
    } catch (err: any) {
      firstError ??= err;
      console.warn(`[Waterfall/${mode}] ⚠️ ${stage.name} başarısız, sıradakine geçiliyor...`);
    }
  }

  console.error(`[Waterfall/${mode}] ❌ Tüm servisler başarısız (${Date.now() - start}ms)`);
  throw firstError; // En anlamlı hata genelde ilk aşamanınki
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

    // Her istekte farklı bir gözlem merceği ve üslup nüansı seçerek (daily-vibe gibi) kelime tekrarını önle
    const STYLE_LENSES_TR = [
      "Gözlem Odağı: Mikro ifadeler, bakışlardaki alt metin ve ilk 3 saniyede ortama yaydığı sessiz özgüven veya gerginlik.",
      "Gözlem Odağı: Dışarıya gösterdiği 'cool ve umursamaz' maske ile yakın çevresinin bildiği gerçek, duygusal veya kaotik iç dünyası arasındaki tezat.",
      "Gözlem Odağı: Sosyal ortamlardaki çekim gücü, insanları kendine bağlama tarzı ve ilişkilerde farkında olmadan kurduğu güç dengesi.",
      "Gözlem Odağı: Estetik zevki, duruşundaki zahmetsiz karizma ve hayatı ciddiye alma (veya tiye alma) biçimi.",
      "Gözlem Odağı: Sezgisel zekası, insan sarraflığı, kimseye kolay kolay güvenmeyen seçici doğası ve gizli standartları.",
      "Gözlem Odağı: Romantik ve arkadaşlık dinamiklerindeki sadakat tarzı, sınırları ve enerjisini kimlere açıp kimlere kapattığı.",
    ];
    const STYLE_LENSES_EN = [
      "Observational Lens: Micro-expressions, the subtext in their eyes, and the unspoken confidence or tension they project in the first 3 seconds.",
      "Observational Lens: The contrast between their 'cool, unbothered' public persona and the actual emotional or chaotic inner world only close friends see.",
      "Observational Lens: Social magnetism, how they naturally draw people in, and the subtle power dynamics they create in relationships.",
      "Observational Lens: Aesthetic taste, effortless presence, and the specific way they romanticize or navigate everyday life.",
      "Observational Lens: Intuitive sharpness, how quickly they read people's intentions, their selective trust, and their hidden high standards.",
      "Observational Lens: Loyalty style in romance and friendships, personal boundaries, and who actually gets access to their real energy.",
    ];
    const selectedLens = locale === "tr"
      ? STYLE_LENSES_TR[Math.floor(Math.random() * STYLE_LENSES_TR.length)]
      : STYLE_LENSES_EN[Math.floor(Math.random() * STYLE_LENSES_EN.length)];

    // Dil yönergesi — Sabit parantez içi kelime listesi VERMEDEN (modelin hep aynı kelimelere takılmasını önlemek için) doğal Gen-Z üslubu talimatı
    const langInstruction = locale === "tr"
      ? `ZORUNLU DİL VE ÖZGÜNLÜK KURALI: Tüm yanıtı doğal, akıcı, zeki ve güncel bir Türkçe ile yaz. Direkt İngilizce çevirisi gibi duran yapay cümleler kurma. Güncel Türk Gen-Z ve sosyal medya dilini YERİNDE, DOZUNDA ve DOĞAL bir akışla kullan; hiçbir terimi yasaklama ama her analizde aynı birkaç argo kelimeyi papağan gibi tekrarlama. Kelime dağarcığını çok geniş tut; her seferinde karşındaki insanı gerçekten tanıyan zeki, esprili ve dobra bir yakın arkadaşıymış gibi taze benzetmeler ve nokta atışı tespitler yap. "Person 1", "Person 2", "Aries", "relationship", "single", "talking" gibi İngilizce durum/burç kelimelerini ASLA kullanma (1. Kişi, 2. Kişi, Koç burcu, bekar vb. olarak Türkçe yaz). KESİNLİKLE Farsça, Arapça veya başka bir alfabeden karakter kullanma. [${selectedLens}]`
      : `MANDATORY LANGUAGE & ORIGINALITY RULE: Write entirely in natural, sharp, witty modern English. Use authentic Gen-Z and social media slang NATURALLY and in moderation where it fits—do not force slang into every sentence or repeat the exact same catchphrases across readings. Keep your vocabulary wide, fresh, and unpredictable, writing like a perceptive, funny best friend who notices specific visual and behavioral details. NEVER use Persian, Arabic, or any non-Latin characters. [${selectedLens}]`;

    const tokenCost = mode === "duo" ? 3 : mode === "extras" ? (body.extrasType === "delulu-check" ? 10 : body.extrasType === "profile-autopsy" ? 7 : body.extrasType === "situationship" ? 5 : body.extrasType === "toxic-ex" ? 5 : body.extrasType === "rizz-architect" ? 2 : body.extrasType === "mood-reset" ? 2 : 3) : 1;

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
        "toxic-ex": `Sen internetin en keskin gözlemli Kriz Merkezi analistisin. Görevin: eski sevgili durumunu tüm psikolojik detaylarıyla taramak, manipülasyon veya toksik döngüleri açıkça ortaya koymak ve mesaj atmadan önce sarsıcı bir gerçeklik kontrolü yapmak. Detaylı, özgün ve tatmin edici uzunlukta bir analiz yaz. ${langInstruction}`,
        situationship: `Sen çok zeki ve dobra bir ilişki çözümleyicisisin. 'Biz şimdi neyiz?' belirsizliğini, karşı tarafın eylemleri ile sözleri arasındaki farkı okuyarak netleştir. Eğer karşı taraf gerçekten değer veriyor ve çaba gösteriyorsa hakkını ver; eğer oyalıyor ve yedekte tutuyorsa (breadcrumbing/hot-cold) acı gerçeği tüm çıplaklığıyla söyle. Detaylı ve tatmin edici uzunlukta bir analiz yaz. ${langInstruction}`,
        "mood-reset": `Sen dobra, esprili ve ayakları yere basan bir mod sıfırlayıcısın. Kötü bir günü veya aşırı düşünme (overthinking) krizini dağıtacak gerçekçi bir perspektif ve hemen uygulanabilir 3 pratik adım ver. Mistisizm veya klişe motivasyon sözleri kullanma; saf gerçeklik ve zeki mizah kullan. Detaylı ve tatmin edici uzunlukta bir analiz yaz. ${langInstruction}`,
        "delulu-check": `Sen keskin gözlemli bir gerçeklik kontrolü (Delulu Check) analistisin. Gönderilen mesaj ekran görüntülerini veya anlatılan durumu tarafsızca incele ve 0-100 arasında gerçekçi bir delulu_score hesapla. ÖNEMLİ: Eğer kanıtlarda karşı tarafın gerçek ilgisi, tutarlılığı ve yeşil bayrakları varsa düşük bir delulu puanı verip kullanıcının haklı olduğunu onayla; eğer kullanıcı bahaneler üretip karışık sinyallere tutunuyorsa yüksek puan verip sanrıyı yık. Detaylı ve tatmin edici uzunlukta bir analiz yaz. ${langInstruction}`,
        "rizz-architect": `Sen resmi bir yapay zeka değilsin; flört dinamiklerini ve mesajlaşma psikolojisini çok iyi okuyan zeki bir iletişim uzmanısın. Sohbetteki güç dengesini analiz et ve robotik durmayan, doğal, yaratıcı, nokta atışı mesaj alternatifleri üret. ${langInstruction}`,
        "profile-autopsy": `Sen dünyanın en iyi sosyal medya ve flört profili danışmanısın — hem dobra ve gerçekçisin hem de nokta atışı tavsiyelerin var. Profilde gerçekten iyi çalışan, çekici duran detayları takdir eder; enerjiyi düşüren veya yapay duran hataları ise açıkça gösterirsin. Verilen profil ekran görüntülerini dikkatle incele ve dengeli, özgün bir denetim yap. ${langInstruction}`,
      } : {
        "toxic-ex": `You are the sharpest Crisis Center relationship analyst on the internet. Your job: dissect their ex situation, expose manipulation or toxic loops, and deliver an unfiltered red-flag reality check before they text their ex. Write a detailed, original, and satisfyingly long analysis. ${langInstruction}`,
        situationship: `You are a razor-sharp relationship decoder. Decode the 'what are we' mystery by comparing actions vs. words. If the other person shows genuine effort and green flags, validate it honestly; if they are breadcrumbing, slow-fading, or keeping the user on the bench, expose the truth without sugarcoating. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        "mood-reset": `You are a grounded, witty, no-nonsense wake-up caller. Snap the user out of their overthinking spiral or rough day with sharp perspective and 3 immediate, practical action steps. Zero mystical fluff or generic clichés—pure reality and smart humor. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        "delulu-check": `You are an objective, perceptive Reality Check (Delulu Check) analyst. Examine the provided chat screenshots or story and calculate an accurate 'delulu_score' from 0 to 100. IMPORTANT: If the receipts show genuine mutual effort and green flags, give a low delulu score and validate the user; if they are making excuses for dry texts or mixed signals, give a high score and deliver a wake-up call. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        "rizz-architect": `You are NOT a formal AI. You are a sharp, socially calibrated texting strategist. Read the subtext and power dynamic of the conversation, and craft natural, effortless, non-robotic replies that match the user's chosen vibe. ${langInstruction}`,
        "profile-autopsy": `You are the world's sharpest social media and dating profile consultant — honest, observant, and genuinely constructive. Praise what actually works and call out what hurts their vibe. Analyze the provided profile screenshot(s) and deliver a balanced, specific, actionable audit. ${langInstruction}`,
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

Analyze this specific ex-situation in depth. Explain the psychological dynamic behind their breakup, expose the specific red flags in their story or photo, and explain clearly why texting them right now is a trap.

Your output must be purely JSON:
{
  "title": "An original, sharp verdict title tailored specifically to their breakup story (avoid generic clichés)",
  "verdict": "One punchy, memorable one-liner summarizing the core truth of this ex dynamic",
  "analysis_text": "A detailed, entertaining, insightful paragraph analyzing the toxic dynamic, exposing the specific red flags, and concluding why they should protect their peace.",
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

Deep-dive into this situationship. Decode 'What are we?' by reading the balance of effort, consistency, and zodiac chemistry. State honestly whether this has real relationship potential or is a dead-end benching situation, and what move the user should make next.

Your output must be purely JSON:
{
  "title": "An original, creative title capturing the exact nature of their dynamic (avoid generic clichés)",
  "verdict": "One sharp one-liner defining what they actually are right now",
  "analysis_text": "A detailed, perceptive, entertaining analysis decoding their signals, compatibility dynamic, and a clear prediction of where this is heading.",
  "theme_color_hex": "#d946ef"
}`;
      } else if (extrasType === "delulu-check") {
        promptText = `
Delulu Check Request:
- Chat Text: ${formData.chatText || "No chat text provided"}

Analyze the provided chat evidence (screenshots and/or text). Calculate a realistic, specific 'delulu_score' integer from 0 to 100 based on the actual signals:
- 0 to 25: Grounded reality — clear mutual effort, consistent replies, genuine green flags.
- 26 to 54: Mixed signals / mild overthinking — some interest exists, but the user is reading too deeply into small details.
- 55 to 79: High delulu risk — breadcrumbing, dry replies, or excuses where the user is doing most of the emotional work.
- 80 to 100: Full fantasy cinema — zero real reciprocation, pure projection.
Pick an exact, organic integer (avoid lazy multiples of 5 or 10, and never default to a fixed number). Break down what the other person's texts or behavior actually mean, whether the interest is mutual or one-sided, and what the user should do next.

Your output must be purely JSON:
{
  "title": "An original, sharp title reflecting their specific situation and score (avoid generic clichés)",
  "verdict": "One punchy one-liner reality check summarizing the verdict",
  "analysis_text": "A detailed, observant, entertaining paragraph breaking down the specific evidence in their texts/story, explaining why they got this score, and their best next move.",
  "delulu_score": <integer 0-100 calculated from the rubric above>,
  "theme_color_hex": "#f59e0b"
}`;
      } else if (extrasType === "rizz-architect") {
        promptText = `
Reply Guru Request:
- Draft Text: ${formData.draftText || "None provided"}

Analyze the provided screenshots (chat context).
1. Provide a 'vibe_check': a sharp, perceptive summary of the power dynamic and subtext in the screenshot.
2. If a Draft Text is provided, provide a 'roast': give honest, witty feedback on why their draft works or fails. If none, set roast to null.
3. Provide 3 'rizz_options' (replies the user can send) for types "toxic" (bold/playful challenge), "mysterious" (effortlessly cool/intriguing), and "safe" (warm/smooth). Make sure every reply sounds natural and tailored to the exact conversation.

Your output must be purely JSON:
{
  "title": "An original, witty title for this conversation dynamic",
  "vibe_check": "A sharp summary of the power dynamic and subtext in the screenshot.",
  "roast": "Honest, witty critique of the draft text if provided, otherwise null",
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
Perform an honest, observant, BALANCED profile audit:
1. Identify genuine strengths (green flags) — specific visual or bio details that actually work well and attract the right attention.
2. Identify real weaknesses (red flags) — specific details hurting their impression or engagement.
3. Give 3 specific, actionable top fixes ranked by priority.
4. Calculate a realistic, specific integer score ('profile_overall_score') from 15 to 98 based on photo quality, framing, bio, and vibe (avoid round multiples of 5 or 10 and never use a fixed default number).
5. Write an original one-line verdict and a detailed analysis explaining your reasoning.

CRITICAL RULE: Address the user directly as "you". Give them direct, tailored advice based on what you actually see in the screenshot(s).

Your output must be purely JSON:
{
  "title": "An original, memorable verdict title tailored to their specific profile aesthetic",
  "verdict": "One sharp, fair one-liner summarizing the profile's first impression",
  "analysis_text": "A detailed, entertaining, balanced paragraph explaining what works, what falls flat, and the exact vibe their profile projects.",
  "profile_overall_score": <integer 15-98 calculated from the profile's actual quality>,
  "profile_green_flags": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
  "profile_red_flags": ["Specific weakness 1", "Specific weakness 2"],
  "profile_top_fixes": ["Priority fix #1", "Priority fix #2", "Priority fix #3"],
  "profile_platform": "${platform}",
  "profile_mode": "self",
  "theme_color_hex": "#7c3aed"
}`;

        const selfPromptTR = `
Profil Otopsisi İsteği — KENDİ PROFİLİN (kendi profilini analiz ediyoruz):
- Platform: ${platform}
- Bağlam: ${context || "Yok"}

${formData.screenshots?.length || 0} adet ${platform} profil ekran görüntüsü verildi.
Hem dobra hem de dengeli ve yapıcı bir profil denetimi yap:
1. Gerçekten işe yarayan, dikkat çeken güçlü yanları (green flag'leri) somut detaylarla belirt.
2. Profilin enerjisini düşüren veya yanlış izlenim veren zayıflıkları (red flag'leri) açıkla.
3. Öncelik sırasına göre 3 somut düzeltme önerisi (top fix) ver.
4. Fotoğraf kalitesi, ışık, biyografi ve genel auraya göre 15 ile 98 arasında gerçekçi, küsuratlı bir tam sayı puan ('profile_overall_score') hesapla (5 ve 10'un yuvarlak katlarından kaçın, sabit bir sayı kullanma).

ÖNEMLİ KURAL: Kullanıcıya doğrudan "sen" diyerek hitap et ve ekran görüntüsünde gerçekten gördüğün fotoğraflara/yazılara dayanarak özgün bir analiz yaz.

Çıktın sadece JSON olmalı:
{
  "title": "Profilin tarzına ve enerjisine özel, klişe olmayan yaratıcı bir başlık",
  "verdict": "Profilin dışarıya verdiği ilk izlenimi özetleyen vurucu ve adil tek cümle",
  "analysis_text": "Detaylı, eğlenceli ve dengeli analiz paragrafı. Neyin çok iyi durduğunu ve neyin düzeltilmesi gerektiğini samimi bir dille açıkla.",
  "profile_overall_score": <15 ile 98 arasında hesaplanan gerçekçi tam sayı puan>,
  "profile_green_flags": ["Somut güçlü yön 1", "Somut güçlü yön 2"],
  "profile_red_flags": ["Somut zayıf yön 1", "Somut zayıf yön 2"],
  "profile_top_fixes": ["Öncelikli düzeltme #1", "Öncelikli düzeltme #2", "Öncelikli düzeltme #3"],
  "profile_platform": "${platform}",
  "profile_mode": "self",
  "theme_color_hex": "#7c3aed"
}`;

        const otherPromptEN = `
Profile Autopsy Request — DETECTIVE MODE (analyzing someone else's profile):
- Platform: ${platform}
- Context from user: ${context || "None"}

You have been given ${formData.screenshots?.length || 0} screenshot(s) of SOMEONE ELSE's ${platform} profile.
Perform a perceptive, honest personality and vibe read based on their profile:
1. Identify genuine green flags — specific signs that make them intriguing or worth engaging with.
2. Identify red flags — subtle cues or patterns to watch out for.
3. Read their personality and unspoken vibe from their photos and bio.
4. Calculate a realistic, specific engagement/vibe score ('profile_overall_score') from 15 to 98 based on the green flags vs. red flags visible in their profile (avoid round multiples of 5 or 10), plus 3 tactical tips for how the user should approach or handle this person.

CRITICAL RULE: Talk TO the user ABOUT the person in the profile ("they/this person", NOT "you").

Your output must be purely JSON:
{
  "title": "An original, perceptive title capturing this person's exact profile persona",
  "verdict": "One sharp one-liner summarizing this person's real vibe",
  "analysis_text": "A detailed, entertaining, observant paragraph reading this person's profile—what they project on the surface vs. what their choices actually reveal.",
  "profile_overall_score": <integer 15-98 calculated from their profile signals>,
  "profile_green_flags": ["Specific green flag from their profile", "Second positive signal"],
  "profile_red_flags": ["Specific red flag from their profile", "Second warning sign"],
  "profile_top_fixes": ["Tactical tip #1 for approaching them", "Tactical tip #2", "Boundary or warning sign #3"],
  "profile_platform": "${platform}",
  "profile_mode": "other",
  "theme_color_hex": "#7c3aed"
}`;

        const otherPromptTR = `
Profil Otopsisi İsteği — DEDEKTİF MODU (başkasının profilini analiz ediyoruz):
- Platform: ${platform}
- Bağlam: ${context || "Yok"}

${formData.screenshots?.length || 0} adet BAŞKASININ ${platform} profil ekran görüntüsü verildi.
Bu kişinin profilinden keskin bir kişilik ve aura okuması yap:
1. Green flag'ler — bu kişiyi çekici, samimi veya konuşmaya değer kılan somut detaylar.
2. Red flag'ler — dikkat edilmesi gereken ince sinyaller veya ego/bağlanma ipuçları.
3. Kişilik okuması — fotoğrafları ve biyografisi bu kişinin karakteri hakkında ne söylüyor?
4. Profildeki yeşil ve kırmızı bayrakların dengesine göre 15 ile 98 arasında gerçekçi, küsuratlı bir etkileşim/güven puanı ('profile_overall_score') hesapla (5 ve 10'un katlarından kaçın) ve kullanıcıya bu kişiye nasıl yaklaşması gerektiğini anlatan 3 taktik ver.

ÖNEMLİ KURAL: Kullanıcıya profilin sahibiymiş gibi hitap etme! Kullanıcıyla profildeki kişi HAKKINDA ("bu kişi / o") konuş.

Çıktın sadece JSON olmalı:
{
  "title": "Bu kişinin profil karakterini nokta atışı özetleyen özgün ve yaratıcı bir başlık",
  "verdict": "Bu kişinin gerçek profil enerjisini özetleyen vurucu tek cümle",
  "analysis_text": "Bu kişinin profilini derinlemesine okuyan detaylı, eğlenceli ve gözlem dolu analiz paragrafı. Dışarıya nasıl görünmek istiyor ve aslında nasıl biri?",
  "profile_overall_score": <15 ile 98 arasında hesaplanan gerçekçi tam sayı puan>,
  "profile_green_flags": ["Profilden somut green flag 1", "Somut pozitif sinyal 2"],
  "profile_red_flags": ["Profilden somut red flag 1", "Somut uyarı işareti 2"],
  "profile_top_fixes": ["Bu kişiye yaklaşım taktiği #1", "İletişim ipucu #2", "Dikkat etmen gereken sınır #3"],
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

Give them a sharp, grounded, refreshing perspective shift to snap them out of their rut or overthinking spiral and recharge their energy. Include a clear reality check that validates their feelings without letting them wallow, plus 3 concrete, immediate physical/mental steps they can take in the next 15 minutes.

Your output must be purely JSON:
{
  "title": "An original, witty, energizing title tailored to their current mood (avoid generic clichés)",
  "verdict": "One punchy, grounding one-liner that immediately shifts their perspective",
  "analysis_text": "A detailed, witty, uplifting yet realistic paragraph breaking their mental loop and giving 3 practical steps to reset their vibe right now.",
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

      if (parsedJson) {
        if (extrasType === "delulu-check" && parsedJson.delulu_score !== undefined) {
          const ds = Number(parsedJson.delulu_score);
          parsedJson.delulu_score = Number.isFinite(ds) ? Math.max(0, Math.min(100, Math.round(ds))) : 63;
        }
        if (extrasType === "profile-autopsy" && parsedJson.profile_overall_score !== undefined) {
          const ps = Number(parsedJson.profile_overall_score);
          parsedJson.profile_overall_score = Number.isFinite(ps) ? Math.max(1, Math.min(100, Math.round(ps))) : 71;
        }
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
        flirt: `You are a sharp, perceptive, witty relationship analyst. Analyze their romantic chemistry, visual & zodiac harmony, magnetic strengths (green flags), and the specific friction points or power dynamics between them. Be honest, insightful, and entertaining—do not blindly trash them if they actually match well, and call out the real dynamic accurately. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        ex: `You are a razor-sharp breakup analyst and relationship archivist. Dissect why they didn't work out, the ego dynamics, who caused the most chaos, and the real relapse risk in a witty, unfiltered tone. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        platonic: `You are an observant, witty crush & attraction decoder. Analyze both people's photos and zodiac signs to determine if there is genuine romantic tension, magnetic chemistry, or friendzone energy—and who is secretly more invested. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        bff: `You are a witty friendship & duo synergy analyst. Read their friendship chemistry, humor alignment, loyalty, and dynamic roles (who is the grounded planner/therapist vs. who brings the spontaneous chaos). Praise what makes their bond iconic while playfully calling out their duo habits. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
        battle: `You are an impartial, razor-sharp AI Aura Judge. Evaluate Person 1 and Person 2 INDEPENDENTLY on their own visual presence, expression, posture, styling, lighting, and zodiac energy to assign each person a realistic individual aura score. Praise the winner's presence and playfully roast why the loser fell short in an entertaining, dramatic way. Write a detailed and satisfyingly long analysis. ${langInstruction}`,
      };

      const systemInstruction = duoSystemPrompts[duoRelationType] || duoSystemPrompts.flirt;

      let promptText = "";
      const isBattle = duoRelationType === "battle";
      const duoHeaderMap: Record<string, string> = {
        flirt: "Couple & Romantic Chemistry Analysis",
        ex: "Ex-Relationship & Breakup Autopsy",
        platonic: "Crush Attraction & Spark Analysis",
        bff: "Best Friend (BFF) Synergy Analysis",
        battle: "1v1 Aura Battle Analysis",
      };
      const titleStr = duoHeaderMap[duoRelationType] || "Duo Compatibility Analysis";

      const duoBaseInstructions: Record<string, string> = {
        flirt: `Based on these details (and photos if any), analyze their romantic chemistry, how their energies complement or challenge each other, their strongest green flags as a duo, and calculate a realistic, organic compatibility score between 15 and 98 (avoid round multiples of 5 or 10, and never default to a fixed number).`,
        ex: `Based on these details (and photos if any), dissect their breakup dynamic, why the relationship combusted, who won the post-breakup ego war, and calculate a realistic compatibility/relapse score between 12 and 96 (avoid round multiples of 5 or 10, and never default to a fixed number).`,
        platonic: `Based on these details (and photos if any), evaluate the unspoken attraction, romantic spark vs. friendzone odds, how their auras interact, and calculate a realistic crush compatibility score between 15 and 98 (avoid round multiples of 5 or 10, and never default to a fixed number).`,
        bff: `Based on these details (and photos if any), analyze their best-friend synergy, shared humor, loyalty, how their personalities balance each other out, and calculate a realistic friendship compatibility score between 25 and 99 (avoid round multiples of 5 or 10, and never default to a fixed number).`,
        battle: `Based on these details (and photos if any), compare their auras head-to-head and score EACH person INDEPENDENTLY between 18 and 98 ("person1Score" and "person2Score"):
- INDEPENDENT & REALISTIC SCORING RULE: Score each person on their own actual merits (photo confidence, expression, lighting, styling, posture, and zodiac aura). Do NOT automatically dump the loser into the 30s or 40s unless their vibe genuinely warrants a low score! If both people have strong auras, both can score high (e.g., both in the 70s, 80s, or 90s with a close, realistic margin); if both are chaotic/mid, both might land in the 50s/60s; if one completely outshines the other, reflect that gap naturally.
- NO BIAS & NO FIXED NUMBERS: Person 1 and Person 2 must have an equal, fair chance to win based on their vibe. Never make "person1Score" and "person2Score" equal, avoid lazy multiples of 5 or 10, and NEVER default to 84 vs 41 or any fixed number pair.
- Set "winner" to 1 if person1Score > person2Score, or 2 if person2Score > person1Score, and state who lost the battle in "redFlag". DO NOT treat this as a romantic relationship test—this is a pure 1v1 aura competition.`,
      };
      const baseInstruction = duoBaseInstructions[duoRelationType] || duoBaseInstructions.flirt;
      
      const battleScoreFields = isBattle
        ? `\n  "person1Score": <integer 18-98: Person 1's independent aura score>,\n  "person2Score": <integer 18-98: Person 2's independent aura score, must differ from person1Score>,\n  "winner": <1 or 2: must match whichever person has the higher score>,`
        : "";

      const duoScoreFieldDesc = isBattle
        ? `<integer: must equal the winning score, i.e. the higher of person1Score and person2Score>`
        : `<integer 15-98: realistic compatibility score calculated specifically for this pair>`;

      const duoRedFlagMapUnlocked: Record<string, string> = {
        flirt: `"redFlag": "Specify either Person 1 or Person 2 (fairly, based on their actual signs/photos) — state who brings more drama, stubbornness, or chaos into this relationship dynamic and why"`,
        ex: `"redFlag": "Specify either Person 1 or Person 2 (fairly, based on their actual signs/photos) — state who was the bigger walking red flag in this breakup and why"`,
        platonic: `"redFlag": "Specify either Person 1 or Person 2 (fairly, based on their actual signs/photos) — state who is more likely to overthink, catch feelings first, or play hard to get—and why"`,
        bff: `"redFlag": "Specify either Person 1 or Person 2 (fairly, based on their actual signs/photos) — state who is the chaos instigator / bad influence in this friendship and why"`,
        battle: `"redFlag": "Specify the loser (Person 1 or Person 2 — MUST be the person with the lower score) and playfully roast why their aura lost this matchup"`,
      };
      const redFlagUnlocked = duoRedFlagMapUnlocked[duoRelationType] || duoRedFlagMapUnlocked.flirt;

      const redFlagLocked = isBattle
        ? `"redFlag": "Write a suspenseful hook in the target language where the loser's identity (Person 1 or Person 2, whichever has the lower score) AND the specific reason their aura lost are enclosed inside <blur>...</blur> tags"`
        : `"redFlag": "Write a suspenseful hook in the target language where the identity of the person causing more chaos (Person 1 or Person 2, chosen fairly) AND the specific explanation are enclosed inside <blur>...</blur> tags"`;

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
  "duoScore": ${duoScoreFieldDesc},${battleScoreFields}
  "title": "An original, creative, memorable title tailored specifically to this duo's energy (avoid overused clichés)",
  "toxicComment": "A sharp, witty one-liner summarizing the core truth of their dynamic",
  ${redFlagUnlocked},
  "analysis_text": "Detailed, perceptive, entertaining paragraph dissecting their visual and astrological dynamic—what works between them, where they clash, and their overall vibe.",
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
2. ZEIGARNIK INTRO: Start with an intriguing, accurate observation about their energy together. Then, EXACTLY right before revealing the core verdict or deeper truth behind their dynamic, abruptly cut off the sentence and start the <blur>.
3. RED FLAG / LOSER IDENTITY BLUR (CRITICAL): For the 'redFlag' field, you MUST hide WHO the person is. The name or identity (e.g., Person 1 or Person 2) MUST be completely enclosed in <blur> tags.

Your output must be purely JSON and strictly follow this exact structure:
{
  "duoScore": ${duoScoreFieldDesc},${battleScoreFields}
  "title": "An original, creative title tailored to this duo's energy (avoid overused clichés)",
  "toxicComment": "A sharp, witty one-liner summarizing their dynamic",
  ${redFlagLocked},
  "analysis_text": "One intriguing intro sentence cutting off at the climax... <blur>Detailed, perceptive, entertaining paragraph dissecting their dynamic...</blur>",
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

      const toScore = (v: any) => {
        const n = Number(v);
        return Number.isFinite(n) ? Math.max(1, Math.min(100, Math.round(n))) : NaN;
      };

      // Aura Battle: Her iki kişi için ayrı skor ve kazanan/kaybeden tutarlılık garantisi
      if (isBattle && parsedJson) {
        let p1 = toScore(parsedJson.person1Score);
        let p2 = toScore(parsedJson.person2Score);
        const baseScore = toScore(parsedJson.duoScore);

        if (Number.isNaN(p1) && Number.isNaN(p2)) {
          p1 = !Number.isNaN(baseScore) ? Math.max(58, baseScore) : 65 + Math.floor(Math.random() * 27);
          const gap = 6 + Math.floor(Math.random() * 22);
          p2 = Math.max(24, p1 - gap);
        } else if (Number.isNaN(p1)) {
          const gap = 6 + Math.floor(Math.random() * 20);
          p1 = p2 >= 65 ? Math.max(28, p2 - gap) : Math.min(96, p2 + gap);
        } else if (Number.isNaN(p2)) {
          const gap = 6 + Math.floor(Math.random() * 20);
          p2 = p1 >= 65 ? Math.max(28, p1 - gap) : Math.min(96, p1 + gap);
        }

        if (p1 === p2) {
          const nudge = 3 + Math.floor(Math.random() * 6);
          if (p1 <= 92) p1 += nudge;
          else p2 -= nudge;
        }

        // redFlag metninde kaybeden olarak kimin yazıldığını tespit et (tutarlılık için)
        const rf = String(parsedJson.redFlag || "");
        const p1Idx = rf.search(/(?:person\s*1|1\.\s*kişi|kişi\s*1)/i);
        const p2Idx = rf.search(/(?:person\s*2|2\.\s*kişi|kişi\s*2)/i);

        let loserIsP1: boolean | null = null;
        if (p1Idx !== -1 && (p2Idx === -1 || p1Idx < p2Idx)) {
          loserIsP1 = true;
        } else if (p2Idx !== -1 && (p1Idx === -1 || p2Idx < p1Idx)) {
          loserIsP1 = false;
        } else if (Number(parsedJson.winner) === 1) {
          loserIsP1 = false;
        } else if (Number(parsedJson.winner) === 2) {
          loserIsP1 = true;
        }

        if (loserIsP1 === true && p1 > p2) {
          const tmp = p1;
          p1 = p2;
          p2 = tmp;
        } else if (loserIsP1 === false && p2 > p1) {
          const tmp = p1;
          p1 = p2;
          p2 = tmp;
        }

        parsedJson.person1Score = p1;
        parsedJson.person2Score = p2;
        parsedJson.winner = p1 > p2 ? 1 : 2;
        parsedJson.duoScore = Math.max(p1, p2);
      } else if (parsedJson) {
        const ds = toScore(parsedJson.duoScore);
        parsedJson.duoScore = !Number.isNaN(ds) ? ds : 58 + Math.floor(Math.random() * 34);
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
      general: `You are an intuitive, razor-sharp AI aura & personality analyst acting like the user's most observant, honest, and witty best friend. Your goal is a GENUINE, BALANCED VIBE CHECK—NOT a blind roast. Read their photo (posture, expression, gaze, style, lighting) and background details carefully. Give them real credit for their authentic charisma, aesthetic strengths, and green flags, while playfully and accurately calling out their subtle habits, contradictions, or inner defense mechanisms. Make the reading feel eerily personal, insightful, and entertaining. ${langInstruction}`,
      roast: `You are the ultimate, most ruthless stand-up roast master. Roast the user's zodiac sign, age, relationship status, and photo in the sharpest, funniest way possible. Be specific to what you actually see in the photo and details—no generic copy-paste insults. Serve high-energy comedy heat for entertainment. ${langInstruction}`,
      soulmate: `You are a perceptive, witty AI soulmate matchmaker. Based on the user's photo aura, age, and zodiac sign, craft a vivid, specific 'ideal partner' profile: what personality archetype balances their energy, which zodiac signs match them best, what aesthetic/vibe their soulmate has, and how they are likely to meet. Write a detailed, entertaining, and insightful reading. ${langInstruction}`,
    };

    const systemInstruction = scenarioSystemPrompts[soloScenario || "general"] || scenarioSystemPrompts.general;

    // Senaryoya göre özel JSON alan talimatları (Genel Analiz, Roast ve Ruh Eşi birbirini ezmesin)
    const activeScenario = soloScenario || "general";

    const soloJsonInstructionsUnlocked: Record<string, string> = {
      general: `{
  "aura_name": "An original, charismatic, hyper-specific aura archetype title capturing their true vibe — MUST be in the correct language",
  "aura_score": <integer 45-97: realistic aura score calculated from their photo presence, expression, style, and zodiac energy>,
  "analysis_text": "A rich, perceptive, 4-5 sentence holistic vibe & personality analysis. Read their visual presence, expression, style, and zodiac energy: highlight what makes their aura genuinely magnetic or cool, and playfully expose the subtle habits or contradictions hiding underneath. Do NOT blindly roast them—make them feel truly seen.",
  "toxicComment": "One razor-sharp, memorable one-liner observation about the contrast between their outer image and inner world.",
  "traits": ["Unique Trait 1", "Unique Trait 2", "Unique Trait 3"],
  "theme_color_hex": "#c084fc"
}`,
      roast: `{
  "aura_name": "A hilarious, savage comedy-roast title tailored specifically to their photo and vibe — MUST be in the correct language",
  "aura_score": <integer 15-78: comedic roast score reflecting how hard their vibe got roasted>,
  "analysis_text": "3-4 relentless, hilarious, stand-up style sentences roasting their specific photo details, expression, pose, zodiac sign, and relationship status. Be creative and hyper-specific—never use generic clichés.",
  "toxicComment": "One devastatingly funny one-liner punchline that sums up the roast.",
  "traits": ["Roast Tag 1", "Roast Tag 2", "Roast Tag 3"],
  "theme_color_hex": "#ef4444"
}`,
      soulmate: `{
  "aura_name": "An original, magnetic archetype title for their IDEAL SOULMATE — MUST be in the correct language",
  "aura_score": <integer 60-98: soulmate magnetism & readiness score calculated from their aura>,
  "analysis_text": "A detailed, vivid 4-5 sentence profile of their ideal soulmate based on the user's photo aura and zodiac: describe the soulmate's personality, best zodiac match, aesthetic style, why their energies lock in, and the exact scenario where they'll likely meet.",
  "toxicComment": "One sharp, honest one-liner about the dating habit the user must drop to attract this soulmate.",
  "traits": ["Soulmate Trait 1", "Soulmate Trait 2", "Soulmate Trait 3"],
  "theme_color_hex": "#ec4899"
}`,
    };

    const soloJsonInstructionsLocked: Record<string, string> = {
      general: `{
  "aura_name": "An original, charismatic, hyper-specific aura archetype title capturing their true vibe — MUST be in the correct language",
  "aura_score": <integer 45-97: realistic aura score calculated from their photo presence, expression, style, and zodiac energy>,
  "analysis_text": "1-2 intriguing, spot-on sentences about the immediate energy their photo/vibe gives off, cutting off right before the deepest personality insight... <blur>The rest of the rich, perceptive, balanced paragraph revealing their hidden strengths, subtle habits, and true aura dynamic...</blur>",
  "toxicComment": "One razor-sharp one-liner observation about their vibe.",
  "traits": ["Unique Trait 1", "Unique Trait 2", "Unique Trait 3"],
  "theme_color_hex": "#c084fc"
}`,
      roast: `{
  "aura_name": "A hilarious, savage comedy-roast title tailored to their vibe — MUST be in the correct language",
  "aura_score": <integer 15-78: comedic roast score reflecting how hard their vibe got roasted>,
  "analysis_text": "1-2 sharp setup sentences cutting off right at the climax... <blur>The rest of the relentless, hilarious stand-up roast dissecting their photo and habits...</blur>",
  "toxicComment": "One funny one-liner roast punchline.",
  "traits": ["Roast Tag 1", "Roast Tag 2", "Roast Tag 3"],
  "theme_color_hex": "#ef4444"
}`,
      soulmate: `{
  "aura_name": "An original, magnetic archetype title for their IDEAL SOULMATE — MUST be in the correct language",
  "aura_score": <integer 60-98: soulmate magnetism & readiness score calculated from their aura>,
  "analysis_text": "1-2 intriguing sentences describing the initial energy of their ideal match, cutting off right before revealing their zodiac sign and meeting scenario... <blur>The rest of the detailed soulmate profile, best zodiac match, and where they will meet...</blur>",
  "toxicComment": "One sharp one-liner about their love-life pattern.",
  "traits": ["Soulmate Trait 1", "Soulmate Trait 2", "Soulmate Trait 3"],
  "theme_color_hex": "#ec4899"
}`,
    };

    // Senaryoya göre prompt metni
    const scenarioPromptSuffix: Record<string, string> = {
      general: "Perform a genuine, balanced, deeply observant Vibe & Aura Analysis. Read their photo and traits like a perceptive best friend: highlight their real charisma/green flags and playfully call out their subtle quirks without blindly roasting them.",
      roast: "ROAST the user MERCILESSLY in a stand-up comedy style. Weaponize the specific details in their photo, zodiac, and relationship status.",
      soulmate: "Profile the user's IDEAL SOULMATE based on their aura and zodiac. Reveal who they should date, their soulmate's best zodiac signs, personality archetype, and meeting scenario.",
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
- Analysis Type: ${scenarioPromptSuffix[activeScenario] || scenarioPromptSuffix.general}

Based on these details (and the attached photo if any), ${langInstruction} 

CRITICAL SCORING RULE: Give a realistic, organic integer for 'aura_score' between 15 and 98 based on the actual vibe (avoid round multiples of 5 or 10, and never default to a fixed number). ONLY in extremely rare 1% cases, you may use -100, -999, or 999 as a rare Easter egg.

Your output must be purely JSON and strictly follow this exact structure (fill all values with 100% original content in the requested language):
${soloJsonInstructionsUnlocked[activeScenario] || soloJsonInstructionsUnlocked.general}
`;
    } else {
      // SENARYO B: Kullanıcının Token'ı Yoksa (Teaser Modu, Sansür var)
      promptText = `
User Details:
- Age: ${age}
- Zodiac: ${tVal(zodiac, ZODIAC_EN, ZODIAC_TR, locale)}
- Relationship Status: ${tVal(relationship, REL_EN, REL_TR, locale)}
- Extra Note (Vibe Question): ${magicText || "None"}
- Analysis Type: ${scenarioPromptSuffix[activeScenario] || scenarioPromptSuffix.general}

Based on these details (and the attached photo if any), ${langInstruction}

CRITICAL SCORING RULE: Give a realistic, organic integer for 'aura_score' between 15 and 98 based on the actual vibe (avoid round multiples of 5 or 10, and never default to a fixed number).

CRITICAL TEASER INSTRUCTIONS:
1. RATIO RULE: The visible (unblurred) text MUST NOT exceed 20-30% of the total analysis. The remaining 70-80% MUST be completely enclosed inside <blur> and </blur> tags. Do not write long satisfying paragraphs outside <blur>.
2. ZEIGARNIK INTRO: Start with an eerily accurate observation about their photo or energy. Then, EXACTLY right before revealing the core personality truth, soulmate identity, or punchline, abruptly cut off the sentence and start the <blur>.

Your output must be purely JSON and strictly follow this exact structure (fill all values with 100% original content in the requested language):
${soloJsonInstructionsLocked[activeScenario] || soloJsonInstructionsLocked.general}
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

    if (parsedJson) {
      const as = Number(parsedJson.aura_score);
      parsedJson.aura_score = Number.isFinite(as) ? Math.round(as) : 64 + Math.floor(Math.random() * 28);
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
