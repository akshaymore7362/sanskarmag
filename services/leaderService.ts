import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Leader } from "@/types";

export const leaderService = {
  all: (): Leader[] => [],
  featured: (): Leader | undefined => undefined,
  bySlug: (slug: string): Leader | undefined => undefined,

  fetchSanityLeaders: async (): Promise<Leader[]> => {
    try {
      const query = `*[_type == "leader"]{
        _id,
        name,
        "slug": slug.current,
        "role": coalesce(designation, role),
        company,
        "industrySlug": coalesce(industry->slug.current, industrySlug, "technology"),
        "bio": coalesce(biography, bio),
        imageAlt,
        featuredOnHome,
        "imageUrl": coalesce(profileImage.asset->url, image.asset->url, mainImage.asset->url, photo.asset->url, portrait.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return data.map((item: any, idx: number) => ({
          id: item._id || String(idx + 1),
          slug: item.slug || `leader-${idx + 1}`,
          name: item.name || "Executive Leader",
          role: item.role || "Leader",
          company: item.company || "Enterprise",
          industrySlug: item.industrySlug || "technology",
          bio: item.bio || "",
          image: item.imageUrl || "",
          imageAlt: item.imageAlt || item.name || "Leader Image",
          highlights: [],
          quote: "",
          featuredOnHome: item.featuredOnHome,
        }));
      }
    } catch (e) {
      console.warn("Sanity leader fetch warning:", e);
    }
    return [];
  },

  fetchHomeLeaders: async (): Promise<Leader[]> => {
    try {
      const query = `*[_type == "leader"]{
        _id,
        name,
        "slug": slug.current,
        "role": coalesce(designation, role),
        company,
        "industrySlug": coalesce(industry->slug.current, industrySlug, "technology"),
        "bio": coalesce(biography, bio),
        "imageUrl": coalesce(profileImage.asset->url, image.asset->url, mainImage.asset->url, photo.asset->url, portrait.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return data.map((item: any, idx: number) => ({
          id: item._id || String(idx + 1),
          slug: item.slug || `leader-${idx + 1}`,
          name: item.name || "Executive Leader",
          role: item.role || "Leader",
          company: item.company || "Enterprise",
          industrySlug: item.industrySlug || "technology",
          bio: item.bio || "",
          image: item.imageUrl || "",
          imageAlt: item.name || "Leader Image",
          highlights: [],
          quote: "",
        }));
      }
    } catch (e) {
      console.warn("Sanity home leaders fetch warning:", e);
    }
    return [];
  },
};
