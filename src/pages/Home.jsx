import React from "react";
import Appointments from "../components/Appointments";
import AiCopilot from "../components/AiCopilot";

function Home() {
  // Scroll down to the main tool when the user clicks "Get started"
  function scrollToTool() {
    var toolSection = document.getElementById("tool-section");
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#0a0f1e] min-h-screen text-white"
    >
      {/* ---- HERO SECTION ---- */}
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-12 text-center">
        {/* Small badge at the top */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
          <span className="text-xs text-blue-300 tracking-wide">
            Built for expats in Germany
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-5xl font-extrabold tracking-tight leading-tight mb-5"
        >
          German paperwork,{" "}
          <em style={{ fontStyle: "normal", color: "#5b8fff" }}>
            finally simple
          </em>
        </h1>

        <p className="text-white/45 text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Find your nearest Bürgeramt, know exactly what to bring, and get to
          the right booking page — all in one place. No more Googling at
          midnight.
        </p>

        {/* Two buttons — one scrolls to the tool, one goes to FAQ */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={scrollToTool}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Get started →
          </button>
          <a
            href="/faq"
            className="bg-white/5 hover:bg-white/8 border border-white/10 text-white/60 hover:text-white text-sm px-6 py-3 rounded-xl transition-colors no-underline"
          >
            What is Anmeldung?
          </a>
        </div>
      </div>

      {/* ---- SERVICE PILLS (clickable shortcuts) ---- */}
      <div className="max-w-2xl mx-auto px-6 grid grid-cols-3 gap-3 mb-14">
        {/* These are visual shortcuts — clicking them scrolls down to the tool */}
        <div
          onClick={scrollToTool}
          className="bg-white/3 hover:bg-white/6 border border-white/8 hover:border-blue-500/30 rounded-2xl p-5 cursor-pointer transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-base mb-3">
            📋
          </div>
          <div
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-sm font-bold text-white mb-1"
          >
            Anmeldung
          </div>
          <div className="text-xs text-white/35 leading-snug">
            Register your new address
          </div>
        </div>

        <div
          onClick={scrollToTool}
          className="bg-white/3 hover:bg-white/6 border border-white/8 hover:border-blue-500/30 rounded-2xl p-5 cursor-pointer transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-base mb-3">
            📤
          </div>
          <div
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-sm font-bold text-white mb-1"
          >
            Abmeldung
          </div>
          <div className="text-xs text-white/35 leading-snug">
            Deregister when leaving
          </div>
        </div>

        <div
          onClick={scrollToTool}
          className="bg-white/3 hover:bg-white/6 border border-white/8 hover:border-blue-500/30 rounded-2xl p-5 cursor-pointer transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-base mb-3">
            🛂
          </div>
          <div
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-sm font-bold text-white mb-1"
          >
            Pass / ID
          </div>
          <div className="text-xs text-white/35 leading-snug">
            Passport or national ID
          </div>
        </div>
      </div>

      {/* ---- MAIN TOOL ---- */}
      <div id="tool-section" className="max-w-2xl mx-auto px-6 pb-20">
        <Appointments />
        <AiCopilot />
      </div>
    </div>
  );
}

export default Home;
