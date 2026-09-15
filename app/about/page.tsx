import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | The Success World",
  description:
    "Success World is a premium business and leadership media platform dedicated to discovering, recognizing and amplifying the people, companies and ideas shaping tomorrow's world.",
};

const coverage = [
  {
    n: "01",
    title: "Leadership & Executive Excellence",
    desc: "The decisions, discipline and judgment behind executives who build lasting organizations.",
  },
  {
    n: "02",
    title: "Business & Entrepreneurship",
    desc: "Founders and operators translating conviction into companies that endure.",
  },
  {
    n: "03",
    title: "Innovation & Technology",
    desc: "The technologies and ideas quietly redrawing how industries compete and operate.",
  },
  {
    n: "04",
    title: "Global Markets & Industry",
    desc: "Capital, trade and industry shifts read through an executive, not academic, lens.",
  },
  {
    n: "05",
    title: "Emerging Trends",
    desc: "Early signals worth an operator's attention, before they become consensus.",
  },
  {
    n: "06",
    title: "Inspiring Success Stories",
    desc: "The journeys — including the setbacks — behind achievement worth learning from.",
  },
];

const whySuccessWorld = [
  {
    title: "Insight",
    desc: "Meaningful perspectives on business, leadership and emerging opportunities.",
  },
  {
    title: "Recognition",
    desc: "A platform for exceptional leaders, entrepreneurs and organizations.",
  },
  {
    title: "Connection",
    desc: "Bringing influential people and forward-thinking businesses into one ecosystem.",
  },
  {
    title: "Perspective",
    desc: "Stories that look beyond today's headlines toward tomorrow's possibilities.",
  },
  {
    title: "Inspiration",
    desc: "Real journeys and ideas that encourage action and ambition.",
  },
];

export default function AboutPage() {
  return (
    <main style={{ background: "var(--editorial-ivory, #F7F5EF)" }}>
      <style>{`
        @media (max-width: 640px) {
          .about-coverage-row {
            margin-left: 0 !important;
            grid-template-columns: 48px minmax(0, 1fr) !important;
          }
        }
        .about-cta-ghost { transition: background 0.2s ease, border-color 0.2s ease; }
        .about-cta-ghost:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.55) !important;
        }
      `}</style>

      {/* ============================= PAGE TITLE ============================= */}
      <section
        style={{
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div
          className="site-shell"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "clamp(40px, 7vw, 64px) clamp(16px, 2.5vw, 40px) clamp(28px, 5vw, 44px)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#102A43",
              marginBottom: "12px",
            }}
          >
            The Success World
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            About Us
          </h1>
        </div>
      </section>

      {/* ======================= WHO WE ARE ======================= */}
      <section className="tsw-section" style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="grid-split-layout"
        >
          <div>
            <span className="tsw-kicker">Who We Are</span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 3.4vw, 38px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              We Tell the Stories Behind Success.
            </h2>
          </div>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: "62ch",
            }}
          >
            Success World brings together inspiring leaders, entrepreneurs, innovators and
            organizations from across industries. Through thoughtful editorial coverage,
            executive features, business insights and leadership perspectives, we spotlight
            the people creating meaningful impact and turning ambitious ideas into reality.
          </p>
        </div>
      </section>

      {/* ======================= WHAT WE COVER ======================= */}
      <section className="tsw-section" style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <span className="tsw-kicker">What We Cover</span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(26px, 3.4vw, 38px)",
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            Six Beats. One Vantage Point.
          </h2>
        </div>

        <div>
          {coverage.map((item, idx) => (
            <div
              key={item.n}
              style={{
                display: "grid",
                gridTemplateColumns: "80px minmax(0, 1fr)",
                gap: "clamp(16px, 3vw, 40px)",
                alignItems: "baseline",
                padding: "26px 0",
                borderTop: idx === 0 ? "1px solid var(--hairline)" : undefined,
                borderBottom: "1px solid var(--hairline)",
                marginLeft: idx % 2 === 1 ? "clamp(0px, 6vw, 64px)" : 0,
              }}
              className="about-coverage-row"
            >
              <span
                className="font-serif"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  fontWeight: 500,
                  color: "#102A43",
                  lineHeight: 1,
                }}
              >
                {item.n}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: "6px 20px",
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: 0,
                    flex: "0 0 auto",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "var(--ink-soft)",
                    margin: 0,
                    flex: "1 1 320px",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR EDITORIAL APPROACH ================= */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
        <div
          className="site-shell grid-split-layout"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "clamp(56px, 9vw, 96px) clamp(16px, 2.5vw, 40px)",
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          <div>
            <span className="tsw-kicker">Our Editorial Approach</span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Beyond Headlines. Behind the Success.
            </h2>
          </div>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: "62ch",
            }}
          >
            Success World goes beyond conventional business coverage. We explore the journeys,
            decisions, challenges and ideas behind successful organizations and individuals,
            giving our readers a deeper perspective on what drives meaningful achievement.
          </p>
        </div>
      </section>

      {/* ======================= WHY SUCCESS WORLD ======================= */}
      <section className="tsw-section" style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ marginBottom: "44px" }}>
          <span className="tsw-kicker">Why Success World</span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(26px, 3.4vw, 38px)",
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            What Sets This Platform Apart
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0",
            borderTop: "1px solid var(--hairline)",
            borderLeft: "1px solid var(--hairline)",
          }}
        >
          {whySuccessWorld.map((item, idx) => (
            <div
              key={item.title}
              style={{
                padding: "32px 28px",
                borderRight: "1px solid var(--hairline)",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  color: "#102A43",
                  marginBottom: "14px",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-serif"
                style={{
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: "0 0 8px",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= CLOSING CTA ======================= */}
      <section
        style={{
          background: "linear-gradient(160deg, #102A43 0%, #0B1E30 82%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="site-shell"
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: "clamp(64px, 10vw, 104px) clamp(16px, 2.5vw, 40px)",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#FFFFFF",
              margin: "0 0 18px",
            }}
          >
            Success Is a Journey. We Tell the Stories That Move It Forward.
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(248,250,252,0.75)",
              margin: "0 auto 40px",
              maxWidth: "48ch",
            }}
          >
            Explore the leaders, ideas and organizations shaping the next chapter of business.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/articles" className="tsw-btn tsw-btn-primary">
              <span>Explore Our Stories</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/magazines"
              className="tsw-btn about-cta-ghost"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#FFFFFF",
              }}
            >
              <span>Explore Magazines</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
