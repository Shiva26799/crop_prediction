from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import torch.nn.functional as F
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# ✅ Add a root route to stop "Not Found" error
@app.route('/')
def home():
    return "Crop Prediction API is running! ✅ Use /predict for predictions."

# ✅ Model architecture that matches your saved model
class CropPredictorModel(nn.Module):
    def __init__(self):
        super(CropPredictorModel, self).__init__()
        self.fc1 = nn.Linear(7, 64)
        self.fc2 = nn.Linear(64, 128)
        self.fc3 = nn.Linear(128, 64)
        self.fc4 = nn.Linear(64, 22)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = self.fc4(x)
        return x

# ✅ Load model + encoder
model = CropPredictorModel()
model.load_state_dict(torch.load("model.pth", map_location=torch.device("cpu")))
model.eval()
encoder = pickle.load(open("label_encoder.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        values = np.array([
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"])
        ])
        inputs = torch.tensor(values, dtype=torch.float32).unsqueeze(0)

        with torch.no_grad():
            outputs = model(inputs)
            probabilities = F.softmax(outputs, dim=1)
            _, predicted = torch.max(probabilities, 1)
            crop = encoder.inverse_transform(predicted.numpy())[0]

        return jsonify({"predicted_crop": crop})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
