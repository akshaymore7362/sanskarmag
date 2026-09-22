"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { MessageSquare, X, Send, Sparkles, Bot, RefreshCcw, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  isError?: boolean;
}

const quickActions = [
  "Explore Articles",
  "Latest Articles",
  "About Success World",
  "Contact Us",
  "Help Me Find Something",
];

const WELCOME_TEXT =
  "Hi! 👋 Welcome to The Success World. I'm your AI assistant. How can I help you today?";

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function newWelcomeMessage(): Message {
  return { id: `welcome-${Date.now()}`, role: "assistant", text: WELCOME_TEXT, time: nowLabel() };
}

/** Renders assistant text, turning any [Label](/path) markdown link into a
 * real clickable internal link. Only "/..." paths are ever linkified — an
 * external or malformed URL is left as plain text, never navigable. */
function renderMessageContent(text: string, onNavigate: () => void) {
  const linkPattern = /\[([^\]]+)\]\((\/[a-zA-Z0-9\-_/?#=&.]*)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<span key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</span>);
    }
    const [, label, href] = match;
    nodes.push(
      <Link
        key={`l-${key++}`}
        href={href}
        onClick={onNavigate}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          marginTop: "2px",
          fontWeight: 800,
          color: "#4472C4",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        }}
      >
        {label}
      </Link>
    );
    lastIndex = linkPattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<span key={`t-${key++}`}>{text.slice(lastIndex)}</span>);
  }
  return nodes;
}

export function GlobalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([newWelcomeMessage()]);
  const [inputMsg, setInputMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lastFailedText, setLastFailedText] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isSending]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const sendToAI = useCallback(async (history: Message[]) => {
    setIsSending(true);
    setLastFailedText(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.error) {
        const lastUser = [...history].reverse().find((m) => m.role === "user");
        setLastFailedText(lastUser?.text ?? null);
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            text: data?.reply || "Sorry, I'm having trouble responding right now. Please try again.",
            time: nowLabel(),
            isError: true,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, role: "assistant", text: data.reply, time: nowLabel() },
      ]);
    } catch {
      const lastUser = [...history].reverse().find((m) => m.role === "user");
      setLastFailedText(lastUser?.text ?? null);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Sorry, I'm having trouble responding right now. Please try again.",
          time: nowLabel(),
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }, []);

  function handleSendUserMessage(textToSend?: string) {
    const text = (textToSend ?? inputMsg).trim();
    if (!text || isSending) return;

    const userMsg: Message = { id: `usr-${Date.now()}`, role: "user", text, time: nowLabel() };
    const nextHistory = [...messages, userMsg];

    setMessages(nextHistory);
    if (!textToSend) setInputMsg("");

    sendToAI(nextHistory);
  }

  function handleRetry() {
    if (!lastFailedText || isSending) return;
    // Drop the trailing error bubble, then resend the same conversation.
    setMessages((prev) => {
      const trimmed = prev[prev.length - 1]?.isError ? prev.slice(0, -1) : prev;
      sendToAI(trimmed);
      return trimmed;
    });
  }

  function handleNewChat() {
    setMessages([newWelcomeMessage()]);
    setLastFailedText(null);
    setIsSending(false);
  }

  const canSend = inputMsg.trim().length > 0 && !isSending;

  return (
    <div ref={widgetRef}>
      {/* FIXED POSITION FLOATING CHATBOT BUTTON (Appears on EVERY page) */}
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
          aria-label="Toggle AI Chat Assistant"
          style={{
            background: "linear-gradient(135deg, #102A43 0%, #102A43 100%)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
            padding: isOpen ? "14px 18px" : "14px 22px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
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
                    border: "2px solid #102A43",
                  }}
                />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.5px" }}>AI Assistant</span>
            </>
          )}
        </button>
      </div>

      {/* CHAT MODAL WINDOW */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "84px",
            right: "12px",
            left: "12px",
            marginLeft: "auto",
            zIndex: 100000,
            width: "calc(100vw - 24px)",
            maxWidth: "390px",
            height: "min(600px, calc(100dvh - 110px))",
            maxHeight: "calc(100dvh - 110px)",
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
              background: "linear-gradient(135deg, #102A43 0%, #102A43 100%)",
              color: "#FFFFFF",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(30, 64, 175, 0.4)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#102A43",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 4px 10px rgba(30, 64, 175, 0.4)",
                  flexShrink: 0,
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
                  <span>AI Assistant</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <button
                type="button"
                onClick={handleNewChat}
                title="Start a new chat"
                aria-label="Start a new chat"
                style={{ background: "none", border: "none", color: "rgba(255, 255, 255, 0.7)", cursor: "pointer", padding: "6px" }}
              >
                <RefreshCcw size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{ background: "none", border: "none", color: "rgba(255, 255, 255, 0.7)", cursor: "pointer", padding: "6px" }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div
            style={{
              padding: "10px 14px",
              background: "#F9FAFB",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {quickActions.map((action) => (
              <button
                key={action}
                type="button"
                disabled={isSending}
                onClick={() => handleSendUserMessage(action)}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#102A43",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "4px 10px",
                  cursor: isSending ? "not-allowed" : "pointer",
                  opacity: isSending ? 0.5 : 1,
                  flexShrink: 0,
                }}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
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
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 14px",
                    borderRadius: msg.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background: msg.isError ? "#FEF2F2" : msg.role === "user" ? "#102A43" : "#FFFFFF",
                    color: msg.isError ? "#991B1B" : msg.role === "user" ? "#FFFFFF" : "#102A43",
                    border: msg.isError ? "1px solid #FECACA" : msg.role === "user" ? "none" : "1px solid #E5E7EB",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.isError && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", fontWeight: 800, fontSize: "12px" }}>
                      <AlertCircle size={13} />
                      <span>Message failed</span>
                    </div>
                  )}
                  {renderMessageContent(msg.text, () => setIsOpen(false))}

                  {msg.isError && lastFailedText && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      disabled={isSending}
                      style={{
                        marginTop: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#991B1B",
                        background: "#FFFFFF",
                        border: "1px solid #FECACA",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        cursor: isSending ? "not-allowed" : "pointer",
                      }}
                    >
                      <RefreshCcw size={12} />
                      <span>Retry</span>
                    </button>
                  )}
                </div>
                <span style={{ fontSize: "10px", color: "#4B5563", marginTop: "3px", padding: "0 2px" }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isSending && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", width: "max-content" }}>
                <Sparkles size={14} style={{ color: "#102A43" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#4B5563" }}>Thinking...</span>
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
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask me anything about The Success World..."
              disabled={isSending}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "13px",
                outline: "none",
                background: isSending ? "#F3F4F6" : "#F9FAFB",
              }}
            />
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send message"
              style={{
                background: canSend ? "#102A43" : "#CBD5E1",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: canSend ? "pointer" : "not-allowed",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
