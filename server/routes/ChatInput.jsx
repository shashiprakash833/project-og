import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage, isLoading } = useChat();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="kai-chat-input-form" onSubmit={handleSubmit}>
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        rows={1}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? "..." : "➤"}
      </button>
    </form>
  );
}