import React from "react";
import { useChat } from "../../hooks/useChat";
import FloatingButton from "./FloatingButton";
import ChatWindow from "./ChatWindow";

export default function ChatBot() {
  const { isOpen } = useChat();

  return (
    <div className="kai-chatbot-container">
      <ChatWindow />
      {!isOpen && <FloatingButton />}
    </div>
  );
}