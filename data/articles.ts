import type { Article } from "@/types";
import { authors } from "@/data/authors";
import { articlePhotos } from "@/data/media";

const categoryImages: Record<string, { image: string; alt: string; industrySlug: string }> = {
  "Cover Story": {
    image: "/images/articles/hero-cover.jpg",
    alt: "Contemporary business office with cinematic editorial lighting",
    industrySlug: "leadership",
  },
  Technology: {
    image: articlePhotos.technology,
    alt: "Close-up of advanced circuit systems representing artificial intelligence",
    industrySlug: "technology",
  },
  Business: {
    image: articlePhotos.business,
    alt: "Modern high-rise architecture for a business strategy story",
    industrySlug: "business",
  },
  Startups: {
    image: articlePhotos.startups,
    alt: "Startup team working together in a modern office",
    industrySlug: "startups",
  },
  Leadership: {
    image: articlePhotos.leadership,
    alt: "Executive team in a leadership strategy meeting",
    industrySlug: "leadership",
  },
  Finance: {
    image: articlePhotos.finance,
    alt: "Financial district skyline for market analysis",
    industrySlug: "finance",
  },
  Economy: {
    image: articlePhotos.economy,
    alt: "View of the earth from space for global economy coverage",
    industrySlug: "finance",
  },
  Healthcare: {
    image: articlePhotos.healthcare,
    alt: "Healthcare professional in a clinical innovation setting",
    industrySlug: "healthcare",
  },
  Innovation: {
    image: articlePhotos.innovation,
    alt: "Data visualization screens for innovation analysis",
    industrySlug: "technology",
  },
  Culture: {
    image: articlePhotos.culture,
    alt: "Team collaboration in a modern workplace culture setting",
    industrySlug: "leadership",
  },
  Energy: {
    image: articlePhotos.energy,
    alt: "Solar energy infrastructure in warm light",
    industrySlug: "energy",
  },
  Manufacturing: {
    image: articlePhotos.manufacturing,
    alt: "Industrial manufacturing facility for operations coverage",
    industrySlug: "manufacturing",
  },
};

const articleSeeds = [
  ["cover", "the-visionaries-building-tomorrow", "The Visionaries Building Tomorrow", "Inside the executive mindset shaping the next decade of enterprise.", "Cover Story", "a4", "May 20, 2026", "10 min read", true],
  ["ai-work", "ai-transforming-live-work", "AI Is Transforming the Way We Live and Work", "The most useful AI strategies are becoming operational, not theatrical.", "Technology", "a1", "May 20, 2026", "8 min read", true],
  ["sustainable", "future-sustainable-business", "The Future of Sustainable Business", "How global firms are turning sustainability into resilient long-term strategy.", "Business", "a2", "May 18, 2026", "6 min read", false],
  ["startup-impact", "idea-to-impact-startup-success", "From Idea to Impact: Startup Success Stories", "A close look at founders building durable companies from bold first principles.", "Startups", "a3", "May 19, 2026", "7 min read", false],
  ["leadership-change", "leadership-age-constant-change", "Leadership in the Age of Constant Change", "The habits that help organizations stay clear in uncertain markets.", "Leadership", "a4", "May 17, 2026", "5 min read", false],
  ["markets", "global-markets-outlook-opportunities", "Global Markets Outlook: Opportunities Ahead", "Signals, risks and opportunities shaping global capital decisions.", "Finance", "a5", "May 16, 2026", "6 min read", false],
  ["quantum", "rise-of-quantum-computing", "The Rise of Quantum Computing", "Why quantum breakthroughs are moving from research labs into boardroom roadmaps.", "Technology", "a1", "May 15, 2026", "6 min read", false],
  ["innovation-scale", "innovation-at-scale-lessons", "Innovation at Scale: Lessons from the Best", "How mature companies preserve speed, creativity and operational discipline.", "Business", "a2", "May 14, 2026", "7 min read", false],
  ["global-risks", "global-outlook-risks-opportunities", "Global Outlook 2026: Risks & Opportunities", "A field guide to growth, regulation and volatility across regions.", "Economy", "a12", "May 13, 2026", "7 min read", false],
  ["human-centric", "future-work-human-centric", "The Future of Work Is Human-Centric", "The best organizations are redesigning work around trust, skills and judgment.", "Leadership", "a6", "May 12, 2026", "6 min read", false],
  ["resilient-models", "building-resilient-business-models", "Building Resilient Business Models", "Why durable revenue, cash discipline and customer trust are becoming growth engines.", "Business", "a10", "May 11, 2026", "8 min read", false],
  ["sustainable-growth", "why-sustainable-growth-matters", "Why Sustainable Growth Matters", "The companies winning long term are learning to grow without exhausting their systems.", "Business", "a2", "May 10, 2026", "5 min read", false],
  ["startup-economy", "inside-new-startup-economy", "Inside the New Startup Economy", "Founders are building with smaller teams, sharper markets and more technical leverage.", "Startups", "a3", "May 9, 2026", "7 min read", false],
  ["boardroom", "leadership-beyond-boardroom", "Leadership Beyond the Boardroom", "Executive influence now depends on clarity across employees, communities and partners.", "Leadership", "a4", "May 8, 2026", "6 min read", false],
  ["health-data", "healthcare-data-frontier", "Healthcare's Data Frontier", "How clinical teams are using intelligent systems without losing human context.", "Healthcare", "a8", "May 7, 2026", "7 min read", false],
  ["real-assets", "real-estate-in-resilient-cities", "Real Estate in Resilient Cities", "Developers are rethinking buildings as climate, mobility and service platforms.", "Business", "a9", "May 6, 2026", "6 min read", false],
  ["energy-grid", "energy-grid-investment-moment", "The Energy Grid Investment Moment", "Storage, software and permitting capacity are defining the next infrastructure cycle.", "Energy", "a9", "May 5, 2026", "8 min read", false],
  ["factory", "factory-floor-goes-digital", "The Factory Floor Goes Digital", "Manufacturers are using live operations data to improve quality and productivity.", "Manufacturing", "a9", "May 4, 2026", "5 min read", false],
  ["retail", "premium-retail-new-loyalty", "Premium Retail and the New Loyalty Loop", "Why customer experience now depends on service design, data and precise inventory.", "Business", "a7", "May 3, 2026", "6 min read", false],
  ["media", "independent-media-business-models", "Independent Media's New Business Models", "Publishers are building sustainable businesses through trust, memberships and events.", "Culture", "a12", "May 2, 2026", "7 min read", false],
  ["education", "executive-learning-ai-era", "Executive Learning in the AI Era", "Companies are turning continuous learning into a strategic operating rhythm.", "Leadership", "a10", "May 1, 2026", "5 min read", false],
  ["private-credit", "private-credit-risk-discipline", "Private Credit and the Discipline of Risk", "A closer look at the standards shaping private capital in 2026.", "Finance", "a11", "April 30, 2026", "8 min read", false],
  ["robotics", "robotics-inside-service-economy", "Robotics Enters the Service Economy", "Automation is moving from factories into logistics, healthcare and hospitality.", "Technology", "a1", "April 29, 2026", "7 min read", false],
  ["culture", "new-rules-corporate-culture", "The New Rules of Corporate Culture", "Trust, pace and clarity are replacing perks as the basis of workplace advantage.", "Culture", "a6", "April 28, 2026", "6 min read", false],
  ["founder", "founders-building-with-less", "Founders Are Building With Less", "Capital efficiency is becoming a creative advantage for the next generation of startups.", "Startups", "a3", "April 27, 2026", "5 min read", false],
  ["risk", "enterprise-risk-after-volatility", "Enterprise Risk After the Volatility Cycle", "Risk teams are becoming strategic partners instead of compliance backstops.", "Finance", "a5", "April 26, 2026", "7 min read", false],
  ["ai-governance", "ai-governance-board-agenda", "AI Governance Moves Onto the Board Agenda", "Boards are asking sharper questions about data, accountability and operating exposure.", "Technology", "a12", "April 25, 2026", "8 min read", false],
  ["customer", "customer-experience-operating-model", "Customer Experience Becomes an Operating Model", "The best companies are connecting product, support, sales and data around customers.", "Business", "a2", "April 24, 2026", "6 min read", false],
  ["biotech", "biotech-commercialization-playbook", "The Biotech Commercialization Playbook", "Health innovators are learning to scale science through partnerships and access design.", "Healthcare", "a8", "April 23, 2026", "7 min read", false],
  ["bold", "future-belongs-to-bold", "The Future Belongs to the Bold", "In a changing world, decisive ideas separate leaders from followers.", "Leadership", "a7", "April 22, 2026", "8 min read", false],
] as const;

function bodyFor(title: string, category: string): Article["body"] {
  return [
    {
      heading: "The Signal",
      paragraphs: [
        `${title} is not a distant trend; it is already appearing in budget meetings, hiring plans and customer expectations across ambitious organizations.`,
        `The clearest leaders are treating ${category.toLowerCase()} as an operating question. They are asking what changes in cadence, accountability and product quality when the market moves faster than the annual plan.`,
      ],
    },
    {
      heading: "What Leaders Are Changing",
      paragraphs: [
        "Teams are creating smaller decision loops, clearer ownership and stronger feedback from customers, partners and front-line operators.",
        "The common pattern is not more complexity. It is better sequencing: choose the few decisions that matter, measure the signals honestly and keep the organization oriented around useful outcomes.",
      ],
    },
    {
      heading: "The Success World View",
      paragraphs: [
        "The next advantage will belong to companies that combine strategic patience with practical speed. They will not chase every new tool or market signal, but they will move quickly when the evidence is strong.",
        "That discipline is becoming the hallmark of modern business leadership: less theater, more clarity, and a sharper link between ambition and execution.",
      ],
    },
  ];
}

export const articles: Article[] = articleSeeds.map((seed, index) => {
  const [id, slug, title, subtitle, category, authorId, date, readTime, featured] = seed;
  const author = authors.find((item) => item.id === authorId) ?? authors[0];
  const image = categoryImages[category] ?? categoryImages.Business;

  return {
    id,
    slug,
    title,
    subtitle,
    category,
    author: author.name,
    authorId,
    date,
    readTime,
    image: index === 7 ? articlePhotos.city : image.image,
    imageAlt: image.alt,
    description: subtitle,
    industrySlug: image.industrySlug,
    issueSlug: index < 8 ? "may-2026-next-big-shift" : index < 15 ? "april-2026-resilient-growth" : undefined,
    tags: [category, image.industrySlug, featured ? "Featured" : "Analysis"].filter(Boolean),
    featured,
    body: bodyFor(title, category),
    pullQuote: "The premium advantage is not having more information. It is building the judgment to act on the right signal.",
    stats: [
      { label: "Executives surveyed", value: `${42 + index * 3}` },
      { label: "Markets reviewed", value: `${8 + (index % 7)}` },
      { label: "Operating signals", value: `${12 + (index % 9)}` },
    ],
  };
});
