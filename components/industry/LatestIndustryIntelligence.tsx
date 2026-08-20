"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const industryArticlesList = [
  {
    slug: "rise-generative-ai-business-operations",
    title: "The Rise of Generative AI in Business Operations",
    category: "Tech / AI",
    description: "Enterprise software, autonomous workflows and LLM deployment across Fortune 500 corporate operations.",
    date: "May 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    slug: "future-smart-manufacturing",
    title: "The Future of Smart Manufacturing",
    category: "Manufacturing",
    description: "Smart factories leveraging robotics, IoT sensing, digital twins and predictive maintenance automation.",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    slug: "sustainable-energy-global-transition",
    title: "Sustainable Energy and the Global Transition",
    category: "Energy",
    description: "Grid modernization, utility-scale solar deployment, offshore wind power and hydrogen infrastructure.",
    date: "May 16, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80",
  },
  {
    slug: "digital-healthcare-new-era",
    title: "Digital Healthcare: A New Era",
    category: "Healthcare",
    description: "Telemedicine platforms, AI diagnostics, clinical workflow automation and personalized patient care.",
    date: "May 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    slug: "global-real-estate-markets-2026",
    title: "Global Real Estate Markets in 2026",
    category: "Real Estate",
    description: "Commercial property valuations, interest rate cycles, proptech adoption and urban office space shifts.",
    date: "May 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
];

export function LatestIndustryIntelligence() {
  return (
    <div>
      <div style={{ marginBottom: "16px", paddingBottom: "10px", borderBottom: "2px solid #50071C", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#17151C", margin: 0 }}>
          Latest Industry Intelligence
        </h2>
        <Link href="/blogs" style={{ fontSize: "12px", fontWeight: 700, color: "#50071C", textDecoration: "none" }}>
          View All Articles →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {industryArticlesList.map((item, idx) => (
          <article
            key={item.slug || String(idx)}
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr 40px",
              gap: "18px",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid #EAE7DC",
            }}
          >
            {/* Thumbnail */}
            <Link href={`/blogs/${item.slug}`}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#151027",
                  border: "1px solid #E5E2D9",
                }}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              </div>
            </Link>

            {/* Details */}
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "#50071C",
                  display: "block",
                  marginBottom: "3px",
                }}
              >
                {item.category}
              </span>

              <h3
                className="font-serif"
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#17151C",
                  margin: "0 0 4px",
                  lineHeight: 1.25,
                }}
              >
                <Link href={`/blogs/${item.slug}`} style={{ color: "#17151C", textDecoration: "none" }}>
                  {item.title}
                </Link>
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#66606C",
                  lineHeight: 1.45,
                  margin: "0 0 6px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#77727D" }}>
                <span>{item.date}</span>
                <span>•</span>
                <span><Clock size={11} style={{ display: "inline", marginRight: "3px" }} />{item.readTime}</span>
              </div>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: "right" }}>
              <Link
                href={`/blogs/${item.slug}`}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(80, 7, 28, 0.06)",
                  display: "grid",
                  placeItems: "center",
                  color: "#50071C",
                  textDecoration: "none",
                }}
              >
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
