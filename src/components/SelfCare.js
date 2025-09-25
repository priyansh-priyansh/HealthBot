import React from "react";
import "./SelfCare.css";

const SelfCare = () => {
  const selfCareCategories = [
    {
      id: "stress-mind",
      icon: "🧘",
      title: "Stress & Mind",
      tips: [
        "Daily meditation or deep breathing for 10–15 minutes.",
        "Limit screen time before bed.",
        "Practice journaling or gratitude exercises.",
      ],
    },
    {
      id: "food-nutrition",
      icon: "🥗",
      title: "Food & Nutrition",
      tips: [
        "Eat balanced meals with fruits, vegetables, whole grains, and proteins.",
        "Avoid oily and junk food; prefer home-cooked meals.",
        "Drink at least 2–3 liters of water daily.",
      ],
    },
    {
      id: "exercise-fitness",
      icon: "🏃",
      title: "Exercise & Fitness",
      tips: [
        "30 minutes of walking, yoga, or workout 5 days a week.",
        "Stretching in between long study/work sessions.",
        "Light warm-up and cool-down to avoid injuries.",
      ],
    },
    {
      id: "sleep-routines",
      icon: "😴",
      title: "Sleep Routines",
      tips: [
        "Maintain a consistent sleep schedule (7–8 hours daily).",
        "Avoid heavy meals or caffeine before sleeping.",
        "Keep your room dark, quiet, and cool for better sleep.",
      ],
    },
    {
      id: "skin-care",
      icon: "🌿",
      title: "Skin Care",
      tips: [
        "Wash your face twice daily with a mild cleanser.",
        "Use sunscreen before going out.",
        "Stay hydrated; it directly improves skin glow.",
      ],
    },
    {
      id: "home-hacks",
      icon: "🏡",
      title: "Home Hacks",
      tips: [
        "Use lemon + honey for sore throat relief.",
        "Turmeric milk helps boost immunity.",
        "Keep indoor plants for fresh air and reduced stress.",
      ],
    },
  ];

  return (
    <section className="self-care">
      <div className="self-care-container">
        {/* Header */}
        <div className="self-care-header">
          <h1 className="self-care-title">Self Care</h1>
          <p className="self-care-subtitle">
            Practical tips and lifestyle habits to help you stay healthy,
            energetic, and balanced every day.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="self-care-grid">
          {selfCareCategories.map((category) => (
            <div key={category.id} className="self-care-card">
              <div className="card-header">
                <div className="card-icon">{category.icon}</div>
                <h3 className="card-title">{category.title}</h3>
              </div>
              <div className="card-content">
                <ul className="tips-list">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="tip-item">
                      <span className="tip-bullet"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="self-care-footer">
          <div className="footer-message">
            <span className="message-icon">✨</span>
            <p className="message-text">
              Self care is not luxury, it's essential. Small habits every day →
              long-term healthy lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfCare;
