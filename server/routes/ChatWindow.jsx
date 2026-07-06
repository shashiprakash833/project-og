import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const { isOpen } = useChat();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="kai-chat-window"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
        >
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </motion.div>
      )}
    </AnimatePresence>
  );
}