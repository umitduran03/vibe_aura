import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SeoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-12 px-6 mt-20 relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">VibeCheckr</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            The internet's most brutally honest AI algorithm. Scan your vibes, decode mixed signals, and get the reality check you desperately need.
          </p>
        </div>

        {/* AI Features */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-xs opacity-50">AI Features</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/toxic-ex-scanner" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-red-400" />
                </span>
                Toxic Ex Scanner
              </Link>
            </li>
            <li>
              <Link href="/duo-compatibility" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                </span>
                Duo Compatibility
              </Link>
            </li>
            <li>
              <Link href="/situationship-clarifier" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-purple-400" />
                </span>
                Situationship Clarifier
              </Link>
            </li>
            <li>
              <Link href="/mood-reset" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </span>
                Mood Reset
              </Link>
            </li>
            <li>
              <Link href="/delulu-check" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </span>
                Delulu Check
              </Link>
            </li>
            <li>
              <Link href="/reply-guru" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                </span>
                The Reply Guru
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-xs opacity-50">Resources</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/trends" className="text-white/70 hover:text-white transition-colors text-sm font-semibold text-indigo-300">
                All Trends & Articles →
              </Link>
            </li>
            <li>
              <Link href="/vibe-dictionary" className="text-white/70 hover:text-white transition-colors text-sm">
                Vibe Dictionary
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-white/70 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
            </li>
            <li className="pt-2">
              <span className="text-xs text-white/40 uppercase font-bold tracking-wider">Top Reads</span>
            </li>
            <li>
              <Link href="/trends/ai-photo-personality-test" className="text-white/60 hover:text-white transition-colors text-xs block truncate" title="AI Photo Personality Test">
                AI Photo Personality Test
              </Link>
            </li>
            <li>
              <Link href="/trends/situationship-vs-relationship" className="text-white/60 hover:text-white transition-colors text-xs block truncate" title="Situationship vs Relationship">
                Situationship vs Relationship
              </Link>
            </li>
            <li>
              <Link href="/trends/mixed-signals-or-delulu" className="text-white/60 hover:text-white transition-colors text-xs block truncate" title="Mixed Signals or Delulu?">
                Mixed Signals or Delulu?
              </Link>
            </li>
            <li>
              <Link href="/trends/biggest-dating-red-flags-2026" className="text-white/60 hover:text-white transition-colors text-xs block truncate" title="Biggest Dating Red Flags">
                Biggest Dating Red Flags
              </Link>
            </li>
            <li>
              <Link href="/trends/how-to-stop-overthinking-texts" className="text-white/60 hover:text-white transition-colors text-xs block truncate" title="Stop Overthinking Texts">
                Stop Overthinking Texts
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-xs opacity-50">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-xs">
          © {currentYear} VibeCheckr AI. All rights reserved. Not actual medical or psychological advice.
        </p>
        <div className="flex gap-4">
          {/* Social placeholders if needed in future */}
        </div>
      </div>
    </footer>
  );
}
