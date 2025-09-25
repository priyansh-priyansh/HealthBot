import React from "react";
import { Stethoscope, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <Stethoscope className="logo-icon" />
          <span className="logo-text">Niramaya</span>
        </Link>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <Link to="/" className="nav-link">
            <span className="nav-bullet"></span>
            Home
          </Link>
          <Link to="/diagnosis" className="nav-link">
            <span className="nav-bullet"></span>
            Diagnosis
          </Link>
          <Link to="/self-care" className="nav-link">
            <span className="nav-bullet"></span>
            Self-Care
          </Link>
          <Link to="/about" className="nav-link">
            <span className="nav-bullet"></span>
            About
          </Link>
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
