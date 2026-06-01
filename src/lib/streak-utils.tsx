import React from 'react';
import { Ghost, Sparkles, Star, Crown, Zap, Skull } from 'lucide-react';

export interface VibeRank {
  name: string;
  minDays: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

export const VIBE_RANKS: VibeRank[] = [
  {
    name: "NPC",
    minDays: 0,
    icon: <Ghost className="w-5 h-5 text-gray-400" />,
    color: "text-gray-400",
    gradient: "from-gray-700 to-gray-900"
  },
  {
    name: "Vibe Padawan",
    minDays: 3,
    icon: <Sparkles className="w-5 h-5 text-green-400" />,
    color: "text-green-400",
    gradient: "from-emerald-500 to-teal-700"
  },
  {
    name: "Main Character",
    minDays: 7,
    icon: <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />,
    color: "text-yellow-400",
    gradient: "from-yellow-400 to-orange-600"
  },
  {
    name: "Aura Architect",
    minDays: 15,
    icon: <Zap className="w-5 h-5 text-blue-400 fill-blue-400" />,
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-700"
  },
  {
    name: "Vibe God",
    minDays: 30,
    icon: <Crown className="w-5 h-5 text-purple-400 fill-purple-400" />,
    color: "text-purple-400",
    gradient: "from-fuchsia-500 to-purple-800"
  },
  {
    name: "Chronically Online",
    minDays: 70,
    icon: <Skull className="w-5 h-5 text-red-400" />,
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
