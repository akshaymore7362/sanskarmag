type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
};

export function PageIntro({ eyebrow, title, intro, dark = false }: Props) {
  return (
    <section className={dark ? "page-intro page-intro-dark" : "page-intro"}>
      {eyebrow && <span className="gold-label">{eyebrow}</span>}
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </section>
  );
}
