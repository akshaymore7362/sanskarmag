import { events } from "@/data/events";

export const eventService = {
  all: () => events,
  featured: () => events[0],
  upcoming: () => events.slice(0, 5),
  past: () => events.slice(5),
  bySlug: (slug: string) => events.find((event) => event.slug === slug),
};
