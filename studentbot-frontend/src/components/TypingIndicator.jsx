// components/TypingIndicator.jsx
import styles from "./TypingIndicator.module.css";

const TypingIndicator = () => (
  <div className={styles.row}>
    <div className={styles.avatar}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
    <div className={styles.bubble}>
      <span className={styles.dot} style={{ animationDelay: "0ms" }} />
      <span className={styles.dot} style={{ animationDelay: "150ms" }} />
      <span className={styles.dot} style={{ animationDelay: "300ms" }} />
    </div>
  </div>
);

export default TypingIndicator;
