import { industries } from "@/data/industries";

export const industryService = {
  all: () => industries,
  bySlug: (slug: string) => industries.find((industry) => industry.slug === slug),
};
