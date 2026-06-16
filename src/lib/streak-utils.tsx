import React from 'react';
import { Ghost, Sparkles, Star, Crown, Zap, Skull, Bot, Sprout, Hexagon, Sun, Wifi, Smartphone, Flame } from 'lucide-react';

export interface VibeRank {
  name: string;
  nameTr?: string;
  minDays: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

export const VIBE_RANKS: VibeRank[] = [
  {
    name: "NPC",
    nameTr: "NPC",
    minDays: 0,
    icon: (
      <div className="relative flex items-center justify-center">
        <Bot className="w-5 h-5 text-gray-500 opacity-50" />
      </div>
    ),
    color: "text-gray-400",
    gradient: "from-gray-700 to-gray-900"
  },
  {
    name: "Vibe Padawan",
    nameTr: "Vibe Çırağı",
    minDays: 3,
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-400/20 blur-md rounded-full animate-pulse" />
        <Sprout className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <Sparkles className="w-2.5 h-2.5 text-teal-200 absolute -top-1 -right-1" />
      </div>
    ),
    color: "text-green-400",
    gradient: "from-emerald-500 to-teal-700"
  },
  {
    name: "Main Character",
    nameTr: "Ana Karakter",
    minDays: 7,
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow-400/30 blur-lg rounded-full animate-pulse" />
        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]" />
        <Flame className="w-3 h-3 text-orange-400 absolute -bottom-1 -left-1" />
      </div>
    ),
    color: "text-yellow-400",
    gradient: "from-yellow-400 to-orange-600"
  },
  {
    name: "Aura Architect",
    nameTr: "Aura Mimarı",
    minDays: 15,
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan-400/40 blur-lg rounded-full animate-pulse" />
        <Hexagon className="w-7 h-7 text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)] animate-[spin_10s_linear_infinite]" />
        <Zap className="w-3.5 h-3.5 text-blue-100 fill-blue-100 absolute drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
      </div>
    ),
    color: "text-blue-400",
    gradient: "from-blue-400 to-cyan-600"
  },
  {
    name: "Vibe God",
    nameTr: "Vibe İlahı",
    minDays: 30,
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-fuchsia-500/50 blur-xl rounded-full animate-pulse" />
        <Sun className="w-8 h-8 text-purple-400/40 animate-[spin_6s_linear_infinite]" />
        <Crown className="w-6 h-6 text-fuchsia-300 fill-fuchsia-400 absolute drop-shadow-[0_0_20px_rgba(217,70,239,1)]" />
        <Sparkles className="w-3 h-3 text-white absolute -top-2 -right-2 animate-bounce" />
      </div>
    ),
    color: "text-purple-400",
    gradient: "from-fuchsia-500 to-purple-800"
  },
  {
    name: "Chronically Online",
    nameTr: "Kronik Çevrimiçi",
    minDays: 70,
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-red-600/50 blur-xl rounded-full animate-[pulse_0.5s_infinite]" />
        <Smartphone className="w-6 h-6 text-red-400 fill-red-950 absolute" />
        <Wifi className="w-8 h-8 text-red-500 opacity-50 absolute -top-4 animate-ping" />
        <Skull className="w-4 h-4 text-white absolute top-1 drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
      </div>
    ),
    color: "text-red-400",
    gradient: "from-red-600 to-rose-900"
  }
];

export function getVibeRank(streakDays: number): VibeRank {
  // Array is ordered from lowest to highest.
  // Reverse the array to find the highest rank the user qualifies for.
  const reversedRanks = [...VIBE_RANKS].reverse();
  const rank = reversedRanks.find(r => streakDays >= r.minDays);
  
  return rank || VIBE_RANKS[0]; // fallback to NPC
}
