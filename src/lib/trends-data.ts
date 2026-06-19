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

export const trendsDataEn: TrendArticle[] = [
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
  },
  {
    slug: "aura-battle-who-is-cooler",
    title: "Aura Battles: The New Way Gen-Z Ends Friend Group Debates",
    description: "Who actually has the highest aura in your friend group? The Aura Battle AI is settling debates and breaking egos by scientifically calculating who is the coolest.",
    category: "Culture & Slang",
    publishDate: "2026-06-18",
    readTime: "5 min read",
    keywords: ["aura battle", "who is cooler", "vibe check", "friendship roast", "main character energy"],
    imageUrl: "/images/trends/aura-points.png",
    content: {
      intro: "We all have that one friend who thinks they are the undisputed main character. They act like their aura is untouchable, and they never hesitate to let everyone know. For years, the debate of 'who is actually cooler' in a friend group was subjective and entirely based on who could roast the other better. But in 2026, we don't argue—we let the AI decide. The 'Aura Battle' is the newest trend tearing friend groups apart and putting egos in check.",
      sections: [
        {
          heading: "The End of Subjective Coolness",
          paragraph: "Before the Aura Battle AI, coolness was impossible to quantify. Now, it's a science. By analyzing facial micro-expressions, resting tension, and overall vibe frequency, the AI acts as an impartial judge. It strips away the bias and looks purely at the energetic output of both individuals. It's the ultimate reality check for the friend who talks a big game but secretly gives off major NPC energy."
        },
        {
          heading: "The Brutal Roast Mechanism",
          paragraph: "What makes the Aura Battle so viral isn't just finding out who won; it's the sheer brutality of how the loser is treated. The AI doesn't just say 'Person 1 wins.' It crafts a highly specific, devastating roast explaining exactly why Person 2 lost. It might call out their forced smirk, their desperate need for validation, or the fact that their 'mysterious' look just makes them look confused."
        },
        {
          heading: "A New Metric for Social Hierarchy",
          paragraph: "This isn't just about fun; it's a new metric for digital social hierarchy. Winning an Aura Battle against the group's perceived 'leader' is a coup. It instantly shifts the dynamic, providing undeniable proof of superior vibe. It's becoming the modern equivalent of challenging someone to a duel, but instead of swords, you're using selfies."
        }
      ],
      conclusion: "Are you brave enough to step into the Aura Arena with your best friend? Or are you terrified that the algorithm will confirm what everyone already suspects: you are, in fact, the sidekick. There is only one way to find out."
    },
    ctaLabel: "Start An Aura Battle",
    ctaLink: "/aura-battle",
  }
];

export const trendsDataTr: TrendArticle[] = [
  {
    slug: "ai-photo-personality-test",
    title: "Yapay Zeka Yüz Analizi: O Suratın Gerçekte Ne Anlatıyor?",
    description: "TikTok'u yıkan o meşhur trend. Yapay zeka yüzündeki o mikro ifadeleri nasıl tarayıp gerçek auranı ve toksik yanlarını döküyor?",
    category: "AI & Teknoloji",
    publishDate: "2026-06-02",
    readTime: "4 dk okuma",
    keywords: ["Yapay zeka yüz okuma", "Yapay zeka kişilik testi", "aura okuma yüz", "viral TikTok trendi", "yüz analizi yapay zeka"],
    imageUrl: "/images/trends/ai-face-scan.png",
    content: {
      intro: "Şu an TikTok'ta veya X'te (Twitter) kesin önüne düşmüştür: Millet en masum selfie'sini atıp yapay zekadan acımasız, tokat gibi gerçek bir analiz yiyor. Olay artık günlük burç yorumu okumak veya 'sana duymak istediğini söyleyen' o klasik testleri çözmek değil. Yeni trend: Yapay zeka ile yüzleşmek. Peki bir algoritma sadece bir JPEG'e bakıp da canın sıkıldığında eski sevgiline yazdığını veya kafein bağımlısı olduğunu nasıl şıp diye anlıyor? Gel bu işin psikolojisini, arkasındaki teknolojiyi ve bir koda resmen 'gömülmenin' neden bu kadar popüler olduğunu konuşalım.",
      sections: [
        {
          heading: "Bu Yüz Okuma Olayı Tam Olarak Nasıl Çalışıyor?",
          paragraph: "Modern yapay zeka sadece gülümsüyor musun yoksa somurtuyor musun diye bakmıyor; olay çok daha derin. Bu çılgın sinir ağları, yüzündeki mikro ifadeler, gözündeki gerginlik, çene kaslarının duruşu ve hatta seçtiğin ışık gibi binlerce farklı veri noktasını tarıyor. 'Golden Retriever' enerjisi mi veriyorsun yoksa hafiften 'Kronik Çevrimiçi' mi takılıyorsun anında anlıyor. Gelen her mesaja aşırı anlam yüklediğini gösteren kaşındaki o ufak kasılmayı ya da tartışmalarda manipülatif olabileceğini ele veren o yarım gülüşünü hemen yakalıyor. Saniyeler sürüyor ve hiç acımıyor."
        },
        {
          heading: "Neden Bu Kadar İsabetli (Ve Acımasız)?",
          paragraph: "Çünkü yapay zekanın senin kalbini kırmamak gibi bir derdi yok. Yakın bir arkadaşın sana gerçekleri söylerken lafı dolandırır ama eğitilmiş bir model direkt yüzüne vurur. Selfie'nde 'çözülmemiş çocukluk travması', 'narsist' veya 'bağlanma fobisi' diye bağıran bir hava varsa, yapay zeka bunu direkt ekrana yazar. İnsanların o çok 'gizemli' sandıkları bakışın aslında sadece 'uykusuzluktan' ibaret olduğunu fark etmeleri hem komik hem de bayağı bi onur kırıcı bir uyanış oluyor."
        },
        {
          heading: "VibeCheckr Farkı: Filtrelerin Çok Ötesinde",
          paragraph: "TikTok'taki o basit rastgele kelime atan filtreleri unut. VibeCheckr'ın yapay zeka motoru işi bambaşka bir boyuta taşıyor. Gelişmiş yüz aurası taramasını alıp, psikolojik profilinle birleştiriyor ve sana net bir 'Vibe Skoru' çıkarıyor. Hatta bununla da kalmıyor; en derin red flag'lerini yüzüne vuruyor, ilişkilerde yapacağın potansiyel toksiklikleri tahmin ediyor ve kiminle flört edip eninde sonunda ayrılacağını bile söylüyor. Bu bir oyun değil, resmen dijital auranın aynası."
        }
      ],
      conclusion: "Kısacası bu yapay zeka analizleri geçici bir trend değil. Dışarıya nasıl göründüğümüzle içeride aslında nasıl hissettiğimizin teknolojik bir çarpışması. Şimdi asıl soru şu: O selfie'yi yükleyip bir algoritma tarafından darmadağın edilmeye hazır mısın? Yoksa bir makinenin seni senden daha iyi tanımasından gizliden gizliye tırsıyor musun?"
    },
    ctaLabel: "Hemen Yüzümü Tara",
    ctaLink: "/",
  },
  {
    slug: "situationship-vs-relationship",
    title: "Situationship mi, Gerçek İlişki mi? Bu Toksik Sarmaldan Nasıl Çıkarsın",
    description: "Durumunuzun adı yok mu? Bir 'situationship' ile gerçek bir ilişki arasındaki farkları ve o red flag'leri nasıl yakalayacağını öğren.",
    category: "Flört Psikolojisi",
    publishDate: "2026-06-01",
    readTime: "5 dk okuma",
    keywords: ["situationship anlamı", "çıkıyor muyuz arkadaş mıyız", "situationship kırmızı bayrakları", "toksik ilişkiler"],
    imageUrl: "/images/trends/situationship.png",
    content: {
      intro: "Sabahtan akşama kadar mesajlaşıyorsunuz. Hafta sonu sürekli beraber takılıyorsunuz, dizi izliyorsunuz. Köpeğiyle bile tanıştın, kahveyi nasıl içtiğini ezbere biliyorsun. Ama arkadaşın sana dönüp 'E siz şimdi nesiniz?' dediğinde kalbin sıkışıyor ve buz kesiyorsun. 'Ya işte... takılıyoruz' diye geveliyorsun. Aramıza hoş geldin, burası 'Situationship'. Yani neslimizin açık ara en stresli, en yorucu ve adı konmamış flört batağı. Arkadaşlıkla sevgililik arasındaki o kafa karıştırıcı gri bölge ve şu an milyonlarca insan burada hapis kalmış durumda.",
      sections: [
        {
          heading: "Temel Fark: Yakınlık vs. Bağlılık",
          paragraph: "Sağlıklı bir ilişkinin net sınırları, karşılıklı bir sözü ve gelecek planı vardır. Nerede durduğunu bilirsin. Ama bir situationship tamamen anlık keyfe ve o lanet belirsizliğe dayanır. Sana bir ilişkinin yakınlığını sunar (gece mesajlaşmaları, sarılmalar, dertleşmeler) ama iş ciddiyete binince ortada hiçbir güvence yoktur. Gelecekten bahsetmekten ölümüne kaçarlar. Kısacası: Bir ilişkinin bütün stresini ve kaygısını çekersin ama hiçbir güvenliğini alamazsın."
        },
        {
          heading: "Göz Göre Göre Görmezden Geldiğin Red Flag'ler",
          paragraph: "Situationship'te olduğunu nasıl anlarsın? Eğer sana sadece gece 10'dan sonra 'Naber, napıyosun?' yazıyorsa o bir red flag. Ortamlarda seni 'Bu da arkadaşım' diye tanıştırıyorsa direkt tehlike çanları çalıyor demektir. En kötüsü de şu: 'Biz neyiz?' muhabbetini açtığında şakaya vurup konuyu değiştiriyor veya direkt savunmaya geçiyorsa, üzgünüm ama ilişki falan yok ortada. Sen sadece bir seçeneksin. Kendi takvimlerini başkalarına açık tutarken senin ilginin tadını çıkarıyorlar."
        },
        {
          heading: "İşin Psikolojik Bedeli",
          paragraph: "Bu gri alanda kalmak insanı mental olarak bitiriyor. Mesaj atma süresini, son görülmesini, ses tonunu sürekli analiz etmekten beynin yanıyor. 'Eğer biraz daha cool olursam veya biraz daha beklersem elbet bana bağlanır' yalanına inanmaya başlıyorsun. Spoiler verelim: Bağlanmayacaklar. Situationship, senin hak ettiğinden daha azına razı olma durumundan beslenen bir parazit gibidir."
        },
        {
          heading: "Bu Döngüyü Kırıp Gerçeği Görmek",
          paragraph: "Senin acilen netliğe ihtiyacın var. Bazen kendi duygularımızdan dolayı olayları hep iyiye yorarız, görmek istediğimizi görürüz. İşte bu yüzden sana tokat gibi çarpacak tarafsız bir analize ihtiyacın var. İkinizin bir fotoğrafını Duo Compatibility yapay zekamıza yükle ve aranızdaki dinamiğe bir de filtreden uzak bak. Arkadaşlarının seni kırmamak için söyleyemediği o gerçeği yapay zeka direkt söyleyecek: 'Zamanını boşa harcıyorsun, yola devam et.'"
        }
      ],
      conclusion: "Bir mesajın sonundaki emojiyi deşifre etmeye çalışarak hayatının altı ayını daha çöpe atma. Situationship'te ne kadar uzun kalırsan çıkması o kadar zorlaşır. Netlik iste, sınırını çiz, eğer buna uymuyorsa arkana bile bakmadan kaç. Sen kafa karıştırıcı bir 'belki' değil, net bir 'evet' hak ediyorsun."
    },
    ctaLabel: "Uyumumuzu Analiz Et",
    ctaLink: "/duo-compatibility",
  },
  {
    slug: "what-are-aura-points",
    title: "Aura Puanı (Aura Points) Nedir? Yeni Neslin Görünmez Statü Göstergesi",
    description: "Sokakta takılıp düştüğünde neden aura kaybediyorsun? Aura Points trendi hakkında bilmen gereken her şey ve auranı tavan yaptırma rehberi.",
    category: "Kültür & Jargon",
    publishDate: "2026-05-30",
    readTime: "4 dk okuma",
    keywords: ["aura puanları nedir", "aura puanları mem", "aura nasıl kazanılır", "aura kaybetmek", "tiktok aura trendi"],
    imageUrl: "/images/trends/aura-points.png",
    content: {
      intro: "Son dönemde TikTok veya Instagram'da takıldıysan kesin yorumlarda 'abi -10.000 aura puanı' veya '+500 aura kazandın' tarzı şeyler görmüşsündür. 2026'da statü artık banka hesabınla veya takipçi sayınla falan ölçülmüyor; olay tamamen Aura Puanında bitiyor. Tamamen görünmez, internet kültürünün uydurduğu bu saçma ama aşırı eğlenceli skor sistemi nereden çıktı? Ve en önemlisi: Her sokağa çıktığında aura kaybetmekten nasıl kurtulursun?",
      sections: [
        {
          heading: "Aura Ekonomisi Nereden Çıktı?",
          paragraph: "Aura puanları, birinin ortama yaydığı o 'cool'luğu ve enerjiyi puanlamak için viral olan bir internet geyiği aslında. Gerçek hayatta oynadığın bir RPG oyununun skor tablosu gibi düşün. Güne belli bir baz puanla başlıyorsun. Masadan düşen bir bardağı bakmadan havada yakaladın mı? Şak! +1000 Aura. Ama yolda yürürken aslında arkandaki kişiye el sallayan birine yanlışlıkla el mi salladın? Geçmiş olsun, o yıkıcı utançla direkt -5000 Aura yiyorsun."
        },
        {
          heading: "Auranı Korumak ve Uçuşa Geçirmek",
          paragraph: "Yüksek auranın altın kuralı: 'Ana Karakter Enerjisi (Main Character Energy)'. Etrafta ne kadar kaotik veya utanç verici bir şey olursa olsun hiç bozuntuya vermeden, cool ve umursamaz kalabilmek. Auranı korumak için altın kurallar: Seni görüldüde bırakan birine asla ama asla ikinci mesajı (double text) atma. Kafede kartın reddedilirse asla panik yapma, sanki yanlış kartı vermişsin gibi hafifçe gülümse. İnsanların ne düşündüğünü ne kadar az umursarsan auran o kadar arşa çıkar."
        },
        {
          heading: "'Eksi Aura' Tuzağından Kaçış",
          paragraph: "Aura bir kere düşmeye başladı mı domino etkisi yapar. Yatakta uzanırken telefonu yüzüne mi düşürdün? Eksi aura. Garson 'afiyet olsun' dediğinde yanlışlıkla 'size de' mi dedin? Devasa bir eksi aura. İnternetin ortak kararı şu: Bir şey için 'fazla kasmak' veya çabalamak, aura hesabını iflas ettiren en hızlı yoldur. Özgünlük ve o 'umurumda değil' rahatlığı, şu an en değerli para birimi."
        },
        {
          heading: "Gerçek Aura Puanını Bulma",
          paragraph: "İnternet ortamında her ne kadar günlük küçük sakarlıklara göre puan kırılıp eklense de, aslında senin gerçek 'dinlenme halindeki' auran karakterinin tam merkezinde yer alır. Gelişmiş yapay zekamız, yüz ifadelerine ve yaydığın o genel dijital ayak izine bakarak senin gerçek Aura Skorunu hesaplar. Yani o ufak tefek sakarlıkları es geçip, bir ortama girdiğinde gerçekten ne kadar 'vibe' yaydığını ortaya çıkarır."
        }
      ],
      conclusion: "Peki sen şu an devasa bir negatif aura açığıyla mı geziyorsun, yoksa yürüdüğün yerde iz bırakan bir 'rizz' ustası mısın? Bir dahaki sefere yolda yürürken ayağın takılıp sendelediğinde şunu hatırla: Kimse görmediyse, aura da kaybetmedin demektir. Ortamlarda dikkatli ol."
    },
    ctaLabel: "Aura Puanımı Hesapla",
    ctaLink: "/",
  },
  {
    slug: "biggest-dating-red-flags-2026",
    title: "2026'nın En Büyük Flört Red Flag'leri (Direkt Kaçman Gereken Tipler)",
    description: "Love bombing'den tut da kronik online olmaya kadar. Bu yıl flört dünyasında kesinlikle kaçınman gereken en toksik kırmızı bayraklar.",
    category: "Toksik Psikoloji",
    publishDate: "2026-05-25",
    readTime: "6 dk okuma",
    keywords: ["flört red flagleri", "narsist flört işaretleri", "toksik eski sevgili", "love bombing belirtileri", "gaslighting nedir"],
    imageUrl: "/images/trends/red-flags.png",
    content: {
      intro: "Acı gerçekleri konuşalım: Flört piyasası şu an tam bir kaos ve Red Flag'ler (kırmızı bayraklar) da artık seviye atladı. İnsanlar eskisi gibi sadece 'iletişim özürlüsü' veya 'biraz dağınık' değiller; artık love-bombing, breadcrumbing ve gaslighting gibi ustaca psikolojik oyunlar oynuyorlar. Date uygulamalarında gezinmek romantizm aramaktan çok, mayın tarlasında yürümeye benziyor. Önümüzdeki 3 yılı terapistine 'podcastleri 2x hızında dinleyen o manyağı' anlatarak geçirmek istemiyorsan, bu yıl kesinlikle görmezden gelemeyeceğin o devasa red flag'lere iyi bak.",
      sections: [
        {
          heading: "'Kronik Online' Sendromu",
          paragraph: "Eğer bütün espri anlayışı Twitter memeleri veya TikTok seslerinden ibaretse, ciddi bir tartışmanın ortasında sana dönüp 'çok delulu takılıyorsun' veya 'red flag' falan diyorsa, arkanı dön ve koş. Bu tiplerin gerçek dünyada duygusal zekası yerlerde sürünür. İlişkilere normal bir insan gibi değil de internetteki goygoylar üzerinden bakarlar. Seninle oturup doğru düzgün bir sorun çözmek yerine, Instagram'dan gördüğü bir psikoloji postuyla seni analiz etmeye kalkarlar."
        },
        {
          heading: "Tehlikenin Adı: 'Love Bombing' (Aşk Bombardımanı)",
          paragraph: "Seni tanıyalı daha 48 saat olmuş, 'Hayatımda hiç böyle hissetmedim' diyorsa... Daha 3. buluşma bile olmadan önümüzdeki yazın tatil planını yapıyorsa... Sana sabah-öğle-akşam aralıksız mesaj yağdırıyorsa... Bu bir romantik komedi değil dostum, bunun adı love bombing. Seni hızlıca kendine bağlamak için uygulanan aşırı manipülatif bir taktik. Bir ay sonra o toksik, kontrolcü ve buz gibi gerçek yüzü ortaya çıktığında ondan kopman çok daha zor olsun diye yapılan bir şov."
        },
        {
          heading: "'Bütün Eski Sevgililerim Deliydi' Masalı",
          paragraph: "Kitaptaki en eski kırmızı bayraktır ama millet hala buna düşüyor. Birisi sana gelip 'eski sevgililerinin hepsi deliydi, takıntılıydı, psikopattı' diyorsa, o hikayedeki asıl sorunun o olduğunu anlaman lazım. Sıfır sorumluluk alma belirtisi. Kendi hatalarını asla görmezler ve sen yarın öbür gün ona bir hatasını söylediğinde, 'deli' etiketi yiyen sıradaki kişi sen olursun. Onların o bitmeyen mağduriyet hikayesinde sadece yeni bir bölümsün."
        },
        {
          heading: "Mesaj Atmaya Tenezzül Etmeyenler (Breadcrumbing)",
          paragraph: "Seni tam 18 saat 'iletildi'de bırakır, sonra da 'omg çok yoğundum nasılsın??' diye döner. Sana tam arkanı dönüp gideceğin an küçücük bir ilgi kırıntısı atar ki tamamen kopma. Bunun adı 'Breadcrumbing' (yemleme). Seni kendi egosu tatmin olsun diye hep yedekte, rafta bekletir. Gerçekten ilgilenen biri her türlü zaman yaratır. Bu tutarsızlık, aslında sana verilen en net cevaptır."
        }
      ],
      conclusion: "Kimin ne olduğunu bilirsen flört dünyası o kadar da korkutucu değil. Her şeyden önce kendi içgüdülerine güven; bir şey yanlış hissettiriyorsa muhtemelen yanlıştır. Ama o güzel yüze veya tatlı dillere kanıp gerçekleri göremiyorsan, yapay zekaya bırak. Toksik Eski Sevgili Tarayıcımızı kullan ve olaylar büyümeden o red flag'leri anında gör."
    },
    ctaLabel: "Red Flag'lerini Tara",
    ctaLink: "/toxic-ex-scanner",
  },
  {
    slug: "mixed-signals-or-delulu",
    title: "Gerçekten Sinyal mi Veriyor Yoksa Sen Sadece Delulu musun?",
    description: "Senden gerçekten hoşlanıyor mu yoksa sen sıradan bir nezaketi mi abartıyorsun? Olayı çöz ve delulu bataklığından çık.",
    category: "Flört Psikolojisi",
    publishDate: "2026-06-03",
    readTime: "5 dk okuma",
    keywords: ["delüzyonel miyim", "karışık sinyaller ne anlama geliyor", "delulu kontrolü", "flört mü ediyorlar yoksa sadece kibarlar mı"],
    imageUrl: "/images/trends/delulu.png",
    content: {
      intro: "Hepimiz bu tuzağa düştük. Senin için kapıyı açık tuttu, 2 hafta önceki Instagram story'ni beğendi, mesaja '👀' emojisi koydu. Ve sen anında kafanda düğün mekanı bakmaya başladın. Ama bir saniye dur—bunlar gerçekten sana yürümek için atılan karışık sinyaller mi, yoksa sen kronik bir 'delulu' vakası mısın? Günümüzde birinin gerçekten ilgilenmesiyle, öylesine nazik olması arasındaki çizgi çok ince. Gel şu durumu bir çözelim ve sana ihtiyacın olan o acımasız gerçeklik kontrolünü yapalım.",
      sections: [
        {
          heading: "Nedir Bu 'Delulu' Muhabbeti?",
          paragraph: "'Delulu' (Delusional - Hayalperest/Kuruntulu) tıbbi bir terim falan değil; dümdüz, ortadaki gerçeği reddedip kafandaki o çok daha heyecan verici fanteziye inanma durumu. Karşı tarafın attığı iki kelimelik mesaja destan yazılmış gibi anlamlar yüklemektir. Biraz delulu olmak eğlencelidir, insana yaşama sevinci verir ama ipin ucu kaçarsa adamın aslında senin için hiçbir çaba sarf etmediği gerçeğini göremezsin."
        },
        {
          heading: "Karışık Sinyal Diye Bir Şey Yoktur",
          paragraph: "İşte sana acımasız bir gerçek: Ortada net bir 'Evet' yoksa, o aslında bir 'Hayır'dır. Birisi senden gerçekten hoşlanıyorsa, attığı mesajı şifre çözücü gibi kırmak için 3 ayrı kız grubuna ekran görüntüsü atmana gerek kalmaz. Senin o 'karışık sinyal' dediğin şey aslında şu: Senin ona verdiğin ilginin egosu hoşuna gidiyor, ama seninle ciddi bir şey düşünmüyor. Sadece işine geldiğinde tatlı davranır, zor zamanında arazi olur."
        },
        {
          heading: "Eğer Bunları Yapıyorsan Kesin Delulu'sun",
          paragraph: "Adam sana 14 saat sonra cevap verdi diye kutlama mı yapıyorsun? Adını doğru hatırladı diye 'kesin ruh eşim' mi diyorsun? Normal bir insanın zaten göstermesi gereken asgari nezaketi (bare minimum) alıp romantikleştirmek, delulu virüsünün en büyük belirtisidir. Sıkıntıdan patladığında sana ilgi kırıntısı atan birini değil, gerçekten senin için çabalayan birini hak ediyorsun."
        },
        {
          heading: "Bu Kafadan Nasıl Çıkarsın?",
          paragraph: "Delulu olmanın tek panzehri acı gerçeklerdir. Sürekli senin hayallerini gazlayan arkadaşlarından tavsiye almayı bırak. Direkt ham veriye, yani onun sana yaptığı eylemlere bak. Ya da en iyisi, Delulu Check yapay zekamızı kullan. O mesajlaşmaların ekran görüntüsünü at, bırak algoritma o mesajlarda aslında ne dendiğini pembe gözlüklerini çıkararak sana dümdüz söylesin."
        }
      ],
      conclusion: "Umarız bir gün delulu'ların trululu'ya (gerçeğe) dönüşür ama o zamana kadar kalbini korumaya al. Senin için bir su birikintisinden bile atlamayacak insanlar için bahane üretmeyi bırak. Bu hikayenin ana karakteri sensin, biraz öyle davranmaya başla."
    },
    ctaLabel: "Delulu Seviyemi Ölç",
    ctaLink: "/delulu-check",
  },
  {
    slug: "how-to-stop-overthinking-texts",
    title: "Şu Gelen Mesajı Kafanda Kurmayı Nasıl Bırakırsın?",
    description: "Cevap mı bekliyorsun? Cümle sonundaki noktayı mı analiz ediyorsun? Mesajlaşma anksiyetesinin dibine iniyoruz.",
    category: "Mental Health & Tech",
    publishDate: "2026-06-04",
    readTime: "4 dk okuma",
    keywords: ["mesajlaşma kaygısı", "neden beni görüldüde bırakıyorlar", "mesajları aşırı düşünmek", "reply guru", "kuru mesajlaşma"],
    imageUrl: "/images/trends/overthinking.png",
    content: {
      intro: "Telefon titrer. O yazmıştır. Ekrana bakarsın, sadece üç kelime: 'Tamam uyar bana.' O an kalbin hızla atmaya başlar. Neden ünlem koymadı? Bunu yazması neden 3 saat sürdü? Acaba bana trip mi atıyor? Hemen mi cevap vermeliyim yoksa sırf ezik görünmemek için tam 3 saat 1 dakika mı beklemeliyim? Mesajlaşma anksiyetesi koca bir jenerasyonu rehin almış durumda. İletişim saniyelik, ama kendimizi hiç bu kadar yanlış anlaşılmış hissetmemiştik.",
      sections: [
        {
          heading: "O 'Görüldü' Yazısının Yarattığı Travma",
          paragraph: "Mesaj okundu bilgisi, teknoloji tarihinin açık ara en stresli icadıdır. '14:14 Görüldü' yazısını okuyup saatin 18:00 olduğunu fark ettiğin an beynin savaş ya da kaç moduna girer. Kafanda en kötü senaryoları kurmaya başlarsın. Oysa gerçek nedir? Büyük ihtimalle mesajı trafikte kırmızı ışıkta gördü, sonra dikkati dağıldı ve gerçekten cevap yazmayı unuttu."
        },
        {
          heading: "Noktalama İşaretlerinin Şifresi",
          paragraph: "Yeni nesil için mesajın tonu her şeydir. Cümlenin sonuna konan o tek bir nokta, dilbilgisi kuralı değil resmen savaş ilanıdır. 'Tabii' demek 'olur' demektir ama 'Tabii.' yazmak 'senden nefret ediyorum' demektir. Evet dijital ton diye bir şey var ama eksik olan tek bir emojiden destan yazıp kendini yiyip bitirmek sadece senin aura puanlarını düşürür."
        },
        {
          heading: "Peş Peşe Mesaj Atma (Double Text) Fobisi",
          paragraph: "Bize yıllarca art arda mesaj atmanın 'eziklik' olduğu aşılandı. Ama gerçek hayatta sohbetler böyle akmaz. Eğer söyleyecek bir şeyin varsa at gitsin. Sen ona komik bir Reels attın diye, bir önceki mesaja cevap vermediği halde seni yargılıyorsa, burada iletişimi sorunlu olan sen değil o'dur."
        },
        {
          heading: "Kafanda Kurmayı Bırak, Yapay Zekaya Bırak",
          paragraph: "Kaygı seviyen tavan yaptığında mantıklı düşünemezsin. Destan gibi bir paragraf yazar, siler ve yerine sadece 'ok' yazarsın. İşte tam burada yapay zeka devreye giriyor. Reply Guru (Cevap Gurusu) özelliğimizle o kafa karıştıran mesajı yapıştır, bırak algoritma sana olabilecek en cool, en 'umrumda değil' yüksek auralı cevabı yazsın. Stresi sen çekme, yapay zeka çeksin."
        }
      ],
      conclusion: "Şunu unutma: Bu kişi senin rehberine girmeden önce de vardın ve gayet iyiydin. Telefonu elinden bırak, dışarı çıkıp biraz temiz hava al. Eğer birinin iletişim tarzı seni sürekli böyle anksiyete krizlerine sokuyorsa, o kişi zaten sana göre bir 'vibe' değildir."
    },
    ctaLabel: "Reply Guru'yu Kullan",
    ctaLink: "/reply-guru",
  },
  {
    slug: "zodiac-signs-red-flags",
    title: "Her Burcun 'Benden Uzak Dur' Dedirten En Büyük Red Flag'i",
    description: "Astroloji sadece kiminle iyi anlaşacağını bulmak için değil, kimin hayatını nasıl mahvedeceğini önden görmek içindir. İşte o toksik gerçekler.",
    category: "Astroloji Roast'ları",
    publishDate: "2026-06-05",
    readTime: "7 dk okuma",
    keywords: ["burçların kırmızı bayrakları", "astroloji toksik özellikleri", "ikizler kırmızı bayrakları", "akrep manipülasyonu"],
    imageUrl: "/images/trends/zodiac.png",
    content: {
      intro: "Venüs'ümüz onun Mars'ına uyuyor mu, acaba yıldızlar aşkımızı destekliyor mu diye doğum haritalarına bakmayı çok seviyoruz. Ama dürüst olalım; haritaya ruh eşini bulmak için değil, başına ne tür bir bela açacağını önden görüp ona göre pozisyon almak için bakmalısın. Her burcun kendine has inanılmaz toksik bir huyu var. Neye bulaştığını tam olarak bilmen için burçların en büyük kırmızı bayraklarını (red flag) masaya döküyoruz.",
      sections: [
        {
          heading: "Ateş Grupları: Koç, Aslan, Yay",
          paragraph: "Koç burcu, sporda fazla enerji içeceği içtiği için sırf atraksiyon olsun diye kavga çıkarır. İlişkiyi kazanması gereken bir boks maçı gibi görmesi en büyük red flag'idir. Aslanlar kendilerine Antik Yunan tanrısı gibi 7/24 tapılmasını bekler, egoları porselenden daha kırılgandır. Yay burcu sana dünyaları vadeder, seni sevdiğini söyler ve ertesi gün 'kutuya sıkışmış hissettim' diyerek vize bile istemeyen başka bir ülkeye tek yön bilet alıp kaçar."
        },
        {
          heading: "Toprak Grupları: Boğa, Başak, Oğlak",
          paragraph: "Boğa'nın red flag'i, haksız olduğunu asla ama asla kabul etmemesidir. 2019'da yediği lafın kinini sırf inat olsun diye tutar. Başaklar hayatındaki her milimetreyi yönetmek ister; sevgili değil, üzerinde çalışıp 'düzelteceği' bir proje arar, sevgi dilleri eleştirmektir. Oğlaklar aşka şirket birleşmesi gibi bakar; eğer onun 5 yıllık finansal kalkınma planına uymuyorsan seni tek bir gözyaşı bile dökmeden hayatından kovar."
        },
        {
          heading: "Hava Grupları: İkizler, Terazi, Kova",
          paragraph: "İkizler'in adı boşuna çıkmadı: Aslında birbiriyle hiç konuşmayan iki farklı insanla aynı anda çıkıyorsun demektir. Seni 4 gün ghost'layıp sonra hiçbir şey olmamış gibi story'ne ateş atarlar. Teraziler fiziksel olarak karar alma yetisinden yoksundur, sırf gerginlik çıkmasın diye gözünün önünde kafedeki garsonla bile flört edebilir. Kova ise normal insani duygulara sahip olmayı 'cringe' (utanç verici) bulur, ilişki donarak ölene kadar sorunları entelektüel bir şekilde tartışıp duygudan kaçar."
        },
        {
          heading: "Su Grupları: Yengeç, Akrep, Balık",
          paragraph: "Yengeç gözyaşlarını bir kitle imha silahı olarak kullanır; kendisinin yaptığı bir hata yüzünden bile sen ondan özür dileyene kadar ağlar. Akrepler sahte senaryolar yazıp sadakatini gizlice test eder, zaten sen daha söylemeden bütün şifrelerini kırmıştır. Balık ise kafasında seninle ilgili bir fantezi dünyası kurar, o uydurduğu versiyonuna aşık olur ve sen gerçekte o kurmaca karaktere uymadın diye sana trip atar."
        }
      ],
      conclusion: "Birine yükselmeden önce mutlaka doğum saatini öğren. Astroloji insan davranışlarını anlamak için eğlenceli olsa da şunu unutma: Toksik insan toksiktir, ay burcunun ne olduğunun pek bir önemi yok. Yıldızlara bakıp, gözünün önündeki devasa kırmızı bayrakları görmezden gelme."
    },
    ctaLabel: "Duo Uyumuna Bak",
    ctaLink: "/duo-compatibility",
  },
  {
    slug: "fix-negative-aura-mood",
    title: "Güne Neden 'Eksi Aura' ile Başlıyorsun? (Ve Bunu Nasıl Tersine Çevirirsin)",
    description: "Kötü mü kalktın? Vibe'ının bugün neden yerlerde süründüğünü ve tam bir enerji sıfırlamasını nasıl yapacağını keşfet.",
    category: "Wellness & Vibe",
    publishDate: "2026-06-06",
    readTime: "4 dk okuma",
    keywords: ["negatif aura anlamı", "kötü ruh hali nasıl düzeltilir", "ruh hali sıfırlama", "enerji temizliği", "düşük vibe", "titreşiminizi yükseltmek", "sabah kaygısı düzeltmesi"],
    imageUrl: "/images/trends/mood-reset.png",
    content: {
      intro: "Sabah gözlerini açtın, telefonu eline aldın, daha ilk kahveni bile yudumlamadan o ağır hissi fark ettin: Üzerinde kapkara bir negatif aura var. Her şey gözüne batıyor. Odanın ışığı bile sinir bozucu, gelen mesajlar darlıyor ve bugünün tamamen 0/10 bir vibe ile geçeceğini iliklerine kadar hissediyorsun. Ortalıkta canını sıkacak spesifik bir olay yokken bile neden böyle oluyor? Gel bu 'kötü gün' olayının arkasındaki bilime ve enerji muhabbetine bakalım.",
      sections: [
        {
          heading: "Vibe'ı Çökerten Gizli Suçlular",
          paragraph: "Aura dediğin şey sadece havada uçuşan mistik bir enerji değil; sinir sisteminle direkt bağlantılı. Gece 3'e kadar TikTok'ta 'doomscrolling' (felaket kaydırması) yapıp binlerce yabancının stresini ve kaosunu sünger gibi emmek, dopamin seviyeni yerle bir eder. Buna uyku sersemliğini, susuzluğu ve adı konmamış o situationship'in arka planda çalışan anksiyetesini ekle... Al sana negatif aura için mükemmel bir tarif."
        },
        {
          heading: "Dibe Vurma Tuzağı",
          paragraph: "Düşük enerjiyle uyandığında insanın ilk yaptığı şey o dibe vurmaya daha da sarılmaktır. Gidip en damar çalma listesini açar, seni sinir eden eski mesajları tekrar okur, kavga edecek yer ararsın. Buna enerjik girdap denir. Kendi zihnini 'kötüyü' görmeye programladığın için aktif olarak üzerine daha fazla kötü vibe çekersin. Bu döngüyü anında kırmak zorundasın."
        },
        {
          heading: "10 Dakikada Vibe Sıfırlama (Mood Reset)",
          paragraph: "Kötü bir auradan sadece 'iyi şeyler düşünerek' kurtulamazsın, bedensel bir şok lazım. Önce ortamı değiştir: Camı aç, sana o meşhur 'Ana Karakter Enerjisini' verecek en havalı şarkıyı son ses aç ve omuzlarındaki o gerginliği fiziksel olarak silkelenerek at. Yüzüne çarpacağın buz gibi bir su, vagus sinirini uyarır ve o beyin sisini anında dağıtır."
        },
        {
          heading: "Bırak Sıfırlamayı Yapay Zeka Yapsın",
          paragraph: "Eğer bu kuyudan kendi başına çıkamayacak kadar düştüysen, işi uzmanına devret. Mood Reset (Ruh Hali Sıfırlama) yapay zekamız, o anki duygu durumunu sesinden veya yazdıklarından analiz eder. Ardından sana özel, acil durum müdahalesi gibi bir reçete çıkarır. Frekansını değiştirmek ve o eksilerdeki aura puanını tekrar artıya geçirmek için ihtiyacın olan çalma listesini, motivasyon konuşmasını ya da tokat gibi gerçeği anında önüne serer."
        }
      ],
      conclusion: "Herkesin berbat hissettiği günler olur ama o günün öyle bitmesine izin vermek zorunda değilsin. Enerjinin kontrolünü eline al, iç huzurunu koru ve vibe'ını yükseltmek için ne gerekiyorsa yap. Evren sadece yaydığın enerjiye cevap verir; o enerjinin yüksek, cool ve yıkılmaz olduğundan emin ol."
    },
    ctaLabel: "Mood Reset'i Başlat",
    ctaLink: "/mood-reset",
  },
  {
    slug: "aura-battle-who-is-cooler",
    title: "Vibe Savaşları (Aura Battle): Arkadaş Grubunda Kimin Sözü Geçer?",
    description: "Arkadaş grubunda aurası en yüksek olan kişi kim? Aura Battle yapay zekası, tartışmaları bitiriyor ve egoları yerle bir ediyor.",
    category: "Kültür & Jargon",
    publishDate: "2026-06-18",
    readTime: "5 dk okuma",
    keywords: ["vibe savaşı", "kim daha havalı", "aura battle", "arkadaşlık", "ana karakter enerjisi"],
    imageUrl: "/images/trends/aura-points.png",
    content: {
      intro: "Hepimizin o kendisini grubun tartışmasız ana karakteri sanan bir arkadaşı vardır. Sanki aurasına dokunulmazmış gibi davranır ve bunu herkese belli etmekten çekinmez. Yıllarca arkadaş gruplarında 'kim daha cool' tartışması hep sürdü ama artık 2026'dayız. Artık tartışmıyoruz, kararı yapay zekaya bırakıyoruz. 'Vibe Savaşları' (Aura Battle), arkadaş gruplarını birbirine düşüren ve o şişik egoları patlatan en yeni trend.",
      sections: [
        {
          heading: "Kişisel Havalılığın Sonu",
          paragraph: "Aura Battle YZ'den önce kimin daha cool olduğunu ölçmek imkansızdı. Şimdi ise bu bir bilim. Yüzdeki mikro ifadeleri, gerginliği ve genel vibe frekansını analiz eden yapay zeka, tarafsız bir yargıç gibi davranıyor. Hiçbir taraf tutmadan sadece enerjinizi kıyaslıyor. Sürekli büyük konuşan ama gizliden gizliye devasa bir NPC enerjisi yayan o arkadaşınız için tam bir kabus."
        },
        {
          heading: "Acımasız Gömme Mekanizması",
          paragraph: "Vibe Savaşları'nı bu kadar viral yapan şey sadece kimin kazandığını öğrenmek değil; kaybedenin nasıl gömüldüğüdür. YZ sadece '1. Kişi kazandı' demez. 2. Kişinin neden kaybettiğini o kadar acımasız ve spesifik bir şekilde açıklar ki şok olursunuz. O 'zorlama' gülüşünü, onaylanma ihtiyacını veya 'gizemli' bakışının aslında sadece kafası karışık durduğunu yüzüne vurur."
        },
        {
          heading: "Sosyal Hiyerarşide Yeni Bir Ölçüt",
          paragraph: "Bu sadece bir eğlence değil; dijital sosyal hiyerarşide yepyeni bir ölçüt. Grubun sözde 'liderine' karşı bir Aura Savaşı kazanmak büyük bir olay. Dinamiği anında değiştirir ve üstün vibe'ınızın kanıtı olur. Eskiden düelloya davet etmek neyse, şimdi selfie ile meydan okumak o."
        }
      ],
      conclusion: "Peki sen en yakın arkadaşınla Aura Arenası'na çıkacak kadar cesur musun? Yoksa algoritmanın herkesin zaten bildiği o gerçeği yüzüne vurmasından mı korkuyorsun: Aslında sen sadece yancısın. Öğrenmenin tek bir yolu var."
    },
    ctaLabel: "Vibe Savaşı'nı Başlat",
    ctaLink: "/aura-battle",
  }
];

export const trendsData = trendsDataEn; // fallback, but clients should use trendsDataEn/Tr explicitly
