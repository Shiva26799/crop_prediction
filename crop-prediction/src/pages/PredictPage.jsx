import React, { useState } from "react";
import "./PredictPage.css";
import { Link } from "react-router-dom";

const PredictPage = () => {
  // ✅ State for input values
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  // ✅ State to hold prediction result
  const [prediction, setPrediction] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send request to Flask backend
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.predicted_crop);
      } else {
        alert("⚠️ Prediction failed: " + data.error);
      }
    } catch (err) {
      alert("❌ Error connecting to backend: " + err.message);
    }
  };

  return (
    <div>
      {/* ✅ Header Section */}
      <div className="header">
                <Link to="/" className="back-link">
        ← Back to Home
        </Link>

        <h1>Enter Soil Parameters</h1>
        <p>Provide your soil characteristics for accurate crop prediction</p>
      </div>

      {/* ✅ Form Section */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nitrogen (N)</label>
            <input
              type="number"
              name="nitrogen"
              placeholder="0-200 kg/ha"
              value={formData.nitrogen}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phosphorus (P)</label>
            <input
              type="number"
              name="phosphorus"
              placeholder="0-150 kg/ha"
              value={formData.phosphorus}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Potassium (K)</label>
            <input
              type="number"
              name="potassium"
              placeholder="0-300 kg/ha"
              value={formData.potassium}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>pH Level</label>
            <input
              type="number"
              name="ph"
              step="0.1"
              placeholder="3.0-10.0"
              value={formData.ph}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              placeholder="0-50°C"
              value={formData.temperature}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Humidity (%)</label>
            <input
              type="number"
              name="humidity"
              placeholder="0-100%"
              value={formData.humidity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group full-width">
            <label>Rainfall (mm)</label>
            <input
              type="number"
              name="rainfall"
              placeholder="0-3000 mm"
              value={formData.rainfall}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="predict-button">
            🔍 Predict Crop
          </button>
        </form>

        {/* ✅ Display prediction result */}
                    {prediction && (
            <div className="result-box">
                <h2>🌱 Recommended Crop:</h2>
                <p className="crop-name">{prediction}</p>

                {/* ✅ Crop Image */}
                <img
                src={`/crops/${prediction.toLowerCase()}.jpg`}
                alt={prediction}
                className="crop-image"
                onError={(e) => (e.target.style.display = "none")} // hides image if not found
                />
            </div>
            )}

      </div>
    </div>
  );
};

export default PredictPage;
