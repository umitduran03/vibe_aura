import React from "react";
import Image from "next/image";

export function WaveLogoIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden select-none pointer-events-none ${className}`}
      style={{ 
        width: size, 
        height: size, 
      }}
    >
      <Image
        src="/v-wave.png"
        alt="V-Wave Icon"
        fill
        sizes={`${size}px`}
        priority
        style={{
          objectFit: "contain",
          transform: "scale(1.3)", /* Dalga olduğu için biraz daha görünür olması için scale edildi */
        }}
      />
    </div>
  );
}
