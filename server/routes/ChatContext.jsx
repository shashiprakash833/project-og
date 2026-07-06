import React, { createContext, useState, useEffect, useRef } from "react";
import { sendMessageToAI } from "../services/chatApi";

export const ChatContext = createContext();

const initialMessage = {
  id: "kai-greeting",
  role: "assistant",
  content: `Hello 👋\n\nWelcome to PROJECT_OG.\n\nI'm KAI, your AI Fashion Shopping Assistant.\n\nI can help you with:\n\n👕 Product Recommendations\n🎨 Custom T-Shirt Ideas\n📏 Size Recommendation\n❤️ Outfit Suggestions\n🚚 Shipping Questions\n📦 Order Tracking\n🔥 Trending Collections\n\nAsk me anything.`,
  timestamp: new Date().toISOString(),
};

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const storedMessages = localStorage.getItem("kai_chat_history");
      return storedMessages ? JSON.parse(storedMessages) : [initialMessage];
    } catch (error) {
      return [initialMessage];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const conversationId = useRef(Date.now().toString());

  useEffect(() => {
    try {
      localStorage.setItem("kai_chat_history", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history to localStorage:", error);
    }
  }, [messages]);

  const sendMessage = async (input) => {
    if (!input.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const history = [...messages, userMessage];
      const data = await sendMessageToAI(input, history);
      const assistantMessage = {
        id: `kai-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message);
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "My apologies, but I'm unable to respond right now. Please try again in a moment.",
        isError: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    conversationId.current = Date.now().toString();
  };

  const value = { isOpen, setIsOpen, messages, sendMessage, isLoading, error, clearChat };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};