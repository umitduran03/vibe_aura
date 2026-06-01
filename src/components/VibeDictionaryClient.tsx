"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Zap, HeartPulse, Search } from "lucide-react";

export const dictionaryTerms = [
  {
    category: "Gen-Z Slang & Lifestyle",
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    terms: [
      {
        word: "Delulu",
        meaning: "Short for delusional. Believing in a reality that doesn't exist, usually regarding romantic interests. 'May your delulu become trululu.'",
      },
      {
        word: "Rizz",
        meaning: "Derived from 'charisma'. The ability to effortlessly attract someone. Can be unspoken (unspoken rizz) or highly strategic. (Try our Rizz Architect feature!)",
      },
      {
        word: "Main Character Energy",
        meaning: "Acting like the protagonist of your own movie. Confident, slightly dramatic, and completely unbothered.",
      },
      {
        word: "Chronically Online",
        meaning: "Spending so much time on the internet that your entire vocabulary and sense of humor is based on obscure memes.",
      },
      {
        word: "Vibe Shift",
        meaning: "A sudden, noticeable change in the cultural atmosphere or the energy of a room. Also known as when your Daily Vibe completely flips.",
      },
    ]
  },
  {
    category: "Dating & Relationships",
    icon: <HeartPulse className="w-5 h-5 text-pink-400" />,
    terms: [
      {
        word: "Situationship",
        meaning: "More than a friendship, less than a relationship. High confusion, zero commitment. A true emotional rollercoaster. (Use our Situationship Clarifier to survive it).",
      },
      {
        word: "Red Flag",
        meaning: "A warning sign of toxic behavior. Example: Saying 'I'm not like other guys' or refusing to share their screen.",
      },
      {
        word: "Love Bombing",
        meaning: "When someone overwhelms you with affection, gifts, and attention early on, only to manipulate or ghost you later. Major toxic ex behavior.",
      },
      {
        word: "Ghosting",
        meaning: "Ending a personal relationship with someone by suddenly and without explanation withdrawing from all communication.",
      },
      {
        word: "Breadcrumbing",
        meaning: "Sending out flirtatious, but non-committal messages to keep someone's interest alive without any intention of taking things further.",
      },
    ]
  },
  {
    category: "Aura & Energies",
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    terms: [
      {
        word: "Aura Points",
        meaning: "An imaginary score of your cool factor. You gain aura points for a smooth comeback, you lose aura points for tripping in public. (Our AI can literally calculate this).",
      },
      {
        word: "Vibe Check",
        meaning: "An assessment of someone's energy or attitude. If you fail the vibe check, you're officially bad vibes.",
      },
      {
        word: "Golden Retriever Energy",
        meaning: "Sweet, loyal, energetic, and easily excited. Usually the perfect match for a 'Black Cat' personality.",
      },
      {
        word: "Black Cat Energy",
        meaning: "Mysterious, independent, slightly intimidating, but very loving once they trust you.",
      },
      {
        word: "Soulmate Profile",
        meaning: "The exact energy and aesthetic of the person you are cosmically meant to be with. (Upload your selfie to find yours).",
      },
    ]
  },
  {
    category: "Brutal Zodiac Roasts",
    icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
    terms: [
      {
        word: "Aries (Mar 21 - Apr 19)",
        meaning: "You treat every minor inconvenience like a declaration of war. Stop yelling, we are literally at a grocery store.",
      },
      {
        word: "Taurus (Apr 20 - May 20)",
        meaning: "Your love language is taking naps and refusing to compromise. You aren't 'protecting your peace', you're just stubborn.",
      },
      {
        word: "Gemini (May 21 - Jun 20)",
        meaning: "Two personalities, zero focus. Will leave you on read for 3 days and then reply with a TikTok like nothing happened.",
      },
      {
        word: "Cancer (Jun 21 - Jul 22)",
        meaning: "Crying because someone used a period at the end of their text message. The ultimate emotional manipulators (respectfully).",
      },
      {
        word: "Leo (Jul 23 - Aug 22)",
        meaning: "Needs 24/7 validation. If they aren't the center of attention, they will literally wither away like an unwatered plant.",
      },
      {
        word: "Virgo (Aug 23 - Sep 22)",
        meaning: "Judging everyone while their own life is held together by iced coffee and a color-coded Notion template they never use.",
      },
      {
        word: "Libra (Sep 23 - Oct 22)",
        meaning: "Flirts with the barista, the mailman, and a wall. Cannot make a decision to save their life.",
      },
      {
        word: "Scorpio (Oct 23 - Nov 21)",
        meaning: "Intense, secretive, and will stalk your Spotify playlists to figure out your emotional state. Holds grudges since 2012.",
      },
      {
        word: "Sagittarius (Nov 22 - Dec 21)",
        meaning: "Commitment phobic. Thinks running away to another country solves their profound lack of emotional maturity.",
      },
      {
        word: "Capricorn (Dec 22 - Jan 19)",
        meaning: "Treats romantic relationships like a corporate merger. Schedule their mental breakdowns in Google Calendar.",
      },
      {
        word: "Aquarius (Jan 20 - Feb 18)",
        meaning: "Thinks having a god complex and ghosting people makes them 'mysterious'. You aren't an alien, you just need therapy.",
      },
      {
        word: "Pisces (Feb 19 - Mar 20)",
        meaning: "Living in a permanent state of delulu. Will write poetry about a barista who just asked for their name.",
      },
    ]
  }
];

export default function VibeDictionaryClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDictionary = dictionaryTerms.map(section => {
    return {
      ...section,
      terms: section.terms.filter(term => 
        term.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
        term.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(section => section.terms.length > 0);

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-white/40" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for rizz, ghosting, aries..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
        />
      </div>

      {/* Dictionary Sections */}
      <div className="space-y-12 min-h-[400px]">
        {filteredDictionary.length === 0 ? (
          <div className="text-center py-10 text-white/50">
            <p className="text-lg">No vibes found for "{searchQuery}".</p>
            <p className="text-sm mt-2">Try searching something else or check your spelling.</p>
          </div>
        ) : (
          filteredDictionary.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-3 mb-6">
                {section.icon}
                <h2 className="text-2xl font-bold text-white">{section.category}</h2>
              </div>
              <div className="grid gap-4">
                {section.terms.map((term, tIdx) => (
                  <div key={tIdx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                    <h3 className="text-lg font-bold text-purple-300 mb-2">{term.word}</h3>
                    <p className="text-white/70 leading-relaxed">{term.meaning}</p>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
