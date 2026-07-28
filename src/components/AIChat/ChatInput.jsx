import { useEffect, useRef } from "react";

export default function ChatInput({ value, loading, onChange, onSend }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <form
      className="kai-input"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <textarea
        ref={inputRef}
        value={value}
        rows={1}
        placeholder="Ask about fits, custom prints, drops..."
        disabled={loading}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Message styling concierge"
      />
      <button type="submit" disabled={loading || !value.trim()} aria-label="Send message">
        Send
      </button>
    </form>
  );
}
