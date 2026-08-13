import Image from "next/image";
import Link from "next/link";

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
    <Link href={href} className="directory-card">
      <Image src={image} alt={alt} fill className="object-cover" />
      <div>
        <p>{eyebrow}</p>
        <h3>{title}</h3>
        <small>{description}</small>
      </div>
    </Link>
  );
}
