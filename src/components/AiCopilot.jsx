import React, { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

// Converts **bold** and newlines to JSX
function FormattedMessage({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const inline = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Render line breaks
    return part.split("\n").map((line, j, arr) => (
      <React.Fragment key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  });
  return <span>{inline}</span>;
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-start">
      <Avatar role="ai" />
      <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/30"
            style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

function Avatar({ role }) {
  return (
    <div
      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium ${
        role === "ai"
          ? "bg-blue-500/15 border border-blue-500/25 text-blue-400"
          : "bg-white/8 text-white/50"
      }`}
    >
      {role === "ai" ? "B" : "You"}
    </div>
  );
}

function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex gap-2.5 items-start ${isUser ? "flex-row-reverse" : ""}`}
    >
      <Avatar role={isUser ? "user" : "ai"} />
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-500 text-white rounded-tr-sm"
            : "bg-white/5 border border-white/8 text-white/80 rounded-tl-sm"
        }`}
      >
        <FormattedMessage text={text} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function AiCopilot() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); // raw history for API
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea as user types
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
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
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
      style={{ fontFamily: "'Inter', sans-serif", height: "520px" }}
      className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/7">
        <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
        <span className="text-sm font-semibold text-white/85">
          BürgerHilfe Copilot
        </span>
        <span className="text-xs text-white/25 ml-auto">Powered by Claude</span>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3.5 scroll-smooth">
        {/* Welcome message */}
        <div className="flex gap-2.5 items-start">
          <Avatar role="ai" />
          <div>
            <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 leading-relaxed max-w-[85%]">
              Hi! Tell me your situation — where you're from, what visa you
              have, what you need to sort out — and I'll give you a clear
              step-by-step plan.
            </div>

            {/* Quick suggestion pills */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Conversation messages */}
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} text={msg.text} />
        ))}

        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input row */}
      <div className="px-4 py-3 border-t border-white/7 flex gap-2.5 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about German bureaucracy..."
          rows={1}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 resize-none outline-none focus:border-blue-500/50 transition-colors leading-relaxed"
          style={{ minHeight: "42px", maxHeight: "120px" }}
        />
        <button
          onClick={() => send(input)}
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>

      {/* CSS for typing bounce — injected once */}
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
