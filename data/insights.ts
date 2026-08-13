import type { Insight } from "@/types";
import { articles } from "@/data/articles";

const insightSlugs = [
  "future-belongs-to-bold",
  "ai-transforming-live-work",
  "building-resilient-business-models",
  "new-rules-corporate-culture",
  "leadership-age-constant-change",
  "enterprise-risk-after-volatility",
  "ai-governance-board-agenda",
  "executive-learning-ai-era",
  "customer-experience-operating-model",
  "global-outlook-risks-opportunities",
  "innovation-at-scale-lessons",
  "why-sustainable-growth-matters",
  "private-credit-risk-discipline",
  "independent-media-business-models",
  "leadership-beyond-boardroom",
];

export const insights: Insight[] = insightSlugs
  .map((slug) => articles.find((article) => article.slug === slug))
  .filter((article): article is Insight => Boolean(article));
