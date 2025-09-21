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
import { askGemini } from "../services/gemini";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const SymptomChecker = () => {
  const { user } = useAuth();
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
  const [errorText, setErrorText] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else {
      // fallback
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setErrorText("");
    if (!user) return;

    const messagesRef = collection(db, "chats", user.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"), limit(200));

    const loadHistoryFallback = async () => {
      try {
        const snap = await getDocs(messagesRef);
        if (snap.empty) return;
        const loaded = snap.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              type: data.role === "assistant" ? "bot" : "user",
              content: data.content,
              timestamp: data.createdAt?.toDate?.() || new Date(),
            };
          })
          .sort((a, b) => a.timestamp - b.timestamp);
        setMessages(loaded);
        setErrorText("");
      } catch (err) {
        console.error("Firestore fallback getDocs error:", err);
        setErrorText("Couldn't load history. Please try again later.");
      }
    };

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) return;
        const loaded = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            type: data.role === "assistant" ? "bot" : "user",
            content: data.content,
            timestamp: data.createdAt?.toDate?.() || new Date(),
          };
        });
        setMessages(loaded);
        setErrorText("");
      },
      async (err) => {
        console.error("Firestore onSnapshot error:", err);
        await loadHistoryFallback();
      }
    );

    return () => unsubscribe();
  }, [user]);

  const persistMessage = async ({ role, content }) => {
    if (!user) return;
    try {
      const messagesRef = collection(db, "chats", user.id, "messages");
      await addDoc(messagesRef, {
        role, // "user" | "assistant"
        content,
        email: user.email,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Failed to persist message:", e);
      setErrorText("Couldn't save your message. It will still appear locally.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const prompt = inputValue;
    setInputValue("");
    setIsTyping(true);
    setErrorText("");

    try {
      await persistMessage({ role: "user", content: prompt });

      const aiText = await askGemini(prompt);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content:
          aiText || "I'm sorry, I couldn't generate a response right now.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      await persistMessage({ role: "assistant", content: botMessage.content });
    } catch (e) {
      console.error("Chat handleSendMessage error:", e);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: `I ran into a problem: ${
          e?.message || "Unknown error"
        }. Please try again shortly.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      await persistMessage({ role: "assistant", content: botMessage.content });
    } finally {
      setIsTyping(false);
    }
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
          <div className="messages-container" ref={messagesContainerRef}>
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
                placeholder={
                  user
                    ? "Describe your symptoms in detail..."
                    : "Please sign in to chat"
                }
                className="message-input"
                rows="3"
                disabled={!user}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || !user}
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
