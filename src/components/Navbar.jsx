import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  // Controls whether the mobile menu is showing or not
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // useLocation gives us the current URL path so we can highlight the active link
  const location = useLocation();

  // A small helper — returns true if the given path is the current page
  function isCurrentPage(path) {
    return location.pathname === path;
  }

  // Close the mobile menu whenever a link is clicked
  function handleLinkClick() {
    setMobileMenuOpen(false);
  }

  return (
    <nav
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-[#0a0f1e] border-b border-white/7"
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Site logo / name */}
        <Link
          to="/"
          className="no-underline"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white font-bold text-base">
            Bürger<span className="text-blue-400">Hilfe</span>
          </span>
        </Link>

        {/* Desktop navigation links — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm transition-colors no-underline ${
              isCurrentPage("/")
                ? "text-white bg-white/8"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </Link>
          <Link
            to="/faq"
            className={`px-3 py-2 rounded-lg text-sm transition-colors no-underline ${
              isCurrentPage("/faq")
                ? "text-white bg-white/8"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            FAQ
          </Link>
          <Link
            to="/explain"
            className={`px-3 py-2 rounded-lg text-sm transition-colors no-underline ${
              isCurrentPage("/explain")
                ? "text-white bg-white/8"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            Letter Explainer
          </Link>
          <Link
            to="/login"
            className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors no-underline"
          >
            Log in
          </Link>
        </div>

        {/* Mobile hamburger button — only visible on small screens */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-white/50 hover:text-white p-2 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            // X icon when menu is open
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
            // Hamburger icon when menu is closed
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

      {/* Mobile dropdown — slides in when hamburger is clicked */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/7 px-4 py-3 flex flex-col gap-1">
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`px-3 py-2.5 rounded-lg text-sm no-underline ${
              isCurrentPage("/") ? "text-white bg-white/8" : "text-white/50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/faq"
            onClick={handleLinkClick}
            className={`px-3 py-2.5 rounded-lg text-sm no-underline ${
              isCurrentPage("/faq") ? "text-white bg-white/8" : "text-white/50"
            }`}
          >
            FAQ
          </Link>
          <Link
            to="/explain"
            onClick={handleLinkClick}
            className={`px-3 py-2.5 rounded-lg text-sm no-underline ${
              isCurrentPage("/explain")
                ? "text-white bg-white/8"
                : "text-white/50"
            }`}
          >
            Letter Explainer
          </Link>

          <Link
            to="/login"
            onClick={handleLinkClick}
            className="px-3 py-2.5 rounded-lg text-sm text-blue-400 no-underline"
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
