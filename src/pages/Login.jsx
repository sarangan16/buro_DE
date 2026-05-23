import React, { useState } from "react";

const Login = () => {
  // "signup" or "login" — drives what we show
  const [mode, setMode] = useState("signup");

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          {isLogin
            ? "Log in to save your documents checklist"
            : "Sign up to track your Anmeldung progress"}
        </p>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Name field — only on sign up */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Anna Müller"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot password — only on login */}
          {isLogin && (
            <div className="text-right">
              <button className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Main action button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-150 text-sm">
          {isLogin ? "Log In" : "Create Account"}
        </button>

        {/* Toggle between login and sign up */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="text-blue-500 font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
