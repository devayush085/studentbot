// components/ChatHeader.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useChat } from "../context/ChatContext.jsx";
import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  const { student, logout } = useAuth();
  const { clearMessages } = useChat();
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearMessages();
    await logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.statusDot} />
        <div>
          <h2 className={styles.title}>Campus Assistant</h2>
          <span className={styles.subtitle}>Always online · Powered by Gemini</span>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.greeting}>
          Hey, <strong>{student?.name?.split(" ")[0]}</strong>
        </span>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
