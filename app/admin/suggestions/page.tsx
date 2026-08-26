"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Lightbulb, CheckCircle2, Clock, Mail, Search, RefreshCw, Sparkles, Filter, ShieldCheck } from "lucide-react";

interface SuggestionItem {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  async function loadSuggestions() {
    setLoading(true);
    try {
      const res = await fetch("/api/suggestions");
      if (res.ok) {
        const data = await res.json();
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      }
    } catch (err) {
      console.error("Failed to load suggestions:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSuggestions();
  }, []);

  function handleStatusChange(id: string, newStatus: string) {
    setSuggestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  }

  // Filtering
  const filteredSuggestions = suggestions.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopic = selectedTopic === "ALL" || item.topic === selectedTopic;
    const matchesStatus = selectedStatus === "ALL" || item.status === selectedStatus;

    return matchesSearch && matchesTopic && matchesStatus;
  });

  const totalCount = suggestions.length;
  const newCount = suggestions.filter((s) => s.status === "new").length;
  const reviewedCount = suggestions.filter((s) => s.status === "reviewed").length;

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "40px auto", padding: "0 24px" }}>
      {/* Top Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A0D16 0%, #161C2E 100%)",
          color: "#FFFFFF",
          padding: "32px 28px",
          borderRadius: "20px",
          marginBottom: "32px",
          border: "1px solid rgba(139, 16, 41, 0.4)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "2.5px", color: "#8B1029", textTransform: "uppercase", marginBottom: "8px", display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(139, 16, 41, 0.15)", padding: "4px 12px", borderRadius: "4px" }}>
            <ShieldCheck size={14} style={{ color: "#8B1029" }} /> EDITORIAL BOARD ADMIN PORTAL
          </div>
          <h1 className="font-serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, margin: "0 0 6px", color: "#FFFFFF" }}>
            Reader Suggestions &amp; Inbox
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
            Manage incoming reader feedback, topic proposals, executive leader recommendations, and chatbot inquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSuggestions}
          disabled={loading}
          style={{
            background: "#8B1029",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 14px rgba(139, 16, 41, 0.35)",
          }}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#77727D", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
            Total Suggestions
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#101722" }}>{totalCount}</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "8px", height: "8px", background: "#8B1029", borderRadius: "50%" }} />
            New Unreviewed
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#8B1029" }}>{newCount}</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#22C55E", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
            Reviewed
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#22C55E" }}>{reviewedCount}</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", padding: "20px", marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        {/* Search Bar */}
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#77727D" }} />
          <input
            type="text"
            placeholder="Search by sender name, email, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: "8px", border: "1px solid #E2DCD0", fontSize: "13px", outline: "none", background: "#FBF9F5" }}
          />
        </div>

        {/* Topic Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Filter size={14} style={{ color: "#8B1029" }} />
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2DCD0", fontSize: "12px", background: "#FFFFFF", fontWeight: 700 }}
          >
            <option value="ALL">All Categories</option>
            <option value="Editorial Topic Idea">Editorial Topic Idea</option>
            <option value="Executive Leader Recommendation">Executive Leader Recommendation</option>
            <option value="Magazine Feedback">Magazine Feedback</option>
            <option value="Website Feature Request">Website Feature Request</option>
          </select>
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2DCD0", fontSize: "12px", background: "#FFFFFF", fontWeight: 700 }}
          >
            <option value="ALL">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Suggestions List Table */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
        {filteredSuggestions.length === 0 ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: "#77727D" }}>
            <Lightbulb size={36} style={{ color: "#8B1029", margin: "0 auto 12px", opacity: 0.6 }} />
            <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#101722", margin: "0 0 4px" }}>
              No Suggestions Found
            </h4>
            <p style={{ fontSize: "13px", margin: 0 }}>
              No incoming reader suggestions match your search criteria.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredSuggestions.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #E5E2D9",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  background: item.status === "new" ? "#FDFBF7" : "#FFFFFF",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 900,
                        color: "#FFFFFF",
                        background: "#8B1029",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.topic}
                    </span>

                    <span style={{ fontSize: "14px", fontWeight: 900, color: "#101722" }}>
                      {item.name}
                    </span>

                    <a
                      href={`mailto:${item.email}`}
                      style={{ fontSize: "12px", color: "#555259", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      <Mail size={12} style={{ color: "#8B1029" }} />
                      <span>{item.email}</span>
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "11px", color: "#77727D", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} />
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>

                    {/* Status Toggle Dropdown */}
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "1px solid #E2DCD0",
                        fontSize: "11px",
                        fontWeight: 800,
                        background: item.status === "new" ? "rgba(139,16,41,0.1)" : item.status === "reviewed" ? "rgba(34,197,94,0.1)" : "#F7F5F0",
                        color: item.status === "new" ? "#8B1029" : item.status === "reviewed" ? "#22C55E" : "#77727D",
                        cursor: "pointer",
                      }}
                    >
                      <option value="new">🔴 New</option>
                      <option value="reviewed">✅ Reviewed</option>
                      <option value="archived">📁 Archived</option>
                    </select>
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "#101722", lineHeight: 1.5, margin: 0, background: "#F7F5F0", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E8E5DC" }}>
                  &ldquo;{item.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
