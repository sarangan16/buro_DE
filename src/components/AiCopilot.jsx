import React, { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are BürgerHilfe, a friendly expert assistant helping expats navigate German bureaucracy. You know everything about: Anmeldung, Abmeldung, Steuer-ID, Krankenkasse, Aufenthaltstitel, Rundfunkbeitrag, bank accounts, visa types, work permits, and all Bürgeramt processes.

Rules:
- Be concise and practical. No fluff.
- Use numbered steps when giving a process.
- Bold key German terms using markdown **like this**.
- If you don't know something specific (like current wait times), say so and tell them where to check.
- Always consider the user's specific situation (nationality, visa type, city) if they've shared it.
- Respond in the same language the user writes in.`;

const SUGGESTIONS = [
  "I just moved to Munich from India 🇮🇳",
  "How do I get a Steuer-ID?",
  "I'm leaving Germany next month",
  "My passport is expiring soon",
];

function FormattedMessage({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part.split("\n").map((line, j, arr) => (
          <React.Fragment key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </React.Fragment>
        ));
      })}
    </span>
  );
}

function AiCopilot() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  function handleInputChange(e) {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function handleSuggestion(text) {
    setShowSuggestions(false);
    send(text);
  }

  async function send(text) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setShowSuggestions(false);

    const userMsg = { role: "user", content: trimmed };
    const newHistory = [...history, userMsg];

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setHistory(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: newHistory }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, something went wrong.";
      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error — please try again." },
      ]);
    }

    setIsLoading(false);
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        height: "520px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #f0f0ee",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f0f0f" }}>
          BürgerHilfe Copilot
        </span>
        <span
          style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "auto" }}
        >
          Powered by AI
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Welcome */}
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#1a1a1a",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: "white", fontSize: "11px", fontWeight: "700" }}
            >
              B
            </span>
          </div>
          <div>
            <div
              style={{
                background: "#f9fafb",
                border: "1px solid #f0f0ee",
                borderRadius: "12px",
                borderTopLeftRadius: "4px",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.6",
                maxWidth: "85%",
              }}
            >
              Hi! Tell me your situation — where you're from, what visa you
              have, what you need to sort out — and I'll give you a clear
              step-by-step plan.
            </div>
            {showSuggestions && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginTop: "10px",
                }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    style={{
                      background: "white",
                      border: "1px solid #e5e7eb",
                      color: "#374151",
                      fontSize: "12px",
                      padding: "6px 12px",
                      borderRadius: "100px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "border-color 0.15s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                flexDirection: isUser ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isUser ? "#eff6ff" : "#1a1a1a",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: isUser ? "#2563eb" : "white",
                  }}
                >
                  {isUser ? "U" : "B"}
                </span>
              </div>
              <div
                style={{
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  borderTopRightRadius: isUser ? "4px" : "12px",
                  borderTopLeftRadius: isUser ? "12px" : "4px",
                  background: isUser ? "#1a1a1a" : "#f9fafb",
                  border: isUser ? "none" : "1px solid #f0f0ee",
                  color: isUser ? "white" : "#374151",
                }}
              >
                <FormattedMessage text={msg.text} />
              </div>
            </div>
          );
        })}

        {/* Typing */}
        {isLoading && (
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#1a1a1a",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ color: "white", fontSize: "11px", fontWeight: "700" }}
              >
                B
              </span>
            </div>
            <div
              style={{
                background: "#f9fafb",
                border: "1px solid #f0f0ee",
                borderRadius: "12px",
                borderTopLeftRadius: "4px",
                padding: "14px 16px",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#d1d5db",
                    display: "inline-block",
                    animation: `bounce 1.2s ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #f0f0ee",
          display: "flex",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about German bureaucracy..."
          rows={1}
          style={{
            flex: 1,
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "14px",
            color: "#1a1a1a",
            resize: "none",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
            minHeight: "42px",
            maxHeight: "120px",
            lineHeight: "1.5",
            background: "#fafaf8",
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={isLoading || !input.trim()}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: input.trim() ? "#1a1a1a" : "#f4f4f3",
            border: "none",
            cursor: input.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={input.trim() ? "white" : "#9ca3af"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

export default AiCopilot;
