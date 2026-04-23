// components/MessageBubble.jsx
import styles from "./MessageBubble.module.css";

const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const BotIcon = () => (
  <div className={styles.botAvatar}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  </div>
);

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : styles.rowBot}`}>
      {!isUser && <BotIcon />}

      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble} ${message.isError ? styles.errorBubble : ""}`}>
        <p className={styles.text}>{message.message}</p>
        <span className={styles.time}>{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
