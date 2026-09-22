import { articleService } from "@/services/articleService";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import { industryService } from "@/services/industryService";

/**
 * Builds a compact, factual snapshot of real site content (latest articles,
 * magazines, leaders, industries) for the chatbot's system prompt — this is
 * the ONLY source of truth it's allowed to reference for links and facts
 * about specific content, so it never has to invent a title, slug, or URL.
 */
export async function buildSiteKnowledgeSnapshot(): Promise<string> {
  const [articles, magazines, leaders, industries] = await Promise.all([
    articleService.fetchSanityArticles().catch(() => []),
    magazineService.fetchSanityMagazines().catch(() => []),
    leaderService.fetchSanityLeaders().catch(() => []),
    industryService.fetchSanityIndustries().catch(() => []),
  ]);

  const articleLines = articles
    .slice(0, 12)
    .map((a) => `- "${a.title}" (/blogs/${a.slug})${a.category ? ` — category: ${a.category}` : ""}${a.description ? ` — ${a.description.slice(0, 140)}` : ""}`)
    .join("\n");

  const magazineLines = magazines
    .slice(0, 8)
    .map((m) => `- "${m.title}" (/magazines/${m.slug})${m.date ? ` — ${m.date}` : ""}`)
    .join("\n");

  const leaderLines = leaders
    .slice(0, 12)
    .map((l) => `- ${l.name}, ${l.role || "Executive"}${l.company ? ` at ${l.company}` : ""} (/leaders/${l.slug})`)
    .join("\n");

  const industryLines = industries
    .slice(0, 12)
    .map((i) => `- ${i.name} (/industries/${i.slug})`)
    .join("\n");

  return `
REAL SITE NAVIGATION (only use these exact paths when linking — never invent a path):
- Home: /
- Digital Magazines: /magazines
- Articles & Blogs: /blogs
- Industries Directory: /industries
- Executive Leaders / Web Profiles: /leaders
- Startups Watch: /startups
- Insights: /insights
- About Us: /about
- Contact / Support: /contact
- Advertise With Us: /advertise
- Media Kit: /media-kit
- Subscribe: /subscribe

LATEST ARTICLES (title, real URL, category, short excerpt):
${articleLines || "(none currently available)"}

LATEST MAGAZINE ISSUES (title, real URL):
${magazineLines || "(none currently available)"}

FEATURED EXECUTIVE LEADERS / WEB PROFILES (name, role, real URL):
${leaderLines || "(none currently available)"}

INDUSTRY SECTORS COVERED (name, real URL):
${industryLines || "(none currently available)"}

ABOUT THE SUCCESS WORLD:
The Success World is a global executive magazine and digital platform delivering executive briefings, leadership profiles, industry intelligence, and business/economic insights for operators and global business leaders. It publishes digital magazine issues, articles, executive web profiles, and industry-specific coverage.
`.trim();
}
