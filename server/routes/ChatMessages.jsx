import React, { useEffect, useRef } from "react";
import { useChat } from "../../hooks/useChat";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";

export default function ChatMessages() {
  const { messages, isLoading } = useChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="kai-chat-messages">
      {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      {isLoading && <TypingIndicator />}
      <QuickSuggestions />
      <div ref={scrollRef} />
    </div>
  );
}