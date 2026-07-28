const formatTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));

function renderMarkdown(text) {
  return String(text)
    .split("\n")
    .map((line, index) => {
      const clean = line.trim();
      if (!clean) return <br key={index} />;

      if (clean.startsWith("- ")) {
        return <li key={index}>{formatInline(clean.slice(2))}</li>;
      }

      return <p key={index}>{formatInline(clean)}</p>;
    });
}

function formatInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export default function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";

  return (
    <article className={`kai-message ${isAssistant ? "kai-assistant" : "kai-user"}`}>
      <div className="kai-avatar" aria-hidden="true">
        {isAssistant ? <img src="/images/brand/og-logo-original.jpg" alt="" /> : "YOU"}
      </div>
      <div>
        <div className="kai-bubble">{renderMarkdown(message.content)}</div>
        <time className="kai-time" dateTime={message.createdAt}>
          {formatTime(message.createdAt)}
        </time>
      </div>
    </article>
  );
}
