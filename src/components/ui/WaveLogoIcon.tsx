import React from "react";

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
      <img
        src="/vibecheckr-logo.png"
        alt=""
        style={{
          width: "170%",
          height: "170%",
          objectFit: "contain",
          maxWidth: "none",
        }}
      />
    </div>
  );
}
