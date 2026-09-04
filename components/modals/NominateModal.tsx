"use client";

import { useState, useEffect } from "react";
import { X, Award, CheckCircle2, Send, Phone, Mail, User, Building, Layers } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NominateModal({ isOpen, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("Technology & AI");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleResetAndClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && (email.trim() || phone.trim())) {
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10, 13, 22, 0.82)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        cursor: "pointer",
      }}
      onClick={handleResetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          cursor: "default",
          width: "100%",
          maxWidth: "540px",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
          position: "relative",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            background: "linear-gradient(135deg, #0A192F 0%, #050C18 100%)",
            color: "#FFFFFF",
            padding: "24px 28px",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={handleResetAndClose}
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              background: "rgba(255, 255, 255, 0.12)",
              border: "none",
              borderRadius: "50%",
              color: "#FFFFFF",
              width: "32px",
              height: "32px",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
            aria-label="Close nominate modal"
          >
            <X size={16} />
          </button>

          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#C5A059",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            EXECUTIVE NOMINATION
          </span>

          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 900, color: "#FFFFFF", margin: "0 0 6px" }}>
            Nominate Now — Get Published
          </h2>

          <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", margin: 0, lineHeight: 1.45 }}>
            Feature your leadership story, enterprise breakthrough, or brand in The Success World magazine & executive briefings.
          </p>
        </div>

        {/* Form Body or Success Confirmation */}
        <div style={{ padding: "24px 28px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(34, 197, 94, 0.12)",
                  color: "#22C55E",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h3 className="font-serif" style={{ fontSize: "22px", fontWeight: 900, color: "#0A192F", margin: "0 0 8px" }}>
                Nomination Submitted!
              </h3>

              <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: 1.5, marginBottom: "24px" }}>
                Thank you for submitting your nomination. Our editorial board will review your profile and contact you via email or phone within 24–48 hours.
              </p>

              <button
                type="button"
                className="btn btn-gold-gradient"
                onClick={handleResetAndClose}
                style={{ padding: "10px 24px", fontSize: "13px", fontWeight: 800, borderRadius: "8px" }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Full Name Input */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "4px" }}>
                  Full Name *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Alexander Vance"
                    style={{
                      width: "100%",
                      padding: "9px 12px 9px 34px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      fontSize: "13px",
                      color: "#0A192F",
                      outline: "none",
                    }}
                  />
                  <User size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid-split-layout" style={{ gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "4px" }}>
                    Work Email *
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@company.com"
                      style={{
                        width: "100%",
                        padding: "9px 12px 9px 34px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        fontSize: "13px",
                        color: "#0A192F",
                        outline: "none",
                      }}
                    />
                    <Mail size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "4px" }}>
                    Phone / WhatsApp *
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      style={{
                        width: "100%",
                        padding: "9px 12px 9px 34px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        fontSize: "13px",
                        color: "#0A192F",
                        outline: "none",
                      }}
                    />
                    <Phone size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  </div>
                </div>
              </div>

              {/* Company & Industry Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "4px" }}>
                    Company & Designation
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Founder & CEO | Apex Tech"
                      style={{
                        width: "100%",
                        padding: "9px 12px 9px 34px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        fontSize: "13px",
                        color: "#0A192F",
                        outline: "none",
                      }}
                    />
                    <Building size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "4px" }}>
                    Sector / Industry
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px 9px 34px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        fontSize: "13px",
                        color: "#0A192F",
                        outline: "none",
                        background: "#FFFFFF",
                        cursor: "pointer",
                      }}
                    >
                      <option value="Technology & AI">Technology & AI</option>
                      <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                      <option value="Finance & Fintech">Finance & Fintech</option>
                      <option value="Real Estate & PropTech">Real Estate & PropTech</option>
                      <option value="Legal & Compliance">Legal & Compliance</option>
                      <option value="Energy & Sustainability">Energy & Sustainability</option>
                      <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                      <option value="Executive Leadership">Executive Leadership</option>
                    </select>
                    <Layers size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  </div>
                </div>
              </div>

              {/* Message / Bio */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "4px" }}>
                  Publication Interest / Brief Note
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a short summary of your background, achievement, or reason for nomination..."
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: "#0A192F",
                    outline: "none",
                    resize: "none",
                  }}
                />
              </div>

              {/* Action Buttons: Cancel/Close & Submit */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  style={{
                    flex: "1",
                    padding: "11px",
                    fontSize: "13px",
                    fontWeight: 700,
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    background: "#F3F4F6",
                    color: "#374151",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <X size={15} />
                  <span>Cancel / Close</span>
                </button>
                <button
                  type="submit"
                  className="btn btn-gold-gradient"
                  style={{
                    flex: "1.6",
                    padding: "11px",
                    fontSize: "13px",
                    fontWeight: 800,
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Send size={15} />
                  <span>Submit Nomination</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
