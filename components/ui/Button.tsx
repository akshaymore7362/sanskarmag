import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "gold" | "outline";
};

export function Button({ href = "#", children, variant = "gold" }: Props) {
  return <Link href={href} className={`btn ${variant === "outline" ? "btn-outline" : "btn-gold"}`}>{children}</Link>;
}
