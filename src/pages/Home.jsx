import React from "react";
import Appointments from "../components/Appointments";
import AiCopilot from "../components/AiCopilot";
import { Link } from "react-router-dom";

// ── Trust stats shown in hero ──
const STATS = [
  { value: "6 cities", label: "covered" },
  { value: "3 min", label: "avg. time saved" },
  { value: "Free", label: "always" },
];

// ── Service cards ──
const SERVICES = [
  {
    emoji: "📋",
    color: "bg-blue-500/15",
    title: "Anmeldung",
    desc: "Register your address within 14 days of moving in",
  },
  {
    emoji: "📤",
    color: "bg-emerald-500/15",
    title: "Abmeldung",
    desc: "Deregister when leaving Germany",
  },
  {
    emoji: "🛂",
    color: "bg-amber-500/15",
    title: "Pass / ID",
    desc: "Renew or apply for a passport or national ID",
  },
];

function Home() {
  function scrollToTool() {
    document
      .getElementById("tool-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#0a0f1e] min-h-screen text-white"
    >
      {/* ── HERO ── */}
      <div className="max-w-4xl mx-auto px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            <span className="text-xs text-blue-300 tracking-wide">
              Built for expats in Germany
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
          >
            German bureaucracy,{" "}
            <span style={{ color: "#5b8fff" }}>finally simple</span>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl">
            Find your nearest Bürgeramt, know exactly what to bring, and get a
            step-by-step plan — all in one place. No more Googling at midnight.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap mb-16">
            <button
              onClick={scrollToTool}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Get started free →
            </button>
            <Link
              to="/explain"
              className="text-white/50 hover:text-white text-sm transition-colors no-underline flex items-center gap-1.5"
            >
              <span>Got a confusing letter?</span>
              <span className="text-blue-400">Explain it →</span>
            </Link>
          </div>

          {/* Trust stats */}
          <div className="flex items-center gap-8 flex-wrap">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-xl font-bold text-white"
                >
                  {value}
                </div>
                <div className="text-xs text-white/35 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div className="max-w-4xl mx-auto px-8 mb-20">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-5">
          What do you need?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SERVICES.map(({ emoji, color, title, desc }) => (
            <div
              key={title}
              onClick={scrollToTool}
              className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-blue-500/25 rounded-2xl p-6 cursor-pointer transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-lg mb-4`}
              >
                {emoji}
              </div>
              <div
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-white font-bold mb-1.5"
              >
                {title}
              </div>
              <div className="text-sm text-white/35 leading-snug">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-8 mb-12">
        <div className="border-t border-white/5" />
      </div>

      {/* ── MAIN TOOL ── */}
      <div id="tool-section" className="max-w-4xl mx-auto px-8 pb-12">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-5">
          Bürgeramt finder
        </p>
        <Appointments />
      </div>

      {/* ── COPILOT ── */}
      <div className="max-w-4xl mx-auto px-8 pb-24">
        <div className="mb-5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">
            AI Copilot
          </p>
          <p className="text-white/40 text-sm">
            Ask anything — visa questions, tax IDs, what to do first
          </p>
        </div>
        <AiCopilot />
      </div>
    </div>
  );
}

export default Home;
