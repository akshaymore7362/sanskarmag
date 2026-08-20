import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
} from "lucide-react";
import { industryService } from "@/services/industryService";
import { articleService } from "@/services/articleService";
import { SectorArticleFeed } from "@/components/industry/SectorArticleFeed";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industries = await industryService.fetchSanityIndustries();
  const industry = industries.find((item) => item.slug === slug) || industryService.bySlug(slug);
  if (!industry) return {};
  return { title: `${industry.name} Executive Intelligence | The Success World`, description: industry.overview };
}

// Sector-specific default images & topics for fallback luxury presentation
const sectorConfig: Record<string, { topics: string[]; heroImage: string; tags: [string, string, string] }> = {
  "tech-ai": {
    topics: ["Artificial Intelligence", "Cloud & Quantum", "Cybersecurity", "DeepTech", "Enterprise Software"],
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    tags: ["AI & AUTOMATION", "INFRASTRUCTURE", "CYBERSECURITY"],
  },
  healthcare: {
    topics: ["Biotechnology", "Digital MedTech", "Pharma R&D", "Clinical AI", "Healthcare Systems"],
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tags: ["BIOTECH & MEDTECH", "CLINICAL INNOVATION", "DIGITAL HEALTH"],
  },
  finance: {
    topics: ["Banking & Markets", "Fintech & Crypto", "Venture Capital", "Asset Management", "Global Trade"],
    heroImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    tags: ["CAPITAL MARKETS", "FINTECH & CRYPTO", "GLOBAL BANKING"],
  },
  "real-estate": {
    topics: ["Commercial Property", "PropTech & AI", "Urban Infrastructure", "Capital Valuation", "Housing"],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: ["COMMERCIAL REALTY", "PROPTECH & SMART CITIES", "GLOBAL MARKETS"],
  },
  energy: {
    topics: ["Renewable Energy", "Solar & Wind", "Grid Modernization", "CleanTech", "Hydrogen Power"],
    heroImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    tags: ["CLEANTECH & POWER", "RENEWABLE ENERGY", "GLOBAL TRANSITION"],
  },
  manufacturing: {
    topics: ["Smart Factories", "Industrial IoT", "Robotics", "Predictive Tech", "Supply Chains"],
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["INDUSTRIAL IOT", "SMART FACTORIES", "SUPPLY CHAIN TECH"],
  },
  transportation: {
    topics: ["Mobility & EV", "Logistics Tech", "Supply Chains", "Aviation", "Maritime Trade"],
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    tags: ["EV & INFRASTRUCTURE", "GLOBAL LOGISTICS", "FUTURE MOBILITY"],
  },
  education: {
    topics: ["EdTech Solutions", "Academic AI", "Executive Learning", "Higher Education", "Skills 2026"],
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    tags: ["EDTECH & AI", "EXECUTIVE EDUCATION", "LEARNING INNOVATION"],
  },
  retail: {
    topics: ["E-Commerce Tech", "Consumer Insights", "Supply Chain", "Omnichannel", "Brand Innovation"],
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    tags: ["E-COMMERCE TECH", "CONSUMER STRATEGY", "RETAIL AUTOMATION"],
  },
  media: {
    topics: ["Digital Media", "Broadcasting", "Content Tech", "Entertainment AI", "Streaming & IP"],
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    tags: ["DIGITAL CONTENT", "BROADCAST TECH", "MEDIA INNOVATION"],
  },
  legal: {
    topics: ["Privacy Law", "AI & Law", "Compliance", "Litigation", "International Law"],
    heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    tags: ["LAW + TECHNOLOGY", "DATA + PRIVACY", "GLOBAL + BUSINESS"],
  },
};

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industries = await industryService.fetchSanityIndustries();
  const industry = industries.find((item) => item.slug === slug) || industryService.bySlug(slug);
  if (!industry) notFound();

  // Fetch articles belonging strictly to this Industry from Sanity
  const fetchedArticles = await articleService.fetchSanityArticlesByIndustry(slug);
  const articles = fetchedArticles.length > 0 ? fetchedArticles : articleService.trending();

  // Get sector specific config or fall back safely
  const config = sectorConfig[slug] || {
    topics: [`${industry.name} Innovation`, "Executive Strategy", "Market Trends", "Capital Allocation", "Global Outlook"],
    heroImage: articles[0]?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: [`${industry.name.toUpperCase()} TECH`, "MARKET STRATEGY", "GLOBAL OUTLOOK"],
  };

  const leadStory = articles[0] || {
    slug: `future-of-${slug}`,
    title: `The Future of ${industry.name} Operations & Market Expansion`,
    description: `Executive intelligence examining structural shifts, technology adoption, and strategic leadership in ${industry.name}.`,
    image: config.heroImage,
    readTime: "5 min read",
    author: "Editorial Board",
    date: "May 20, 2026",
  };

  const editorialWorlds = [
    {
      num: "01",
      tag: config.tags[0],
      title: articles[0]?.title || `Next-Gen Innovations Reshaping ${industry.name}`,
      desc: articles[0]?.description || `In-depth analysis of emerging technologies, capital investment, and enterprise deployment across global markets.`,
      image: articles[0]?.image || config.heroImage,
      slug: articles[0]?.slug || leadStory.slug,
    },
    {
      num: "02",
      tag: config.tags[1],
      title: articles[1]?.title || `Strategic Leadership & Market Realignment in ${industry.name}`,
      desc: articles[1]?.description || `Executive insights into market dynamics, regulatory compliance, and high-yield growth frameworks.`,
      image: articles[1]?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      slug: articles[1]?.slug || leadStory.slug,
    },
    {
      num: "03",
      tag: config.tags[2],
      title: articles[2]?.title || `Global Perspectives & Sovereign Policy Shifts`,
      desc: articles[2]?.description || `Cross-border trade, international benchmarks, and sustainable development driving long-term value.`,
      image: articles[2]?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      slug: articles[2]?.slug || leadStory.slug,
    },
  ];

  return (
    <main style={{ background: "#FAF8F5", minHeight: "100vh", paddingBottom: "24px", color: "#0A0D16" }}>
      {/* 1. HERO — ART-DIRECTED LUXURY MAGAZINE COMPOSITION */}
      <section
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #FDFCF9 0%, #F6F2E7 100%)",
          borderBottom: "1px solid #EAE7DC",
          padding: "28px 6vw 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "36px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left Side: Eyebrow, Title, Subtitle & Market Indicator */}
          <div>
            <Link
              href="/industries"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#50071C",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              <ArrowLeft size={13} />
              <span>Back to Industry Directory</span>
            </Link>

            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "1.8px",
                color: "#D49A24",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "4px",
              }}
            >
              INDUSTRY DIRECTORY
            </span>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 900,
                color: "#50071C",
                margin: "0 0 8px",
                lineHeight: 1.05,
              }}
            >
              {industry.name}
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "#4A454E",
                lineHeight: 1.5,
                maxWidth: "520px",
                marginBottom: "16px",
              }}
            >
              {industry.overview || `Sector intelligence, market shifts, and executive perspectives defining the future of ${industry.name}.`}
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#FFFFFF",
                border: "1px solid #E5E2D9",
                borderRadius: "20px",
                padding: "5px 12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              <Activity size={13} style={{ color: "#22C55E" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#17151C" }}>
                Market Signal: <span style={{ color: "#22C55E", fontWeight: 800 }}>+14% Market Activity</span>
              </span>
            </div>
          </div>

          {/* Right Side: Sculptural Sector Image & Composition */}
          <div style={{ display: "flex", justifyContent: "flex-end", position: "relative" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "440px",
                height: "240px",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(80, 7, 28, 0.06)",
                background: "linear-gradient(135deg, #FAF8F2 0%, #EFECE1 100%)",
                border: "1px solid #E5E1D3",
              }}
            >
              <Image
                src={config.heroImage}
                alt={industry.name}
                fill
                className="object-cover"
                unoptimized
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(253, 252, 249, 0.1) 0%, rgba(80, 7, 28, 0.75) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "18px",
                  color: "#FFFFFF",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.5px" }}>
                  EXECUTIVE BRIEFING
                </span>
                <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, margin: "2px 0 0", color: "#FFFFFF" }}>
                  Governance & Sector Innovation
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DRAMATIC FEATURED STORY SPREAD */}
      <section style={{ width: "100%", maxWidth: "1280px", margin: "24px auto 28px", padding: "0 6vw" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #E5E2D9",
            boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            position: "relative",
          }}
        >
          <div style={{ padding: "28px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                color: "#50071C",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              PRIMARY SECTOR FEATURE
            </span>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(22px, 2.5vw, 30px)",
                fontWeight: 900,
                color: "#17151C",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}
            >
              <Link href={`/blogs/${leadStory.slug}`} style={{ color: "#17151C", textDecoration: "none" }}>
                {leadStory.title}
              </Link>
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "#4A454E",
                lineHeight: 1.5,
                marginBottom: "20px",
                maxWidth: "480px",
              }}
            >
              {leadStory.description || `Comprehensive examination of structural changes, technology integration, and executive strategy reshaping the ${industry.name} ecosystem.`}
            </p>

            <div>
              <Link
                href={`/blogs/${leadStory.slug}`}
                className="btn btn-gold-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 22px",
                  fontSize: "13px",
                  fontWeight: 800,
                  borderRadius: "7px",
                  textDecoration: "none",
                }}
              >
                <span>Read Full Executive Report</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ position: "relative", minHeight: "260px", background: "#0F172A" }}>
            <Image
              src={leadStory.image || config.heroImage}
              alt={leadStory.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(80,7,28,0.4) 100%)" }} />

            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(180deg, #581C87 0%, #3B0764 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFFFFF",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div className="font-serif" style={{ fontSize: "32px", fontWeight: 900, lineHeight: 1 }}>{articles.length}</div>
              <div style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px", opacity: 0.9 }}>
                PUBLISHED STORIES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE LARGE EDITORIAL WORLDS (Magazine Spreads) */}
      <section style={{ width: "100%", maxWidth: "1280px", margin: "0 auto 32px", padding: "0 6vw" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {editorialWorlds.map((ew, ewIdx) => {
            const isEven = ewIdx % 2 === 1;
            return (
              <div
                key={ewIdx}
                style={{
                  display: "grid",
                  gridTemplateColumns: isEven ? "1fr 200px" : "200px 1fr",
                  gap: "28px",
                  alignItems: "center",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #EAE7DC",
                }}
              >
                {!isEven && (
                  <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "10px", overflow: "hidden", background: "#151027" }}>
                    <Image src={ew.image} alt={ew.title} fill className="object-cover" unoptimized />
                  </div>
                )}

                <div>
                  <div style={{ fontSize: "22px", fontWeight: 900, color: "#D49A24", fontFamily: "serif", lineHeight: 1 }}>{ew.num}</div>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#50071C", letterSpacing: "1.2px", textTransform: "uppercase", display: "block", margin: "2px 0" }}>
                    {ew.tag}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#17151C", margin: "0 0 6px" }}>
                    <Link href={`/blogs/${ew.slug}`} style={{ color: "#17151C", textDecoration: "none" }}>
                      {ew.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "13px", color: "#66606C", lineHeight: 1.5, maxWidth: "680px", marginBottom: "8px" }}>
                    {ew.desc}
                  </p>
                  <Link href={`/blogs/${ew.slug}`} style={{ fontSize: "12px", fontWeight: 800, color: "#50071C", display: "inline-flex", alignItems: "center", gap: "5px", textDecoration: "none" }}>
                    <span>Explore Intelligence</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {isEven && (
                  <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "10px", overflow: "hidden", background: "#151027" }}>
                    <Image src={ew.image} alt={ew.title} fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE SECTOR ARTICLE FEED & TOPIC FILTER BAR */}
      <SectorArticleFeed
        industryName={industry.name}
        topics={config.topics}
        articles={articles}
      />

      {/* 5. EDITORIAL NEWSLETTER INVITATION */}
      <section style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 6vw" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #FAF8F5 0%, #F5F1E6 100%)",
            border: "1px solid #E5E1D3",
            borderRadius: "14px",
            padding: "24px 32px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.02)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              EXECUTIVE BRIEFING
            </span>
            <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#50071C", margin: "3px 0 4px" }}>
              Stay Ahead in {industry.name}
            </h3>
            <p style={{ fontSize: "12px", color: "#66606C", margin: 0, maxWidth: "480px" }}>
              Know the trends before they happen. Get the latest {industry.name} briefings and executive updates delivered to your inbox.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "380px" }}>
            <input
              type="email"
              placeholder="Enter work email address"
              style={{
                flex: 1,
                padding: "9px 12px",
                background: "#FFFFFF",
                border: "1px solid #E5E2D9",
                borderRadius: "6px",
                fontSize: "12px",
                outline: "none",
                color: "#17151C",
              }}
            />
            <button
              type="button"
              className="btn btn-gold-gradient"
              style={{ padding: "9px 20px", fontSize: "12px", fontWeight: 800, borderRadius: "6px", border: "none", flexShrink: 0 }}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
