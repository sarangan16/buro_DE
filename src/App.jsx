import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import FAQ from "./components/FAQ";
import Login from "./components/Login";
import Appointment from "./components/Appointments";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Faq" element={<FAQ />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
