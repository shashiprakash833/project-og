import React from "react";
import { useChat } from "../../hooks/useChat";

const suggestions = [
  "Find oversized hoodies",
  "Best anime t-shirts",
  "Recommend an outfit",
  "Help me choose a size",
  "Track my order",
  "Customize a hoodie",
  "Show new arrivals",
];

export default function QuickSuggestions() {
  const { sendMessage, messages } = useChat();
  if (messages.length > 1) return null;

  return (
    <div className="kai-quick-suggestions">
      {suggestions.map((text) => (
        <button key={text} onClick={() => sendMessage(text)}>{text}</button>
      ))}
    </div>
  );
}