// components/MessageList.jsx
import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import TypingIndicator from "./TypingIndicator.jsx";
import styles from "./MessageList.module.css";

const EmptyState = () => (
  <div className={styles.empty}>
    <div className={styles.emptyIcon}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>
    <h3 className={styles.emptyTitle}>Start a conversation</h3>
    <p className={styles.emptyText}>
      Ask about your marks, attendance, class schedules, staff info, and more.
    </p>
    <div className={styles.suggestions}>
      {[
        "What are my CT1 marks?",
        "Meri attendance kitni hai?",
        "Aaj college open hai?",
        "HOD ka room number kya hai?",
      ].map((s) => (
        <span key={s} className={styles.suggestionChip}>{s}</span>
      ))}
    </div>
  </div>
);

const MessageList = () => {
  const { messages, sending, loadingHistory } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  if (loadingHistory) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <span>Loading messages…</span>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {messages.map((msg, i) => (
            <MessageBubble key={msg._id || i} message={msg} />
          ))}
          {sending && <TypingIndicator />}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
