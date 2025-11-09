import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      {/* ✅ Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="icon"></div>
          <h1>Crop Prediction</h1>
          <p>
            Discover the perfect crop for your soil using advanced prediction
            technology
          </p>

          {/* ✅ Use Link instead of <a> */}
          <Link to="/predict" className="check-crop-link">
            🌾 <b>Check Your Crop</b>
          </Link>
        </div>
      </div>

      {/* ✅ Features Section */}
      <div className="features">
        <div className="card">
          <div className="icon">🌾</div>
          <h3>Smart Analysis</h3>
          <p>Advanced algorithms analyze your soil characteristics</p>
        </div>

        <div className="card">
          <div className="icon">🎯</div>
          <h3>Accurate Predictions</h3>
          <p>Get precise crop recommendations for optimal yield</p>
        </div>

        <div className="card">
          <div className="icon">🚀</div>
          <h3>Easy to Use</h3>
          <p>Simple interface for quick and reliable results</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
