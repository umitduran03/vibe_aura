export interface TrendArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  readTime: string;
  keywords: string[];
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
    readTime: "3 min read",
    keywords: ["AI face reading", "fotoğraf analizi", "AI personality test photo", "yüz okuma yapay zeka", "viral TikTok trend", "aura reading face"],
    content: {
      intro: "You've seen it all over TikTok and X: people uploading their selfies and getting brutally honest, shockingly accurate personality breakdowns from artificial intelligence. It's no longer just about astrology or simple quizzes; AI photo personality tests are the new way to discover what your vibe really says to the world.",
      sections: [
        {
          heading: "How Does AI Face Reading Work?",
          paragraph: "Modern AI doesn't just look at whether you're smiling or frowning. It analyzes micro-expressions, facial symmetry, lighting choices, and eye shapes to build a psychological profile. Are you giving 'Golden Retriever' energy or 'Chronically Online' vibes? The AI knows within seconds."
        },
        {
          heading: "Why It's So Accurate (and Brutal)",
          paragraph: "Unlike human friends who sugarcoat their opinions, a trained AI model delivers unfiltered truth. If your selfie screams 'unresolved trauma' or 'narcissist', the AI will tell you. It's the ultimate reality check."
        },
        {
          heading: "The VibeCheckr Difference",
          paragraph: "Our proprietary AI engine takes this to the next level. We combine advanced facial aura scanning with your zodiac sign to calculate a definitive 'Vibe Score', expose your deepest red flags, and even tell you what kind of person you are destined to date."
        }
      ],
      conclusion: "Are you brave enough to get roasted by an algorithm? Or are you scared it might be a little too accurate?"
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
    readTime: "4 min read",
    keywords: ["situationship nedir", "ilişki miyiz arkadaş mı", "situationship red flags", "dating advice 2026", "toxic relationships"],
    content: {
      intro: "You text every day. You hang out on weekends. You even met their dog. But when someone asks what you are, you freeze. Welcome to the 'Situationship'—the most stressful romantic dynamic of our generation.",
      sections: [
        {
          heading: "The Core Difference",
          paragraph: "A relationship has defined boundaries, mutual commitment, and a trajectory for the future. A situationship operates purely on convenience. It's the illusion of intimacy without the safety of commitment."
        },
        {
          heading: "Massive Red Flags",
          paragraph: "If they only text you after 10 PM, introduce you as 'my friend' to others, or actively avoid the 'what are we' conversation, you aren't in a relationship. You are an option."
        },
        {
          heading: "How to Break the Cycle",
          paragraph: "You need clarity. Sometimes, human intuition is clouded by hope. That's why uploading a photo of you two to our Duo Compatibility AI can give you the objective, brutal truth about your dynamic."
        }
      ],
      conclusion: "Don't waste another six months guessing. Get the clarity you deserve."
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
    readTime: "2 min read",
    keywords: ["aura puanı nedir", "aura points meme", "how to get aura points", "gen-z slang explained", "what is aura"],
    content: {
      intro: "In 2026, social status isn't measured by your bank account or your follower count; it's measured by your Aura Points. But what exactly are they, and how do you stop losing them?",
      sections: [
        {
          heading: "The Origin of Aura Points",
          paragraph: "Aura points started as a viral meme to describe the invisible energy or 'cool factor' a person emits. It's like a real-life video game stat. Do something incredibly smooth? +1000 Aura. Trip over flat ground in front of your crush? -5000 Aura."
        },
        {
          heading: "How to Protect Your Aura",
          paragraph: "The key to maintaining high aura is 'Main Character Energy'—staying unbothered, mysterious, and confident regardless of the situation. Never double text. Never let them see you panic."
        },
        {
          heading: "Calculating Your True Score",
          paragraph: "While the internet jokes about adding or subtracting points manually, our AI actually calculates your baseline Aura Score based on your facial expressions and digital footprint vibe."
        }
      ],
      conclusion: "Are you running on a negative aura deficit, or are you glowing with undeniable rizz?"
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
    readTime: "5 min read",
    keywords: ["dating red flags", "toksik insan özellikleri", "narsist sevgili", "toxic ex", "dating advice"],
    content: {
      intro: "The dating pool is chaotic, and the red flags have evolved. People aren't just 'bad communicators' anymore; they are love-bombing, breadcrumbing, gaslighting nightmares. Here are the warning signs you can't ignore.",
      sections: [
        {
          heading: "The 'Chronically Online' Complex",
          paragraph: "If their entire sense of humor is based on X (Twitter) memes and they use words like 'delulu' in serious arguments, run. They lack real-world emotional intelligence."
        },
        {
          heading: "Love Bombing Phase",
          paragraph: "They tell you they've never felt this way before after 48 hours of knowing you. This isn't a rom-com; this is a manipulation tactic to secure your attachment before they reveal their toxic side."
        },
        {
          heading: "The Ex Excuse",
          paragraph: "If all of their exes are 'crazy', you are about to become the next 'crazy ex'. It's a classic lack of accountability. Luckily, you can scan their face with our AI to see exactly how toxic they really are."
        }
      ],
      conclusion: "Trust your gut, but when your gut fails you, trust the AI."
    },
    ctaLabel: "Scan Your Ex's Red Flags",
    ctaLink: "/toxic-ex-scanner",
  }
];
