import React from "react";
import { Link } from "react-router-dom";
import Appointments from "../components/Appointments";
import AiCopilot from "../components/AiCopilot";

const SERVICES = [
  {
    emoji: "📋",
    title: "Anmeldung",
    desc: "Register your address within 14 days of moving in",
    color: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    emoji: "📤",
    title: "Abmeldung",
    desc: "Deregister when leaving Germany for good",
    color: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    emoji: "🛂",
    title: "Pass / ID",
    desc: "Renew or apply for a passport or national ID card",
    color: "#fffbeb",
    border: "#fde68a",
  },
];

const TRUST = [
  { value: "6", label: "Cities covered" },
  { value: "3", label: "Services supported" },
  { value: "100%", label: "Free to use" },
];

function Home() {
  function scrollToTool() {
    const el = document.getElementById("tool-section");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#fafaf8",
        minHeight: "100vh",
        color: "#1a1a1a",
      }}
    >
      {/* ── HERO ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "88px 32px 80px",
        }}
        id="hero-sec"
      >
        <div style={{ maxWidth: "640px" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#2563eb",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#1d4ed8",
                fontWeight: "500",
                letterSpacing: "0.02em",
              }}
            >
              Built for expats in Germany
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 62px)",
              fontWeight: "800",
              lineHeight: "1.05",
              letterSpacing: "-1.5px",
              color: "#0f0f0f",
              marginBottom: "24px",
            }}
          >
            German bureaucracy,
            <br />
            <span style={{ color: "#2563eb" }}>finally simple.</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              lineHeight: "1.7",
              marginBottom: "40px",
              maxWidth: "480px",
            }}
          >
            Find your nearest Bürgeramt, know exactly what to bring, and get
            step-by-step guidance — all in one place. No more Googling at
            midnight.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "64px",
            }}
          >
            <button
              onClick={scrollToTool}
              style={{
                background: "#1a1a1a",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
                padding: "13px 28px",
                borderRadius: "10px",
                fontFamily: "'DM Sans', sans-serif",
                transition: "opacity 0.15s",
              }}
            >
              Get started free →
            </button>
            <Link
              to="/explain"
              style={{
                textDecoration: "none",
                fontSize: "15px",
                color: "#6b7280",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Got a confusing letter?
              <span style={{ color: "#2563eb" }}>Explain it →</span>
            </Link>
          </div>

          {/* Trust numbers */}
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {TRUST.map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "800",
                    color: "#0f0f0f",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    marginTop: "2px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid #e8e8e6",
          borderBottom: "1px solid #e8e8e6",
        }}
      >
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "32px",
            }}
          >
            What do you need to do?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {SERVICES.map(({ emoji, title, desc, color, border }) => (
              <div
                key={title}
                onClick={scrollToTool}
                style={{
                  background: color,
                  border: `1px solid ${border}`,
                  borderRadius: "12px",
                  padding: "24px",
                  cursor: "pointer",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>
                  {emoji}
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    color: "#0f0f0f",
                    marginBottom: "6px",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    lineHeight: "1.6",
                  }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOOL SECTION ── */}
      <div
        id="tool-section"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "72px 32px 48px",
          scrollMarginTop: "80px",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Bürgeramt Finder
          </p>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
              color: "#0f0f0f",
              marginBottom: "8px",
            }}
          >
            Find your office in seconds
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280" }}>
            Select your city, pick your service, and we'll show you exactly
            where to go.
          </p>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid #e8e8e6",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Appointments />
        </div>
      </div>

      {/* ── COPILOT SECTION ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px 96px" }}
      >
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            AI Copilot
          </p>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
              color: "#0f0f0f",
              marginBottom: "8px",
            }}
          >
            Ask anything
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280" }}>
            Visa questions, tax IDs, what to do first — get a clear answer in
            seconds.
          </p>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid #e8e8e6",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <AiCopilot />
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid #e8e8e6", background: "white" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "32px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a" }}
          >
            Bürger<span style={{ color: "#2563eb" }}>Hilfe</span>
          </span>
          <span style={{ fontSize: "13px", color: "#9ca3af" }}>
            Built for expats. Free forever.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { to: "/faq", label: "FAQ" },
              { to: "/explain", label: "Letter Explainer" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
