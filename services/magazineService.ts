import { currentIssue, magazineIssues } from "@/data/magazineIssues";

export const magazineService = {
  all: () => magazineIssues,
  current: () => currentIssue,
  bySlug: (slug: string) => magazineIssues.find((issue) => issue.slug === slug),
};
