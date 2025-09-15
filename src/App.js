import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SymptomChecker from "./components/SymptomChecker";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <SymptomChecker />
      </main>
      <Footer />
    </div>
  );
}

export default App;
