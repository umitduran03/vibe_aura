"use client";

import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-[#050510] text-white">
      {/* ─── Background Glow ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-600/8 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        {/* ─── Header ─── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to App
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
            }}
          >
            <Scale className="h-5 w-5 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
        </div>
        <p className="text-sm text-white/40 mb-10">Last updated: April 22, 2026</p>

        {/* ─── Content ─── */}
        <div className="space-y-8 text-[15px] leading-relaxed text-white/70">
          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using Vibe & Aura ("the App"), you agree to be bound by these Terms of Service. If you do not agree, do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">2. Entertainment Purpose Only</h2>
            <div
              className="p-4 rounded-2xl border mb-4"
              style={{
                background: "rgba(139,92,246,0.08)",
                borderColor: "rgba(139,92,246,0.2)",
              }}
            >
              <p className="text-purple-300 font-medium text-sm">
                ⚠️ Vibe & Aura is a novelty entertainment application. All aura readings, zodiac analyses, compatibility scores, and AI-generated content are intended <strong>solely for entertainment purposes</strong>.
              </p>
            </div>
            <p>
              Nothing in the App constitutes medical, psychological, therapeutic, financial, legal, or any other form of professional advice. You should not make any real-life decisions — including those related to health, relationships, career, or finances — based on results provided by the App.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">3. AI-Generated Content</h2>
            <p>
              The App uses artificial intelligence (AI) models to generate aura readings and personality analyses. AI-generated content may be inaccurate, biased, or entirely fictional. We do not guarantee the accuracy, completeness, or reliability of any AI output. You acknowledge that AI results are generated algorithmically and should not be taken as factual statements about your personality, character, or future.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">4. User Accounts & Authentication</h2>
            <p>
              The App uses anonymous authentication. You are responsible for maintaining the security of your device and account. We are not liable for unauthorized access resulting from your failure to safeguard your device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">5. In-App Purchases & Tokens</h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>The App offers digital tokens and VIP subscriptions for purchase. All purchases are processed through Polar (web) or Apple App Store / Google Play Store (mobile).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white/90">All digital product purchases are final and non-refundable</strong>, except where required by applicable law or the policies of the respective app store.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Tokens have no monetary value and cannot be exchanged, transferred, or redeemed for cash.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>VIP subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">6. Prohibited Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="space-y-1.5 list-none">
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>Reverse-engineer, decompile, or attempt to extract the source code of the App.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>Exploit bugs, vulnerabilities, or API endpoints to gain unauthorized tokens, credits, or access.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>Use the App to harass, bully, defame, or harm others.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>Upload illegal, obscene, or harmful content through the photo analysis features.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">7. Intellectual Property</h2>
            <p>
              All content, designs, code, AI models, branding, and assets within Vibe & Aura are the exclusive property of the developer team. Unauthorized reproduction, distribution, or modification is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Vibe & Aura and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App, including but not limited to emotional distress caused by AI-generated content, loss of data, or interruption of service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the App at any time, with or without cause, including for violation of these Terms. Upon termination, your right to use the App ceases immediately and any unused tokens or active subscriptions may be forfeited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">10. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the App after changes are posted constitutes acceptance of the revised Terms. We recommend reviewing this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">11. Contact</h2>
            <p>
              If you have questions about these Terms, please reach out at{" "}
              <a href="mailto:support@vibeandaura.app" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">
                support@vibeandaura.app
              </a>
            </p>
          </section>
        </div>

        {/* ─── Footer ─── */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Vibe & Aura. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
