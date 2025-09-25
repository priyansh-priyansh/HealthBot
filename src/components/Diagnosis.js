import React from "react";
import SymptomChecker from "./SymptomChecker";
import "./Diagnosis.css";

const Diagnosis = () => {
  return (
    <section className="diagnosis">
      <div className="diagnosis-container">
        <div className="diagnosis-header">
          <h1 className="diagnosis-title">AI Symptom Diagnosis</h1>
          <p className="diagnosis-subtitle">
            Get instant AI-powered insights about your symptoms and potential conditions
          </p>
        </div>
        
        <div className="diagnosis-content">
          <SymptomChecker />
        </div>
        
        <div className="diagnosis-disclaimer">
          <p>
            <strong>Important:</strong> This AI tool provides information for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Diagnosis;