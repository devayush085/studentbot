// context/ChatContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { sendMessage, getMessages } from "../services/chat.service.js";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (_) {
      setMessages([]);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  const send = useCallback(async (text) => {
    const userMsg = {
      _id: `temp-${Date.now()}`,
      sender: "user",
      message: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const data = await sendMessage(text);
      const botMsg = {
        _id: `bot-${Date.now()}`,
        sender: "bot",
        message: data.reply,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (_) {
      const errMsg = {
        _id: `err-${Date.now()}`,
        sender: "bot",
        message: "Something went wrong. Please try again.",
        createdAt: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setSending(false);
    }
  }, []);

  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, sending, loadingHistory, fetchHistory, send, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};

export default ChatContext;
