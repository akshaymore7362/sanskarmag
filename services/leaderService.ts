import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Leader } from "@/types";

function toPlainText(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val
      .map((block) => {
        if (typeof block === "string") return block;
        if (block && block._type === "block" && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }
  if (typeof val === "object" && val.text) return String(val.text);
  return "";
}

export const leaderService = {
  all: (): Leader[] => [],
  featured: (): Leader | undefined => undefined,
  bySlug: (slug: string): Leader | undefined => undefined,

  fetchSanityLeaders: async (): Promise<Leader[]> => {
    try {
      // GROQ query fetching ONLY real published web profiles from Sanity CMS (excluding authors)
      const query = `*[_type in ["webprofile", "leader", "post", "magpost"] && (
        _type == "webprofile" ||
        _type == "leader" ||
        "web-profiles" in categories[]->slug.current ||
        "webprofile" in categories[]->slug.current ||
        category->slug.current == "web-profiles" ||
        magcategory->slug.current == "web-profiles" ||
        category->slug.current == "webprofile"
      ) && slug.current != "john-intellisys" && name != "John Intellisys" && !(slug.current match "*alex-leveto*") && !(title match "*Alex Leveto*") && name != "Alex Leveto"] | order(_createdAt desc){
        _id,
        title,
        name,
        "slug": slug.current,
        "role": coalesce(designation, role, "Executive Leader"),
        "company": coalesce(company, organization, "Enterprise Global"),
        "bio": coalesce(description, excerpt, biography, bio, title),
        imageAlt,
        featuredOnHome,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, cover.asset->url, profileImage.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        const seenNames = new Set<string>();
        const mapped: Leader[] = [];

        for (let idx = 0; idx < data.length; idx++) {
          const item = data[idx];
          let profileName = item.name;
          if (!profileName && item.title) {
            if (item.title.includes(":")) {
              profileName = item.title.split(":")[0].trim();
            } else if (item.title.includes(" - ")) {
              profileName = item.title.split(" - ")[0].trim();
            } else {
              profileName = item.title;
            }
          }

          const normalizedName = (profileName || item.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          if (!normalizedName || seenNames.has(normalizedName)) {
            continue;
          }
          seenNames.add(normalizedName);

          mapped.push({
            id: item._id || String(idx + 1),
            slug: item.slug || `leader-${idx + 1}`,
            name: profileName || "Executive Leader",
            role: typeof item.role === "string" ? item.role : "Executive Leader",
            company: typeof item.company === "string" ? item.company : "Enterprise Global",
            industrySlug: "technology",
            bio: toPlainText(item.bio || item.title),
            image: typeof item.imageUrl === "string" ? item.imageUrl : "",
            imageAlt: typeof item.imageAlt === "string" ? item.imageAlt : profileName || "Leader Image",
            highlights: [],
            quote: "",
            featuredOnHome: item.featuredOnHome,
          });
        }

        return mapped;
      }
    } catch (e) {
      console.warn("Sanity web profiles fetch warning:", e);
    }
    return [];
  },

  fetchHomeLeaders: async (): Promise<Leader[]> => {
    return leaderService.fetchSanityLeaders();
  },
};
