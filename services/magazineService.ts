import { fetchSanityQuery } from "@/lib/sanity.client";
import type { MagazineIssue } from "@/types";

export const magazineService = {
  all: (): MagazineIssue[] => [],
  current: (): MagazineIssue | undefined => undefined,
  bySlug: (slug: string): MagazineIssue | undefined => undefined,

  fetchSanityMagazines: async (): Promise<MagazineIssue[]> => {
    try {
      const query = `*[_type == "magazine"] | order(publishedAt desc){
        _id,
        title,
        description,
        "slug": slug.current,
        publishedAt,
        issuuLink,
        altText,
        "cover": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url, pdfCover.asset->url, magazineCover.asset->url),
        linkedArticle[]->{
          title,
          "slug": slug.current
        }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return data.map((item: any, idx: number) => {
          let dateStr = "May 2026";
          if (item.publishedAt) {
            try {
              dateStr = new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
            } catch {
              dateStr = item.publishedAt;
            }
          }
          return {
            issue: `Edition ${idx + 1}`,
            slug: item.slug || `issue-${idx + 1}`,
            date: dateStr,
            title: item.title || "The Success World",
            subtitle: item.description || "Executive Edition",
            cover: item.cover || "",
            coverAlt: item.altText || item.title || "Magazine Cover",
            contents: item.linkedArticle ? item.linkedArticle.map((art: any) => art.title) : [],
            description: item.description || "",
            pdfUrl: item.issuuLink,
            stories: [],
          };
        });
      }
    } catch (e) {
      console.warn("Sanity magazine fetch warning:", e);
    }
    return [];
  },
};
