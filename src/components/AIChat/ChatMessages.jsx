import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

export default function ChatMessages({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="kai-messages" role="log" aria-live="polite" aria-label="Style conversation">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
