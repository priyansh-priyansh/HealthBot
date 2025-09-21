import React from "react";
import { Stethoscope, Mail, Phone, MapPin, Shield, Heart } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Stethoscope className="logo-icon" />
              <span className="logo-text">Niramaya</span>
            </div>
            <p className="footer-description">
              AI-powered healthcare solutions for better health outcomes. Get
              instant symptom analysis and health insights.
            </p>
            <div className="footer-badges">
              <div className="badge">
                <Shield className="badge-icon" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="badge">
                <Heart className="badge-icon" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>

   
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© 2025 Niramaya. All rights reserved.</p>
            <div className="footer-disclaimer">
              <p>
                This service is for informational purposes only and should not
                replace professional medical advice. Always consult with a
                healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
