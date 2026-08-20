type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
};

export function PageIntro({ eyebrow, title, intro }: Props) {
  return (
    <section className="page-intro-header-banner" style={{ margin: "-20px -40px 32px -40px", padding: "48px 40px 40px 40px", background: "linear-gradient(135deg, #0F131F 0%, #161A28 60%, #080A10 100%)", borderRadius: "0 0 24px 24px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255, 255, 255, 0.12)" }}>
      {/* Background Subtle Gradient Wave Accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "100%", opacity: 0.15, background: "radial-gradient(circle at 100% 0%, #D49A24 0%, transparent 70%)", pointerEvents: "none" }} />
      
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto" }}>
        {eyebrow && (
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "#D49A24", display: "inline-block", marginBottom: "8px" }}>
            {eyebrow}
          </span>
        )}
        <h1 className="font-serif" style={{ fontSize: "38px", fontWeight: 900, color: "#FFFFFF", marginBottom: "10px", lineHeight: 1.15 }}>
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
