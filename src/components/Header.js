import React from "react";
import { Stethoscope, Menu, X } from "lucide-react";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Stethoscope className="logo-icon" />
          <span className="logo-text">HealthBot</span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <a href="#services" className="nav-link">
            <span className="nav-bullet"></span>
            Services
          </a>
          <a href="#diagnosis" className="nav-link">
            <span className="nav-bullet"></span>
            Diagnosis
          </a>
          <a href="#pricing" className="nav-link">
            <span className="nav-bullet"></span>
            Pricing
          </a>
          <a href="#prevention" className="nav-link">
            <span className="nav-bullet"></span>
            Prevention
          </a>
        </nav>

        {/* CTA Button / Logout */}
        {user ? (
          <button className="cta-button" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="cta-button">Health Check</button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
