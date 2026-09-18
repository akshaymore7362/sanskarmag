import { fetchSanityQuery } from "@/lib/sanity.client";
import type { MagazineIssue } from "@/types";

export const magazineService = {
  fetchSanityMagazines: async (): Promise<MagazineIssue[]> => {
    try {
      // Fetch published magazines from Sanity CMS strictly ordered by creation / publication timestamp descending (LATEST PUBLISHED FIRST)
      const query = `*[_type == "magazine"] | order(_createdAt desc, publishedAt desc){
        _id,
        title,
        description,
        "slug": slug.current,
        publishedAt,
        _createdAt,
        issuuLink,
        altText,
        sequence,
        order,
        issueNumber,
        edition,
        year,
        publishYear,
        publicationYear,
        releaseYear,
        date,
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
        const seenSlugs = new Set<string>();
        const uniqueItems: MagazineIssue[] = [];

        data.forEach((item: any, idx: number) => {
          const itemSlug = item.slug || `issue-${idx + 1}`;
          if (!seenSlugs.has(itemSlug)) {
            seenSlugs.add(itemSlug);

            // 1. Extract Real Publication Year (From Explicit Field, Date, Title, or Created At)
            let yearVal = item.year || item.publishYear || item.publicationYear || item.releaseYear;
            if (yearVal) {
              yearVal = String(yearVal).trim();
              const yearMatch = yearVal.match(/\b(19\d{2}|20\d{2})\b/);
              if (yearMatch) yearVal = yearMatch[1];
            }

            let dateStr = item.date || "";
            if (item.publishedAt) {
              try {
                const pDate = new Date(item.publishedAt);
                if (!dateStr) {
                  dateStr = pDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                }
                if (!yearVal) {
                  yearVal = pDate.getFullYear().toString();
                }
              } catch {
                if (!dateStr) dateStr = item.publishedAt;
              }
            }

            // Extract four-digit year from title, date, slug, or description if not explicitly set
            const fullText = `${dateStr} ${item.title || ""} ${itemSlug} ${item.description || ""}`;
            const yearMatch4 = fullText.match(/\b(19\d{2}|20\d{2})\b/);
            if (yearMatch4) {
              yearVal = yearMatch4[1];
            } else if (!yearVal) {
              // Extract from creation date if available
              if (item._createdAt) {
                try {
                  const cDate = new Date(item._createdAt);
                  yearVal = cDate.getFullYear().toString();
                } catch {
                  yearVal = "2026";
                }
              } else {
                yearVal = "2026";
              }
            }

            if (!dateStr) {
              dateStr = `${yearVal}`;
            }

            // 2. Extract Sequence / Edition number
            let sequenceNum = idx + 1;
            if (item.sequence !== undefined && item.sequence !== null) {
              sequenceNum = Number(item.sequence) || sequenceNum;
            } else if (item.order !== undefined && item.order !== null) {
              sequenceNum = Number(item.order) || sequenceNum;
            } else if (item.issueNumber) {
              const parsed = parseInt(String(item.issueNumber), 10);
              if (!isNaN(parsed) && parsed < 1000) sequenceNum = parsed;
            } else if (item.edition) {
              const parsed = parseInt(String(item.edition), 10);
              if (!isNaN(parsed) && parsed < 1000) sequenceNum = parsed;
            } else {
              const seqMatch = (item.title + " " + itemSlug).match(/(?:edition|issue|vol|volume|no|#|\b)\s*0*(\d{1,3})\b/i);
              if (seqMatch && seqMatch[1]) {
                const parsed = parseInt(seqMatch[1], 10);
                if (parsed > 0 && parsed < 1000) sequenceNum = parsed;
              }
            }

            const formattedIssueLabel = `Edition ${sequenceNum < 10 ? `0${sequenceNum}` : sequenceNum}`;

            uniqueItems.push({
              id: item._id || String(idx + 1),
              issue: formattedIssueLabel,
              sequenceNum: sequenceNum,
              slug: itemSlug,
              date: dateStr,
              year: String(yearVal),
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

        // PRESERVE SANITY PUBLISHED SEQUENCE: Latest published magazine ALWAYS first
        if (uniqueItems.length > 0) return uniqueItems;
      }
    } catch (e) {
      console.warn("Sanity magazine fetch warning:", e);
    }
    return [];
  },
};
