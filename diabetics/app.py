import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE
from flask import Flask, request, render_template, jsonify
import joblib

app = Flask(__name__)

# Initialize the model and scaler globally
model = None
scaler = None

def initialize_model():
    global model, scaler
    
    try:
        # Load the dataset
        df = pd.read_excel(r"C:\Users\USER\Downloads\breath--x\diabetics\diabetes_with_outcome_last.xlsx")
        
        # Define features
        required_features = ["Pregnancies", "SkinThickness", "BMI", 
                           "DiabetesPedigreeFunction", "Age", "Acetone"]
        
        # Verify all required features exist in the dataset
        if not all(feature in df.columns for feature in required_features):
            raise ValueError("Missing required features in the dataset")
            
        # Verify 'Outcome' column exists
        if 'Outcome' not in df.columns:
            raise ValueError("Missing 'Outcome' column in the dataset")
        
        # Prepare data
        X = df[required_features]
        y = df['Outcome']
        
        # Handle missing values
        X.fillna(X.mean(), inplace=True)
        
        # Initialize and fit the scaler
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Handle class imbalance
        smote = SMOTE(random_state=42)
        X_resampled, y_resampled = smote.fit_resample(X_scaled, y)
        
        # Train the model
        model = RandomForestClassifier(n_estimators=200, max_depth=10, 
                                     min_samples_split=5, random_state=42)
        model.fit(X_resampled, y_resampled)
        
        print("Model initialized successfully")
        
    except Exception as e:
        print(f"Error initializing model: {str(e)}")
        raise

def estimate_glucose_from_acetone(acetone):
    """
    Estimate glucose level based on acetone value.
    This is a simplified estimation - you may want to adjust the formula based on medical literature.
    """
    # Base glucose level (average fasting glucose)
    base_glucose = 100
    
    # Acetone levels typically increase as glucose levels increase in diabetic ketoacidosis
    # This is a simplified conversion - adjust coefficients based on your data
    glucose_estimation = base_glucose + (acetone * 20)
    
    # Ensure reasonable bounds
    glucose_estimation = max(70, min(400, glucose_estimation))
    
    return round(glucose_estimation, 1)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None or scaler is None:
            return jsonify({'error': 'Model not initialized'})
            
        # Get values from the form
        features = [
            float(request.form['pregnancies']),
            float(request.form['skinThickness']),
            float(request.form['bmi']),
            float(request.form['diabetesPedigree']),
            float(request.form['age']),
            float(request.form['acetone'])
        ]
        
        # Transform features
        features_scaled = scaler.transform([features])
        
        # Make prediction
        prediction = model.predict(features_scaled)
        probability = model.predict_proba(features_scaled)[0][1]
        
        # Estimate glucose from acetone
        estimated_glucose = estimate_glucose_from_acetone(features[5])  # acetone is the last feature
        
        result = {
            'prediction': 'Diabetic' if prediction[0] == 1 else 'Not Diabetic',
            'probability': f"{probability*100:.2f}%",
            'glucose': estimated_glucose
        }
        
        return jsonify(result)
    
    except ValueError as ve:
        return jsonify({'error': 'Invalid input values. Please check your inputs.'})
    except Exception as e:
        return jsonify({'error': f'Prediction error: {str(e)}'})

if __name__ == '__main__':
    try:
        initialize_model()
        app.run(debug=True)
    except Exception as e:
        print(f"Failed to start application: {str(e)}")