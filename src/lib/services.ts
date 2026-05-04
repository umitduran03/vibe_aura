import imageCompression from "browser-image-compression";
import type { AuraResult, DuoResult, DuoPersonData, DuoRelationType, ExtrasResult, ExtrasType } from "@/store/useAppStore";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.4, // Max 400KB compressed
  maxWidthOrHeight: 800,
  useWebWorker: true,
  fileType: "image/jpeg" as const,
};

/**
 * Kullanıcı fotoğraf seçtiğinde çalışır. 
 * Resmi sıkıştırır ve doğrudan Base64 formatına çevirir (URL değil).
 * Bu Base64 string arayüzde önizleme (src={photoUrl}) olarak kullanılabilir
 * ve arka planda API'ye gönderilmek için saklanır.
 */
export async function compressAndEncodeImage(file: File): Promise<string> {
  // 1. Sıkıştır
  const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);


  // 2. Local File / Blob => Base64 string
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(compressedFile);
  });
}

// Helper fetch function with retry logic
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<any> {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const res = await fetch(url, options);
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMessage = errData.error || "An error occurred during AI analysis.";
        
        // Retry logic for specific HTTP or string errors
        if (
          res.status === 503 || 
          res.status === 429 || 
          errMessage.includes("503") || 
          errMessage.includes("429") ||
          errMessage.includes("high demand") || 
          errMessage.includes("UNAVAILABLE")
        ) {
          if (attempt < maxRetries - 1) {
            console.warn(`[Retry System] Attempt ${attempt + 1}/${maxRetries} failed with ${res.status}. Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            attempt++;
            continue;
          }
        }
        
        throw new Error(errMessage);
      }
      
      return await res.json();
    } catch (error: any) {
      // If it's a network error (fetch failed entirely) and we have retries left
      if (attempt < maxRetries - 1 && !error.message.includes("Yapay zeka")) {
        console.warn(`[Retry System] Network timeout/error. Attempt ${attempt + 1}/${maxRetries}. Retrying in 2 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempt++;
        continue;
      }
      throw error;
    }
  }
  throw new Error("Maximum retry attempts reached.");
}

/**
 * Bireysel Aura Analizi (Solo Mode)
 */
export async function analyzeAura(userData: {
  userId: string | null;
  age: number;
  zodiac: string | null;
  relationship: string | null;
  magicText: string;
  photoUrl: string | null; // Artık base64 verisi taşıyor
  soloScenario?: string;
}): Promise<AuraResult> {
  try {
    const apiPayload = {
      userId: userData.userId,
      mode: "solo",
      age: userData.age,
      zodiac: userData.zodiac,
      relationship: userData.relationship,
      magicText: userData.magicText,
      photoBase64: userData.photoUrl,
      soloScenario: userData.soloScenario || "general",
    };

    const result: AuraResult = await fetchWithRetry("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    });

    return result;

  } catch (error) {
    console.error("[analyzeAura] İşlem hatası:", error);
    throw error;
  }
}

/**
 * İkili Uyum Analizi (Duo Soulmate)
 */
export async function analyzeDuo(
  userId: string | null,
  person1: DuoPersonData,
  person2: DuoPersonData,
  duoRelationType: DuoRelationType
): Promise<DuoResult> {
  try {
    const apiPayload = {
      userId,
      mode: "duo",
      person1: {
        age: person1.age,
        zodiac: person1.zodiac,
        photoBase64: person1.photoBase64,
      },
      person2: {
        age: person2.age,
        zodiac: person2.zodiac,
        photoBase64: person2.photoBase64,
      },
      duoRelationType,
    };

    const result: DuoResult = await fetchWithRetry("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    });

    return result;

  } catch (error) {
    console.error("[analyzeDuo] İşlem hatası:", error);
    throw error;
  }
}

/**
 * AI'dan dönen sonucu ve kullanıcı profilini Firestore'a (kalıcı veritabanına) yazar.
 */
export async function saveAuraSession(
  userId: string | null,
  userData: { age: number; zodiac: string | null },
  photoBase64: string | null,
  result: AuraResult
) {
  try {
    const { collection, addDoc, serverTimestamp, Timestamp } = await import("firebase/firestore");
    const { db } = await import("./firebase");

    const expiresAt = Timestamp.fromDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));

    // Privacy: Base64 photo data is intentionally excluded from Firestore
    const docRef = await addDoc(collection(db, "results"), {
      userId: userId || "anonymous",
      type: "solo",
      score: result.aura_score,
      color: result.theme_color_hex,
      title: result.aura_name,
      comment: result.analysis_text,
      toxicComment: result.toxicComment,
      traits: result.traits,
      zodiac: userData.zodiac,
      age: userData.age,
      createdAt: serverTimestamp(),
      expiresAt,
    });

  } catch (error) {
    console.error("Database Error:", error);
  }
}

/**
 * Duo analiz sonucunu Firestore'a kaydeder.
 */
export async function saveDuoSession(
  userId: string | null,
  person1: DuoPersonData,
  person2: DuoPersonData,
  duoRelationType: DuoRelationType,
  result: DuoResult
) {
  try {
    const { collection, addDoc, serverTimestamp, Timestamp } = await import("firebase/firestore");
    const { db } = await import("./firebase");

    const expiresAt = Timestamp.fromDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));

    // Privacy: Base64 photo data is intentionally excluded from Firestore
    const docRef = await addDoc(collection(db, "results"), {
      userId: userId || "anonymous",
      type: "duo",
      score: result.duoScore,
      color: result.theme_color_hex,
      title: result.title,
      comment: result.analysis_text,
      toxicComment: result.toxicComment,
      redFlag: result.redFlag,
      person1Zodiac: person1.zodiac,
      person1Age: person1.age,
      person2Zodiac: person2.zodiac,
      person2Age: person2.age,
      duoRelationType,
      createdAt: serverTimestamp(),
      expiresAt,
    });

  } catch (error) {
    console.error("Database Error:", error);
  }
}

/**
 * Extras analiz sonucunu Firestore'a kaydeder.
 */
export async function saveExtrasSession(
  userId: string | null,
  extrasType: ExtrasType,
  formData: Record<string, string>,
  result: ExtrasResult
) {
  try {
    const { collection, addDoc, serverTimestamp, Timestamp } = await import("firebase/firestore");
    const { db } = await import("./firebase");

    const expiresAt = Timestamp.fromDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));

    const docRef = await addDoc(collection(db, "results"), {
      userId: userId || "anonymous",
      type: "extras",
      extrasType: extrasType,
      color: result.theme_color_hex,
      title: result.title,
      comment: result.analysis_text,
      verdict: result.verdict,
      createdAt: serverTimestamp(),
      expiresAt,
    });

  } catch (error) {
    console.error("Database Error:", error);
  }
}

/**
 * Kullanıcının geçmiş analizlerini en yeniden eskiye doğru (createdAt - desc) çeker. (Infinite Scroll uyumlu)
 */
export async function getAuraHistory(lastVisibleDoc: any = null) {
  const { collection, query, orderBy, where, getDocs, Timestamp, limit, startAfter } = await import("firebase/firestore");
  const { db } = await import("./firebase");

  const twoDaysAgo = Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));

  let q = query(
    collection(db, "results"),
    where("createdAt", ">=", twoDaysAgo),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  if (lastVisibleDoc) {
    q = query(
      collection(db, "results"),
      where("createdAt", ">=", twoDaysAgo),
      orderBy("createdAt", "desc"),
      startAfter(lastVisibleDoc),
      limit(5)
    );
  }

  const querySnapshot = await getDocs(q);

  const history: any[] = [];
  querySnapshot.forEach((doc) => {
    history.push({ id: doc.id, ...doc.data() });
  });

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { history, lastVisible };
}

/**
 * Premium Extras Analizi (Toxic Ex Scanner, Situationship Clarifier, Aura Cleansing)
 */
export async function analyzeExtras(
  userId: string | null,
  extrasType: ExtrasType,
  formData: Record<string, string>
): Promise<ExtrasResult> {
  try {
    const apiPayload = {
      userId,
      mode: "extras",
      extrasType,
      formData,
    };

    const result: ExtrasResult = await fetchWithRetry("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    });

    return result;
  } catch (error) {
    console.error("[analyzeExtras] İşlem hatası:", error);
    throw error;
  }
}
