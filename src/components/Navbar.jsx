import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Helper to highlight the active link
  function isActive(path) {
    return location.pathname === path;
  }

  const linkStyle =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150";
  const activeStyle = "bg-gray-900 text-white";
  const inactiveStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + site name */}
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg tracking-tight">
              🇩🇪 Bürgeramt Helper
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/"
              className={`${linkStyle} ${isActive("/") ? activeStyle : inactiveStyle}`}
            >
              Home
            </Link>
            <Link
              to="/faq"
              className={`${linkStyle} ${isActive("/faq") ? activeStyle : inactiveStyle}`}
            >
              FAQ
            </Link>
            <Link
              to="/login"
              className={`${linkStyle} ${isActive("/login") ? activeStyle : inactiveStyle}`}
            >
              Login
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-400 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              {/* show X when open, hamburger when closed */}
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile dropdown menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-gray-700 px-4 pb-4 pt-2 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block ${linkStyle} ${isActive("/") ? activeStyle : inactiveStyle}`}
          >
            Home
          </Link>
          <Link
            to="/faq"
            onClick={() => setMobileOpen(false)}
            className={`block ${linkStyle} ${isActive("/faq") ? activeStyle : inactiveStyle}`}
          >
            FAQ
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className={`block ${linkStyle} ${isActive("/login") ? activeStyle : inactiveStyle}`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
