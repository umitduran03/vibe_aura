import Image from "next/image";

interface AppLogoProps {
  className?: string;
  size?: number;
}

export default function AppLogo({ className = "", size = 48 }: AppLogoProps) {
  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center ${className}`.trim()}
      style={{
        width: size,
        height: size,
        /* Subtle glow ring to make the logo pop on dark backgrounds */
        boxShadow: "0 0 0 1px rgba(139,92,246,0.25), 0 0 12px rgba(139,92,246,0.15)",
      }}
    >
      <Image
        src="/v-wave.png"
        alt="VibeCheckr V-Wave Logo"
        fill
        sizes={`${size}px`}
        className="object-contain select-none pointer-events-none"
        style={{
          transform: "scale(1.2)", /* Dalga tam sığsın diye çok hafif büyüklük */
        }}
        priority
      />
    </div>
  );
}
