import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import SeoFooter from "@/components/SeoFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "VibeCheckr Terms of Service — Read our terms and conditions for using the AI-powered vibe check and photo analysis app.",
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/terms",
  },
};

const termsData = {
  en: {
    back: "Back to App",
    title: "Terms of Service",
    updated: "Last updated: May 1, 2026",
    s1Title: "1. Acceptance of Terms",
    s1Desc: "By downloading, installing, or using VibeCheckr (\"the App\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the App.",
    s2Title: "2. Entertainment Purpose Only",
    s2Warn: "⚠️ VibeCheckr is a novelty entertainment application. All personality analyses, zodiac-based content, compatibility scores, and AI-generated results are intended solely for entertainment purposes.",
    s2Desc: "Nothing in the App constitutes medical, psychological, therapeutic, financial, legal, or any other form of professional advice. You should not make any real-life decisions — including those related to health, relationships, career, or finances — based on results provided by the App.",
    s3Title: "3. AI-Generated Content",
    s3Desc: "The App uses artificial intelligence (AI) models to generate personality analyses and entertainment content. AI-generated content may be inaccurate, biased, or entirely fictional. We do not guarantee the accuracy, completeness, or reliability of any AI output. You acknowledge that AI results are generated algorithmically and should not be taken as factual statements about your personality, character, or future.",
    s4Title: "4. User Accounts & Authentication",
    s4Desc: "The App uses Google Authentication to create and manage your account. By signing in, you grant us permission to access your basic profile information (Email, Name, Profile Photo). You are responsible for maintaining the security of your Google account and device. We are not liable for unauthorized access resulting from your failure to safeguard your credentials or device.",
    s5Title: "5. In-App Purchases, Tokens & Credits",
    s5L1: "The App uses a Token (Credit) system to access certain AI features, such as deep personality analysis or Duo Match. Users can purchase Tokens or VIP Passes via our Web platform (powered by Polar, as one-time payments) OR via our Mobile apps (billed through Apple App Store / Google Play Store using RevenueCat).",
    s5L2: "All digital product purchases are final and non-refundable, except where required by applicable law or the policies of the respective app store.",
    s5L3: "Tokens have no monetary value and cannot be exchanged, transferred, or redeemed for cash. They are consumed upon using specific premium features within the App.",
    s5L4: "Billing Model: Depending on your purchase platform, payments may be processed as one-time purchases (e.g., via Web / Polar) or may include auto-renewing subscription options (e.g., via Mobile App Stores). Please carefully review the terms, pricing, and renewal conditions presented on the payment screen before completing any purchase. Mobile subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.",
    s6Title: "6. Prohibited Conduct",
    s6Pre: "You agree not to:",
    s6L1: "Reverse-engineer, decompile, or attempt to extract the source code of the App.",
    s6L2: "Exploit bugs, vulnerabilities, or API endpoints (such as token deduction routes) to gain unauthorized tokens, credits, or access.",
    s6L3: "Use the App to harass, bully, defame, or harm others.",
    s6L4: "Upload illegal, obscene, or harmful content through the photo analysis features.",
    s7Title: "7. Intellectual Property",
    s7Desc: "All content, designs, code, AI models, branding, and assets within VibeCheckr are the exclusive property of the developer team. Unauthorized reproduction, distribution, or modification is strictly prohibited.",
    s8Title: "8. Limitation of Liability",
    s8Desc: "To the maximum extent permitted by law, VibeCheckr and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App, including but not limited to emotional distress caused by AI-generated content, loss of data, or interruption of service.",
    s9Title: "9. Termination",
    s9Desc: "We reserve the right to suspend or terminate your access to the App at any time, with or without cause, including for violation of these Terms. Upon termination, your right to use the App ceases immediately and any unused tokens or active VIP time may be forfeited.",
    s10Title: "10. Changes to Terms",
    s10Desc: "We may update these Terms from time to time. Continued use of the App after changes are posted constitutes acceptance of the revised Terms. We recommend reviewing this page periodically.",
    s11Title: "11. Contact",
    s11Desc: "If you have questions about these Terms, please reach out at "
  },
  tr: {
    back: "Uygulamaya Dön",
    title: "Kullanım Şartları",
    updated: "Son güncelleme: 1 Mayıs 2026",
    s1Title: "1. Kuralları Kabul Etmek",
    s1Desc: "VibeCheckr'ı (\"Uygulama\") indirerek veya kullanarak bu kuralları kabul etmiş sayılırsın. Kurallar sana uymuyorsa, uygulamayı kullanmamanı rica ederiz.",
    s2Title: "2. Sadece Eğlence Amaçlıdır (Ciddiye Alma)",
    s2Warn: "⚠️ VibeCheckr tamamen eğlence ve geyik amaçlı bir uygulamadır. Buradaki kişilik analizleri, burç yorumları, uyumluluk puanları ve yapay zeka tarafından üretilen sonuçların tek amacı eğlenmektir.",
    s2Desc: "Uygulamadaki hiçbir şey tıbbi, psikolojik, finansal veya hukuki bir tavsiye niteliği taşımaz. Sağlığını, ilişkilerini, kariyerini veya cüzdanını ilgilendiren gerçek hayat kararlarını buradaki sonuçlara göre almamalısın.",
    s3Title: "3. Yapay Zeka Tarafından Üretilen İçerikler",
    s3Desc: "Uygulama, sana özel analizler ve içerikler üretmek için yapay zeka (AI) kullanır. Bu yüzden üretilen içerikler bazen hatalı, taraflı veya tamamen uydurma olabilir. Yapay zekanın söylediklerinin %100 doğru veya güvenilir olduğunu garanti etmiyoruz. AI sonuçları tamamen algoritmalara dayanır; karakterin, hayatın veya geleceğin hakkında kesin yargılar olarak algılanmamalıdır.",
    s4Title: "4. Hesaplar ve Giriş İşlemleri",
    s4Desc: "Uygulamaya girmek için Google ile giriş yapman gerekir. Giriş yaptığında e-posta adresin, adın ve profil fotoğrafın gibi temel bilgilerine erişmemize izin vermiş olursun. Hesabının ve cihazının güvenliği tamamen senin sorumluluğundadır. Telefonunu başkası kurcalarsa oluşabilecek sorunlardan biz sorumlu değiliz.",
    s5Title: "5. Uygulama İçi Satın Alımlar ve Krediler",
    s5L1: "VibeCheckr, derinlemesine analizler veya Duo Match gibi bazı yapay zeka özelliklerini kullanabilmen için Token (Kredi) sistemiyle çalışır. Kredileri veya VIP üyelikleri web üzerinden (Polar altyapısıyla) ya da mobil uygulamalarımız üzerinden (App Store / Google Play) satın alabilirsin.",
    s5L2: "Uygulama mağazalarının kendi kuralları veya geçerli yasalar gerektirmedikçe, dijital satın alımların iadesi yoktur. Aldın, bitti.",
    s5L3: "Token'ların gerçek hayatta hiçbir maddi karşılığı yoktur; nakde çevrilemez veya başkasına aktarılamaz. Sadece uygulama içindeki özellikleri kullanırken harcanırlar.",
    s5L4: "Ödeme Modeli: Satın aldığın platforma göre ödemeler tek seferlik olabilir veya otomatik yenilenen abonelik şeklinde gerçekleşebilir. Satın alım yapmadan önce ödeme ekranındaki fiyatlandırma ve yenileme şartlarını mutlaka gözden geçir. Mobil abonelikler, süre bitiminden en az 24 saat önce iptal edilmediği sürece otomatik olarak yenilenir.",
    s6Title: "6. Kesinlikle Yapmaman Gerekenler",
    s6Pre: "Şunları yapmamayı kabul ediyorsun:",
    s6L1: "Uygulamanın kaynak kodunu çıkarmaya çalışmak veya tersine mühendislik yapmak.",
    s6L2: "Sistemdeki açıkları, bug'ları veya API'leri kullanarak haksız yere token veya kredi elde etmeye çalışmak.",
    s6L3: "Uygulamayı başkalarını taciz etmek, zorbalık yapmak veya onlara zarar vermek için kullanmak.",
    s6L4: "Fotoğraf analizi kısmına yasa dışı, müstehcen veya zararlı içerikler yüklemek.",
    s7Title: "7. Fikri Mülkiyet (Bizim Emeğimiz)",
    s7Desc: "VibeCheckr'daki tüm içerik, tasarım, yapay zeka modelleri ve markalama öğeleri geliştirici ekibe aittir. Bunları izinsiz kopyalamak, dağıtmak veya değiştirmek kesinlikle yasaktır.",
    s8Title: "8. Sorumluluk Sınırımız",
    s8Desc: "Yasaların izin verdiği en geniş ölçüde; VibeCheckr ve geliştiricileri, yapay zekanın söylediği bir şey yüzünden canının sıkılması, veri kaybı veya hizmetin kesintiye uğraması gibi uygulamayı kullanmandan kaynaklanabilecek hiçbir dolaylı, tesadüfi veya özel zarardan sorumlu tutulamaz.",
    s9Title: "9. Hesabın Kapatılması",
    s9Desc: "Bu kuralları ihlal edersen veya herhangi bir geçerli nedenle, uygulamaya erişimini önceden haber vermeksizin durdurabilir veya hesabını silebiliriz. Böyle bir durumda, harcamadığın token'lar veya VIP süren yanabilir.",
    s10Title: "10. Kuralların Değişmesi",
    s10Desc: "Bu kullanım şartlarını zaman zaman güncelleyebiliriz. Değişiklikler yayınlandıktan sonra uygulamayı kullanmaya devam edersen, yeni kuralları da kabul etmiş sayılırsın. Arada bir buraya göz atman iyi olur.",
    s11Title: "11. Bize Ulaş",
    s11Desc: "Bu kurallarla ilgili aklına takılan bir şey olursa, bize buradan ulaşabilirsin: "
  }
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const isTr = resolvedParams.lang === "tr";
  const s = isTr ? termsData.tr : termsData.en;

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
          {s.back}
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
          <h1 className="text-2xl font-bold tracking-tight">{s.title}</h1>
        </div>
        <p className="text-sm text-white/40 mb-10">{s.updated}</p>

        {/* ─── Content ─── */}
        <div className="space-y-8 text-[15px] leading-relaxed text-white/70">
          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s1Title}</h2>
            <p>{s.s1Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s2Title}</h2>
            <div
              className="p-4 rounded-2xl border mb-4"
              style={{
                background: "rgba(139,92,246,0.08)",
                borderColor: "rgba(139,92,246,0.2)",
              }}
            >
              <p className="text-purple-300 font-medium text-sm">
                <span dangerouslySetInnerHTML={{ __html: s.s2Warn }} />
              </p>
            </div>
            <p>{s.s2Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s3Title}</h2>
            <p>{s.s3Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s4Title}</h2>
            <p>{s.s4Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s5Title}</h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>{s.s5L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white/90">{s.s5L2}</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>{s.s5L3}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>{s.s5L4}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s6Title}</h2>
            <p className="mb-2">{s.s6Pre}</p>
            <ul className="space-y-1.5 list-none">
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>{s.s6L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>{s.s6L2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>{s.s6L3}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 mt-1">✕</span>
                <span>{s.s6L4}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s7Title}</h2>
            <p>{s.s7Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s8Title}</h2>
            <p>{s.s8Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s9Title}</h2>
            <p>{s.s9Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s10Title}</h2>
            <p>{s.s10Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s11Title}</h2>
            <p>
              {s.s11Desc}
              <a href="mailto:vibecheckr.app@gmail.com" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">
                vibecheckr.app@gmail.com
              </a>
            </p>
          </section>
        </div>

      </div>
      <SeoFooter />
    </div>
  );
}
