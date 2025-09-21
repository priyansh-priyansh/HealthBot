import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SymptomChecker from "./components/SymptomChecker";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SelfCare from "./components/SelfCare";
import About from "./components/About";
import "./App.css";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SymptomChecker />
      </main>
      <Footer />
    </>
  );
}

function SelfCarePage() {
  return (
    <>
      <Header />
      <main>
        <SelfCare />
      </main>
      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/self-care"
              element={
                <ProtectedRoute>
                  <SelfCarePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
