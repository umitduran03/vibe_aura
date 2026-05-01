import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from "react-icons/tb";

interface ZodiacIconProps {
  id: string;
  className?: string;
}

export function ZodiacIcon({ id, className }: ZodiacIconProps) {
  switch (id) {
    case "aries": return <TbZodiacAries className={className} />;
    case "taurus": return <TbZodiacTaurus className={className} />;
    case "gemini": return <TbZodiacGemini className={className} />;
    case "cancer": return <TbZodiacCancer className={className} />;
    case "leo": return <TbZodiacLeo className={className} />;
    case "virgo": return <TbZodiacVirgo className={className} />;
    case "libra": return <TbZodiacLibra className={className} />;
    case "scorpio": return <TbZodiacScorpio className={className} />;
    case "sagittarius": return <TbZodiacSagittarius className={className} />;
    case "capricorn": return <TbZodiacCapricorn className={className} />;
    case "aquarius": return <TbZodiacAquarius className={className} />;
    case "pisces": return <TbZodiacPisces className={className} />;
    default: return <TbZodiacAries className={className} />; // Fallback
  }
}
