import { useChat } from "../../hooks/useChat.js";
import FloatingButton from "./FloatingButton.jsx";
import ChatWindow from "./ChatWindow.jsx";

export default function ChatBot() {
  const {
    open,
    minimized,
    messages,
    input,
    loading,
    error,
    openChat,
    closeChat,
    minimizeChat,
    restoreChat,
    setInput,
    clearChat,
    sendMessage
  } = useChat();

  const showWindow = open && !minimized;

  return (
    <div className="kai-chatbot">
      {showWindow && (
        <ChatWindow
          messages={messages}
          input={input}
          loading={loading}
          error={error}
          onInput={setInput}
          onSend={sendMessage}
          onClear={clearChat}
          onMinimize={minimizeChat}
          onClose={closeChat}
        />
      )}
      <FloatingButton open={showWindow} onClick={showWindow ? minimizeChat : minimized ? restoreChat : openChat} />
    </div>
  );
}
