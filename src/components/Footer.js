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
              <span className="logo-text">HealthBot</span>
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

          <div className="footer-section">
            <h3 className="footer-title">Home</h3>
            <ul className="footer-links">
              <li>
                <a href="#diagnosis">Symptom Checker</a>
              </li>
              <li>
                <a href="#Home">Health Analysis</a>
              </li>
              <li>
                <a href="#prevention">Preventive Care</a>
              </li>
              <li>
                <a href="#emergency">Emergency Guide</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#help">Help Center</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>support@healthbot.ai</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Global • Online Service</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© 2025 HealthBot. All rights reserved.</p>
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
