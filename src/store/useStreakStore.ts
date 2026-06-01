import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export interface StreakState {
  streakCount: number;
  lastAnalysisDate: string | null; // ISO Date string e.g. '2026-06-01'
  lostStreakCount: number;
  isRecoveryModalOpen: boolean;
  isStreakInfoModalOpen: boolean;
  
  // Actions
  triggerAnalysis: () => void;
  recoverStreak: () => void;
  declineRecovery: () => void;
  openRecoveryModal: () => void;
  closeRecoveryModal: () => void;
  openStreakInfoModal: () => void;
  closeStreakInfoModal: () => void;
}

// Helper to sync to firebase
const syncToFirebase = async (data: Partial<StreakState>) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  try {
    const userRef = doc(db, "users", uid);
    const updateData: any = {};
    if (data.streakCount !== undefined) updateData.streakCount = data.streakCount;
    if (data.lastAnalysisDate !== undefined) updateData.lastAnalysisDate = data.lastAnalysisDate;
    if (data.lostStreakCount !== undefined) updateData.lostStreakCount = data.lostStreakCount;
    
    if (Object.keys(updateData).length > 0) {
      await updateDoc(userRef, updateData);
    }
  } catch (err) {
    console.error("Streak sync error:", err);
  }
};

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      streakCount: 0,
      lastAnalysisDate: null,
      lostStreakCount: 0,
      isRecoveryModalOpen: false,
      isStreakInfoModalOpen: false,

      triggerAnalysis: () => {
        const { lastAnalysisDate, streakCount, isRecoveryModalOpen } = get();
        
        // If recovery modal is already waiting for a decision, don't process new triggers
        if (isRecoveryModalOpen) return;

        const todayDate = new Date();
        const todayStr = todayDate.toISOString().split("T")[0];
        
        if (!lastAnalysisDate) {
          // First time ever
          const newState = { streakCount: 1, lastAnalysisDate: todayStr };
          set(newState);
          syncToFirebase(newState);
          return;
        }

        if (lastAnalysisDate === todayStr) {
          // Already triggered today, do nothing
          return;
        }

        const lastDate = new Date(lastAnalysisDate);
        // Reset time to midnight for accurate day difference calculation
        lastDate.setHours(0, 0, 0, 0);
        const todayMidnight = new Date(todayDate);
        todayMidnight.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(todayMidnight.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Dün girmiş, seriyi uzat
          const newState = { streakCount: streakCount + 1, lastAnalysisDate: todayStr };
          set(newState);
          syncToFirebase(newState);
        } else if (diffDays > 1) {
          // Seri bozulmuş!
          // Sadece eğer eski streak > 1 ise kurtarmaya değecek bir şey vardır.
          if (streakCount > 1) {
            const newState = { 
              lostStreakCount: streakCount,
              isRecoveryModalOpen: true,
            };
            set(newState);
            syncToFirebase(newState);
          } else {
            // Eğer streak zaten 0 veya 1 ise kurtarma sormaya gerek yok, direkt sıfırla başlat.
            const newState = { streakCount: 1, lastAnalysisDate: todayStr, lostStreakCount: 0 };
            set(newState);
            syncToFirebase(newState);
          }
        }
      },

      recoverStreak: () => {
        const { lostStreakCount } = get();
        const todayStr = new Date().toISOString().split("T")[0];
        const newState = { 
          streakCount: lostStreakCount + 1, // Kurtarıldı ve bugünün puanı eklendi
          lastAnalysisDate: todayStr,
          lostStreakCount: 0,
          isRecoveryModalOpen: false
        };
        set(newState);
        syncToFirebase(newState);
      },

      declineRecovery: () => {
        const todayStr = new Date().toISOString().split("T")[0];
        const newState = { 
          streakCount: 1, // Seri sıfırlandı
          lastAnalysisDate: todayStr,
          lostStreakCount: 0,
          isRecoveryModalOpen: false
        };
        set(newState);
        syncToFirebase(newState);
      },

      openRecoveryModal: () => set({ isRecoveryModalOpen: true }),
      closeRecoveryModal: () => set({ isRecoveryModalOpen: false }),
      openStreakInfoModal: () => set({ isStreakInfoModalOpen: true }),
      closeStreakInfoModal: () => set({ isStreakInfoModalOpen: false }),
    }),
    {
      name: "vibecheckr-streak-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
