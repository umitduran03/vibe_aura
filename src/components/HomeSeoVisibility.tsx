"use client";

import { ReactNode } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function HomeSeoVisibility({ children }: { children: ReactNode }) {
  const screen = useAppStore((s) => s.currentScreen);
  const wizardStep = useAppStore((s) => s.wizardStep);
  const analysisMode = useAppStore((s) => s.analysisMode);
  const isExtrasModalOpen = useAppStore((s) => s.isExtrasModalOpen);
  const isExtrasShowcaseOpen = useAppStore((s) => s.isExtrasShowcaseOpen);
  const isTokenModalOpen = useAppStore((s) => s.isTokenModalOpen);
  const isSettingsOpen = useAppStore((s) => s.isSettingsOpen);

  const isVisible =
    (screen === "splash" ||
      screen === "onboarding" ||
      (screen === "wizard" && wizardStep === 0 && analysisMode === "solo")) &&
    !isExtrasModalOpen &&
    !isExtrasShowcaseOpen &&
    !isTokenModalOpen &&
    !isSettingsOpen;

  if (!isVisible) return null;

  return <>{children}</>;
}
