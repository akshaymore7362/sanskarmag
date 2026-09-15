"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function IndustryBriefingForm({ industryName }: { industryName: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#102A43", fontSize: "12px", fontWeight: 700 }}>
        <CheckCircle2 size={16} />
        <span>Subscribed — check your inbox for {industryName} briefings.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "380px" }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter work email address"
        style={{
          flex: 1,
          padding: "9px 12px",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          fontSize: "12px",
          outline: "none",
          color: "#102A43",
        }}
      />
      <button
        type="submit"
        className="btn btn-blue-gradient"
        style={{ padding: "9px 20px", fontSize: "12px", fontWeight: 800, borderRadius: "6px", border: "none", flexShrink: 0 }}
      >
        Subscribe Now
      </button>
    </form>
  );
}
