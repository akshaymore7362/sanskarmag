type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
};

export function PageIntro({ eyebrow, title, intro }: Props) {
  return (
    <section className="page-intro-header-banner" style={{ background: "linear-gradient(135deg, #102A43 0%, #0B1E30 60%, #0B1E30 100%)", borderRadius: "0 0 24px 24px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255, 255, 255, 0.12)" }}>
      {/* Background Subtle Gradient Wave Accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "300px", maxWidth: "40%", height: "100%", opacity: 0.15, background: "radial-gradient(circle at 100% 0%, #102A43 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "100%", margin: "0 auto" }}>
        {eyebrow && (
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "#102A43", display: "inline-block", marginBottom: "8px" }}>
            {eyebrow}
          </span>
        )}
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "10px", lineHeight: 1.15 }}>
          {title}
        </h1>
        {intro && (
          <p style={{ fontSize: "15px", color: "rgba(248, 250, 252, 0.8)", maxWidth: "640px", lineHeight: 1.6 }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
