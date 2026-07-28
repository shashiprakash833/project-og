import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import QuickSuggestions from "./QuickSuggestions.jsx";

export default function ChatWindow({
  messages,
  input,
  loading,
  error,
  onInput,
  onSend,
  onClear,
  onMinimize,
  onClose
}) {
  return (
    <section className="kai-window" aria-label="Shopping concierge">
      <ChatHeader onClear={onClear} onMinimize={onMinimize} onClose={onClose} />
      <ChatMessages messages={messages} loading={loading} />
      {error && <p className="kai-error">{error}</p>}
      <QuickSuggestions onSelect={onSend} disabled={loading} />
      <ChatInput value={input} loading={loading} onChange={onInput} onSend={() => onSend()} />
    </section>
  );
}
