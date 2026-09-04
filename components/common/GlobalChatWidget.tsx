"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Lightbulb, CheckCircle2, Bot, User, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actionLink?: { label: string; href: string };
}

const quickPrompts = [
  "💡 Send Editorial Suggestion",
  "🏆 Nominate an Executive Leader",
  "📖 Read Digital Magazine",
  "📰 Today's Daily News",
];

const initialBotMessages: Message[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Welcome to The Success World executive assistant & feedback portal! How can I assist you today, or would you like to share a suggestion with our editorial team?",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

export function GlobalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "suggestion">("chat");

  // Chat State
  const [messages, setMessages] = useState<Message[]>(initialBotMessages);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Suggestion Form State
  const [sugName, setSugName] = useState("");
  const [sugEmail, setSugEmail] = useState("");
  const [sugTopic, setSugTopic] = useState("Editorial Suggestion");
  const [sugMessage, setSugMessage] = useState("");
  const [sugSubmitted, setSugSubmitted] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleSendUserMessage(textToSend?: string) {
    const text = (textToSend || inputMsg).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg("");
    setIsTyping(true);

    // Smart Automated Response Logic
    setTimeout(() => {
      let replyText = "Thank you for reaching out! Our executive team has received your message and will review it shortly.";
      let actionLink: { label: string; href: string } | undefined = undefined;

      const lower = text.toLowerCase();

      if (lower.includes("suggestion") || lower.includes("feedback") || lower.includes("idea")) {
        replyText = "We value your feedback! You can also use our dedicated 'Send Suggestion' tab above to submit detailed editorial ideas directly to our chief editor.";
      } else if (lower.includes("nominate") || lower.includes("leader") || lower.includes("executive")) {
        replyText = "You can nominate high-impact executives and founders for upcoming magazine features and Web Profiles directly through our nomination portal.";
        actionLink = { label: "Nominate Leader Now", href: "#nominate" };
      } else if (lower.includes("magazine") || lower.includes("digital") || lower.includes("read") || lower.includes("issue")) {
        replyText = "Explore our latest digital magazine issues with full cover stories, interactive flipbooks, and downloadable PDF editions.";
        actionLink = { label: "Browse Digital Magazines", href: "/magazines" };
      } else if (lower.includes("news") || lower.includes("headline") || lower.includes("daily")) {
        replyText = "Check out our Daily Live News section on the homepage for real-time market updates and breaking global press wires.";
        actionLink = { label: "View Daily Live News", href: "/#news" };
      } else if (lower.includes("profile") || lower.includes("web profile")) {
        replyText = "View verified Web Profiles of global corporate leaders, innovators, and industry pioneers in our Executive Directory.";
        actionLink = { label: "Explore Web Profiles", href: "/leaders" };
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionLink,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  }

  async function handleSuggestionSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSugSubmitted(true);

    try {
      await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sugName,
          email: sugEmail,
          topic: sugTopic,
          message: sugMessage,
        }),
      });
    } catch (err) {
      console.error("Failed to save suggestion to backend:", err);
    }

    setTimeout(() => {
      // Auto add to chat log as confirmation
      const botMsg: Message = {
        id: `sug-confirm-${Date.now()}`,
        sender: "bot",
        text: `Thank you ${sugName || "Valued Reader"}! Your ${sugTopic.toLowerCase()} has been saved to the backend and sent to The Success World editorial board.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  }

  return (
    <div ref={widgetRef}>
      {/* 1. FIXED POSITION FLOATING CHATBOT BUTTON (Appears on EVERY page) */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chat & Suggestion Box"
          style={{
            background: "linear-gradient(135deg, #0A192F 0%, #C5A059 100%)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
            padding: isOpen ? "14px 18px" : "14px 22px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(139, 16, 41, 0.4)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {isOpen ? (
            <>
              <X size={20} />
              <span style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.5px" }}>Close</span>
            </>
          ) : (
            <>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <MessageSquare size={20} />
                <span
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-3px",
                    width: "9px",
                    height: "9px",
                    background: "#22C55E",
                    borderRadius: "50%",
                    border: "2px solid #0A192F",
                  }}
                />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.5px" }}>Chat &amp; Suggestions</span>
            </>
          )}
        </button>
      </div>

      {/* 2. CHAT & SUGGESTION MODAL WINDOW */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "84px",
            right: "24px",
            zIndex: 100000,
            width: "calc(100vw - 32px)",
            maxWidth: "390px",
            height: "560px",
            maxHeight: "calc(100vh - 110px)",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeInUp 0.25s ease-out forwards",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              background: "linear-gradient(135deg, #0A192F 0%, #0A192F 100%)",
              color: "#FFFFFF",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(139, 16, 41, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#C5A059",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 4px 10px rgba(139, 16, 41, 0.4)",
                }}
              >
                <Bot size={20} style={{ color: "#FFFFFF" }} />
              </div>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 900, margin: 0, lineHeight: 1.2, color: "#FFFFFF" }}>
                  The Success World
                </h4>
                <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.7)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", background: "#22C55E", borderRadius: "50%" }} />
                  <span>Concierge &amp; Reader Feedback</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255, 255, 255, 0.7)", cursor: "pointer", padding: "4px" }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switch Tabs (Chat vs Suggestion) */}
          <div
            style={{
              display: "flex",
              background: "#F3F4F6",
              borderBottom: "1px solid #E5E7EB",
              padding: "4px",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
                background: activeTab === "chat" ? "#FFFFFF" : "transparent",
                color: activeTab === "chat" ? "#C5A059" : "#4B5563",
                boxShadow: activeTab === "chat" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <MessageSquare size={14} />
              <span>Live Assistant</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("suggestion")}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
                background: activeTab === "suggestion" ? "#FFFFFF" : "transparent",
                color: activeTab === "suggestion" ? "#C5A059" : "#4B5563",
                boxShadow: activeTab === "suggestion" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Lightbulb size={14} />
              <span>Send Suggestion</span>
            </button>
          </div>

          {/* TAB 1: LIVE CHAT TAB */}
          {activeTab === "chat" && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              {/* Quick Prompt Chips */}
              <div
                style={{
                  padding: "10px 14px",
                  background: "#F9FAFB",
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  gap: "6px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {quickPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      if (prompt.includes("Suggestion")) {
                        setActiveTab("suggestion");
                      } else {
                        handleSendUserMessage(prompt);
                      }
                    }}
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#0A192F",
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "14px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Messages Body */}
              <div
                style={{
                  flex: 1,
                  padding: "16px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  background: "#F9FAFB",
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "12px 14px",
                        borderRadius: msg.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                        background: msg.sender === "user" ? "#C5A059" : "#FFFFFF",
                        color: msg.sender === "user" ? "#FFFFFF" : "#0A192F",
                        border: msg.sender === "user" ? "none" : "1px solid #E5E7EB",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.text}

                      {msg.actionLink && (
                        <a
                          href={msg.actionLink.href}
                          onClick={() => setIsOpen(false)}
                          style={{
                            marginTop: "8px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            fontWeight: 800,
                            color: "#C5A059",
                            textDecoration: "none",
                            background: "rgba(139, 16, 41, 0.08)",
                            padding: "4px 10px",
                            borderRadius: "6px",
                          }}
                        >
                          <span>{msg.actionLink.label}</span>
                          <ArrowRight size={12} />
                        </a>
                      )}
                    </div>
                    <span style={{ fontSize: "10px", color: "#4B5563", marginTop: "3px", padding: "0 2px" }}>
                      {msg.time}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", width: "max-content" }}>
                    <Sparkles size={14} style={{ color: "#C5A059" }} />
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#4B5563" }}>Assistant is typing...</span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendUserMessage();
                }}
                style={{
                  padding: "12px 14px",
                  background: "#FFFFFF",
                  borderTop: "1px solid #E5E7EB",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type your message or inquiry..."
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    fontSize: "13px",
                    outline: "none",
                    background: "#F9FAFB",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#C5A059",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SUGGESTION FORM TAB */}
          {activeTab === "suggestion" && (
            <div style={{ padding: "20px", flex: 1, overflowY: "auto", background: "#F9FAFB" }}>
              {sugSubmitted ? (
                <div style={{ textAlign: "center", padding: "30px 10px" }}>
                  <CheckCircle2 size={48} style={{ color: "#22C55E", margin: "0 auto 14px" }} />
                  <h4 className="font-serif" style={{ fontSize: "20px", fontWeight: 900, color: "#0A192F", margin: "0 0 8px" }}>
                    Thank You for Your Suggestion!
                  </h4>
                  <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: 1.6, margin: "0 0 20px" }}>
                    Our editorial team reviews every reader suggestion carefully. If selected, we will feature your topic or reach out to you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSugSubmitted(false);
                      setSugMessage("");
                      setActiveTab("chat");
                    }}
                    style={{
                      background: "#0A192F",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Return to Live Chat
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSuggestionSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#C5A059", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "-4px" }}>
                    SHARE YOUR IDEAS &amp; FEEDBACK
                  </div>

                  <p style={{ fontSize: "12px", color: "#4B5563", margin: "0 0 6px", lineHeight: 1.4 }}>
                    Have an editorial topic idea, feedback on our magazine, or executive recommendation? Submit your suggestion below!
                  </p>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", display: "block", marginBottom: "4px" }}>
                      Suggestion Category
                    </label>
                    <select
                      value={sugTopic}
                      onChange={(e) => setSugTopic(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #E5E7EB", fontSize: "12px", background: "#FFFFFF" }}
                    >
                      <option value="Editorial Topic Idea">Editorial Topic Idea</option>
                      <option value="Executive Leader Recommendation">Executive Leader Recommendation</option>
                      <option value="Magazine Feedback">Magazine Feedback</option>
                      <option value="Website Feature Request">Website Feature Request</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", display: "block", marginBottom: "4px" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={sugName}
                      onChange={(e) => setSugName(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #E5E7EB", fontSize: "12px", background: "#FFFFFF" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", display: "block", marginBottom: "4px" }}>
                      Your Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={sugEmail}
                      onChange={(e) => setSugEmail(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #E5E7EB", fontSize: "12px", background: "#FFFFFF" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 800, color: "#0A192F", display: "block", marginBottom: "4px" }}>
                      Your Suggestion / Feedback Details
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us your idea or feedback..."
                      value={sugMessage}
                      onChange={(e) => setSugMessage(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #E5E7EB", fontSize: "12px", background: "#FFFFFF", resize: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#C5A059",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "11px 20px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 900,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      marginTop: "6px",
                      boxShadow: "0 4px 12px rgba(139, 16, 41, 0.3)",
                    }}
                  >
                    Submit Suggestion
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
