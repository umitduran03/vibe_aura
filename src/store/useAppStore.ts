// ============================================
// Vibe & Aura — Zustand Global State Store
// ============================================

import { create } from "zustand";

// AI'dan beklenen JSON formatı (Bireysel)
export interface AuraResult {
  aura_name: string;
  aura_score: number;
  analysis_text: string;
  theme_color_hex: string;
  toxicComment: string;
  traits: string[];
}

// AI'dan beklenen JSON formatı (Duo)
export interface DuoResult {
  duoScore: number;
  title: string;
  toxicComment: string;
  redFlag: string;
  analysis_text: string;
  theme_color_hex: string;
}

// Kullanıcı verileri
export interface UserData {
  age: number;
  zodiac: string | null;
  relationship: string | null;
  magicText: string;
}

// Duo Kişi Verileri
export interface DuoPersonData {
  age: number;
  zodiac: string | null;
  photoBase64: string | null;
}

export type AnalysisMode = "solo" | "duo";
export type SoloScenario = "general" | "roast" | "soulmate";
export type DuoRelationType = "flirt" | "ex" | "platonic" | "bff";

export type AppScreen = "splash" | "wizard" | "analyzing" | "result";

interface AppState {
  // — Auth —
  userId: string | null;

  // — Screen —
  currentScreen: AppScreen;
  wizardStep: number;
  wizardDirection: number;

  // — Analysis Mode —
  analysisMode: AnalysisMode;
  soloScenario: SoloScenario;

  // — User Data (Solo) —
  userData: UserData;

  // — Duo Data —
  duoPerson1: DuoPersonData;
  duoPerson2: DuoPersonData;
  duoRelationType: DuoRelationType;
  duoResult: DuoResult | null;

  // — Photo (Solo) —
  photoUrl: string | null;
  isUploadingPhoto: boolean;

  // — Token —
  tokenBalance: number;
  isTokenModalOpen: boolean;

  // — Result (AI JSON — Solo) —
  auraResult: AuraResult | null;
  isAnalyzing: boolean;

  // — VIP / Subscription —
  vipExpiry: string | null;

  // — Network —
  isOnline: boolean;

  // ========== Actions ==========
  setUserId: (uid: string | null) => void;
  setTokenBalance: (balance: number) => void;
  setTokenModalOpen: (isOpen: boolean) => void;
  setScreen: (screen: AppScreen) => void;
  setWizardStep: (step: number, direction: number) => void;
  setAnalysisMode: (mode: AnalysisMode) => void;
  setSoloScenario: (scenario: SoloScenario) => void;
  updateUserData: (partial: Partial<UserData>) => void;
  setPhotoUrl: (url: string | null) => void;
  setIsUploadingPhoto: (v: boolean) => void;
  setAuraResult: (result: AuraResult | null) => void;
  setDuoResult: (result: DuoResult | null) => void;
  setIsAnalyzing: (v: boolean) => void;
  setIsOnline: (v: boolean) => void;
  setVipExpiry: (expiry: string | null) => void;
  consumeToken: (amount?: number) => boolean;
  resetWizard: () => void;
  // Duo actions
  updateDuoPerson1: (partial: Partial<DuoPersonData>) => void;
  updateDuoPerson2: (partial: Partial<DuoPersonData>) => void;
  setDuoRelationType: (type: DuoRelationType) => void;
}

const initialUserData: UserData = {
  age: 25,
  zodiac: null,
  relationship: null,
  magicText: "",
};

const initialDuoPerson: DuoPersonData = {
  age: 25,
  zodiac: null,
  photoBase64: null,
};

export const useAppStore = create<AppState>((set, get) => ({
  // — Auth —
  userId: null,

  // — Initial State —
  currentScreen: "splash",
  wizardStep: 0,
  wizardDirection: 1,

  analysisMode: "solo",
  soloScenario: "general",

  userData: { ...initialUserData },

  duoPerson1: { ...initialDuoPerson },
  duoPerson2: { ...initialDuoPerson },
  duoRelationType: "flirt",
  duoResult: null,

  photoUrl: null,
  isUploadingPhoto: false,

  tokenBalance: 5, // Mock: 5 token ile başla
  isTokenModalOpen: false,

  auraResult: null,
  isAnalyzing: false,

  vipExpiry: null,

  isOnline: true,

  // ========== Actions ==========
  setUserId: (uid) => set({ userId: uid }),
  setTokenBalance: (balance) => set({ tokenBalance: balance }),
  setTokenModalOpen: (isOpen) => set({ isTokenModalOpen: isOpen }),
  setScreen: (screen) => set({ currentScreen: screen }),

  setWizardStep: (step, direction) =>
    set({ wizardStep: step, wizardDirection: direction }),

  setAnalysisMode: (mode) => set({ analysisMode: mode, wizardStep: 0 }),
  setSoloScenario: (scenario) => set({ soloScenario: scenario }),

  updateUserData: (partial) =>
    set((state) => ({
      userData: { ...state.userData, ...partial },
    })),

  setPhotoUrl: (url) => set({ photoUrl: url }),
  setIsUploadingPhoto: (v) => set({ isUploadingPhoto: v }),

  setAuraResult: (result) => set({ auraResult: result }),
  setDuoResult: (result) => set({ duoResult: result }),
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),
  
  setVipExpiry: (expiry) => set({ vipExpiry: expiry }),

  setIsOnline: (v) => set({ isOnline: v }),

  consumeToken: (amount = 1) => {
    const { tokenBalance, vipExpiry } = get();
    
    if (vipExpiry) {
      const expiryDate = new Date(vipExpiry);
      if (expiryDate > new Date()) {
        return true; 
      }
    }
    
    if (tokenBalance < amount) return false;
    set({ tokenBalance: tokenBalance - amount });
    return true;
  },

  // Duo actions
  updateDuoPerson1: (partial) =>
    set((state) => ({
      duoPerson1: { ...state.duoPerson1, ...partial },
    })),
  updateDuoPerson2: (partial) =>
    set((state) => ({
      duoPerson2: { ...state.duoPerson2, ...partial },
    })),
  setDuoRelationType: (type) => set({ duoRelationType: type }),

  resetWizard: () =>
    set({
      currentScreen: "wizard",
      wizardStep: 0,
      wizardDirection: 1,
      analysisMode: "solo",
      soloScenario: "general",
      userData: { ...initialUserData },
      duoPerson1: { ...initialDuoPerson },
      duoPerson2: { ...initialDuoPerson },
      duoRelationType: "flirt",
      photoUrl: null,
      isUploadingPhoto: false,
      auraResult: null,
      duoResult: null,
      isAnalyzing: false,
      isTokenModalOpen: false,
    }),
}));
