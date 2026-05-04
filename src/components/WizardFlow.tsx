"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Clock, Heart } from "lucide-react";

import ProgressDots from "@/components/ProgressDots";
import ModeSelector from "@/components/ModeSelector";
import DailyVibeBanner from "@/components/DailyVibeBanner";
import SoloScenarioSelector from "@/components/SoloScenarioSelector";
import AgeZodiacStep from "@/components/steps/AgeZodiacStep";
import RelationshipStep from "@/components/steps/RelationshipStep";
import MagicQuestionStep from "@/components/steps/MagicQuestionStep";
import DuoStep from "@/components/steps/DuoStep";
import TokenBadge from "@/components/TokenBadge";
import SettingsDrawer from "@/components/SettingsDrawer";
import GlassButton from "@/components/ui/GlassButton";
import { slideVariants } from "@/lib/animations";
import { hapticLight, hapticMedium } from "@/lib/haptics";
import { TOTAL_STEPS } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";

interface WizardFlowProps {
  onComplete: () => void;
}

/*
 * Solo wizard: step 0 = ModeSelector + AgeZodiac, step 1 = Relationship, step 2 = MagicQuestion
 * Duo wizard:  step 0 = ModeSelector, step 1 = DuoStep (all-in-one)
 */
const DUO_TOTAL_STEPS = 1;

export default function WizardFlow({ onComplete }: WizardFlowProps) {
  const step = useAppStore((s) => s.wizardStep);
  const direction = useAppStore((s) => s.wizardDirection);
  const userData = useAppStore((s) => s.userData);
  const analysisMode = useAppStore((s) => s.analysisMode);
  const duoPerson1 = useAppStore((s) => s.duoPerson1);
  const duoPerson2 = useAppStore((s) => s.duoPerson2);
  const photoUrl = useAppStore((s) => s.photoUrl);
  const setWizardStep = useAppStore((s) => s.setWizardStep);
  const updateUserData = useAppStore((s) => s.updateUserData);

  const isDuo = analysisMode === "duo";
  const totalSteps = isDuo ? DUO_TOTAL_STEPS : TOTAL_STEPS;

  const canProceed = useCallback(() => {
    if (isDuo) {
      switch (step) {
        case 0:
          return (
            duoPerson1.zodiac !== null &&
            duoPerson2.zodiac !== null &&
            duoPerson1.photoBase64 !== null &&
            duoPerson2.photoBase64 !== null
          );
        default:
          return false;
      }
    }
    // Solo mode
    switch (step) {
      case 0:
        return userData.zodiac !== null;
      case 1:
        return userData.relationship !== null;
      case 2:
        return photoUrl !== null;
      default:
        return false;
    }
  }, [
    step,
    analysisMode,
    userData.zodiac,
    userData.relationship,
    duoPerson1.zodiac,
    duoPerson2.zodiac,
    duoPerson1.photoBase64,
    duoPerson2.photoBase64,
    photoUrl,
  ]);

  const goNext = () => {
    hapticLight();
    if (step < totalSteps - 1) {
      setWizardStep(step + 1, 1);
    } else {
      hapticMedium();
      onComplete();
    }
  };

  const goBack = () => {
    hapticLight();
    if (step > 0) {
      setWizardStep(step - 1, -1);
    }
  };

  const renderStep = () => {
    if (analysisMode === "duo") {
      switch (step) {
        case 0:
          return (
            <>
              <DailyVibeBanner />
              <ModeSelector />
              <DuoStep />
            </>
          );
        default:
          return null;
      }
    }
    // Solo mode
    switch (step) {
      case 0:
        return (
          <>
            <DailyVibeBanner />
            <ModeSelector />
            <SoloScenarioSelector />
            <AgeZodiacStep
              selectedAge={userData.age}
              selectedZodiac={userData.zodiac}
              onAgeChange={(age) => updateUserData({ age })}
              onZodiacChange={(zodiac) => updateUserData({ zodiac })}
            />
          </>
        );
      case 1:
        return (
          <RelationshipStep
            selected={userData.relationship}
            onSelect={(relationship) => updateUserData({ relationship })}
          />
        );
      case 2:
        return (
          <MagicQuestionStep
            value={userData.magicText}
            onChange={(magicText) => updateUserData({ magicText })}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = step === totalSteps - 1;

  return (
    <motion.div
      className="flex flex-col min-h-dvh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <motion.button
            onClick={goBack}
            className={`flex items-center gap-1 text-sm text-text-secondary transition-opacity cursor-pointer ${
              step === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </motion.button>
          <span className="text-xs font-medium text-text-secondary/50 uppercase tracking-widest">
            {isDuo ? "Duo Soulmate" : "Vibe & Aura"}
          </span>
          <div className="flex items-center gap-2">
            <TokenBadge />
            <Link href="/history" prefetch={false} onClick={() => hapticLight()}>
              <motion.div 
                className="flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Clock className="h-4 w-4" />
              </motion.div>
            </Link>
            <SettingsDrawer />
          </div>
        </div>
        <ProgressDots currentStep={step} totalOverride={totalSteps} />
      </div>

      {/* Step Content */}
      <div className="flex-1 px-5 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${analysisMode}-${step}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex-shrink-0 px-5 pb-8 pt-4">
        <GlassButton
          onClick={goNext}
          disabled={!canProceed()}
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
        >
          {isLastStep ? (
            isDuo ? (
              <>
                <Heart className="h-4 w-4" />
                Analyze Duo Vibe
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze My Vibe
              </>
            )
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </GlassButton>

        {((!isDuo && step === 2) ||
          (isDuo &&
            step === 0 &&
            duoPerson1.zodiac !== null &&
            duoPerson2.zodiac !== null)) && (
          <motion.button
            onClick={() => {
              hapticLight();
              onComplete();
            }}
            className="mt-3 w-full text-center text-sm text-text-secondary/50 hover:text-text-secondary transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Skip, show me the results
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
