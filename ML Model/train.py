import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib

# Load the dataset
data = pd.read_csv('mental_health_survey_dataset.csv')

# Define the feature and target columns
X = data.drop(['Total_Score', 'Target'], axis=1)  # Adjust if column names differ
y = data['Target']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Initialize and train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the model and scaler
joblib.dump(model, 'mental_health_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Model and scaler have been saved.")
