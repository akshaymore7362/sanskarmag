import type { MagazineIssue, MagazineStory } from "@/types";
import { magazinePhotos } from "@/data/media";

const storyTitles = [
  "Leadership 2.0",
  "The Future of AI",
  "Global Market Outlook",
  "Startups to Watch",
  "Innovation at Scale",
  "Building Resilient Teams",
  "The Energy Transition",
  "Healthcare Reinvented",
  "Capital With Conviction",
  "The New Rules of Culture",
];

const issueSeeds = [
  ["Issue 24", "may-2026-next-big-shift", "May 2026", "The Next Big Shift", "Leadership, technology, strategy and the future of business.", "/images/magazine/current-cover.jpg"],
  ["Issue 23", "april-2026-resilient-growth", "April 2026", "Resilient Growth", "How disciplined companies create durable momentum.", magazinePhotos[1]],
  ["Issue 22", "march-2026-ai-operating-system", "March 2026", "The AI Operating System", "Boards, builders and operators enter the applied intelligence era.", magazinePhotos[2]],
  ["Issue 21", "february-2026-founder-energy", "February 2026", "Founder Energy", "Inside the leaner, sharper startup economy.", magazinePhotos[3]],
  ["Issue 20", "january-2026-global-signals", "January 2026", "Global Signals", "Markets, policy and opportunity at the start of a new cycle.", magazinePhotos[4]],
  ["Issue 19", "december-2025-year-in-leadership", "December 2025", "Year in Leadership", "The decisions, people and ideas that shaped business.", magazinePhotos[5]],
  ["Issue 18", "november-2025-cities-of-tomorrow", "November 2025", "Cities of Tomorrow", "Real estate, mobility and infrastructure for resilient regions.", magazinePhotos[6]],
  ["Issue 17", "october-2025-human-enterprise", "October 2025", "The Human Enterprise", "Culture, learning and trust in modern organizations.", magazinePhotos[7]],
] as const;

function storiesFor(issueSlug: string, issueIndex: number): MagazineStory[] {
  const count = issueIndex < 2 ? 7 : 6;
  return Array.from({ length: count }, (_, index) => {
    const title = storyTitles[(issueIndex + index) % storyTitles.length];
    return {
      id: `${issueSlug}-story-${index + 1}`,
      slug: `${issueSlug}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
      title,
      category: ["Leadership", "Technology", "Finance", "Startups", "Strategy"][index % 5],
      author: ["Sarah Johnson", "Marcus Lee", "Priya Nair", "Neha Verma", "Daniel Jacob"][index % 5],
      articleSlug: [
        "the-visionaries-building-tomorrow",
        "ai-transforming-live-work",
        "global-markets-outlook-opportunities",
        "idea-to-impact-startup-success",
        "innovation-at-scale-lessons",
      ][index % 5],
      page: 12 + index * 8,
    };
  });
}

export const magazineIssues: MagazineIssue[] = issueSeeds.map((seed, index) => {
  const [issue, slug, date, title, subtitle, cover] = seed;
  const stories = storiesFor(slug, index);

  return {
    issue,
    slug,
    date,
    title,
    subtitle,
    cover,
    coverAlt: `${title} magazine cover for The Success World`,
    contents: stories.slice(0, 5).map((story) => story.title),
    description: `${subtitle} This issue brings together field reporting, executive interviews and practical frameworks for leaders navigating change.`,
    stories,
  };
});

export const magazineStories: MagazineStory[] = magazineIssues.flatMap((issue) => issue.stories);
export const currentIssue = magazineIssues[0];
