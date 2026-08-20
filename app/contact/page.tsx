"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Contact Us"
        intro="Reach out to our newsroom, press office, commercial partnerships desk, or executive editorial team."
        eyebrow="Get In Touch"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "40px", alignItems: "start" }}>
          {/* Left Column: Get In Touch */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "20px", padding: "36px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#17151C", marginBottom: "10px" }}>Get In Touch</h2>
            <p style={{ color: "#77727D", fontSize: "14px", lineHeight: 1.6, marginBottom: "32px" }}>
              Have a question or want to work together? We'd love to hear from you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(212, 154, 36, 0.12)", color: "#D49A24", display: "grid", placeItems: "center" }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#77727D", textTransform: "uppercase" }}>Phone</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#17151C" }}>+1 (212) 555-0199</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(212, 154, 36, 0.12)", color: "#D49A24", display: "grid", placeItems: "center" }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#77727D", textTransform: "uppercase" }}>Email</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#17151C" }}>hello@thesuccessworld.com</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(212, 154, 36, 0.12)", color: "#D49A24", display: "grid", placeItems: "center" }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#77727D", textTransform: "uppercase" }}>Office HQ</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#17151C" }}>The Success World HQ, New York, USA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "20px", padding: "36px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <CheckCircle2 size={48} style={{ color: "#22C55E", margin: "0 auto 16px" }} />
                <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C" }}>Message Sent!</h3>
                <p style={{ color: "#77727D", fontSize: "14px", marginTop: "8px" }}>Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#17151C", display: "block", marginBottom: "6px" }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E2D9", fontSize: "14px", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#17151C", display: "block", marginBottom: "6px" }}>Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E2D9", fontSize: "14px", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#17151C", display: "block", marginBottom: "6px" }}>Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Editorial Inquiry / Partnership"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E2D9", fontSize: "14px", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#17151C", display: "block", marginBottom: "6px" }}>Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E5E2D9", fontSize: "14px", outline: "none", resize: "vertical" }}
                  />
                </div>

                <button type="submit" className="btn btn-gold-gradient" style={{ marginTop: "8px", alignSelf: "flex-end" }}>
                  <span>Send Message</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
