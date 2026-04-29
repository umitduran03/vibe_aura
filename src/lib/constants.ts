// ============================================
// Vibe & Aura — Sabit Veriler
// ============================================

export interface ZodiacSign {
  id: string;
  name: string;
  emoji: string;
  gradient: [string, string];
}

export interface RelationshipOption {
  id: string;
  label: string;
  emoji: string;
}

// Burç Listesi
export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: "aries",       name: "Aries",       emoji: "♈", gradient: ["#ef4444", "#f97316"] },
  { id: "taurus",      name: "Taurus",      emoji: "♉", gradient: ["#22c55e", "#16a34a"] },
  { id: "gemini",      name: "Gemini",      emoji: "♊", gradient: ["#eab308", "#f59e0b"] },
  { id: "cancer",      name: "Cancer",      emoji: "♋", gradient: ["#94a3b8", "#e2e8f0"] },
  { id: "leo",         name: "Leo",         emoji: "♌", gradient: ["#f59e0b", "#ef4444"] },
  { id: "virgo",       name: "Virgo",       emoji: "♍", gradient: ["#6366f1", "#8b5cf6"] },
  { id: "libra",       name: "Libra",       emoji: "♎", gradient: ["#ec4899", "#f43f5e"] },
  { id: "scorpio",     name: "Scorpio",     emoji: "♏", gradient: ["#1e1b4b", "#7c3aed"] },
  { id: "sagittarius", name: "Sagittarius", emoji: "♐", gradient: ["#7c3aed", "#a855f7"] },
  { id: "capricorn",   name: "Capricorn",   emoji: "♑", gradient: ["#374151", "#6b7280"] },
  { id: "aquarius",    name: "Aquarius",    emoji: "♒", gradient: ["#06b6d4", "#3b82f6"] },
  { id: "pisces",      name: "Pisces",      emoji: "♓", gradient: ["#8b5cf6", "#6366f1"] },
];

// İlişki Durumu Seçenekleri
export const RELATIONSHIP_OPTIONS: RelationshipOption[] = [
  { id: "single",     label: "Single & Thriving",               emoji: "👑" },
  { id: "toxic",      label: "In a Toxic Loop",                 emoji: "🌪️" },
  { id: "talking",    label: "Talking Stage / Complicated",     emoji: "💬" },
  { id: "taken",      label: "Taken (Reserved)",                emoji: "🔒" },
  { id: "done",       label: "Done with Love",                  emoji: "🚫" },
];

// Yaş Aralığı
export const AGE_RANGE = { min: 13, max: 65 };

// Wizard Adım Sayısı
export const TOTAL_STEPS = 3;

// Kelime Limiti
export const WORD_LIMIT = 50;

// Aura Emojileri (aura_name → emoji mapping)
export const AURA_EMOJIS: Record<string, string> = {
  "Drama Queen": "👑",
  "Fiery Warrior": "🔥",
  "Luxury Earth Mother": "🌿",
  "Two-Faced Chaos": "⚡",
  "Vibe Healer": "✨",
  "Digital Wanderer": "🚀",
  "Rebel Energy": "🦋",
  "Quiet Storm": "🌊",
};

// Varsayılan emoji (mapping'de bulunamazsa)
export function getAuraEmoji(auraName: string): string {
  return AURA_EMOJIS[auraName] || "✨";
}
