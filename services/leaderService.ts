import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Leader } from "@/types";
import { leaders } from "@/data/leaders";
import { cleanStarPrimeText } from "@/lib/textUtils";

function toPlainText(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return cleanStarPrimeText(val);
  if (Array.isArray(val)) {
    return cleanStarPrimeText(
      val
        .map((block) => {
          if (typeof block === "string") return block;
          if (block && block._type === "block" && Array.isArray(block.children)) {
            return block.children.map((child: any) => child.text || "").join("");
          }
          return "";
        })
        .filter(Boolean)
        .join(" ")
    );
  }
  if (typeof val === "object" && val.text) return cleanStarPrimeText(String(val.text));
  return "";
}

export const leaderService = {
  fetchSanityLeaders: async (): Promise<Leader[]> => {
    try {
      // GROQ query fetching STRICTLY real published web profiles & executive leader documents (excluding post / magpost articles)
      const query = `*[_type in ["webprofile", "leader"] && (
        _type == "webprofile" ||
        _type == "leader"
      ) && slug.current != "john-intellisys" && name != "John Intellisys" && !(slug.current match "*alex-leveto*") && !(title match "*Alex Leveto*") && name != "Alex Leveto"] | order(_createdAt desc)[0...40]{
        _id,
        _type,
        title,
        name,
        "slug": slug.current,
        "role": coalesce(designation, role, "Executive Leader"),
        "company": coalesce(company, organization, "Enterprise Global"),
        "bio": coalesce(biography, bio, description, body[0...3], title),
        imageAlt,
        featuredOnHome,
        "imageUrl": coalesce(profileImage.asset->url, mainImage.asset->url, image.asset->url, cover.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        const seenNames = new Set<string>();
        const mapped: Leader[] = [];

        for (let idx = 0; idx < data.length; idx++) {
          const item = data[idx];

          const rawCheckStr = `${item.title || ""} ${item.name || ""} ${item.slug || ""}`.toLowerCase();
          if (rawCheckStr.includes("star prime") || rawCheckStr.includes("starprime") || rawCheckStr.includes("star-prime")) {
            continue;
          }

          let profileName = item.name ? cleanStarPrimeText(item.name) : "";
          if (!profileName && item.title) {
            const cleanTitle = cleanStarPrimeText(item.title);
            if (cleanTitle.includes(":")) {
              profileName = cleanTitle.split(":")[0].trim();
            } else if (cleanTitle.includes(" - ")) {
              profileName = cleanTitle.split(" - ")[0].trim();
            } else {
              profileName = cleanTitle;
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
            role: typeof item.role === "string" ? cleanStarPrimeText(item.role) : "Executive Leader",
            company: typeof item.company === "string" ? cleanStarPrimeText(item.company) : "Enterprise Global",
            industrySlug: "technology",
            bio: cleanStarPrimeText(toPlainText(item.bio || item.title)),
            image: typeof item.imageUrl === "string" ? item.imageUrl : "",
            imageAlt: typeof item.imageAlt === "string" ? cleanStarPrimeText(item.imageAlt) : profileName || "Leader Image",
            highlights: [],
            quote: "",
            featuredOnHome: item.featuredOnHome,
          });
        }

        if (mapped.length > 0) return mapped;
      }
    } catch (e) {
      console.warn("Sanity web profiles fetch warning:", e);
    }
    return leaders;
  },

  fetchHomeLeaders: async (): Promise<Leader[]> => {
    return leaderService.fetchSanityLeaders();
  },
};
