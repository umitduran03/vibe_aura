import Image from "next/image";

interface AppLogoProps {
  className?: string;
  size?: number;
}

export default function AppLogo({ className = "", size = 48 }: AppLogoProps) {
  return (
    <div
      className={`relative aspect-square rounded-full overflow-hidden shrink-0 ${className}`.trim()}
      style={{
        width: size,
        height: size,
        /* Subtle glow ring to make the logo pop on dark backgrounds */
        boxShadow: "0 0 0 1px rgba(139,92,246,0.25), 0 0 12px rgba(139,92,246,0.15)",
      }}
    >
      <Image
        src="/logo.png"
        alt="Vibe & Aura Logo"
        fill
        sizes={`${size}px`}
        className="object-cover select-none pointer-events-none"
        style={{
          /* Slightly boost brightness & contrast so VA letters stand out */
          filter: "brightness(1.5) contrast(1.2)",
        }}
        priority
      />
    </div>
  );
}
