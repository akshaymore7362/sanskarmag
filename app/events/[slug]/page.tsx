import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eventService } from "@/services/eventService";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return eventService.all().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = eventService.bySlug(slug);
  if (!event) return {};
  return { title: `${event.title} | Momentum Magazine`, description: event.description };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = eventService.bySlug(slug);
  if (!event) notFound();

  return (
    <main className="site-shell inner-shell">
      <section className="event-detail-hero">
        <Image src={event.image} alt={event.imageAlt} fill className="object-cover" />
        <div>
          <p className="gold-label">{event.date} | {event.location}</p>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <Link href="#">Register Now</Link>
        </div>
      </section>
      <section className="three-column-feature">
        <div><h2>Speakers</h2>{event.speakers.map((speaker) => <p key={speaker}>{speaker}</p>)}</div>
        <div><h2>Agenda</h2>{event.agenda.map((item) => <p key={item}>{item}</p>)}</div>
        <div><h2>Details</h2><p>{event.location}</p><p>{event.date}</p><p>Executive pass includes sessions, lunch and private networking.</p></div>
      </section>
      <section className="related-section">
        <h2>Related Events</h2>
        <div className="event-directory compact">
          {eventService.all().filter((item) => item.slug !== event.slug).slice(0, 3).map((item) => (
            <Link href={`/events/${item.slug}`} key={item.slug}><time>{item.day}<span>{item.month}</span></time><div><h3>{item.title}</h3><p>{item.location}</p></div></Link>
          ))}
        </div>
      </section>
    </main>
  );
}
