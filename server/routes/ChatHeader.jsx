import React from "react";
import { useChat } from "../../hooks/useChat";

export default function ChatHeader() {
  const { setIsOpen, clearChat } = useChat();

  return (
    <div className="kai-chat-header">
      <div className="kai-header-title">
        <span className="kai-header-icon">🤖</span>
        <div>
          <strong>KAI</strong>
          <p>AI Fashion Assistant <span className="kai-status-indicator" /> Online</p>
        </div>
      </div>
      <div className="kai-header-actions">
        <button onClick={clearChat} aria-label="Clear chat history">Clear</button>
        <button onClick={() => setIsOpen(false)} aria-label="Close chat window">✕</button>
      </div>
    </div>
  );
}