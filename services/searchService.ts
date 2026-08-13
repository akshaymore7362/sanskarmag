import { articles } from "@/data/articles";
import { events } from "@/data/events";
import { industries } from "@/data/industries";
import { leaders } from "@/data/leaders";
import { magazineIssues } from "@/data/magazines";
import { startups } from "@/data/startups";

export const searchService = {
  results: (query = "") => {
    const needle = query.trim().toLowerCase();
    const matches = (value: string) => !needle || value.toLowerCase().includes(needle);

    return {
      articles: articles.filter((item) => matches(`${item.title} ${item.category} ${item.description}`)).slice(0, 8),
      leaders: leaders.filter((item) => matches(`${item.name} ${item.role} ${item.company}`)).slice(0, 6),
      industries: industries.filter((item) => matches(`${item.name} ${item.descriptor}`)).slice(0, 6),
      startups: startups.filter((item) => matches(`${item.name} ${item.sector} ${item.summary}`)).slice(0, 6),
      events: events.filter((item) => matches(`${item.title} ${item.location}`)).slice(0, 4),
      magazines: magazineIssues.filter((item) => matches(`${item.title} ${item.date}`)).slice(0, 4),
    };
  },
};
