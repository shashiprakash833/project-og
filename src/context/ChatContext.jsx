import { createContext, useEffect, useMemo, useReducer, useRef } from "react";
import { sendChatMessage } from "../services/chatApi.js";

export const ChatContext = createContext(null);

const STORAGE_KEY = "og-style-chat-v2";
const CONVERSATION_KEY = "og-style-conversation-v2";

const greeting = `Hello

Welcome.

Your streetwear concierge is ready.

I can help you with

- Product Recommendations
- Custom T-Shirt Ideas
- Size Recommendation
- Outfit Suggestions
- Shipping Questions
- Order Tracking
- Trending Collections

Ask me anything.`;

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
  createdAt: new Date().toISOString()
});

const defaultMessages = [createMessage("assistant", greeting)];

const getStoredConversationId = () => {
  const existing = localStorage.getItem(CONVERSATION_KEY);
  if (existing) return existing;

      const next = `style-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(CONVERSATION_KEY, next);
  return next;
};

const readStoredMessages = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) && stored.length ? stored : defaultMessages;
  } catch {
    return defaultMessages;
  }
};

const initialState = {
  open: false,
  minimized: false,
  messages: readStoredMessages(),
  input: "",
  loading: false,
  error: "",
  conversationId: getStoredConversationId()
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, open: true, minimized: false };
    case "CLOSE":
      return { ...state, open: false, minimized: false, error: "" };
    case "MINIMIZE":
      return { ...state, minimized: true };
    case "RESTORE":
      return { ...state, open: true, minimized: false };
    case "INPUT":
      return { ...state, input: action.value };
    case "USER_MESSAGE":
      return {
        ...state,
        input: "",
        loading: true,
        error: "",
        messages: [...state.messages, action.message]
      };
    case "ASSISTANT_MESSAGE":
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.message]
      };
    case "ERROR":
      return { ...state, loading: false, error: action.error };
    case "CLEAR":
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(CONVERSATION_KEY, state.conversationId);
      return { ...state, messages: defaultMessages, input: "", error: "", loading: false };
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pendingRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
  }, [state.messages]);

  const sendMessage = async (text) => {
    const content = String(text ?? state.input).trim();
    if (!content || pendingRef.current) return;

    const userMessage = createMessage("user", content);
    pendingRef.current = true;
    dispatch({ type: "USER_MESSAGE", message: userMessage });

    try {
      const { reply } = await sendChatMessage({
        message: content,
        conversationId: state.conversationId,
        messages: [...state.messages, userMessage].map(({ role, content }) => ({ role, content }))
      });

      dispatch({ type: "ASSISTANT_MESSAGE", message: createMessage("assistant", reply) });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: error?.message || "Could not connect. Please try again."
      });
    } finally {
      pendingRef.current = false;
    }
  };

  const value = useMemo(
    () => ({
      ...state,
      openChat: () => dispatch({ type: "OPEN" }),
      closeChat: () => dispatch({ type: "CLOSE" }),
      minimizeChat: () => dispatch({ type: "MINIMIZE" }),
      restoreChat: () => dispatch({ type: "RESTORE" }),
      setInput: (value) => dispatch({ type: "INPUT", value }),
      clearChat: () => dispatch({ type: "CLEAR" }),
      sendMessage
    }),
    [state]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
