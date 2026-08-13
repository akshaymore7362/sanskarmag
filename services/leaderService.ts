import { leaders } from "@/data/leaders";

export const leaderService = {
  all: () => leaders,
  featured: () => leaders[0],
  bySlug: (slug: string) => leaders.find((leader) => leader.slug === slug),
};
