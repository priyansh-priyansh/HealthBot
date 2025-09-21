import React from "react";
import { Brain, Shield, Zap, Award } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-intro">
              <p className="intro-text">
                From preventive care to complex diagnoses, a comprehensive
                approach to your health.
              </p>
            </div>

            <div className="hero-headline">
              <span className="headline-modern">Modern</span>
              <span className="headline-care">Care for</span>
              <span className="headline-perfect">a Perfect Health</span>
            </div>

            <div className="hero-features">
              <div className="feature">
                <Brain className="feature-icon" />
                <span>AI-Powered Diagnosis</span>
              </div>
              <div className="feature">
                <Shield className="feature-icon" />
                <span>Secure & Private</span>
              </div>
              <div className="feature">
                <Zap className="feature-icon" />
                <span>Instant Results</span>
              </div>
            </div>

            <div className="hero-footer">
              <div className="footer-info">
                <span className="award">Best HealthTech 2025</span>
                <span className="location">Global • 24/7 Available</span>
              </div>
            </div>
          </div>

          <div className="hero-center">
            <div className="medical-visual">
              <div className="brain-icon">
                <Brain className="brain-svg" />
              </div>
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="doctors-section">
              <h3 className="doctors-title">
                Select from our team of highly skilled AI specialists
              </h3>

              <div className="doctors-carousel">
                <div className="doctor-card">
                  <div className="doctor-avatar">
                    <Brain className="doctor-icon" />
                  </div>
                  <span className="doctor-name">Dr. AI Assistant</span>
                </div>

                <a href="#diagnosis" className="doctor-card">
                  <div className="doctor-avatar">
                    <Shield className="doctor-icon" />
                  </div>
                  <span className="doctor-name">Dr. Niramaya</span>
                </a>
              </div>

              

              <div className="doctors-footer">
                <span className="tech-info">Advanced AI Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
