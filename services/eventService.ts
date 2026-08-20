import { fetchSanityQuery } from "@/lib/sanity.client";
import { events as staticEvents } from "@/data/events";
import type { EventItem } from "@/types";

export const eventService = {
  all: (): EventItem[] => staticEvents,
  featured: (): EventItem => staticEvents[0],
  upcoming: (): EventItem[] => staticEvents,
  past: (): EventItem[] => [],
  bySlug: (slug: string): EventItem | undefined => staticEvents.find((evt) => evt.slug === slug),

  fetchSanityEvents: async (): Promise<EventItem[]> => {
    try {
      const query = `*[_type == "event"] | order(eventDate asc){
        _id,
        title,
        "slug": slug.current,
        eventDate,
        day,
        month,
        date,
        location,
        description,
        registrationUrl,
        imageAlt,
        featuredOnHome,
        "imageUrl": coalesce(coverImage.asset->url, image.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        const sanityEvents: EventItem[] = data.map((item: any, idx: number) => {
          let day = item.day || "15";
          let month = item.month || "SEP";
          let dateStr = item.date || "September 15, 2026";

          if (item.eventDate) {
            try {
              const d = new Date(item.eventDate);
              day = String(d.getDate()).padStart(2, "0");
              month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
              dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            } catch {}
          }

          return {
            id: item._id || String(idx + 1),
            slug: item.slug || `event-${idx + 1}`,
            title: item.title,
            day,
            month,
            date: dateStr,
            location: item.location || "San Francisco, CA",
            description: item.description || "",
            image: item.imageUrl || staticEvents.find(e => e.slug === item.slug)?.image || staticEvents[idx % staticEvents.length]?.image || "",
            imageAlt: item.imageAlt || item.title,
            registrationUrl: item.registrationUrl,
            agenda: [],
            speakers: [],
            featuredOnHome: item.featuredOnHome,
          };
        });

        const sanitySlugs = new Set(sanityEvents.map((evt) => evt.slug));
        const blended = [
          ...sanityEvents,
          ...staticEvents.filter((evt) => !sanitySlugs.has(evt.slug)),
        ];
        return blended;
      }
    } catch (e) {
      console.warn("Sanity event fetch warning:", e);
    }
    return staticEvents;
  },

  fetchHomeEvents: async (): Promise<EventItem[]> => {
    try {
      const query = `*[_type == "event" && featuredOnHome == true] | order(eventDate asc){
        _id,
        title,
        "slug": slug.current,
        eventDate,
        day,
        month,
        date,
        location,
        description,
        registrationUrl,
        "imageUrl": coalesce(coverImage.asset->url, image.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return data.map((item: any, idx: number) => {
          let day = item.day || "15";
          let month = item.month || "SEP";
          let dateStr = item.date || "September 15, 2026";

          if (item.eventDate) {
            try {
              const d = new Date(item.eventDate);
              day = String(d.getDate()).padStart(2, "0");
              month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
              dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            } catch {}
          }

          return {
            id: item._id || String(idx + 1),
            slug: item.slug || `event-${idx + 1}`,
            title: item.title,
            day,
            month,
            date: dateStr,
            location: item.location || "San Francisco, CA",
            description: item.description || "",
            image: item.imageUrl || staticEvents[idx % staticEvents.length]?.image || "",
            imageAlt: item.title,
            registrationUrl: item.registrationUrl,
            agenda: [],
            speakers: [],
          };
        });
      }
    } catch (e) {
      console.warn("Sanity home events fetch warning:", e);
    }
    return staticEvents.slice(0, 4);
  },
};
