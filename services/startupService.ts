import { fetchSanityQuery } from "@/lib/sanity.client";
import { startups as staticStartups } from "@/data/startups";
import type { Startup } from "@/types";

export const startupService = {
  all: (): Startup[] => staticStartups,
  featured: (): Startup[] => staticStartups.slice(0, 4),
  bySlug: (slug: string): Startup | undefined => staticStartups.find((stp) => stp.slug === slug),
  bySector: (sector: string): Startup[] => staticStartups.filter((stp) => stp.sector === sector),

  fetchSanityStartups: async (): Promise<Startup[]> => {
    try {
      const query = `*[_type == "startup"]{
        _id,
        name,
        "slug": slug.current,
        stage,
        "sector": coalesce(industry->name, industry->title, sector, "Technology"),
        founder,
        location,
        "summary": coalesce(description, summary),
        imageAlt,
        featuredOnHome,
        "imageUrl": coalesce(coverImage.asset->url, logo.asset->url, image.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        const sanityStartups: Startup[] = data.map((item: any, idx: number) => ({
          id: item._id || String(idx + 1),
          slug: item.slug || `startup-${idx + 1}`,
          name: item.name,
          stage: item.stage || "Series A",
          sector: item.sector || "Technology",
          location: item.location || "San Francisco",
          summary: item.summary || "",
          founder: item.founder || "Founder",
          image: item.imageUrl || staticStartups.find(s => s.slug === item.slug)?.image || staticStartups[idx % staticStartups.length]?.image || "",
          imageAlt: item.imageAlt || item.name,
          featuredOnHome: item.featuredOnHome,
        }));

        const sanitySlugs = new Set(sanityStartups.map((stp) => stp.slug));
        const blended = [
          ...sanityStartups,
          ...staticStartups.filter((stp) => !sanitySlugs.has(stp.slug)),
        ];
        return blended;
      }
    } catch (e) {
      console.warn("Sanity startup fetch warning:", e);
    }
    return staticStartups;
  },

  fetchHomeStartups: async (): Promise<Startup[]> => {
    try {
      const query = `*[_type == "startup" && featuredOnHome == true]{
        _id,
        name,
        "slug": slug.current,
        stage,
        "sector": coalesce(industry->name, industry->title, sector, "Technology"),
        founder,
        location,
        "summary": coalesce(description, summary),
        "imageUrl": coalesce(coverImage.asset->url, logo.asset->url, image.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return data.map((item: any, idx: number) => ({
          id: item._id || String(idx + 1),
          slug: item.slug || `startup-${idx + 1}`,
          name: item.name,
          stage: item.stage || "Series A",
          sector: item.sector || "Technology",
          location: item.location || "San Francisco",
          summary: item.summary || "",
          founder: item.founder || "Founder",
          image: item.imageUrl || staticStartups[idx % staticStartups.length]?.image || "",
          imageAlt: item.name,
        }));
      }
    } catch (e) {
      console.warn("Sanity home startups fetch warning:", e);
    }
    return staticStartups.slice(0, 4);
  },
};
