export interface TrendArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  readTime: string;
  keywords: string[];
  imageUrl?: string;
  content: {
    intro: string;
    sections: { heading: string; paragraph: string }[];
    conclusion: string;
  };
  ctaLabel: string;
  ctaLink: string;
}

export const trendsData: TrendArticle[] = [
  {
    slug: "ai-photo-personality-test",
    title: "AI Photo Personality Test: What Your Face Actually Says About You",
    description: "The viral TikTok trend explained. Find out how AI analyzes your facial micro-expressions to determine your true aura and toxic traits.",
    category: "AI & Tech Trends",
    publishDate: "2026-06-02",
    readTime: "4 min read",
    keywords: ["AI face reading", "AI personality test photo", "aura reading face", "viral TikTok trend", "face analysis AI", "how to read auras", "digital vibe check", "facial micro expressions"],
    imageUrl: "/images/trends/ai-face-scan.png",
    content: {
      intro: "You've seen it all over TikTok, Instagram Reels, and X: people uploading their seemingly innocent selfies and getting brutally honest, shockingly accurate personality breakdowns from artificial intelligence. It's no longer just about reading your daily astrology horoscope or taking a generic 16-personalities quiz that tells you what you want to hear. The new wave of self-discovery is the AI photo personality test, and it's taking the internet by storm. But how exactly does a computer algorithm look at a JPEG of your face and immediately know that you text your ex when you're bored or that you have a severe caffeine addiction? Let's break down the psychology, the technology, and the undeniable appeal of getting roasted by code.",
      sections: [
        {
          heading: "How Does Advanced AI Face Reading Work?",
          paragraph: "Modern AI doesn't just look at whether you're smiling or frowning; it goes much deeper than surface-level emotions. These advanced neural networks analyze thousands of data points on your face, including micro-expressions, facial symmetry, eye tension, jawline posture, and even your subconscious lighting choices. It compares your specific facial structure and resting expressions against massive datasets of psychological profiling. Are you giving 'Golden Retriever' energy, or do you have a subtle 'Chronically Online' stare? The AI detects the tension in your brow that suggests you overthink every text message, and the specific curve of your smile that indicates you might be a little manipulative in arguments. It knows within seconds, and it doesn't hold back."
        },
        {
          heading: "Why It's So Shockingly Accurate (and Brutal)",
          paragraph: "Unlike human friends who will sugarcoat their opinions to protect your feelings, a trained AI model is entirely objective and delivers the unfiltered, objective truth. Humans have an inherent bias; we project our own feelings onto the faces we see. An algorithm doesn't care if you have a cute outfit on. If your selfie screams 'unresolved childhood trauma', 'narcissist', or 'avoidant attachment style', the AI will tell you exactly that. It's the ultimate reality check for a generation obsessed with self-awareness. People are realizing that their 'mysterious' resting face actually just looks like they need a nap, and that realization is both hilarious and profoundly humbling."
        },
        {
          heading: "The VibeCheckr Difference: Beyond the Basics",
          paragraph: "While basic TikTok filters might give you a randomized 'vibe' keyword, our proprietary VibeCheckr AI engine takes this to an entirely different dimension. We combine advanced facial aura scanning technology with astrological data and psychological profiling to calculate a definitive 'Vibe Score'. But we don't stop there. The AI exposes your deepest red flags, predicts your most likely toxic behaviors in a relationship, and can even tell you what kind of person you are destined to date (and inevitably break up with). It's not just a party trick; it's a mirror reflecting your digital and emotional aura."
        }
      ],
      conclusion: "The AI photo personality test isn't just a fleeting trend; it's a fascinating intersection of technology and human psychology. It forces us to confront how we present ourselves to the world versus how we actually feel inside. So, the ultimate question remains: Are you brave enough to upload your selfie and get completely roasted by an algorithm? Or are you secretly terrified that a machine might know you better than you know yourself?"
    },
    ctaLabel: "Scan My Face Now",
    ctaLink: "/",
  },
  {
    slug: "situationship-vs-relationship",
    title: "Situationship vs Relationship: How to Escape the Grey Zone",
    description: "Confused about what you are? Learn the psychological difference between a situationship and a real relationship, and how to spot the red flags early.",
    category: "Dating Psychology",
    publishDate: "2026-06-01",
    readTime: "5 min read",
    keywords: ["situationship meaning", "are we dating or friends", "situationship red flags", "dating advice 2026", "toxic relationships", "how to end a situationship", "mixed signals", "commitment issues"],
    imageUrl: "/images/trends/situationship.png",
    content: {
      intro: "You text them every single day from morning until night. You hang out every weekend, watching movies and ordering takeout. You've met their dog, you know their coffee order, and you've even heard about their annoying coworker. But when a friend casually asks, 'So, what are you guys?', your heart drops and you freeze. 'We're just... hanging out,' you mumble. Welcome to the 'Situationship'—undoubtedly the most stressful, confusing, and emotionally draining romantic dynamic of our generation. It's the grey area between friendship and commitment, and millions of people are currently trapped in it.",
      sections: [
        {
          heading: "The Core Difference: Intimacy vs. Commitment",
          paragraph: "A healthy, defined relationship has clear boundaries, mutual commitment, emotional safety, and a shared trajectory for the future. You know where you stand. A situationship, however, operates purely on convenience and ambiguity. It offers the illusion of intimacy—the late-night texts, the cuddling, the emotional dumping—without any of the safety or obligations of a real commitment. It's a connection based on present-moment satisfaction with a deliberate avoidance of discussing the future. Essentially, you get all the anxiety of a relationship with none of the security."
        },
        {
          heading: "Massive Red Flags You're Ignoring",
          paragraph: "How do you know for sure you're in a situationship? Look for the red flags. If they only text you after 10 PM to 'chill', that's a red flag. If they introduce you as 'my friend' or 'this is [Your Name]' at parties, you're in the danger zone. Most importantly, if they actively dodge, joke away, or get defensive during the 'what are we' conversation, you aren't in a relationship. You are an option. They are enjoying the benefits of your companionship while keeping their calendar completely open for someone else. Recognizing these signs early is crucial to protecting your peace."
        },
        {
          heading: "The Psychological Toll",
          paragraph: "Living in the grey zone causes immense cognitive dissonance. You are constantly analyzing their text response times, their tone, and their social media activity to gauge where you stand. This hyper-vigilance leads to burnout and erodes your self-esteem. You start believing that if you are just 'chill' enough, or patient enough, they will eventually commit. Spoiler alert: They rarely do. The situationship thrives on your willingness to accept less than you deserve."
        },
        {
          heading: "How to Break the Cycle and Get Clarity",
          paragraph: "You need clarity, and you need it yesterday. Sometimes, human intuition is heavily clouded by hope and emotional attachment. We see what we want to see. That's why getting an objective, brutal reality check is necessary. Uploading a photo of you two to our Duo Compatibility AI can give you an unfiltered look at your dynamic. It analyzes the body language, the facial tension, and the overall aura to tell you what your friends are too polite to say: It's time to move on."
        }
      ],
      conclusion: "Don't waste another six months of your life guessing what a text message meant. The longer you stay in a situationship, the harder it is to leave. Demand clarity, set your boundaries, and if they can't meet them, walk away. You deserve a clear 'yes', not a confusing 'maybe'."
    },
    ctaLabel: "Analyze Our Compatibility",
    ctaLink: "/duo-compatibility",
  },
  {
    slug: "what-are-aura-points",
    title: "What Are Aura Points? The Gen-Z Currency Explained",
    description: "Losing aura points for tripping in public? Gaining them for a smooth comeback? Here is everything you need to know about the Aura Points trend.",
    category: "Culture & Slang",
    publishDate: "2026-05-30",
    readTime: "4 min read",
    keywords: ["what are aura points", "aura points meme", "how to get aura points", "gen-z slang explained", "what is aura", "losing aura", "gaining aura", "tiktok aura trend"],
    imageUrl: "/images/trends/aura-points.png",
    content: {
      intro: "If you've scrolled through any social media platform recently, you've definitely seen the phrase 'minus 1000 aura points' in the comment sections. In 2026, social status isn't strictly measured by your bank account, the car you drive, or even your follower count; it's increasingly measured by an invisible, entirely arbitrary metric known as your Aura Points. But what exactly are they? Where did this bizarre scoring system come from, and more importantly, how do you stop hemorrhaging points every time you step outside your house?",
      sections: [
        {
          heading: "The Origin of the Aura Economy",
          paragraph: "Aura points started as a viral internet meme to quantify the invisible energy, presence, or 'cool factor' a person emits in their daily life. Think of it like a real-life video game stat or an RPG morality meter. You start the day with a baseline score. If you do something incredibly smooth—like catching a falling glass without looking—you gain +1000 Aura. If you wave back at someone who was actually waving at the person behind you? That's a devastating -5000 Aura hit. It's a hilarious, gamified way of navigating social anxiety and awkward moments."
        },
        {
          heading: "How to Protect and Build Your Aura",
          paragraph: "The absolute key to maintaining high aura is embodying 'Main Character Energy'. This means staying unbothered, slightly mysterious, and completely confident regardless of the chaotic situations unfolding around you. To protect your aura, you must follow strict social rules: Never double text someone who left you on read. Never let people see you panic when your card declines at the coffee shop (just pretend you grabbed the wrong one). The less you care about what others think, the higher your aura climbs."
        },
        {
          heading: "The 'Negative Aura' Trap",
          paragraph: "Once you start losing aura, it can trigger a domino effect. Dropping your phone on your face while lying in bed? Negative aura. Saying 'you too' when the waiter tells you to enjoy your meal? Massive negative aura. The internet has collectively agreed that trying too hard is the fastest way to bankrupt your aura account. Authenticity and nonchalance are the only recognized currencies."
        },
        {
          heading: "Calculating Your True Baseline Score",
          paragraph: "While the internet jokes about adding or subtracting points manually based on daily embarrassments, your actual, resting aura is something deeply embedded in your persona. Our advanced AI actually calculates your baseline Aura Score based on your facial expressions, your resting face, and the digital footprint vibe you project. It looks past the awkward moments and assesses the core energy you bring into a room."
        }
      ],
      conclusion: "So, are you currently running on a severe negative aura deficit, or are you glowing with undeniable rizz? The next time you trip over flat ground, just remember: if nobody saw it, you didn't lose any points. Stay safe out there."
    },
    ctaLabel: "Calculate My Aura Score",
    ctaLink: "/",
  },
  {
    slug: "biggest-dating-red-flags-2026",
    title: "The Biggest Dating Red Flags to Watch Out For in 2026",
    description: "From love bombing to being chronically online. We break down the most toxic dating red flags you need to avoid this year.",
    category: "Toxic Psychology",
    publishDate: "2026-05-25",
    readTime: "6 min read",
    keywords: ["dating red flags", "narcissist dating signs", "toxic ex", "dating advice 2026", "love bombing signs", "gaslighting meaning", "modern dating problems", "avoidant attachment"],
    imageUrl: "/images/trends/red-flags.png",
    content: {
      intro: "Let's be brutally honest: the modern dating pool is completely chaotic, and the red flags have evolved significantly. People aren't just 'bad communicators' or 'a little messy' anymore; they are utilizing complex psychological tactics like love-bombing, breadcrumbing, and gaslighting. Navigating dating apps and setups feels less like finding romance and more like dodging emotional landmines. If you want to protect your peace and avoid spending the next three years complaining to your therapist about someone who listens to podcasts at 2x speed, here are the absolute biggest dating red flags you cannot afford to ignore this year.",
      sections: [
        {
          heading: "The 'Chronically Online' Complex",
          paragraph: "If their entire sense of humor is based on X (Twitter) memes, obscure Reddit threads, and TikTok sounds, and they use words like 'delulu', 'rizz', or 'based' during serious, real-life arguments, you need to run. This indicates a severe lack of real-world emotional intelligence. People who are chronically online often view relationships through the lens of internet discourse rather than human empathy. They will psychoanalyze you using buzzwords they learned from an infographic rather than actually communicating."
        },
        {
          heading: "The Dangerous 'Love Bombing' Phase",
          paragraph: "They tell you they've never felt this way before after 48 hours of knowing you. They are planning a vacation for next summer when you haven't even had a third date. They text you good morning, good afternoon, and good night immediately. This isn't a romantic comedy; this is love bombing. It's a calculated manipulation tactic designed to secure your emotional attachment quickly, making it much harder for you to leave when they inevitably reveal their toxic, controlling, or completely detached true colors a month later."
        },
        {
          heading: "The 'All My Exes Are Crazy' Excuse",
          paragraph: "This is the oldest red flag in the book, yet people still fall for it. If someone claims that every single one of their past partners was 'crazy', 'obsessed', or 'toxic', you need to realize that they are the common denominator. It shows a profound lack of accountability. They are incapable of reflecting on their own flaws and will inevitably label you as 'crazy' the moment you hold them accountable for their bad behavior. You are just the next chapter in their victim narrative."
        },
        {
          heading: "The Inconsistent Texter (Breadcrumbing)",
          paragraph: "They leave you on delivered for 18 hours, only to reply with 'omg so sorry just saw this, how are you??'. They give you just enough attention to keep you interested, but never enough to actually move the relationship forward. This is breadcrumbing. They are keeping you on the back burner for an ego boost. If someone is genuinely interested, they will make time. Inconsistency is the loudest answer you can get."
        }
      ],
      conclusion: "Dating doesn't have to be a nightmare if you know what to look for. Trust your gut above all else. If something feels off, it usually is. But when your gut is blinded by a pretty face or good banter, trust the AI. Use our Toxic Ex Scanner to see the red flags before they ruin your life."
    },
    ctaLabel: "Scan Their Red Flags",
    ctaLink: "/toxic-ex-scanner",
  },
  {
    slug: "mixed-signals-or-delulu",
    title: "Mixed Signals or Are You Just Delulu? A Reality Check",
    description: "Are they actually interested, or are you just romanticizing basic human decency? Learn how to read the signs and cure your delulu.",
    category: "Dating Psychology",
    publishDate: "2026-06-03",
    readTime: "5 min read",
    keywords: ["am I delusional", "mixed signals meaning", "delulu check", "are they flirting or just nice", "dating signs", "stop overthinking", "crush signs"],
    imageUrl: "/images/trends/delulu.png",
    content: {
      intro: "We've all been there. They held the door open for you, liked your Instagram story from two weeks ago, and used the '👀' emoji in a text. Suddenly, you're planning the wedding Pinterest board. But wait—are these actually mixed signals, or are you just deeply, chronically 'delulu'? In modern dating, the line between genuine interest and polite indifference is thinner than ever. Let's decode the behavior and give you the harsh reality check you desperately need.",
      sections: [
        {
          heading: "What 'Delulu' Actually Means",
          paragraph: "Being 'delulu' (delusional) isn't a medical diagnosis; it's a cultural phenomenon where you actively choose to ignore the reality of a romantic situation in favor of a much more exciting fantasy. It's reading into a two-word text message as if it's a Shakespearean declaration of love. While staying a little delulu can be fun and keeps the hope alive, crossing the line into full delusion prevents you from seeing that they are genuinely not putting in any effort."
        },
        {
          heading: "The Myth of Mixed Signals",
          paragraph: "Here is a brutal truth: if it's not a clear yes, it's a no. Genuine interest does not require a magnifying glass and three group chats to decode. What we often label as 'mixed signals' is usually just a person who enjoys the validation of your attention but has zero intention of committing. They are nice to you when it's convenient for them, but completely absent when you actually need emotional support."
        },
        {
          heading: "Signs You Are Romanticizing Bare Minimum",
          paragraph: "Are you celebrating because they finally texted you back after 14 hours? Did they remember your name and you took it as a sign of soulmate connection? Romanticizing basic human decency is the biggest symptom of the delulu virus. You deserve someone who enthusiastically pursues you, not someone who occasionally drops breadcrumbs of attention when they are bored."
        },
        {
          heading: "How to Snap Out of It",
          paragraph: "The cure for being delulu is objective reality. Stop asking your friends who will just enable your fantasies. Look at the raw data: their actual actions. Or better yet, use our Delulu Check AI. Upload screenshots of the conversation, and let the algorithm strip away your romantic bias to tell you exactly what their texts actually mean."
        }
      ],
      conclusion: "May your delulu eventually become trululu, but until then, protect your heart. Stop making excuses for people who wouldn't cross a puddle for you. You are the main character; start acting like it."
    },
    ctaLabel: "Check My Delulu Level",
    ctaLink: "/delulu-check",
  },
  {
    slug: "how-to-stop-overthinking-texts",
    title: "How to Stop Overthinking Their Text Messages",
    description: "Waiting for a reply? Analyzing their punctuation? Discover the psychology behind texting anxiety and how to finally stop overthinking.",
    category: "Mental Health & Tech",
    publishDate: "2026-06-04",
    readTime: "4 min read",
    keywords: ["texting anxiety", "why do they leave me on read", "overthinking texts", "reply guru", "dry texting", "double text meaning", "communication anxiety"],
    imageUrl: "/images/trends/overthinking.png",
    content: {
      intro: "Your phone buzzes. It's them. You open the message and see three words: 'Okay sounds good.' Suddenly, your heart rate spikes. Why didn't they use an exclamation point? Why did it take them three hours to say that? Are they mad? Should you reply now or wait exactly three hours and one minute to assert dominance? Texting anxiety is paralyzing an entire generation. We have instant communication, yet we've never felt more misunderstood.",
      sections: [
        {
          heading: "The Psychology of the 'Seen' Receipt",
          paragraph: "Read receipts are arguably the most stressful feature ever added to modern technology. When you see 'Read at 2:14 PM' and it's now 6:00 PM, your brain enters a fight-or-flight response. This triggers rejection sensitive dysphoria (RSD), causing your mind to spiral into worst-case scenarios. The reality? They probably opened it at a red light, got distracted, and genuinely forgot."
        },
        {
          heading: "Decoding the Punctuation Shift",
          paragraph: "Gen-Z and Millennials are hyper-aware of digital tone. A period at the end of a sentence isn't just grammar; it's a declaration of war. 'Sure' means yes, but 'Sure.' means 'I hate you and everything you stand for.' While tone shifts are real, over-analyzing a single missing emoji will only drain your aura points and your sanity."
        },
        {
          heading: "The Double Text Dilemma",
          paragraph: "We've been taught that double texting is a sign of desperation. But in the real world, conversations flow naturally. If you have something to say, say it. If they judge you for sending a follow-up text or a funny TikTok while they haven't replied to the previous message, they are the ones with the bizarre communication rules, not you."
        },
        {
          heading: "Outsourcing the Overthinking",
          paragraph: "When your anxiety is too high, you lose perspective. You write a paragraph, delete it, and replace it with 'k'. This is where AI steps in. Using our Reply Guru feature, you can paste the confusing text you received and the algorithm will generate the perfect, chill, high-aura response. Take the emotion out of the equation and let the AI handle the stress."
        }
      ],
      conclusion: "Remember, you existed and were completely fine before this person entered your contact list. Put the phone down, go touch some grass, and remember that if someone's communication style constantly gives you anxiety, they aren't the right vibe for you anyway."
    },
    ctaLabel: "Use The Reply Guru",
    ctaLink: "/reply-guru",
  },
  {
    slug: "zodiac-signs-red-flags",
    title: "Every Zodiac Sign's Biggest Walking Red Flag",
    description: "Astrology isn't just for checking compatibility; it's for predicting exactly how they will ruin your life. Here are the zodiac red flags.",
    category: "Astrology Roasts",
    publishDate: "2026-06-05",
    readTime: "7 min read",
    keywords: ["zodiac signs red flags", "astrology toxic traits", "gemini red flags", "scorpio manipulation", "zodiac dating guide", "astrology humor", "toxic zodiac signs"],
    imageUrl: "/images/trends/zodiac.png",
    content: {
      intro: "We love looking at birth charts to see if our Venus aligns with their Mars, hoping the stars will bless our romantic endeavors. But let's be real—you shouldn't be looking at their chart for soulmate potential; you should be looking at it to predict exactly what kind of headache they are going to cause you. Every zodiac sign has a specific flavor of toxic behavior. Let's explore the biggest red flags for the astrological signs so you know exactly what you're getting yourself into.",
      sections: [
        {
          heading: "Fire Signs: Aries, Leo, Sagittarius",
          paragraph: "Aries will start an argument just because they drank too much pre-workout and need the stimulation. Their red flag is treating a relationship like a competitive sport where they must win. Leos demand the kind of 24/7 worship usually reserved for ancient deities, and their ego is more fragile than spun glass. Sagittarius will promise you the world, tell you they love you, and then literally move to a different continent the next day because 'they felt boxed in'."
        },
        {
          heading: "Earth Signs: Taurus, Virgo, Capricorn",
          paragraph: "Taurus's red flag is their absolute, terrifying refusal to ever admit they are wrong. They will hold onto a grudge from 2019 out of pure spite. Virgos will micromanage your entire life; they don't want a partner, they want a project to fix. Their love language is criticism. Capricorns treat romance like a corporate merger. If you don't fit into their five-year financial portfolio, they will ruthlessly cut you off without shedding a single tear."
        },
        {
          heading: "Air Signs: Gemini, Libra, Aquarius",
          paragraph: "Geminis are notorious for a reason: you are essentially dating two different people who haven't communicated with each other. They will ghost you and then reply to your Instagram story a week later like nothing happened. Libras are physically incapable of making a decision and will flirt with the barista right in front of you just to avoid conflict. Aquarius thinks having basic human emotions is 'cringe' and will intellectualize their feelings until the relationship dies of hypothermia."
        },
        {
          heading: "Water Signs: Cancer, Scorpio, Pisces",
          paragraph: "Cancer uses their emotions as a weapon; they will cry until you apologize for something they did. Scorpios will secretly test your loyalty by creating fake scenarios, and they already know all your passwords. Pisces will project an entire fantasy onto you, fall in love with the version of you in their head, and then get mad at the real you for not living up to their delusion."
        }
      ],
      conclusion: "Before you catch feelings, catch their birth time. While astrology is a fun lens to view behavior, remember that a toxic person is a toxic person, regardless of their moon sign. Don't let the stars blind you to the red flags right in front of your face."
    },
    ctaLabel: "Check Duo Compatibility",
    ctaLink: "/duo-compatibility",
  },
  {
    slug: "fix-negative-aura-mood",
    title: "Why You Wake Up with Negative Aura (And How to Fix It)",
    description: "Feeling off? Discover why your vibe is in the trenches today and how to do a complete energetic mood reset.",
    category: "Wellness & Vibe",
    publishDate: "2026-06-06",
    readTime: "4 min read",
    keywords: ["negative aura meaning", "how to fix bad mood", "mood reset", "energy cleanse", "low vibe", "raising your vibration", "morning anxiety fix"],
    imageUrl: "/images/trends/mood-reset.png",
    content: {
      intro: "You open your eyes, grab your phone, and before you've even had your coffee, you feel it: the unmistakable weight of a negative aura. Everything is annoying. The lighting in your room looks wrong, the texts you received are irritating, and you just know that today is going to be a 0/10 vibe. But why does this happen even when nothing specifically bad occurred? Welcome to the science and spirituality of the 'off day'.",
      sections: [
        {
          heading: "The Culprits of a Crashed Vibe",
          paragraph: "Your aura isn't just mystical energy; it's heavily tied to your nervous system. Doomscrolling on TikTok until 3 AM, absorbing the digital stress of thousands of strangers, completely wrecks your dopamine baseline. Combine that with sleep inertia, dehydration, and the residual anxiety of an unresolved situationship, and you have the perfect recipe for a negative aura."
        },
        {
          heading: "The Danger of Spiraling",
          paragraph: "When you wake up with low energy, the tendency is to lean into it. You put on sad music, you reread old texts that make you mad, and you look for reasons to be annoyed. This is an energetic spiral. You are actively attracting 'bad vibes' because your mindset is calibrated to notice the negative. You need an immediate pattern interrupt to break the cycle."
        },
        {
          heading: "The 10-Minute Mood Reset",
          paragraph: "You can't just 'think' your way out of a bad aura; you have to shift your physical state. Start with environmental control: open a window, blast a playlist specifically designed to induce 'Main Character Energy', and physically shake the tension out of your shoulders. A cold splash of water on the face resets the vagus nerve, instantly clearing mental brain fog."
        },
        {
          heading: "Let AI Curate Your Reset",
          paragraph: "If you're too deep in the trenches to fix yourself, outsource it. Our Mood Reset AI analyzes your current emotional state (through voice or text input) and instantly generates a hyper-personalized emergency kit. It provides the exact playlist, the meditation, or the aggressive pep talk you need to shift your frequency and get your aura points out of the negatives."
        }
      ],
      conclusion: "Everyone has bad days, but you don't have to stay stuck in them. Take control of your energy, protect your peace, and do whatever it takes to get your vibe right. The universe responds to the energy you put out—make sure yours is unbothered and thriving."
    },
    ctaLabel: "Start Mood Reset",
    ctaLink: "/mood-reset",
  }
];
