import { startups } from "@/data/startups";

export const startupService = {
  all: () => startups,
  featured: () => startups.slice(0, 4),
  bySlug: (slug: string) => startups.find((startup) => startup.slug === slug),
  bySector: (sector: string) => startups.filter((startup) => startup.sector === sector),
};
