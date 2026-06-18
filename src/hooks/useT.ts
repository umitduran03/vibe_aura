/**
 * useT — Merkezi client-side çeviri hook'u
 * Zustand store'dan locale okur, tüm UI metinlerini döner.
 * Hiçbir harici kütüphane gerektirmez.
 */
"use client";

import { useAppStore } from "@/store/useAppStore";

// ─────────────────────────────────────────────────────────────────────────────
// TÜM UI STRİNGLERİ
// ─────────────────────────────────────────────────────────────────────────────
const STRINGS = {
  en: {
    // ModeSelector
    modeTitle: "How should we analyze? ✨",
    modeSolo: "Solo",
    modeSoloSub: "Discover your vibe",
    modeDuo: "Duo Match",
    modeDuoSub: "Decode your chemistry",

    // PremiumExtras
    crisisCenter: "Crisis Center",
    crisisSub: "Decoding the drama and serving brutally honest reality checks. No cap.",

    // SoloScenarioSelector
    analysisType: "Analysis Type",
    scenarioGeneral: "General Vibe",
    scenarioRoast: "Roast Me",
    scenarioSoulmate: "Soulmate",

    // DailyVibeBanner
    dailyVibe: "Daily Vibe ⚡",
    dailyLoading: "Generating your vibe...",
    dailyPreparingShare: "Preparing your vibe... ✨",
    dailyMissingZodiac: "I can't read your daily vibe if I don't know your sign. Please set your Zodiac sign in Settings first. ✦",
    dailySetZodiac: "Set your Zodiac Sign",
    dailyError: "The sky is a bit cloudy, couldn't read your vibe. Maybe try again later.",

    // AnalyzingScreen
    analyzingTitle: "Reading your energy...",
    analyzingSubtitle: "Our AI is scanning your vibe. This takes a few seconds.",
    analyzingFact1: "Your aura color shifts based on your zodiac and current energy ✨",
    analyzingFact2: "Gen-Z vibes are 73% more chaotic than any other generation 💀",
    analyzingFact3: "Your vibe is being compared to 1,000+ personality archetypes 🧬",
    analyzingFact4: "The algorithm is judging your choices... and it's not impressed 😤",
    analyzingFact5: "Detecting main character energy levels... stand by 🎬",

    // PhotoUpload
    photoTitle: "Add a Photo",
    photoSubtitle: "Optional but gives much better results",
    photoTap: "Tap to upload a photo",
    photoHint: "JPG, PNG, HEIC · Max 10 MB",
    photoChange: "Change Photo",
    photoRemove: "Remove",
    photoAnalyzing: "Analyzing vibe...",
    photoLabel: "Photo",
    photoChoose: "Choose Photo",
    photoCamera: "Take a Selfie 📸",
    photoGallery: "Upload from Gallery 🖼️",

    // AgeZodiacStep
    ageLabel: "Your Age",
    agePlaceholder: "e.g. 23",
    zodiacLabel: "Your Zodiac Sign",
    zodiacPlaceholder: "Select your sign",

    // RelationshipStep
    relationshipTitle: "Relationship Status",
    relationshipSubtitle: "We aren't judging... much",
    relSingleThriving: "Single & Thriving",
    relToxicLoop: "In a Toxic Loop",
    relTalkingStage: "Talking Stage / Complicated",
    relTaken: "Taken (Reserved)",
    relDone: "Done with Love",

    // MagicQuestionStep
    magicTitle: "One Last Thing...",
    magicPlaceholder: "e.g. I overthink everything...",
    magicHint: "Optional — but the more you share, the more savage the result.",

    // OnboardingScreen (Landing/Auth)
    onboardingTagline: "Discover your energy ✨",
    onboardingSignUp: "Sign Up",
    onboardingLogIn: "Log In",
    onboardingLegalTitle: "Before We Read Your Aura...",
    onboardingLegalSubtitle: "VibeCheckr is an entertainment app. Our AI readings are for fun.",
    onboardingLegalPoint1: "All readings are for entertainment only",
    onboardingLegalPoint2: "We never store or sell your photos",
    onboardingLegalPoint3: "AI results may be inaccurate or fictional",
    onboardingLegalPoint4: "Digital purchases are non-refundable",
    onboardingTermsLink: "Terms of Service",
    onboardingPrivacyLink: "Privacy Policy",
    onboardingCheckbox: "I accept the Terms of Service and Privacy Policy.",
    onboardingAcceptBtn: "Accept & Continue",
    onboardingGoogleBtn: "Accept & Sign Up with Google",
    onboardingConnecting: "Connecting...",
    onboardingWait: "Just a second...",
    onboardingBack: "← Back",
    onboardingDomainError: "Domain verification failed. Please try again. ✨",
    onboardingGenericError: "Connection interrupted. Please try again. ✨",
    onboardingLoginTitle: "Welcome Back ✨",
    onboardingLoginSubtitle: "Sign in to continue your journey",
    onboardingLoginBtn: "Continue with Google",

    // OnboardingBanner
    onboardingTitle: "Welcome to VibeCheckr ✨",
    onboardingSubtitle: "Your AI-powered vibe reader",
    onboardingBannerTeaser: "Before we start, let's clear a few things up... ✨",
    onboardingBannerTapFull: "Tap to complete your profile",
    onboardingBannerTapShort: "Tap",
    onboardingBannerExpandedTitle: "Before we start, let's clear a few things up...",
    onboardingBannerExpandedSub: "We wouldn't want any accidents during the analysis, right? 😅",
    onboardingBannerStep1Title: "I am a...",
    onboardingBannerGuy: "Guy 🧢",
    onboardingBannerGirl: "Girl 💅",
    onboardingBannerIcon: "Icon ✨",
    onboardingBannerStep2Title: "I usually overanalyze...",
    onboardingBannerGuys: "Guys 🚩",
    onboardingBannerGirls: "Girls ☕",
    onboardingBannerEveryone: "Everyone 🍿",

    // AnalyzingScreen
    analyzingToxicEx: ["SCANNING TOXICITY...", "REVIEWING MISTAKES...", "JUDGING LIFE CHOICES...", "FINDING RED FLAGS...", "PREPARING REALITY CHECK..."],
    analyzingSituationship: ["ANALYZING CONFUSION...", "DECODING MIXED SIGNALS...", "MEASURING COMMITMENT...", "CHECKING REALITY...", "SPITTING HARSH TRUTHS..."],
    analyzingMoodReset: ["SCANNING ENERGY LEVELS...", "PURGING BAD VIBES...", "CALCULATING AURA SHIFT...", "PREPARING WAKE UP CALL...", "RECHARGING THE VIBE..."],
    analyzingDeluluCheck: ["MEASURING DELUSION...", "ANALYZING RECEIPTS...", "IGNORING FAKE HOPES...", "CALCULATING REALITY...", "PREPARING BRUTAL TRUTH..."],
    analyzingRizzArchitect: ["ANALYZING MIND GAMES...", "SCANNING THE CHAT...", "CALCULATING POWER MOVE...", "CRAFTING THE TRAP...", "GENERATING RIZZ..."],
    analyzingDuoFlirt: ["SCANNING CHEMISTRY...", "MEASURING THE SPARK...", "COMPARING ZODIACS...", "CHECKING LONG-TERM ODDS...", "CALCULATING LOVE SCORE..."],
    analyzingDuoEx: ["SCANNING THE DAMAGE...", "FINDING WHO WAS TOXIC...", "ANALYZING THE BREAKUP...", "CHECKING REMAINING FEELINGS...", "PREPARING BRUTAL TRUTH..."],
    analyzingDuoPlatonic: ["ANALYZING THE TENSION...", "MEASURING FRIENDZONE RISK...", "DECODING HIDDEN FEELINGS...", "CHECKING COMPATIBILITY...", "CALCULATING CRUSH ODDS..."],
    analyzingDuoBff: ["SCANNING CHAOS LEVELS...", "CHECKING PLATONIC VIBES...", "MEASURING LOYALTY...", "ANALYZING YOUR DYNAMICS...", "CALCULATING BFF SCORE..."],
    analyzingSoloRoast: ["JUDGING YOUR SELFIE...", "FINDING YOUR FLAWS...", "QUESTIONING YOUR CHOICES...", "ACTIVATING SAVAGE MODE...", "PREPARING BRUTAL ROAST..."],
    analyzingSoloSoulmate: ["SCANNING ROMANTIC AURA...", "CALCULATING RIZZ LEVEL...", "SEARCHING FOR MATCHES...", "ANALYZING LOVE POTENTIAL...", "PREPARING SOULMATE PROFILE..."],
    analyzingGeneral: ["SCANNING VIBE FREQUENCY...", "EXTRACTING AURA DATA...", "READING YOUR ENERGY...", "DECODING PERSONALITY...", "FINALIZING VIBE CHECK..."],

    // WizardFlow (already done via WIZARD_STRINGS but keep here for consistency)
    continue: "Continue",
    back: "Back",
    loading: "Loading...",
    analyzeSolo: "Analyze My Vibe",
    analyzeDuo: "Analyze Duo Vibe",
    skip: "Skip, show me the results",

    // DuoStep
    duoP1Title: "Person 1",
    duoP2Title: "Person 2",
    duoP1ZodiacTitle: "PERSON 1 - ZODIAC",
    duoP2ZodiacTitle: "PERSON 2 - ZODIAC",
    duoRelation: "Relationship Type",
    duoFlirt: "Flirt / Lovers",
    duoEx: "Ex-Lovers",
    duoPlatonic: "Platonic / Crush",
    duoBff: "BFF / Partner in Crime",

    // ResultCard generic
    shareResult: "Share",
    downloadResult: "Save",
    tryAgain: "Try Again",
    unlockFull: "Unlock Full Analysis",
    copyLink: "Copy Link",
    copied: "Copied!",

    // SettingsDrawer
    settings: "Settings",
    settingsProfile: "Profile",
    settingsZodiac: "Zodiac Sign",
    settingsLanguage: "Language",
    settingsLogout: "Log Out",
    settingsTokens: "Tokens",
    settingsVipMember: "VIP Member",
    settingsFreeAccount: "Free Account",
    settingsNoSign: "No Sign",
    settingsTokensRemaining: "remaining",
    settingsResources: "Resources",
    settingsTrends: "Trends & Articles",
    settingsTrendsSub: "Dating psychology & viral trends",
    settingsDict: "Vibe Dictionary",
    settingsDictSub: "Gen-Z slang & astrology terms",
    settingsFaq: "FAQ",
    settingsFaqSub: "Frequently Asked Questions",
    settingsLegal: "Legal",
    settingsTerms: "Terms of Service",
    settingsTermsSub: "Rules of the digital experience",
    settingsPrivacy: "Privacy Policy",
    settingsPrivacySub: "How we protect your data",
    settingsApp: "App",
    settingsInstall: "Install VibeCheckr",
    settingsAddHome: "Add to Home Screen 📱",
    settingsVersion: "Version",
    settingsMadeWith: "Made with 💜 by VibeCheckr.",
    settingsCopyright: "© {year} All rights reserved.",
    settingsForEntertainment: "🎭 For Entertainment Purposes Only",

    // ResultCard
    resultYourVibe: "Your Vibe",
    resultVibeScore: "Vibe Score",
    resultUnlock: "Unlock Full Analysis",
    resultPreparing: "Preparing...",
    resultDownloading: "Downloading...",
    resultShare: "Share (+2 Tokens 🚀)",
    resultTryAgain: "Try Again",
    resultShareSuccess: "Main Character Energy! 🔥 +2 Tokens added.",
    resultShareError: "Who are you kidding? You didn't even share it yet! 🤨 No tokens for you.",
    resultShareTitle: "{name} — VibeCheckr",
    resultShareText: "My vibe score: {score}/100 💜\nTry it yourself! 👀 👉 https://thevibecheckr.vercel.app",
    resultDuoSoulmate: "Duo Soulmate",
    resultRedFlag: "Red Flag",
    resultDuoShareText: "Duo Vibe Score: {score}/100 💔\nTry it yourself! 👀 👉 https://thevibecheckr.vercel.app",
    deluluGrounded: "Grounded Queen 👑",
    deluluSlight: "Slightly Delusional 🤔",
    deluluCopium: "Copium Overdose 💨",
    deluluFull: "Full Delulu Mode 🤡",
    deluluClinical: "Clinically Delulu 🚨",
    deluluLabel: "Delulu",
    vibeCheckLabel: "Vibe Check",
    roastLabel: "Draft Roast",
    guruRepliesLabel: "GURU'S REPLIES",

    // TokenModal
    tokenModalWatchToEarn: "Watch to Earn",
    tokenModalOut: "Out of Vibe Tokens",
    tokenModalRefillDesc: "Refill your tokens to analyze your vibe and decode your energy.",
    tokenModalGetTokens: "Get Tokens",
    tokenModalPackages: "Token Packages",
    tokenModalChooseDesc: "Choose the package that suits you best",
    tokenModalPopular: "Popular",
    tokenModalTokensLabel: "✦ {count} Tokens",
    tokenModalVipPass: "VIP Pass",
    tokenModalGoBack: "← Go back",
    tokenModalProcessing: "Processing payment...",
    tokenModalSecureConn: "Establishing secure connection",
    tokenModalSuccess: "Payment Successful!",
    tokenModalAdded: "✦ {count} tokens added to your account",
    tokenModalActivated: "✦ {count} activated!",
    tokenModalMobileTitle: "Full Experience is on Mobile! 🚀",
    tokenModalMobileDesc: "Watch ads to earn free tokens, access exclusive filters, and get instant notifications only on our mobile app.",
    tokenModalDownloadIos: "Download for iOS (Soon)",
    tokenModalDownloadAndroid: "Download for Android (Soon)",
    tokenModalMaybeLater: "Maybe later",
    tokenModalEntertainmentOnly: "🎭 For Entertainment Purposes Only",
    toastAdLoading: "📺 Loading ad... It will be active on the mobile version",
    toastAppSoon: "🚀 Our native mobile apps are dropping very soon! Stay tuned.",
    toastSignIn: "⚠️ Please sign in to make a purchase.",

    // ConsentModal
    consentTitle: "Before We Read Your Vibe...",
    consentDesc: "VibeCheckr is an entertainment app. Our AI readings are for fun — not professional advice. By continuing, you agree to our terms.",
    consentPoint1: "All readings are for entertainment only",
    consentPoint2: "We never store or sell your photos",
    consentPoint3: "AI results may be inaccurate or fictional",
    consentPoint4: "Digital purchases are non-refundable",
    consentTerms: "Terms of Service",
    consentPrivacy: "Privacy Policy",
    consentAcceptBtn: "Accept & Continue",
    consentCheckbox: "I accept the Terms of Service and Privacy Policy.",
    consentSubtext: "By tapping \"Accept & Continue,\" you acknowledge that you have read and agree to our Terms of Service and Privacy Policy.",

    // VibeDictionaryClient
    dictionarySearchPlaceholder: "Search for rizz, ghosting, aries...",
    dictionaryNoResults: "No vibes found for \"{query}\".",
    dictionaryTryAgain: "Try searching something else or check your spelling.",

    // StreakRecoveryModal
    streakRecoveryTokenError: "Not enough tokens. You need more tokens to recover this streak.",
    streakRecoveryGenericError: "An error occurred while recovering streak.",
    streakRecoveryTitle: "Streak Lost!",
    streakRecoveryDesc1: "You forgot to check your vibe yesterday and lost your",
    streakRecoveryDay: "Day",
    streakRecoveryDesc2: "streak.",
    streakRecoveryYouWereA: "You were a",
    streakRecoveryDonNotLose: "Don't lose your rank! Recover it now for:",
    streakRecoveryCost: "🪙 {tokens} Tokens",
    streakRecoveryButton: "Recover My Streak",
    streakRecoveryDecline: "No, let me start from Day 1",

    // StreakInfoModal
    streakInfoTitle: "Aura Rank Progression",
    streakInfoDesc: "Build your streak by checking your vibe every day. As your streak grows, your rank evolves. Miss a day, and you'll fall back to NPC status!",
    streakInfoCurrentStreak: "Current Streak",
    streakInfoDay: "Day",
    streakInfoDays: "Days",
    streakInfoRank: "Rank",
    streakInfoNext: "Next:",
    streakInfoEvolutionPath: "Evolution Path",
    streakInfoYouAreHere: "You are here",
    streakInfoUnlocked: "Unlocked",
    streakInfoLocked: "Locked",

    // ExtrasModal & Showcase
    extrasShowcaseTitle: "Crisis Center 🔍",
    extrasShowcaseDesc: "Decoding the drama and serving brutally honest reality checks. No cap.",
    extrasModalOr: "or",
    extrasModalUploading: "Uploading...",
    extrasModalUploadScreenshot: "Upload Screenshot",
    extrasModalAddImage: "+ Add Image ({count}/{max})",
    extrasModalSelect: "Select...",
    extrasModalPhotoAdded: "Photo Added ✓",
    extrasModalTapToUpload: "Tap to Upload",
    extrasModalGetTokens: "Get Tokens to Unlock",
    extrasModalLetsGo: "Let's Go",

    extrasToxicTitle: "Toxic Ex Scanner",
    extrasToxicDesc: "Should you text them? Get a savage red flag scan before you do something stupid.",
    extrasSitTitle: "Situationship Clarifier",
    extrasSitDesc: "Decoding the 'What are we?' mystery. Brutal compatibility stats included.",
    extrasMoodTitle: "Mood Reset",
    extrasMoodDesc: "Bad day? Get a brutally honest wake-up call to fix your mood and recharge your vibe.",
    extrasDeluluTitle: "Delulu Check",
    extrasDeluluDesc: "Mixed signals? Drop the receipts (max 3 screenshots) or paste the chat. Get an unfiltered reality check before you double text.",
    extrasRizzTitle: "The Reply Guru",
    extrasRizzDesc: "Mind games? Won. Drop the screenshot and let me craft the perfect toxic, cool, or safe reply.",

    comingSoon: "Coming Soon",
    tokenInsufficient: "Not enough tokens! 💎",
    serverBusy: "Servers are busy. Please try again! ✨",

    // SplashScreen
    splashAnalyzing: "INITIATING VIBE CHECK...",

    // MagicQuestionStep
    magicWordCount: "Optional — you can leave it blank",
    magicQuote: "\"The more the details, the sharper the roast\"",

    // InstallBanner
    installTitle: "Install VibeCheckr. 🚀",
    installSub: "Add to home screen for native experience.",
    installBtn: "Install",

    // OfflineBanner
    offlineMsg: "Vibe signal lost, check your internet connection 🛸",

    // NotificationPrompt
    notifTitle: "Digital Gossip",
    notifDesc: "The algorithm is going to text you! Sometimes a vibe check, sometimes a roast. Are you ready to hear your red flags and vibe leaks?",
    notifDecline: "No Thanks, I'm Scared",
    notifAllow: "I'm Ready!",

    // History page
    historyHome: "Home",
    historyTitle: "PAST VIBES",
    historyTtl: "Vibes evolve. Your past analyses are permanently wiped from the digital void every 48 hours.",
    historyErrorTitle: "Connection Error",
    historyErrorDesc: "Your past vibes are ghosting you right now, check your internet connection bestie.",
    historyEmptyTitle: "A Clean Slate",
    historyEmptyDesc: "You haven't done any vibe analysis yet. Ready to get roasted?",
    historyEmptyCta: "Analyze My Vibe",
    historyExtrasLabel: "Extras Analysis",
    historyNamelessVibe: "Nameless Vibe",
    historyAnalysisComplete: "Analysis complete.",
    historyVerdict: "Verdict",
    historyShowLess: "Show Less",
    historyReadMore: "Read More",
    historyEnd: "End of history",
    historyUnknownDate: "Unknown Date",

    // Language selector
    langSelectorTitle: "Language",
    langEn: "English",
    langTr: "Türkçe",

    toastWelcome: "5 Welcome Tokens Added! 🎁",
    toastTokenInsufficient: "Not enough tokens for this analysis! 💎",
    toastServerBusy: "Servers are busy. Please try again! ✨",

    // PaymentSuccessPage
    paymentSuccessTitle: "Payment Successful! ✨",
    paymentSuccessDesc: "Your tokens have been added to your account.",
    paymentSuccessStatusTitle: "Status",
    paymentSuccessStatusDesc: "Your balance has been updated successfully.",
    paymentSuccessButton: "Start Analyzing Now",
  },

  tr: {
    // ModeSelector
    modeTitle: "Nasıl analiz edelim? ✨",
    modeSolo: "Solo",
    modeSoloSub: "Kendi vibe'ını keşfet",
    modeDuo: "İkili Eşleşme",
    modeDuoSub: "Kimyanızı çöz",

    // PremiumExtras
    crisisCenter: "Kriz Merkezi",
    crisisSub: "Dramayı çözüp acımasızca dürüst gerçekleri yüzüne vuruyoruz. Yalan yok.",

    // SoloScenarioSelector
    analysisType: "Analiz Türü",
    scenarioGeneral: "Genel Vibe",
    scenarioRoast: "Beni Göm",
    scenarioSoulmate: "Ruh Eşim",

    // DailyVibeBanner
    dailyVibe: "Günlük Vibe ⚡",
    dailyLoading: "Günlük vibe'ın hesaplanıyor...",
    dailyPreparingShare: "Paylaşım hazırlanıyor... ✨",
    dailyMissingZodiac: "Burcunu bilmeden günlük vibe'ını okuyamam. Lütfen önce Ayarlar'dan burcunu gir. ✦",
    dailySetZodiac: "Burcunu Ayarla",
    dailyError: "Hava biraz kapalı, vibe'ın okunmadı. Biraz sonra tekrar dene.",

    // AnalyzingScreen
    analyzingTitle: "Enerjin okunuyor...",
    analyzingSubtitle: "YZ vibe'ını tarıyor. Bu birkaç saniye sürer.",
    analyzingFact1: "Aura rengin burcuna ve mevcut enerjine göre şekilleniyor ✨",
    analyzingFact2: "Gen-Z vibe'ları diğer nesillerden %73 daha kaotik 💀",
    analyzingFact3: "Vibe'ın 1.000'den fazla kişilik arketipiyle karşılaştırılıyor 🧬",
    analyzingFact4: "Algoritma seçimlerini yargılıyor... ve hiç etkilenmedi 😤",
    analyzingFact5: "Ana karakter enerji seviyen ölçülüyor... hazır ol 🎬",

    // PhotoUpload
    photoTitle: "Fotoğraf Ekle",
    photoSubtitle: "Opsiyonel ama sonucu ciddi iyileştirir",
    photoTap: "Fotoğraf yüklemek için dokun",
    photoHint: "JPG, PNG, HEIC · Maks 10 MB",
    photoChange: "Fotoğrafı Değiştir",
    photoRemove: "Kaldır",
    photoAnalyzing: "Vibe analiz ediliyor...",
    photoLabel: "Foto",
    photoChoose: "Fotoğraf Seç",
    photoCamera: "Selfie Çek 📸",
    photoGallery: "Galeriden Yükle 🖼️",

    // AgeZodiacStep
    ageLabel: "Yaşın",
    agePlaceholder: "örn. 23",
    zodiacLabel: "Burcun",
    zodiacPlaceholder: "Burcu seç",

    // RelationshipStep
    relationshipTitle: "İlişki Durumu",
    relationshipSubtitle: "Yargılamıyoruz... çok da değil",
    relSingleThriving: "Bekar & Keyfi Yerinde",
    relToxicLoop: "Toksik Döngüde",
    relTalkingStage: "Flörtöz / Karışık",
    relTaken: "Sahipli (Rezerve)",
    relDone: "Aşka Tövbe Etmiş",

    // MagicQuestionStep
    magicTitle: "Son Bir Şey...",
    magicPlaceholder: "örn. Her şeyi fazla düşünürüm...",
    magicHint: "Opsiyonel — ne kadar çok dökülürsen, roast o kadar yakıcı çıkar.",

    // OnboardingScreen (Landing/Auth)
    onboardingTagline: "Enerjini keşfet ✨",
    onboardingSignUp: "Kayıt Ol",
    onboardingLogIn: "Giriş Yap",
    onboardingLegalTitle: "Auranı Okumadan Önce...",
    onboardingLegalSubtitle: "VibeCheckr bir eğlence uygulamasıdır. Yapay zeka yorumlarımız saf eğlence içindir.",
    onboardingLegalPoint1: "Tüm okumalar yalnızca eğlence amacıyla yapılır",
    onboardingLegalPoint2: "Fotoğraflarını asla saklamıyor veya satmıyoruz",
    onboardingLegalPoint3: "Yapay zeka sonuçları yanlış veya kurgusal olabilir",
    onboardingLegalPoint4: "Dijital satın alımlar iade edilemez",
    onboardingTermsLink: "Kullanım Koşulları",
    onboardingPrivacyLink: "Gizlilik Politikası",
    onboardingCheckbox: "Kullanım Koşullarını ve Gizlilik Politikasını kabul ediyorum.",
    onboardingAcceptBtn: "Kabul Et & Devam",
    onboardingGoogleBtn: "Kabul Et & Google ile Kayıt Ol",
    onboardingConnecting: "Bağlanıyor...",
    onboardingWait: "Bir saniye...",
    onboardingBack: "← Geri",
    onboardingDomainError: "Alan adı doğrulaması başarısız. Lütfen tekrar deneyin. ✨",
    onboardingGenericError: "Bağlantı kesildi. Lütfen tekrar deneyin. ✨",
    onboardingLoginTitle: "Tekrar Hoş Geldin ✨",
    onboardingLoginSubtitle: "Yolculuğuna devam etmek için giriş yap",
    onboardingLoginBtn: "Google ile Devam Et",

    // OnboardingBanner
    onboardingTitle: "VibeCheckr'a Hoş Geldin ✨",
    onboardingSubtitle: "Yapay zeka destekli vibe okuyucun",
    onboardingBannerTeaser: "Başlamadan önce birkaç şeyi netleştirelim... ✨",
    onboardingBannerTapFull: "Profilini tamamlamak için dokun",
    onboardingBannerTapShort: "Dokun",
    onboardingBannerExpandedTitle: "Başlamadan önce birkaç şeyi netleştirelim...",
    onboardingBannerExpandedSub: "Analiz sırasında kaza çıkmasını istemeyiz, değil mi? 😅",
    onboardingBannerStep1Title: "Cinsiyetim...",
    onboardingBannerGuy: "Erkek 🧢",
    onboardingBannerGirl: "Kadın 💅",
    onboardingBannerIcon: "İkon ✨",
    onboardingBannerStep2Title: "İlgimi çekenler...",
    onboardingBannerGuys: "Erkekler 🚩",
    onboardingBannerGirls: "Kadınlar ☕",
    onboardingBannerEveryone: "Farketmez 🍿",

    // AnalyzingScreen
    analyzingToxicEx: ["TOKSİSİTE TARANIYOR...", "HATALAR İNCELENİYOR...", "SEÇİMLER YARGILANIYOR...", "KIRMIZI BAYRAKLAR ARANIYOR...", "GERÇEKLİK KONTROLÜ HAZIRLANIYOR..."],
    analyzingSituationship: ["KAFA KARIŞIKLIĞI ANALİZ EDİLİYOR...", "KARIŞIK SİNYALLER ÇÖZÜLÜYOR...", "BAĞLILIK ÖLÇÜLÜYOR...", "GERÇEKLİK KONTROL EDİLİYOR...", "SERT GERÇEKLER GELİYOR..."],
    analyzingMoodReset: ["ENERJİ SEVİYELERİ TARANIYOR...", "KÖTÜ ENERJİ TEMİZLENİYOR...", "AURA DEĞİŞİMİ HESAPLANIYOR...", "UYANIŞ ÇAĞRISI HAZIRLANIYOR...", "VIBE YENİDEN YÜKLENİYOR..."],
    analyzingDeluluCheck: ["KAFADA KURMA SEVİYESİ ÖLÇÜLÜYOR...", "DELİLLER ANALİZ EDİLİYOR...", "SAHTE UMUTLAR GÖRMEZDEN GELİNİYOR...", "GERÇEKLİK HESAPLANIYOR...", "ACIMASIZ GERÇEKLER HAZIRLANIYOR..."],
    analyzingRizzArchitect: ["ZİHİN OYUNLARI ANALİZ EDİLİYOR...", "SOHBET TARANIYOR...", "GÜÇ HAMLESİ HESAPLANIYOR...", "TUZAK KURULUYOR...", "RIZZ ÜRETİLİYOR..."],
    analyzingDuoFlirt: ["KİMYA TARANIYOR...", "KIVILCIM ÖLÇÜLÜYOR...", "BURÇLAR KARŞILAŞTIRILIYOR...", "UZUN VADELİ ŞANS KONTROL EDİLİYOR...", "AŞK SKORU HESAPLANIYOR..."],
    analyzingDuoEx: ["HASAR TARANIYOR...", "KİMİN TOKSİK OLDUĞU BULUNUYOR...", "AYRILIK ANALİZ EDİLİYOR...", "KALAN HİSLER KONTROL EDİLİYOR...", "ACIMASIZ GERÇEKLER HAZIRLANIYOR..."],
    analyzingDuoPlatonic: ["ARADAKİ ÇEKİM ANALİZ EDİLİYOR...", "FRIEND ZONE RİSKİ ÖLÇÜLÜYOR...", "GİZLİ HİSLER ÇÖZÜLÜYOR...", "UYUMLULUK KONTROL EDİLİYOR...", "CRUSH ŞANSI HESAPLANIYOR..."],
    analyzingDuoBff: ["KAOS SEVİYESİ TARANIYOR...", "PLATONİK VİBE KONTROL EDİLİYOR...", "SADAKAT ÖLÇÜLÜYOR...", "DİNAMİKLER ANALİZ EDİLİYOR...", "EN YAKIN ARKADAŞ SKORU HESAPLANIYOR..."],
    analyzingSoloRoast: ["SELFİEN YARGILANIYOR...", "KUSURLARIN ARANIYOR...", "HAYAT SEÇİMLERİN SORGULANIYOR...", "SAVAGE MOD AKTİF...", "ACIMASIZ ROAST HAZIRLANIYOR..."],
    analyzingSoloSoulmate: ["ROMANTİK AURA TARANIYOR...", "RIZZ SEVİYESİ HESAPLANIYOR...", "EŞLEŞMELER ARANIYOR...", "AŞK POTANSİYELİ ANALİZ EDİLİYOR...", "RUH EŞİ PROFİLİ HAZIRLANIYOR..."],
    analyzingGeneral: ["VIBE FREKANSI TARANIYOR...", "AURA VERİSİ ÇIKARTILIYOR...", "ENERJİN OKUNUYOR...", "KİŞİLİK ÇÖZÜLÜYOR...", "VIBE KONTROLÜ TAMAMLANIYOR..."],

    // WizardFlow
    continue: "Devam Et",
    back: "Geri",
    loading: "Yükleniyor...",
    analyzeSolo: "Vibe'ımı Analiz Et",
    analyzeDuo: "İkili Vibe'ı Analiz Et",
    skip: "Geç, sonuçları göster",

    // DuoStep
    duoP1Title: "1. KİŞİ",
    duoP2Title: "2. KİŞİ",
    duoP1ZodiacTitle: "1. KİŞİNİN BURCU",
    duoP2ZodiacTitle: "2. KİŞİNİN BURCU",
    duoRelation: "İlişki Türü",
    duoFlirt: "Flört / Sevgili",
    duoEx: "Eski Sevgili",
    duoPlatonic: "Platonik / Crush",
    duoBff: "En Yakın Arkadaş",

    // ResultCard generic
    shareResult: "Paylaş",
    downloadResult: "Kaydet",
    tryAgain: "Tekrar Dene",
    unlockFull: "Tam Analizi Aç",
    copyLink: "Linki Kopyala",
    copied: "Kopyalandı!",

    // SettingsDrawer
    settings: "Ayarlar",
    settingsProfile: "Profil",
    settingsZodiac: "Burç",
    settingsLanguage: "Dil",
    settingsLogout: "Çıkış Yap",
    settingsTokens: "Jeton",
    settingsVipMember: "VIP Üye",
    settingsFreeAccount: "Ücretsiz Hesap",
    settingsNoSign: "Burç Yok",
    settingsTokensRemaining: "kaldı",
    settingsResources: "Kaynaklar",
    settingsTrends: "Trendler & Makaleler",
    settingsTrendsSub: "Flört psikolojisi & viral trendler",
    settingsDict: "Vibe Sözlüğü",
    settingsDictSub: "Gen-Z jargonu & astroloji terimleri",
    settingsFaq: "SSS",
    settingsFaqSub: "Sıkça Sorulan Sorular",
    settingsLegal: "Yasal",
    settingsTerms: "Kullanım Koşulları",
    settingsTermsSub: "Dijital deneyimin kuralları",
    settingsPrivacy: "Gizlilik Politikası",
    settingsPrivacySub: "Verilerini nasıl koruyoruz",
    settingsApp: "Uygulama",
    settingsInstall: "VibeCheckr'ı Yükle",
    settingsAddHome: "Ana Ekrana Ekle 📱",
    settingsVersion: "Sürüm",
    settingsMadeWith: "VibeCheckr tarafından 💜 ile yapıldı.",
    settingsCopyright: "© {year} Tüm hakları saklıdır.",
    settingsForEntertainment: "🎭 Sadece Eğlence Amaçlıdır",

    // ResultCard
    resultYourVibe: "Senin Vibe'ın",
    resultVibeScore: "Vibe Puanı",
    resultUnlock: "Tüm Analizi Aç",
    resultPreparing: "Hazırlanıyor...",
    resultDownloading: "İndiriliyor...",
    resultShare: "Paylaş (+2 Jeton 🚀)",
    resultTryAgain: "Tekrar Dene",
    resultShareSuccess: "Ana karakter enerjisi! 🔥 +2 Jeton eklendi.",
    resultShareError: "Dur dur, paylaşmadan jeton olur mu? 🤨 Önce paylaş sonra konuşuruz.",
    resultShareTitle: "{name} — VibeCheckr",
    resultShareText: "Vibe puanım: {score}/100 💜\nSen de dene! 👀 👉 https://thevibecheckr.vercel.app",
    resultDuoSoulmate: "Duo Ruh Eşi",
    resultRedFlag: "Red Flag (Kırmızı Bayrak)",
    resultDuoShareText: "Duo Vibe Puanı: {score}/100 💔\nSen de dene! 👀 👉 https://thevibecheckr.vercel.app",
    deluluGrounded: "Ayakları Yere Basan Kraliçe 👑",
    deluluSlight: "Hafiften Delulu 🤔",
    deluluCopium: "Fazla Copium Çekmiş 💨",
    deluluFull: "Tam Delulu Modu 🤡",
    deluluClinical: "Klinik Vaka 🚨",
    deluluLabel: "Delulu",
    vibeCheckLabel: "Vibe Kontrolü",
    roastLabel: "Taslak Roast",
    guruRepliesLabel: "GURU'NUN YANITLARI",

    // TokenModal
    tokenModalWatchToEarn: "İzle Kazan",
    tokenModalOut: "Vibe Jetonun Bitti",
    tokenModalRefillDesc: "Vibe'ını analiz etmek ve enerjini çözmek için jeton al.",
    tokenModalGetTokens: "Jeton Al",
    tokenModalPackages: "Jeton Paketleri",
    tokenModalChooseDesc: "Sana en uygun paketi seç",
    tokenModalPopular: "Popüler",
    tokenModalTokensLabel: "✦ {count} Jeton",
    tokenModalVipPass: "VIP Pass",
    tokenModalGoBack: "← Geri dön",
    tokenModalProcessing: "Ödeme işleniyor...",
    tokenModalSecureConn: "Güvenli bağlantı kuruluyor",
    tokenModalSuccess: "Ödeme Başarılı!",
    tokenModalAdded: "✦ Hesabına {count} jeton eklendi",
    tokenModalActivated: "✦ {count} aktif edildi!",
    tokenModalMobileTitle: "Asıl Eğlence Mobilde! 🚀",
    tokenModalMobileDesc: "Bedava jeton kazanmak, özel içeriklere erişmek ve anlık bildirim almak için mobil uygulamayı indir.",
    tokenModalDownloadIos: "iOS için İndir (Yakında)",
    tokenModalDownloadAndroid: "Android için İndir (Yakında)",
    tokenModalMaybeLater: "Belki daha sonra",
    tokenModalEntertainmentOnly: "🎭 Sadece Eğlence Amaçlıdır",
    toastAdLoading: "📺 Reklam yükleniyor... Mobil versiyonda aktif olacak",
    toastAppSoon: "🚀 Mobil uygulamalarımız çok yakında çıkıyor! Takipte kal.",
    toastSignIn: "⚠️ Lütfen satın alım yapmak için giriş yap.",

    // ConsentModal
    consentTitle: "Vibe'ını Okumadan Önce...",
    consentDesc: "VibeCheckr bir eğlence uygulamasıdır. YZ analizlerimiz tamamen eğlence amaçlıdır — profesyonel tavsiye sayılmaz. Devam ederek şartlarımızı kabul etmiş olursun.",
    consentPoint1: "Tüm analizler sadece eğlence amaçlıdır",
    consentPoint2: "Fotoğraflarını asla saklamaz veya satmayız",
    consentPoint3: "Yapay zeka sonuçları hatalı veya kurgusal olabilir",
    consentPoint4: "Dijital satın alımların iadesi yoktur",
    consentTerms: "Kullanım Şartları",
    consentPrivacy: "Gizlilik Politikası",
    consentAcceptBtn: "Kabul Et ve Devam Et",
    consentCheckbox: "Kullanım Şartları'nı ve Gizlilik Politikası'nı kabul ediyorum.",
    consentSubtext: "Butonuna tıklayarak Kullanım Şartları ve Gizlilik Politikamızı okuduğunu ve kabul ettiğini onaylarsın.",

    // VibeDictionaryClient
    dictionarySearchPlaceholder: "Rizz, ghosting, akrep falan ara...",
    dictionaryNoResults: "\"{query}\" için sonuç bulunamadı.",
    dictionaryTryAgain: "Başka bir şey aramayı veya kelimeyi doğru yazdığını kontrol etmeyi dene.",

    // StreakRecoveryModal
    streakRecoveryTokenError: "Yeterli jetonun yok. Bu seriyi kurtarmak için daha fazla jetona ihtiyacın var.",
    streakRecoveryGenericError: "Seri kurtarılırken bir hata oluştu.",
    streakRecoveryTitle: "Serin Patladı! 💀",
    streakRecoveryDesc1: "Dün vibe'ını kontrol etmeyi unuttun ve",
    streakRecoveryDay: "Günlük",
    streakRecoveryDesc2: "serini kaybettin.",
    streakRecoveryYouWereA: "Şu rütbedeydin:",
    streakRecoveryDonNotLose: "Rütbeni bırakma! Hemen kurtar:",
    streakRecoveryCost: "🪙 {tokens} Jeton",
    streakRecoveryButton: "Serimi Kurtar",
    streakRecoveryDecline: "Gerek yok, sıfırdan başlarım",

    // StreakInfoModal
    streakInfoTitle: "Aura Rütbesi Gelişimi",
    streakInfoDesc: "Her gün vibe'ını kontrol ederek serini büyüt. Serin büyüdükçe rütben de yükselir. Bir gün bile atlarsın, NPC statüsüne geri dönersin!",
    streakInfoCurrentStreak: "Mevcut Seri",
    streakInfoDay: "Gün",
    streakInfoDays: "Gün",
    streakInfoRank: "Rütbe",
    streakInfoNext: "Sıradaki:",
    streakInfoEvolutionPath: "Evrim Yolu",
    streakInfoYouAreHere: "Buradasın",
    streakInfoUnlocked: "Açık",
    streakInfoLocked: "Kilitli",

    // ExtrasModal & Showcase
    extrasShowcaseTitle: "Kriz Merkezi 🔍",
    extrasShowcaseDesc: "Dramayı çözüp acımasızca dürüst gerçekleri yüzüne vuruyoruz. Yalan yok.",
    extrasModalOr: "veya",
    extrasModalUploading: "Yükleniyor...",
    extrasModalUploadScreenshot: "Ekran Görüntüsü Yükle",
    extrasModalAddImage: "+ Resim Ekle ({count}/{max})",
    extrasModalSelect: "Seç...",
    extrasModalPhotoAdded: "Fotoğraf Eklendi ✓",
    extrasModalTapToUpload: "Yüklemek için Dokun",
    extrasModalGetTokens: "Açmak için Jeton Al",
    extrasModalLetsGo: "Hadi Başlayalım",

    extrasToxicTitle: "Toksik Eski Sevgili Tarayıcı",
    extrasToxicDesc: "Ona mesaj atmalı mısın? Aptalca bir şey yapmadan önce acımasız bir red flag taraması yap.",
    extrasSitTitle: "Situationship Çözücü",
    extrasSitDesc: "'Biz neyiz?' gizemini çözüyoruz. Acımasız uyumluluk istatistikleri dahil.",
    extrasMoodTitle: "Mod Sıfırlama",
    extrasMoodDesc: "Günün berbat mı geçti? Dürüst bir sille ye, enerjini yenile, moda geri dön.",
    extrasDeluluTitle: "Delulu Check",
    extrasDeluluDesc: "Kafan mı karıştı? Ekran görüntülerini at (maks 3) veya mesajları yapıştır. Çift mesaj atmadan önce kendine gel.",
    extrasRizzTitle: "Mesaj Gurusu",
    extrasRizzDesc: "Mesajda ne diyeceğini mi bilmiyorsun? Ekran görüntüsünü bırak — en toksik, havalı veya sağlıklı cevabı ben yazayım.",

    comingSoon: "Yakında",
    tokenInsufficient: "Yeterli jeton yok! 💎",
    serverBusy: "Sunucular meşgul. Lütfen tekrar dene! ✨",

    // SplashScreen
    splashAnalyzing: "VIBE CHECK BAŞLIYOR...",

    // MagicQuestionStep
    magicWordCount: "Opsiyonel — boş bırakabilirsin, sorun olmaz",
    magicQuote: "\"Ne kadar fazla detay, o kadar sert roast\"",

    // InstallBanner
    installTitle: "VibeCheckr'ı Yükle 🚀",
    installSub: "Ana ekrana ekle — tam uygulama deneyimi yaşa.",
    installBtn: "Yükle",

    // OfflineBanner
    offlineMsg: "Vibe sinyali kesildi, internet bağlantını kontrol et 🛸",

    // NotificationPrompt
    notifTitle: "Dijital Dedikodu",
    notifDesc: "Algoritma sana mesaj atacak! Bazen vibe kontrolü, bazen acımasız roast. Red flag'larını ve vibe sızıntılarını duymaya hazır mısın?",
    notifDecline: "Hayır makk, korkuyorum",
    notifAllow: "Hazırım, gel! 🤙",

    // History page
    historyHome: "Ana Sayfa",
    historyTitle: "GEÇMİŞ VİBELAR",
    historyTtl: "Vibeler evrilir. Geçmiş analizlerin dijital boşluktan her 48 saatte bir otomatik siliniyor.",
    historyErrorTitle: "Bağlantı Hatası",
    historyErrorDesc: "Geçmiş vibelerin şu an seni hayalet gibi geçiyor, internet bağlantını kontrol et bestie.",
    historyEmptyTitle: "Temiz Bir Sayfa",
    historyEmptyDesc: "Henüz hiç vibe analizi yapmadın. Roast'lanmaya hazır mısın bestie?",
    historyEmptyCta: "Vibe'ımı Analiz Et",
    historyExtrasLabel: "Ekstra Analiz",
    historyNamelessVibe: "İsimsiz Vibe",
    historyAnalysisComplete: "Analiz tamamlandı.",
    historyVerdict: "Sonuç",
    historyShowLess: "Küçült",
    historyReadMore: "Devamını gör",
    historyEnd: "Hepsi bu kadar, bestie 👻",
    historyUnknownDate: "Bilinmeyen Tarih",

    // Language selector
    langSelectorTitle: "Dil",
    langEn: "English",
    langTr: "Türkçe",

    toastWelcome: "5 Hoşgeldin Jetonu Eklendi! 🎁",
    toastTokenInsufficient: "Bu analiz için yeterli jetonun yok! 💎",
    toastServerBusy: "Sunucular meşgul. Lütfen tekrar dene! ✨",

    // PaymentSuccessPage
    paymentSuccessTitle: "Ödeme Başarılı! ✨",
    paymentSuccessDesc: "Jetonların hesabına başarıyla eklendi.",
    paymentSuccessStatusTitle: "Durum",
    paymentSuccessStatusDesc: "Bakiye güncellemesi başarıyla tamamlandı.",
    paymentSuccessButton: "Hemen Analize Başla",
  },
} as const;

export type TKeys = keyof typeof STRINGS.en;
export type Locale = "en" | "tr";

export function useT() {
  const locale = useAppStore((s) => s.locale) as Locale;
  return STRINGS[locale] ?? STRINGS.en;
}
