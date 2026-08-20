"use client";

import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const upcomingEvents = [
  { day: "20", month: "JUN", name: "Global Business Summit 2026", location: "New York, USA" },
  { day: "05", month: "JUL", name: "AI & Future Tech Conference", location: "San Francisco, USA" },
  { day: "18", month: "AUG", name: "Leadership Excellence Forum", location: "London, UK" },
];

const pastEvents = [
  { title: "USA Summit", location: "New York, USA", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&h=360&q=80" },
  { title: "India Summit", location: "Mumbai, India", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=600&h=360&q=80" },
];

export default function EventsPage() {
  return (
    <main className="events-page site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Events"
        intro="Global business forums, technology summits, leadership keynotes and executive networking."
        eyebrow="Conferences & Summits"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Upcoming Events Section */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Upcoming Events</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {upcomingEvents.map((ev) => (
              <div key={ev.name} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: "#0F131F", color: "#D49A24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "18px", fontWeight: 900, lineHeight: 1 }}>{ev.day}</span>
                    <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1px" }}>{ev.month}</span>
                  </div>
                  <div>
                    <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#17151C", margin: "0 0 2px" }}>{ev.name}</h3>
                    <div style={{ fontSize: "13px", color: "#77727D" }}>{ev.location}</div>
                  </div>
                </div>

                <Link href="/events" className="btn btn-gold-gradient btn-sm">
                  Register Now
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Past Events</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "28px" }}>
            {pastEvents.map((item) => (
              <div key={item.title} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "relative", height: "200px" }}>
                  <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                </div>
                <div style={{ padding: "20px" }}>
                  <h4 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#17151C", margin: "0 0 4px" }}>{item.title}</h4>
                  <div style={{ fontSize: "13px", color: "#77727D" }}>{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Component */}
        <NewsletterSection />
      </div>
    </main>
  );
}
