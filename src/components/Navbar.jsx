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
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#0a0f1e]/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/5"
    >
      <div
        className="max-w-6xl mx-auto px-8 flex items-center justify-between h-18"
        style={{ height: "68px" }}
      >
        {/* Logo */}
        <Link to="/" className="no-underline flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
            <span
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-white font-black text-sm"
            >
              B
            </span>
          </div>
          <span
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-white font-bold text-base tracking-tight"
          >
            Bürger<span className="text-blue-400">Hilfe</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm transition-colors no-underline ${
                isCurrentPage(to)
                  ? "text-white font-medium"
                  : "text-white/45 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-white/50 hover:text-white transition-colors no-underline"
          >
            Log in
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors no-underline"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-white/50 hover:text-white p-2"
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
        <div className="sm:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-1 bg-[#0a0f1e]">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={handleLinkClick}
              className={`px-3 py-3 rounded-lg text-sm no-underline transition-colors ${
                isCurrentPage(to)
                  ? "text-white bg-white/6"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="border-t border-white/5 mt-2 pt-3">
            <Link
              to="/login"
              onClick={handleLinkClick}
              className="block w-full text-center px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg no-underline"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
