"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { eventService } from "@/services/eventService";
import type { EventItem } from "@/types";

export function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    eventService.fetchSanityEvents().then((items) => {
      if (items && items.length > 0) {
        setEvents(items.slice(0, 3));
      } else {
        setEvents(eventService.all().slice(0, 3));
      }
    });
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="section section-bg">
      <div className="section-label">Upcoming Events</div>
      <div className="trending-grid">
        {events.map((event, idx) => (
          <div key={event.slug || String(idx)} className="mag-card">
            <div className="mag-card-cover" style={{ height: "200px", position: "relative" }}>
              {event.image ? (
                <Image src={event.image} alt={event.title} fill className="object-cover" unoptimized />
              ) : (
                <div style={{ height: "100%", background: "#0B0B0B", display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--serif)" }}>
                  {event.title}
                </div>
              )}
            </div>
            <div className="mag-card-body">
              <span className="tag tag-strategy" style={{ marginBottom: "8px" }}>
                {event.day} {event.month}
              </span>
              <h3 className="mag-card-title">
                <Link href="/events">{event.title}</Link>
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-grey)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                <MapPin size={13} /> {event.location}
              </p>
              <a href={event.registrationUrl || "/events"} className="btn btn-secondary" style={{ width: "100%", fontSize: "13px" }}>
                Register Now →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
