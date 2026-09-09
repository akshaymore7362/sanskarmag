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

const defaultLeaders: Leader[] = [
  {
    id: "1",
    name: "Iana Abuqulbain",
    role: "EXECUTIVE LEADER",
    company: "Global Growth Corp",
    slug: "iana-abuqulbain",
    bio: "Driving enterprise growth and global excellence across international markets.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Iana Abuqulbain",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
  {
    id: "2",
    name: "Dr. Annalisa Perego",
    role: "EXECUTIVE LEADER",
    company: "Sustainable Tech",
    slug: "dr-annalisa-perego",
    bio: "Leading strategic initiatives for sustainable growth and digital innovation.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Dr. Annalisa Perego",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
  {
    id: "3",
    name: "James Stephens",
    role: "EXECUTIVE LEADER",
    company: "Apex Leadership",
    slug: "james-stephens",
    bio: "Empowering teams to achieve operational excellence and market leadership.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    imageAlt: "James Stephens",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
  {
    id: "4",
    name: "Nichole Daher",
    role: "EXECUTIVE LEADER",
    company: "Creative Solutions",
    slug: "nichole-daher",
    bio: "Championing innovation and creative solutions across global industries.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Nichole Daher",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
];

export const leaderService = {
  all: (): Leader[] => defaultLeaders,
  featured: (): Leader | undefined => defaultLeaders[0],
  bySlug: (slug: string): Leader | undefined => defaultLeaders.find((l) => l.slug === slug) || defaultLeaders[0],

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
        "bio": coalesce(body, description, excerpt, biography, bio, title),
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

        if (mapped.length > 0) return mapped;
      }
    } catch (e) {
      console.warn("Sanity web profiles fetch warning:", e);
    }
    return defaultLeaders;
  },

  fetchHomeLeaders: async (): Promise<Leader[]> => {
    return leaderService.fetchSanityLeaders();
  },
};
