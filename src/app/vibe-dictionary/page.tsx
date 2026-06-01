import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, Zap, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Gen-Z Vibe & Astrology Dictionary",
  description: "Learn the meanings of Gen-Z slang, red flags, aura colors, and zodiac traits. The ultimate dictionary for vibes, delulu moments, and situationships.",
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/vibe-dictionary",
  },
};

const dictionaryTerms = [
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

export default function VibeDictionaryPage() {
  return (
    <div className="min-h-dvh bg-[#050510] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Go back home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Gen-Z Vibe Dictionary
            </h1>
          </div>
        </div>

        {/* Intro */}
        <p className="text-white/70 text-lg mb-12 leading-relaxed">
          Confused by the internet? Don't know if your crush is a walking red flag or just a Scorpio? 
          Welcome to the ultimate dictionary of Gen-Z slang, vibes, and astrology. Learn the lingo before 
          you take your ultimate <strong className="text-white">AI Vibe Check</strong>.
        </p>

        {/* CTA Banner (Top) */}
        <div className="mb-14 p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Curious about your own vibe? 📸</h2>
          <p className="text-white/70 mb-5">Upload a selfie and let our AI brutally roast or hype you up.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
          >
            Get My Vibe Check
          </Link>
        </div>

        {/* Dictionary Sections */}
        <div className="space-y-12">
          {dictionaryTerms.map((section, idx) => (
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
          ))}
        </div>

        {/* CTA Banner (Bottom) */}
        <div className="mt-20 p-8 rounded-3xl bg-black/40 border border-white/10 text-center backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Ready to face the truth?</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Stop reading definitions and find out what your aura actually says about you. Our AI is waiting to humble you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-1"
          >
            Start AI Vibe Check Now
          </Link>
        </div>
      </div>
    </div>
  );
}
