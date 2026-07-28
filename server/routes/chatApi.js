const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

/**
 * Sends a message to the AI chat backend.
 * @param {string} message - The user's message.
 * @param {Array<object>} history - The conversation history.
 * @returns {Promise<object>} - The AI's response.
 */
export const sendMessageToAI = async (message, history) => {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    const errorPayload = await response.json();
    throw new Error(errorPayload?.error || "The AI assistant is currently unavailable.");
  }

  return response.json();
};