import { useEffect, useRef, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
const initialMessages = [
  {
    role: "assistant",
    content:
      "Hey, I'm OG Assistant. Ask me about products, sizing, shipping, or streetwear style.",
  },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: updatedMessages }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error || "AI request failed.");
      }

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.answer || "Sorry, I couldn't answer that." };
      setMessages((current) => [...current, assistantMessage]);
    } catch (err) {
      setError(err?.message || "Chat failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleReset = () => {
    setMessages(initialMessages);
    setError("");
    setInput("");
  };

  return (
    <div className="chatbot-widget">
      <button className="chatbot-toggle" type="button" onClick={() => setOpen((current) => !current)}>
        {open ? "Close AI Assistant" : "Chat with OG Bot"}
      </button>

      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <strong>OG AI Assistant</strong>
              <p>Ask about products, orders, shipping, or streetwear style.</p>
            </div>
            <button className="chatbot-reset" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chatbot-message ${message.role === "assistant" ? "assistant" : "user"}`}
              >
                <div className="chatbot-message-role">{message.role === "assistant" ? "OG Bot" : "You"}</div>
                <div className="chatbot-message-text">{message.content}</div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask me about the latest drop..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={loading}
            />
            <button className="btn primary" type="submit" disabled={loading || !input.trim()}>
              {loading ? "Thinking..." : "Send"}
            </button>
          </form>

          {error && <p className="chatbot-error">{error}</p>}
        </div>
      )}
    </div>
  );
}
