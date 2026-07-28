const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function sendChatMessage({ message, conversationId, messages }) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
      history: messages
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || "KAI is unavailable right now.");
  }

  return {
    reply: data.reply || data.answer || "I could not read that clearly. Ask me again with a little more detail."
  };
}
