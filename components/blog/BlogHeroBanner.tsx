"use client";

export function BlogHeroBanner() {
  return (
    <section
      style={{
        width: "100%",
        background: "#FDFCF9",
        borderBottom: "1px solid #EAE7DC",
        position: "relative",
        overflow: "hidden",
        padding: "32px 6vw 28px",
      }}
    >
      {/* Background Subtle Geometric Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#D49A24 0.6px, transparent 0.6px)",
          backgroundSize: "20px 20px",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT COLUMN: Editorial Desk Headline & Subtitle */}
        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#D49A24",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            EDITORIAL DESK
          </span>

          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(34px, 4.2vw, 52px)",
              fontWeight: 900,
              color: "#50071C",
              margin: "0 0 10px",
              lineHeight: 1.1,
            }}
          >
            Blogs & Articles
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#4A454E",
              lineHeight: 1.5,
              maxWidth: "520px",
              marginBottom: "16px",
            }}
          >
            Expert perspectives, in-depth analysis and stories that drive business forward.
          </p>

          {/* Gold Underline Accent */}
          <div
            style={{
              width: "56px",
              height: "3px",
              background: "#D49A24",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* RIGHT COLUMN: Newspaper, Fountain Pen & Coffee Graphics Container */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              height: "170px",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
              background: "linear-gradient(135deg, #FAF8F2 0%, #EFECE1 100%)",
              border: "1px solid #E5E1D3",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 28px",
            }}
          >
            <div>
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.5px" }}>
                THE SUCCESS WORLD
              </span>
              <h3 className="font-serif" style={{ fontSize: "22px", fontWeight: 900, color: "#50071C", margin: "4px 0 6px" }}>
                Leadership
              </h3>
              <p style={{ fontSize: "12px", color: "#66606C", margin: 0, maxWidth: "220px", lineHeight: 1.4 }}>
                Redefining success in an evolving world with executive perspectives.
              </p>
            </div>

            <div
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #D49A24 0%, #50071C 100%)",
                boxShadow: "0 8px 20px rgba(80, 7, 28, 0.2)",
                display: "grid",
                placeItems: "center",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "11px",
                textAlign: "center",
                padding: "8px",
                border: "2px solid #FFFFFF",
              }}
            >
              INSIGHTS 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
