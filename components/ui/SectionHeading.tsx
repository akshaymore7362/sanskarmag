import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  link?: string;
  linkText?: string;
  light?: boolean;
};

export function SectionHeading({ title, link = "#", linkText = "View All", light = true }: Props) {
  return (
    <div className="section-heading">
      <h2 className={light ? "text-black" : "text-white"}>
        <span />
        {title}
      </h2>
      <Link href={link} className={light ? "heading-link text-black" : "heading-link text-white"}>
        {linkText} <ArrowRight size={13} />
      </Link>
    </div>
  );
}
