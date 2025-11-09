import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PredictPage from "./pages/PredictPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default route: shows HomePage first */}
        <Route path="/" element={<HomePage />} />

        {/* ✅ Predict Page */}
        <Route path="/predict" element={<PredictPage />} />

        {/* ✅ Fallback route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
