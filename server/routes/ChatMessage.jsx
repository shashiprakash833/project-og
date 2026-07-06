import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const { role, content, timestamp, isError } = message;
  const isAssistant = role === "assistant";

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      className={`kai-chat-message ${isAssistant ? "assistant" : "user"} ${isError ? "error" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="kai-message-avatar">{isAssistant ? "🤖" : "👤"}</div>
      <div className="kai-message-content">
        <div className="kai-message-bubble">
          <ReactMarkdown
            components={{ a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}
          >
            {content}
          </ReactMarkdown>
        </div>
        <div className="kai-message-timestamp">{formatTime(timestamp)}</div>
      </div>
    </motion.div>
  );
}