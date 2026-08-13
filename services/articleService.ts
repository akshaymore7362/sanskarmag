import { articles } from "@/data/articles";

export const articleService = {
  all: () => articles,
  hero: () => articles[0],
  featured: () => articles[1],
  secondary: () => articles.slice(2, 6),
  latest: () => articles.slice(6, 18),
  bySlug: (slug: string) => articles.find((article) => article.slug === slug),
  byIndustry: (industrySlug: string) => articles.filter((article) => article.industrySlug === industrySlug),
  related: (slug: string) => articles.filter((article) => article.slug !== slug).slice(0, 4),
  trending: () => articles.slice(1, 6),
};
