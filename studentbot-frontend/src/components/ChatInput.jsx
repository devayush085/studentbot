// components/ChatInput.jsx
import { useState, useRef } from "react";
import { useChat } from "../context/ChatContext.jsx";
import styles from "./ChatInput.module.css";

const ChatInput = () => {
  const { send, sending } = useChat();
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed || sending) return;
    setValue("");
    textareaRef.current?.focus();
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await send(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-grow
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 140) + "px";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Ask anything about your academics…"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={sending}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSubmit}
          disabled={!value.trim() || sending}
          title="Send message"
        >
          {sending ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
      <p className={styles.hint}>
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
};

export default ChatInput;
