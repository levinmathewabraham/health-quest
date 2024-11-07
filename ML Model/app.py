from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
model = joblib.load('mental_health_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/')
def home():
    return "Welcome to the Mental Health Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = pd.DataFrame([data])
    scaled_data = scaler.transform(input_data)
    prediction = model.predict(scaled_data)
    
    recommendations = {
        0: "Mindfulness and relaxation exercises",
        1: "Balanced mix of stress management and self-reflection activities",
        2: "Lighter motivational tasks"
    }
    
    response = {
        "prediction": int(prediction[0]),
        "recommendation": recommendations[int(prediction[0])]
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
