import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import LetterExplainer from "./pages/LetterExplainer";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explain" element={<LetterExplainer />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
