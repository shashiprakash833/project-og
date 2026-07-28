import React from "react";
import { useChat } from "../../hooks/useChat";
import { motion } from "framer-motion";

export default function FloatingButton() {
  const { setIsOpen } = useChat();

  return (
    <motion.button
      className="kai-floating-button"
      onClick={() => setIsOpen(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Open AI Fashion Assistant"
    />
  );
}