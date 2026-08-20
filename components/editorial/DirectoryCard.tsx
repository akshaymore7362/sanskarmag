import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function DirectoryCard({ href, image, alt, eyebrow, title, description }: Props) {
  return (
    <Link href={href} className="bulletin-lead-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      {image && (
        <div style={{ position: "relative", height: "180px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <Image src={image} alt={alt || title} fill className="object-cover" unoptimized />
        </div>
      )}
      <div>
        <span className="hero-gold-pill-sm" style={{ fontSize: "10px", fontWeight: 800, color: "#F5B942", letterSpacing: "1.5px" }}>{eyebrow || "SECTOR"}</span>
        <h3 className="font-serif" style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", margin: "8px 0 10px", lineHeight: 1.25 }}>
          {title}
        </h3>
        <p style={{ color: "#A9A5B5", fontSize: "14px", lineHeight: 1.5, marginBottom: "16px" }}>{description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#F5B942" }}>
        <span>Explore Sector Intelligence</span>
        <ArrowUpRight size={14} />
      </div>
    </Link>
  );
}
