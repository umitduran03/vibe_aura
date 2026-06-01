import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
          set({ streakCount: 1, lastAnalysisDate: todayStr });
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
          set({ streakCount: streakCount + 1, lastAnalysisDate: todayStr });
        } else if (diffDays > 1) {
          // Seri bozulmuş!
          // Sadece eğer eski streak > 1 ise kurtarmaya değecek bir şey vardır.
          if (streakCount > 1) {
            set({ 
              lostStreakCount: streakCount,
              isRecoveryModalOpen: true,
              // We do NOT set streakCount = 1 or lastAnalysisDate yet. 
              // We wait for the user to recover or decline.
            });
          } else {
            // Eğer streak zaten 0 veya 1 ise kurtarma sormaya gerek yok, direkt sıfırla başlat.
            set({ streakCount: 1, lastAnalysisDate: todayStr, lostStreakCount: 0 });
          }
        }
      },

      recoverStreak: () => {
        const { lostStreakCount } = get();
        const todayStr = new Date().toISOString().split("T")[0];
        set({ 
          streakCount: lostStreakCount + 1, // Kurtarıldı ve bugünün puanı eklendi
          lastAnalysisDate: todayStr,
          lostStreakCount: 0,
          isRecoveryModalOpen: false
        });
      },

      declineRecovery: () => {
        const todayStr = new Date().toISOString().split("T")[0];
        set({ 
          streakCount: 1, // Seri sıfırlandı
          lastAnalysisDate: todayStr,
          lostStreakCount: 0,
          isRecoveryModalOpen: false
        });
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
