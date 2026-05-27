import React, { useState } from "react";
import { Link } from "react-router-dom";
import Appointments from "../components/Appointments";
import AiCopilot from "../components/AiCopilot";
import LetterExplainer from "./LetterExplainer";

const TRUST = [
  { value: "6", label: "Cities covered" },
  { value: "3", label: "Services supported" },
  { value: "100%", label: "Free to use" },
];

const TABS = [
  { id: "finder", label: "Find Bürgeramt" },
  { id: "ai", label: "AI Copilot" },
  { id: "letter", label: "Letter Explainer" },
];

function Home() {
  const [activeTab, setActiveTab] = useState("finder");

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#faf8f4",
        minHeight: "100vh",
        color: "#1a1612",
      }}
    >
      {/* ── HERO ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 40px 80px",
          borderBottom: "1px solid rgba(30,25,20,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "end",
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(30,25,20,0.4)",
                marginBottom: "32px",
                fontWeight: "400",
              }}
            >
              Built for expats in Germany
            </p>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(48px, 6vw, 76px)",
                fontWeight: "500",
                lineHeight: "1.0",
                letterSpacing: "-0.02em",
                color: "#1a1612",
                margin: "0",
              }}
            >
              German
              <br />
              bureaucracy,
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "rgba(30,25,20,0.35)",
                  fontWeight: "300",
                }}
              >
                finally simple.
              </em>
            </h1>
          </div>

          {/* Right */}
          <div style={{ paddingBottom: "8px" }}>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(30,25,20,0.55)",
                lineHeight: "1.75",
                marginBottom: "48px",
                fontWeight: "300",
              }}
            >
              Find your nearest Bürgeramt, decode confusing letters, and get
              step-by-step AI guidance — all in one place.
            </p>

            {/* Trust numbers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                borderTop: "1px solid rgba(30,25,20,0.1)",
                paddingTop: "32px",
              }}
            >
              {TRUST.map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    paddingRight: "24px",
                    borderRight:
                      i < TRUST.length - 1
                        ? "1px solid rgba(30,25,20,0.1)"
                        : "none",
                    paddingLeft: i > 0 ? "24px" : "0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "36px",
                      fontWeight: "500",
                      color: "#1a1612",
                      letterSpacing: "-0.02em",
                      lineHeight: "1",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(30,25,20,0.35)",
                      marginTop: "6px",
                      fontWeight: "400",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 40px 100px",
        }}
      >
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(30,25,20,0.1)",
            marginBottom: "48px",
          }}
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: "12px 28px 14px",
                border: "none",
                borderBottom:
                  activeTab === id
                    ? "1px solid #1a1612"
                    : "1px solid transparent",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "400",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                marginBottom: "-1px",
                transition: "all 0.2s",
                background: "transparent",
                color: activeTab === id ? "#1a1612" : "rgba(30,25,20,0.35)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          style={{
            border: "1px solid rgba(30,25,20,0.1)",
            minHeight: "500px",
            overflow: "hidden",
          }}
        >
          {activeTab === "finder" && <Appointments />}
          {activeTab === "ai" && <AiCopilot />}
          {activeTab === "letter" && <LetterExplainer embedded />}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid rgba(30,25,20,0.1)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "28px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "17px",
              fontWeight: "600",
              color: "#1a1612",
              letterSpacing: "0.02em",
            }}
          >
            Büro
            <span style={{ color: "rgba(30,25,20,0.3)", fontWeight: "300" }}>
              Help
            </span>
          </span>

          <div style={{ display: "flex", gap: "28px" }}>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(30,25,20,0.3)",
              }}
            >
              developed by - Sarangan
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
