import { fetchSanityQuery } from "@/lib/sanity.client";
import type { MagazineIssue } from "@/types";

export const magazineService = {
  all: (): MagazineIssue[] => [],
  current: (): MagazineIssue | undefined => undefined,
  bySlug: (slug: string): MagazineIssue | undefined => undefined,

  fetchSanityMagazines: async (): Promise<MagazineIssue[]> => {
    try {
      // Query ONLY authentic published magazine documents (no magpost duplicates)
      const query = `*[_type == "magazine"] | order(publishedAt desc, _createdAt desc){
        _id,
        title,
        description,
        "slug": slug.current,
        publishedAt,
        issuuLink,
        altText,
        "cover": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url, pdfCover.asset->url, magazineCover.asset->url),
        "pdfUrl": coalesce(
          pdfFile.asset->url,
          pdf.asset->url,
          file.asset->url,
          linkedPdf.asset->url,
          pdfUrl,
          issuuLink
        ),
        linkedArticle[]->{
          title,
          "slug": slug.current
        }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        // Filter out duplicate titles or slugs
        const seenSlugs = new Set<string>();
        const uniqueItems: MagazineIssue[] = [];

        data.forEach((item: any, idx: number) => {
          const itemSlug = item.slug || `issue-${idx + 1}`;
          if (!seenSlugs.has(itemSlug)) {
            seenSlugs.add(itemSlug);

            let dateStr = "2026";
            let yearVal = "2026";
            if (item.publishedAt) {
              try {
                const pDate = new Date(item.publishedAt);
                dateStr = pDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                yearVal = pDate.getFullYear().toString();
              } catch {
                dateStr = item.publishedAt;
              }
            } else if (item._createdAt) {
              try {
                yearVal = new Date(item._createdAt).getFullYear().toString();
              } catch {
                yearVal = "2026";
              }
            }

            // Extract 4-digit year if present in title or dateStr
            const matchedYear = (dateStr + " " + (item.title || "")).match(/\b(20\d\d)\b/);
            if (matchedYear && matchedYear[1]) {
              yearVal = matchedYear[1];
            }

            uniqueItems.push({
              id: item._id || String(idx + 1),
              issue: `Edition ${uniqueItems.length + 1}`,
              slug: itemSlug,
              date: dateStr,
              year: yearVal,
              title: item.title || "The Success World",
              subtitle: item.description || "Executive Edition",
              cover: item.cover || "",
              coverAlt: item.altText || item.title || "Magazine Cover",
              contents: item.linkedArticle ? item.linkedArticle.map((art: any) => art.title) : [],
              description: item.description || "",
              pdfUrl: item.pdfUrl || "",
              stories: [],
            });
          }
        });

        return uniqueItems;
      }
    } catch (e) {
      console.warn("Sanity magazine fetch warning:", e);
    }
    return [];
  },
};
