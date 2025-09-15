import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Loader,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./SymptomChecker.css";

const SymptomChecker = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your AI health assistant. Please describe your symptoms and I'll help you understand what might be causing them. Remember, this is for informational purposes only and not a substitute for professional medical advice.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI-powered disease prediction based on symptoms
  const predictDisease = (symptoms) => {
    const symptomLower = symptoms.toLowerCase();
    const predictions = [];

    // Common disease patterns
    const diseasePatterns = {
      common_cold: {
        keywords: [
          "cough",
          "runny nose",
          "sneezing",
          "sore throat",
          "congestion",
          "headache",
          "fatigue",
        ],
        symptoms: [
          "Runny or stuffy nose",
          "Sore throat",
          "Cough",
          "Sneezing",
          "Headache",
          "Body aches",
        ],
        description: "A viral infection of the upper respiratory tract",
        severity: "Mild",
        recommendations: [
          "Rest",
          "Stay hydrated",
          "Use saline nasal spray",
          "Gargle with salt water",
        ],
      },
      flu: {
        keywords: [
          "fever",
          "chills",
          "body aches",
          "fatigue",
          "headache",
          "cough",
          "sore throat",
        ],
        symptoms: [
          "High fever",
          "Chills and sweats",
          "Muscle aches",
          "Headache",
          "Dry cough",
          "Fatigue",
        ],
        description:
          "Influenza - a viral infection affecting the respiratory system",
        severity: "Moderate to Severe",
        recommendations: [
          "Rest",
          "Stay hydrated",
          "Antiviral medication if prescribed",
          "Monitor fever",
        ],
      },
      migraine: {
        keywords: [
          "headache",
          "migraine",
          "nausea",
          "vomiting",
          "sensitivity",
          "light",
          "sound",
        ],
        symptoms: [
          "Severe headache",
          "Nausea",
          "Vomiting",
          "Sensitivity to light and sound",
          "Aura",
        ],
        description: "A neurological condition causing severe headaches",
        severity: "Moderate to Severe",
        recommendations: [
          "Rest in dark room",
          "Avoid triggers",
          "Over-the-counter pain relief",
          "Consult neurologist if frequent",
        ],
      },
      anxiety: {
        keywords: [
          "anxiety",
          "worry",
          "panic",
          "nervous",
          "restless",
          "trouble sleeping",
          "irritability",
        ],
        symptoms: [
          "Excessive worry",
          "Restlessness",
          "Trouble sleeping",
          "Irritability",
          "Panic attacks",
        ],
        description:
          "A mental health condition characterized by excessive worry and fear",
        severity: "Mild to Severe",
        recommendations: [
          "Deep breathing exercises",
          "Regular exercise",
          "Adequate sleep",
          "Consider therapy",
        ],
      },
      depression: {
        keywords: [
          "depression",
          "sad",
          "hopeless",
          "tired",
          "sleep",
          "appetite",
          "concentration",
        ],
        symptoms: [
          "Persistent sadness",
          "Loss of interest",
          "Fatigue",
          "Sleep disturbances",
          "Appetite changes",
        ],
        description:
          "A mood disorder affecting how you feel, think, and handle daily activities",
        severity: "Moderate to Severe",
        recommendations: [
          "Seek professional help",
          "Regular exercise",
          "Maintain routine",
          "Connect with others",
        ],
      },
      allergies: {
        keywords: [
          "allergies",
          "allergic",
          "sneezing",
          "itchy",
          "watery eyes",
          "rash",
          "hives",
        ],
        symptoms: [
          "Sneezing",
          "Itchy, watery eyes",
          "Runny nose",
          "Skin rash",
          "Hives",
        ],
        description:
          "An immune system reaction to substances that are typically harmless",
        severity: "Mild to Moderate",
        recommendations: [
          "Avoid allergens",
          "Antihistamines",
          "Nasal sprays",
          "Allergy testing",
        ],
      },
    };

    // Check for matching patterns
    Object.entries(diseasePatterns).forEach(([disease, data]) => {
      const matchCount = data.keywords.filter((keyword) =>
        symptomLower.includes(keyword)
      ).length;

      if (matchCount > 0) {
        predictions.push({
          disease,
          ...data,
          confidence: Math.min((matchCount / data.keywords.length) * 100, 95),
        });
      }
    });

    // Sort by confidence
    predictions.sort((a, b) => b.confidence - a.confidence);

    return predictions.slice(0, 3); // Return top 3 predictions
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const predictions = predictDisease(inputValue);

      let botResponse = "Based on your symptoms, here's what I found:\n\n";

      if (predictions.length === 0) {
        botResponse +=
          "I couldn't find a specific match for your symptoms. This could be due to:\n";
        botResponse += "• Symptoms not matching common patterns\n";
        botResponse += "• Need for more specific information\n";
        botResponse += "• A condition requiring professional evaluation\n\n";
        botResponse +=
          "Please provide more details about your symptoms, or consult with a healthcare professional for a proper diagnosis.";
      } else {
        predictions.forEach((prediction, index) => {
          botResponse += `**${index + 1}. ${prediction.disease
            .replace("_", " ")
            .toUpperCase()}**\n`;
          botResponse += `Confidence: ${Math.round(prediction.confidence)}%\n`;
          botResponse += `Description: ${prediction.description}\n`;
          botResponse += `Severity: ${prediction.severity}\n`;
          botResponse += `Common Symptoms: ${prediction.symptoms.join(", ")}\n`;
          botResponse += `Recommendations: ${prediction.recommendations.join(
            ", "
          )}\n\n`;
        });

        botResponse += "⚠️ **Important Disclaimer:**\n";
        botResponse +=
          "This analysis is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.";
      }

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        predictions: predictions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="symptom-checker" id="diagnosis">
      <div className="symptom-checker-container">
        <div className="checker-header">
          <h2 className="checker-title">AI Symptom Checker</h2>
          <p className="checker-subtitle">
            Describe your symptoms and get instant AI-powered insights
          </p>
        </div>

        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === "bot" ? (
                    <Bot className="avatar-icon" />
                  ) : (
                    <User className="avatar-icon" />
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.content.split("\n").map((line, index) => (
                      <p key={index} className="message-line">
                        {line.includes("**")
                          ? line
                              .split("**")
                              .map((part, partIndex) =>
                                partIndex % 2 === 1 ? (
                                  <strong key={partIndex}>{part}</strong>
                                ) : (
                                  part
                                )
                              )
                          : line}
                      </p>
                    ))}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <Bot className="avatar-icon" />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Loader className="typing-icon" />
                    <span>AI is analyzing your symptoms...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms in detail..."
                className="message-input"
                rows="3"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-button"
              >
                <Send className="send-icon" />
              </button>
            </div>
            <div className="input-footer">
              <div className="disclaimer">
                <AlertCircle className="disclaimer-icon" />
                <span>
                  This is not a substitute for professional medical advice
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
