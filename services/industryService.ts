import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Industry } from "@/types";

export const industryService = {
  all: (): Industry[] => [],
  bySlug: (slug: string): Industry | undefined => undefined,

  fetchSanityIndustries: async (): Promise<Industry[]> => {
    try {
      const query = `*[_type in ["industryCategory", "category"]] | order(title asc){
        _id,
        _type,
        title,
        "slug": slug.current,
        description,
        altText,
        "imageUrl": coalesce(image.asset->url, category_image.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return data.map((item: any, idx: number) => ({
          slug: item.slug || `industry-${idx + 1}`,
          name: item.title || "Industry Sector",
          descriptor: "Market Sector",
          overview: item.description || "Sector intelligence and strategic analysis.",
          marketSignal: "+14% Market Activity",
          image: item.imageUrl || "",
          imageAlt: item.altText || item.title || "Industry Image",
        }));
      }
    } catch (e) {
      console.warn("Sanity industry fetch warning:", e);
    }
    return [];
  },
};
