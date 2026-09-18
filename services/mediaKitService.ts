import { fetchSanityQuery } from "@/lib/sanity.client";

export interface MediaKit {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  altText: string;
  mediaKitTitle: string;
  mediaKitPdfUrl: string;
  publishedAt: string;
}

export const mediaKitService = {
  fetchSanityMediaKit: async (): Promise<MediaKit | null> => {
    try {
      const query = `*[_type == "mediaKit"] | order(featured desc, publishedAt desc)[0]{
        title,
        "slug": slug.current,
        description,
        "coverImage": coverImage.asset->url,
        altText,
        mediaKitTitle,
        "mediaKitPdfUrl": mediaKitPdf.asset->url,
        publishedAt
      }`;
      const data = await fetchSanityQuery(query);
      if (data && (data.title || data.mediaKitPdfUrl)) {
        return data as MediaKit;
      }
    } catch (e) {
      console.warn("Sanity media kit fetch warning:", e);
    }
    return null;
  },
};
