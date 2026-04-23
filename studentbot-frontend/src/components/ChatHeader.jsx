// components/ChatHeader.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useChat } from "../context/ChatContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  const { student, logout } = useAuth();
  const { clearMessages } = useChat();
  const { theme, toggleTheme } = useTheme();
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

        {/* Theme Toggle */}
        <button className={styles.themeBtn} onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? (
            // Sun icon for light mode
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

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
