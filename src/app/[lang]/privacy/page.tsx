import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import SeoFooter from "@/components/SeoFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "VibeCheckr Privacy Policy — Learn how we collect, use, and protect your personal data. Your privacy matters to us.",
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/privacy",
  },
};

const privacyData = {
  en: {
    back: "Back to App",
    title: "Privacy Policy",
    updated: "Last updated: May 1, 2026",
    s1Title: "1. Introduction",
    s1Desc: "VibeCheckr (\"we,\" \"us,\" or \"the App\") respects your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using the App, you consent to the practices described below.",
    s2Title: "2. Information We Collect",
    s2_1Title: "2.1 Information You Provide",
    s2_1L1: "We use Google Authentication for sign-in. We collect and store your Email address, Name, Profile Photo, and a unique User ID (UID). This allows us to maintain your account, track your token balance, and provide features like Daily Vibe and Duo.",
    s2_1L2: "Optional input used to tailor and personalize AI-generated entertainment content.",
    s2_1L3: "If you choose to upload a photo or chat screenshot for analysis, the image is processed temporarily by the AI and is ",
    s2_2Title: "2.2 Automatically Collected Data (Limited)",
    s2_2L1: "We use Firebase App Check (which may include reCAPTCHA) to protect our backend from abuse and verify legitimate traffic.",
    s2_2L2: "If you opt in to push notifications, your device token is stored to deliver notifications.",
    s2_2L3: "We may use Firebase Analytics to collect anonymized usage statistics (e.g., feature popularity, crashes) to improve the App.",
    s3Title: "3. Photos, Chat Screenshots & AI Training",
    s3Warn: "🔒 We do <strong>NOT</strong> store, sell, share, or use your photos or chat screenshots for any purpose beyond the immediate AI analysis you request. <strong>Your data is NEVER used to train AI models.</strong>",
    s3Desc: "Photos or chat screenshots uploaded for personality analysis or Reply Guru are processed in real-time by our AI models and are discarded immediately after the analysis is generated. We do not retain copies of your images on any server. We never sell or share your images with third parties, advertisers, or data brokers. When uploading chat screenshots, you should ensure you do not include sensitive Personal Identifiable Information (PII) of third parties without consent.",
    s4Title: "4. How We Use Your Data",
    s4L1: "To provide core features like Daily Vibe, Duo, Aura Battle, Digital Gossip, and to generate personalized personality analyses or chat reply suggestions.",
    s4L2: "To manage your account, token (credit) balance, and VIP Pass status.",
    s4L3: "To secure our application and verify authentic traffic using Firebase App Check.",
    s4L4: "To send push notifications (only with your explicit consent).",
    s4L5: "To process payments securely via our payment providers (Polar for web, App Stores for mobile).",
    s5Title: "5. Third-Party Services",
    s5Pre: "We integrate the following trusted third-party services:",
    s5S1: "Authentication (Google Auth), database (Firestore), App Check, Analytics, and push notifications",
    s5S2: "AI-powered entertainment and personality analysis",
    s5S3: "Secure payment processing and checkout management for web platforms",
    s5S4: "In-app purchase management for mobile platforms (App Store / Google Play)",
    s5Post: "Each service has its own privacy policy. We encourage you to review them independently. We do NOT sell any of your personal data to third parties. Please note that data may be transferred to and processed in servers located outside of your country (e.g., the United States).",
    s6Title: "6. Data Retention",
    s6L1: "Analysis history is stored in your Firestore user document for your reference.",
    s6L2: "Photos are <strong>never</strong> permanently stored.",
    s6L3: "You may request deletion of all your data by contacting us.",
    s7Title: "7. Children's Privacy",
    s7Desc: "VibeCheckr is not intended for children under the age of 13 (or the minimum age required in your jurisdiction). We do not knowingly collect personal information from children. If we discover that a child has provided us with personal information, we will delete it promptly.",
    s8Title: "8. Your Rights",
    s8Pre: "Depending on your jurisdiction, you may have the right to:",
    s8L1: "Access the personal data we hold about you.",
    s8L2: "Request correction or deletion of your data.",
    s8L3: "Withdraw consent for push notifications at any time.",
    s8L4: "Lodge a complaint with a data protection authority.",
    s9Title: "9. Security",
    s9Desc: "We use industry-standard security measures including encrypted communications (HTTPS/TLS), Firebase security rules, and server-side authentication to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.",
    s10Title: "10. Changes to This Policy",
    s10Desc: "We may update this Privacy Policy periodically. We will notify you of significant changes through the App. Continued use after changes constitutes acceptance.",
    s11Title: "11. Contact Us",
    s11Desc: "For privacy-related inquiries, data deletion requests, or concerns, contact us at "
  },
  tr: {
    back: "Uygulamaya Dön",
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: 1 Mayıs 2026",
    s1Title: "1. Giriş",
    s1Desc: "VibeCheckr (\"biz\" veya \"Uygulama\") gizliliğine gerçekten önem verir. Bu Gizlilik Politikası, senden hangi bilgileri aldığımızı, bunları ne yaptığımızı ve senin bu konudaki haklarını anlatır. Uygulamayı kullanıyorsan, buradaki kuralları kabul etmiş sayılırsın.",
    s2Title: "2. Hangi Bilgileri Topluyoruz?",
    s2_1Title: "2.1 Senin Bize Verdiklerin",
    s2_1L1: "Giriş yapmak için Google kullanıyoruz. E-posta adresini, adını, profil fotoğrafını ve sana özel bir kullanıcı kimliğini (UID) kaydediyoruz. Bu sayede hesabını yönetebiliyor, token bakiyeni tutabiliyor ve Daily Vibe, Duo gibi özellikleri sana sunabiliyoruz.",
    s2_1L2: "Yapay zeka analizlerini sana özel hale getirmek için girdiğin burç, yaş veya ilişki durumu gibi ekstra bilgiler.",
    s2_1L3: "Analiz veya mesaj önerisi için bir fotoğraf ya da yazışma ekran görüntüsü yüklersen, bu görsel yapay zeka tarafından anlık olarak işlenir ve ",
    s2_2Title: "2.2 Otomatik Toplananlar (Sadece Gerekli Olanlar)",
    s2_2L1: "Sistemimizi botlardan ve kötü niyetli kullanımlardan korumak için Firebase App Check (reCAPTCHA dahil olabilir) kullanıyoruz.",
    s2_2L2: "Bildirimlere izin verirsen, sana bildirim gönderebilmek için cihaz token'ını kaydediyoruz.",
    s2_2L3: "Uygulamayı daha iyi hale getirmek için Firebase Analytics ile kimin neyi ne kadar kullandığına veya uygulamanın nerede çöktüğüne dair anonim (kimliğin belirsiz) istatistikler toplayabiliriz.",
    s3Title: "3. Fotoğraflar, Ekran Görüntüleri ve Yapay Zeka Eğitimi",
    s3Warn: "🔒 Fotoğraflarını veya sohbet ekran görüntülerini analiz bittikten sonra ASLA saklamayız, satmayız veya başka hiçbir amaçla kullanmayız. <strong>Verilerin ASLA yapay zeka modellerini eğitmek için kullanılmaz.</strong>",
    s3Desc: "Kişilik analizi veya Reply Guru için yüklediğin fotoğraflar/yazışma ekran görüntüleri, yapay zeka modellerimiz tarafından o an işlenir ve sonuç çıkar çıkmaz anında kalıcı olarak silinir. Sunucularımızda görsellerinin bir kopyasını tutmuyoruz. Lütfen başkalarına ait ekran görüntülerini yüklerken, o kişilerin hassas kişisel verilerini (telefon, açık isim vb.) içermemesine dikkat et.",
    s4Title: "4. Verilerini Ne İçin Kullanıyoruz?",
    s4L1: "Daily Vibe, Duo, Aura Battle ve Digital Gossip gibi özellikleri çalıştırmak, sana özel analizler ve mesaj cevap önerileri (Reply Guru) üretmek için.",
    s4L2: "Hesabını, token (kredi) bakiyeni ve VIP Pass durumunu yönetmek için.",
    s4L3: "Uygulamayı güvende tutmak ve sahte trafiği engellemek için.",
    s4L4: "Sana bildirim göndermek için (tabii ki sadece sen izin verirsen).",
    s4L5: "Ödeme altyapılarımız üzerinden güvenli bir şekilde alışveriş yapabilmen için.",
    s5Title: "5. Kullandığımız Üçüncü Taraf Araçları",
    s5Pre: "Uygulamanın çalışması için şu güvenilir servisleri kullanıyoruz:",
    s5S1: "Kimlik doğrulama ve veritabanı: Firebase & Google Cloud",
    s5S2: "Eğlence ve kişilik analizleri: Google Gemini AI",
    s5S3: "Web üzerinden ödemeler: Polar",
    s5S4: "Mobil cihazlardan (App Store / Google Play) uygulama içi satın alımlar: RevenueCat",
    s5Post: "Bu servislerin kendi gizlilik politikaları vardır, istersen onların sitelerinden detaylıca inceleyebilirsin. Kişisel verilerini (isim, e-posta vb.) ASLA üçüncü şahıslara veya reklamcılara satmıyoruz. Hizmet altyapımız gereği verilerin bulunduğun ülke dışındaki (örn. ABD) sunuculara aktarılabilir ve orada işlenebilir.",
    s6Title: "6. Verilerin Ne Kadar Süre Saklanır?",
    s6L1: "Analiz geçmişin, daha sonra dönüp bakabilmen için hesabında tutulur.",
    s6L2: "Fotoğraflar <strong>asla</strong> kalıcı olarak saklanmaz.",
    s6L3: "İstediğin an bizimle iletişime geçip tüm verilerinin kalıcı olarak silinmesini talep edebilirsin.",
    s7Title: "7. Çocukların Gizliliği",
    s7Desc: "VibeCheckr 13 yaşından (veya ülkendeki yasal yaş sınırından) küçükler için tasarlanmamıştır. Çocuklardan bilerek veri toplamıyoruz. Eğer bir çocuğun bize bilgi verdiğini fark edersek, o verileri anında sileriz.",
    s8Title: "8. Senin Hakların",
    s8Pre: "Kullanıcı olarak şu haklara sahipsin:",
    s8L1: "Senin hakkındaki hangi verileri tuttuğumuzu öğrenmek.",
    s8L2: "Bilgilerinin düzeltilmesini veya tamamen silinmesini istemek.",
    s8L3: "Bildirim izinlerini istediğin zaman ayarlardan kapatmak.",
    s8L4: "Veri koruma kurulları veya yetkili mercilere şikayette bulunmak.",
    s9Title: "9. Güvenlik",
    s9Desc: "Verilerini korumak için HTTPS/TLS şifrelemesi, Firebase güvenlik kuralları gibi endüstri standartlarında önlemler alıyoruz. Ancak internet üzerindeki hiçbir sistem %100 hacklenemez değildir, bu yüzden mutlak bir garanti veremeyiz.",
    s10Title: "10. Politikadaki Değişiklikler",
    s10Desc: "Bu politikayı zaman zaman güncelleyebiliriz. Büyük bir değişiklik yaparsak sana uygulama içinden haber veririz. Değişiklikten sonra uygulamayı kullanmaya devam edersen, yeni şartları kabul etmiş olursun.",
    s11Title: "11. Bize Ulaş",
    s11Desc: "Gizlilikle ilgili aklına takılan bir şey olursa veya verilerinin silinmesini istiyorsan, bize buradan yazabilirsin: "
  }
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const isTr = resolvedParams.lang === "tr";
  const s = isTr ? privacyData.tr : privacyData.en;

  return (
    <div className="min-h-dvh bg-[#050510] text-white">
      {/* ─── Background Glow ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-600/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px]" />
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
              background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
            }}
          >
            <Shield className="h-5 w-5 text-cyan-400" />
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
            
            <h3 className="text-[15px] font-medium text-white/80 mt-4 mb-2">{s.s2_1Title}</h3>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-white/90">Authentication & Profile Data:</strong> {s.s2_1L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-white/90">Zodiac Sign, Age & Relationship Status:</strong> {s.s2_1L2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-white/90">Photos:</strong> {s.s2_1L3}<strong>not stored permanently on our servers</strong>.</span>
              </li>
            </ul>

            <h3 className="text-[15px] font-medium text-white/80 mt-4 mb-2">{s.s2_2Title}</h3>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-white/90">Security Data (Firebase App Check):</strong> {s.s2_2L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-white/90">Device FCM Token:</strong> {s.s2_2L2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-white/90">Usage Analytics:</strong> {s.s2_2L3}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s3Title}</h2>
            <div
              className="p-4 rounded-2xl border mb-4"
              style={{
                background: "rgba(6,182,212,0.08)",
                borderColor: "rgba(6,182,212,0.2)",
              }}
            >
              <p className="text-cyan-300 font-medium text-sm">
                <span dangerouslySetInnerHTML={{ __html: s.s3Warn }} />
              </p>
            </div>
            <p>{s.s3Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s4Title}</h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>{s.s4L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>{s.s4L2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>{s.s4L3}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>{s.s4L4}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>{s.s4L5}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s5Title}</h2>
            <p className="mb-3">{s.s5Pre}</p>
            <div className="grid gap-3">
              {[
                { name: "Firebase (Google)", desc: s.s5S1 },
                { name: "Google Gemini AI", desc: s.s5S2 },
                { name: "Polar", desc: s.s5S3 },
                { name: "RevenueCat", desc: s.s5S4 },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex items-start gap-3 p-3 rounded-xl border"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white/80">{service.name}</p>
                    <p className="text-xs text-white/40">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">{s.s5Post}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s6Title}</h2>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{s.s6L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: s.s6L2 }} />
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{s.s6L3}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s7Title}</h2>
            <p>{s.s7Desc}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white/90 mb-3">{s.s8Title}</h2>
            <p className="mb-2">{s.s8Pre}</p>
            <ul className="space-y-1.5 list-none">
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>{s.s8L1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>{s.s8L2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>{s.s8L3}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>{s.s8L4}</span>
              </li>
            </ul>
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
              <a href="mailto:vibecheckr.app@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
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
