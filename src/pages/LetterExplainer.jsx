import React, { useState } from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a German bureaucracy expert. The user will paste a letter from a German authority (Finanzamt, Bürgeramt, Krankenkasse, etc).

Your job:
1. Identify who sent the letter and why
2. Explain in plain language what it means
3. List clearly what action (if any) the user must take and by when
4. Flag any deadlines or fines if missed

Rules:
- Be concise and practical
- Use simple language, no legal jargon
- Use numbered steps for actions
- Bold key terms and deadlines
- If the letter is not from a German authority, say so politely
- Respond in the language the user selected`;

const EXAMPLE_LETTERS = [
  "Rundfunkbeitrag — contribution notice",
  "Finanzamt — tax return reminder",
  "Krankenkasse — health insurance letter",
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

function LetterExplainer() {
  const [letterText, setLetterText] = useState("");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleExplain() {
    if (!letterText.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: `Please explain this German letter in ${language}:\n\n${letterText}`,
            },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || "Something went wrong.";
      setResult(reply);
    } catch {
      setError("Connection error — please try again.");
    }

    setIsLoading(false);
  }

  function handleClear() {
    setLetterText("");
    setResult(null);
    setError(null);
  }

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#0a0f1e] min-h-screen text-white"
    >
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-xs text-amber-300 tracking-wide">
              Letter Explainer
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-4xl font-extrabold tracking-tight leading-tight mb-3"
          >
            Got a confusing{" "}
            <span className="text-amber-400">German letter?</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed">
            Paste it below and get a plain language explanation — what it means,
            what you need to do, and by when.
          </p>
        </div>

        {/* Example pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-white/30 self-center">Examples:</span>
          {EXAMPLE_LETTERS.map((ex) => (
            <button
              key={ex}
              onClick={() => setLetterText(ex)}
              className="text-xs bg-white/5 border border-white/10 text-white/50 px-3 py-1.5 rounded-full hover:border-white/20 hover:text-white/70 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-4">
          {/* Language toggle */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs text-white/40 uppercase tracking-wider">
              Paste your letter
            </label>
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5 gap-0.5">
              {["English", "Deutsch"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-xs px-3 py-1.5 rounded-md transition-all ${
                    language === lang
                      ? "bg-blue-500 text-white"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={letterText}
            onChange={(e) => setLetterText(e.target.value)}
            placeholder="Paste the German letter text here..."
            rows={10}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 resize-none outline-none focus:border-blue-500/50 transition-colors leading-relaxed"
          />

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleExplain}
              disabled={!letterText.trim() || isLoading}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-colors"
            >
              {isLoading ? "Explaining..." : "Explain this letter →"}
            </button>
            {(letterText || result) && (
              <button
                onClick={handleClear}
                className="px-4 py-3 bg-white/5 hover:bg-white/8 border border-white/10 text-white/50 text-sm rounded-xl transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-white/40 text-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
              Reading your letter...
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && !isLoading && (
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/7">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                Explanation
              </span>
            </div>
            <div className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
              <FormattedResult text={result} />
            </div>
          </div>
        )}
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

// Renders **bold** markdown inline
function FormattedResult({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part.split("\n").map((line, j, arr) => (
          <React.Fragment key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </React.Fragment>
        ));
      })}
    </>
  );
}

export default LetterExplainer;
