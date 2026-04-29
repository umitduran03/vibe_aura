"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Sparkles, MessageCircleWarning } from "lucide-react";
import { hapticMedium, hapticLight } from "@/lib/haptics";
import { useAppStore } from "@/store/useAppStore";
import { saveFcmToken } from "@/lib/auth";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

export default function NotificationPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const { currentScreen, auraResult, duoResult, userId } = useAppStore();

  useEffect(() => {
    // Sadece "result" ekranına ulaşıldığında ve cihaz native ise çalış
    if (currentScreen === "result" && (auraResult || duoResult)) {
      // Daha önce izin sorma işlemi yapılıp yapılmadığını localStorage ile takip ediyoruz
      const hasPrompted = localStorage.getItem("vibe_aura_fcm_prompted");
      
      if (!hasPrompted && Capacitor.isNativePlatform()) {
        // Heyecanı artırmak için analiz ekranı geldikten 3 sn sonra sor
        const timer = setTimeout(() => {
          setIsVisible(true);
          hapticMedium();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentScreen, auraResult, duoResult]);

  const handleClose = () => {
    hapticLight();
    localStorage.setItem("vibe_aura_fcm_prompted", "true");
    setIsVisible(false);
  };

  const handleAllow = async () => {
    hapticMedium();
    localStorage.setItem("vibe_aura_fcm_prompted", "true");
    setIsVisible(false);

    if (Capacitor.isNativePlatform()) {
      try {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === "prompt") {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive === "granted") {
          // Token alındığında Event Listener
          PushNotifications.addListener("registration", (token) => {
            if (userId) {
              saveFcmToken(userId, token.value).catch(console.error);
            }
          });

          // Hata durumunda listener
          PushNotifications.addListener("registrationError", (error: any) => {
            console.error("Push FCM Token error: " + JSON.stringify(error));
          });

          // Kayıt ol
          await PushNotifications.register();
        }
      } catch (err) {
        console.warn("Push Notifications permission/request error: ", err);
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Prompt Container */}
          <motion.div
            className="fixed inset-x-5 bottom-12 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div 
              className="relative w-full max-w-sm glass-panel overflow-hidden pointer-events-auto p-6"
              style={{
                background: "linear-gradient(160deg, rgba(30,20,40,0.95) 0%, rgba(15,10,20,0.98) 100%)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.1)"
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(139,92,246,0.15) 100%)",
                    boxShadow: "0 0 20px rgba(236,72,153,0.1)"
                  }}
                >
                  <MessageCircleWarning className="h-7 w-7 text-pink-500" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  Digital Gossip
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  The algorithm is going to text you! Sometimes a vibe check, sometimes a roast. Are you ready to hear your red flags and vibe leaks?
                </p>

                <div className="flex w-full gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-white/70 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    No Thanks, I'm Scared
                  </button>
                  
                  <button
                    onClick={handleAllow}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                      boxShadow: "0 4px 15px rgba(236,72,153,0.3)"
                    }}
                  >
                    I'm Ready!
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
