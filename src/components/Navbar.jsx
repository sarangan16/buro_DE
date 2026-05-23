import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  function isCurrentPage(path) {
    return location.pathname === path;
  }

  function handleLinkClick() {
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/explain", label: "Letter Explainer" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <nav
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #e8e8e6",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "#1a1a1a",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              B
            </span>
          </div>
          <span
            style={{
              color: "#1a1a1a",
              fontWeight: "700",
              fontSize: "16px",
              letterSpacing: "-0.3px",
            }}
          >
            Büro<span style={{ color: "#2563eb" }}>Help</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="desktop-nav"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isCurrentPage(to) ? "600" : "400",
                color: isCurrentPage(to) ? "#1a1a1a" : "#6b7280",
                transition: "color 0.15s",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
          className="desktop-nav"
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#6b7280",
              fontWeight: "400",
              transition: "color 0.15s",
            }}
          >
            Log in
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              background: "#1a1a1a",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              padding: "8px 18px",
              borderRadius: "8px",
              transition: "background 0.15s",
            }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "#6b7280",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid #e8e8e6",
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            background: "white",
          }}
          className="mobile-only"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={handleLinkClick}
              style={{
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                color: isCurrentPage(to) ? "#1a1a1a" : "#6b7280",
                fontWeight: isCurrentPage(to) ? "600" : "400",
                background: isCurrentPage(to) ? "#f4f4f3" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
          <div
            style={{
              borderTop: "1px solid #f0f0ee",
              marginTop: "8px",
              paddingTop: "12px",
            }}
          >
            <Link
              to="/login"
              onClick={handleLinkClick}
              style={{
                textDecoration: "none",
                display: "block",
                textAlign: "center",
                background: "#1a1a1a",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Get started free
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 641px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
