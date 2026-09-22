import { articleService } from "@/services/articleService";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import { industryService } from "@/services/industryService";

/**
 * A fully local, free, no-API-key chatbot engine — intent detection +
 * retrieval against real Sanity content. Used whenever no external AI key
 * (Gemini/OpenAI) is configured, so the chatbot works immediately without
 * any account, billing, or setup. Every fact/link it produces comes from
 * live site data, never invented content.
 */

type Intent =
  | "greeting"
  | "howAreYou"
  | "about"
  | "articles"
  | "magazines"
  | "leaders"
  | "industries"
  | "contact"
  | "advertise"
  | "subscribe"
  | "thanks"
  | "help"
  | "fallback";

const CONTACT_LINE = "You can reach our team directly — [Contact Us](/contact).";

// industryService also returns internal site content-organization
// categories (e.g. "blogs-and-articles", "master-talks", "web-profiles")
// that share the same Sanity types but aren't real industry sectors with a
// working detail page — only these have one, so only these should ever be
// surfaced to a visitor as "industries we cover".
const VALID_INDUSTRY_SLUGS = new Set(["healthcare", "legal", "tech-ai", "manufacturing-products", "transportation", "finance"]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

// Cheap fuzzy match so common typos ("magazin", "artcle", "leadres") still
// hit the right intent — word-level Levenshtein distance <= 1 counts as a
// match for keywords of 4+ letters.
function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function fuzzyIncludes(words: string[], keyword: string): boolean {
  const maxDistance = keyword.length >= 6 ? 2 : keyword.length >= 4 ? 1 : 0;
  return words.some((w) => {
    if (w === keyword) return true;
    if (maxDistance > 0 && Math.abs(w.length - keyword.length) <= maxDistance) {
      return levenshtein(w, keyword) <= maxDistance;
    }
    return false;
  });
}

const INTENT_KEYWORDS: Record<Exclude<Intent, "fallback">, string[]> = {
  greeting: ["hi", "hello", "hey", "yo", "greetings", "morning", "evening", "afternoon"],
  howAreYou: ["how are you", "how're you", "how you doing", "whats up", "what's up", "sup"],
  about: ["about", "who are you", "what is success world", "what is the success world", "company", "magazine about"],
  articles: ["article", "articles", "blog", "blogs", "read", "story", "stories", "post", "posts"],
  magazines: ["magazine", "magazines", "issue", "issues", "edition", "digital magazine", "pdf"],
  leaders: ["leader", "leaders", "executive", "executives", "profile", "profiles", "web profile", "founder", "ceo"],
  industries: ["industry", "industries", "sector", "sectors", "healthcare", "finance", "legal", "manufacturing", "transportation", "tech"],
  contact: ["contact", "support", "help me", "reach", "email", "phone", "get in touch", "reach out"],
  advertise: ["advertise", "advertising", "sponsor", "sponsorship", "partner", "partnership", "ads"],
  subscribe: ["subscribe", "subscription", "newsletter", "sign up"],
  thanks: ["thank", "thanks", "thank you", "appreciate", "cheers"],
  help: ["help", "what can you do", "find something", "options", "menu"],
};

function detectIntent(rawText: string): Intent {
  const words = normalize(rawText).split(" ").filter(Boolean);
  const full = " " + normalize(rawText) + " ";

  // Multi-word phrases first (exact substring), since they're unambiguous.
  const phraseIntents: Exclude<Intent, "fallback">[] = ["howAreYou", "about", "contact", "advertise", "subscribe", "help"];
  for (const intent of phraseIntents) {
    for (const kw of INTENT_KEYWORDS[intent]) {
      if (kw.includes(" ") && full.includes(" " + kw + " ")) return intent;
    }
  }

  // Single-word / fuzzy match across all intents. Specific content nouns
  // (magazines/articles/leaders/industries) are checked before the generic
  // "about" intent, so "tell me about leaders" resolves to leaders, not
  // about — a sentence containing "about" almost always names its real
  // topic elsewhere in the same sentence.
  const order: Exclude<Intent, "fallback">[] = [
    "howAreYou",
    "greeting",
    "thanks",
    "contact",
    "advertise",
    "subscribe",
    "help",
    "magazines",
    "articles",
    "leaders",
    "industries",
    "about",
  ];
  for (const intent of order) {
    for (const kw of INTENT_KEYWORDS[intent]) {
      if (kw.includes(" ")) continue;
      if (fuzzyIncludes(words, kw)) return intent;
    }
  }

  return "fallback";
}

/** If the visitor's message is too short to carry its own intent (e.g. "more",
 * "yes", "show more"), fall back to whatever topic the assistant's previous
 * reply was about — this is the session's lightweight conversation context. */
function inferFollowUpIntent(prevAssistantText: string | undefined): Intent {
  if (!prevAssistantText) return "fallback";
  const t = prevAssistantText.toLowerCase();
  if (t.includes("/magazines/")) return "magazines";
  if (t.includes("/blogs/")) return "articles";
  if (t.includes("/leaders/")) return "leaders";
  if (t.includes("/industries/")) return "industries";
  return "fallback";
}

export async function generateLocalAssistantReply(
  userText: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  const trimmed = userText.trim();
  const shortFollowUp = /^(more|yes|sure|ok|okay|show more|tell me more|continue|next)$/i.test(trimmed);

  let intent = detectIntent(trimmed);
  if (intent === "fallback" && shortFollowUp) {
    const prevAssistant = [...history].reverse().find((m) => m.role === "assistant");
    intent = inferFollowUpIntent(prevAssistant?.content);
  }

  switch (intent) {
    case "greeting":
      return "Hello! 👋 I'm the AI assistant for The Success World. Ask me about our latest articles, digital magazines, executive leaders, or industries we cover.";

    case "howAreYou":
      return "I'm doing great, thanks for asking! How can I help you explore The Success World today?";

    case "thanks":
      return "You're very welcome! Let me know if there's anything else you'd like to explore.";

    case "about":
      return "The Success World is a global executive magazine delivering executive briefings, leadership profiles, industry intelligence, and business insights for operators and global business leaders. You can learn more on our [About Us](/about) page.";

    case "contact":
      return `For anything our team needs to help with directly — partnerships, support, or general inquiries — ${CONTACT_LINE}`;

    case "advertise":
      return "Interested in advertising with us? Check out [Advertise With Us](/advertise) for partnership and sponsorship details, or reach our team via [Contact Us](/contact).";

    case "subscribe":
      return "You can subscribe to get our executive briefings and new issues delivered directly — visit [Subscribe](/subscribe).";

    case "help":
      return "I can help you explore articles, digital magazines, executive leader profiles, and industry coverage — just ask, for example \"show me the latest articles\" or \"who are your featured leaders\".";

    case "articles": {
      const articles = await articleService.fetchSanityArticles().catch(() => []);
      if (articles.length === 0) {
        return `I don't have any articles to show right now. ${CONTACT_LINE}`;
      }
      const top = articles.slice(0, 3);
      const lines = top.map((a) => `- [${a.title}](/blogs/${a.slug})`).join("\n");
      return `Sure! Here are the latest articles:\n${lines}\n\nYou can browse all of them on the [Articles & Blogs](/blogs) page.`;
    }

    case "magazines": {
      const magazines = await magazineService.fetchSanityMagazines().catch(() => []);
      if (magazines.length === 0) {
        return `I don't have any magazine issues to show right now. ${CONTACT_LINE}`;
      }
      const top = magazines.slice(0, 3);
      const lines = top.map((m) => `- [${m.title}](/magazines/${m.slug})`).join("\n");
      return `Here are our latest digital magazine issues:\n${lines}\n\nExplore the full library on the [Digital Magazines](/magazines) page.`;
    }

    case "leaders": {
      const leaders = await leaderService.fetchSanityLeaders().catch(() => []);
      if (leaders.length === 0) {
        return `I don't have any leader profiles to show right now. ${CONTACT_LINE}`;
      }
      const top = leaders.slice(0, 3);
      const lines = top.map((l) => `- [${l.name}${l.role ? `, ${l.role}` : ""}](/leaders/${l.slug})`).join("\n");
      return `Here are some featured executive leaders:\n${lines}\n\nSee the full directory on the [Executive Leaders](/leaders) page.`;
    }

    case "industries": {
      const allIndustries = await industryService.fetchSanityIndustries().catch(() => []);
      const industries = allIndustries.filter((i) => VALID_INDUSTRY_SLUGS.has(i.slug));
      if (industries.length === 0) {
        return `I don't have any industry pages to show right now. ${CONTACT_LINE}`;
      }
      const top = industries.slice(0, 6);
      const lines = top.map((i) => `- [${i.name}](/industries/${i.slug})`).join("\n");
      return `Here are the industry sectors we cover:\n${lines}\n\nVisit the [Industries Directory](/industries) to explore more.`;
    }

    default:
      return `I don't have enough information to answer that accurately. ${CONTACT_LINE} You can also ask me about our latest articles, magazines, leaders, or industries.`;
  }
}
