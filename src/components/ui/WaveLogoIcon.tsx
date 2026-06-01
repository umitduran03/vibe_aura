import React from "react";
import Image from "next/image";

export function WaveLogoIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden select-none pointer-events-none ${className}`}
      style={{ 
        width: size, 
        height: size, 
        mixBlendMode: "screen",
        /* Subtly boost brightness to make the white wave pop more after blend */
        filter: "brightness(1.2)"
      }}
    >
      <Image
        src="/vibecheckr-logo.png"
        alt="VibeCheckr Logo"
        fill
        sizes={`${size}px`}
        priority
        style={{
          objectFit: "contain",
          transform: "scale(1.7)",
        }}
      />
    </div>
  );
}
