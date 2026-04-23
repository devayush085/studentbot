// pages/ChatPage.jsx
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useChat } from "../context/ChatContext.jsx";
import ChatHeader from "../components/ChatHeader.jsx";
import MessageList from "../components/MessageList.jsx";
import ChatInput from "../components/ChatInput.jsx";
import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const { student } = useAuth();
  const { fetchHistory, clearMessages } = useChat();

  useEffect(() => {
    fetchHistory();
    return () => clearMessages();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
  <div className={styles.sidebarLogo}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img 
        src="https://www.gniotgroup.edu.in/img/gniot-logo-new-2026.webp?v=11" 
        alt="logo"
        style={{ width: "230px" }}
      />
      <div>
        Student<span>Bot</span>
      </div>
    </div>
    </div>
        <nav className={styles.nav}>
          <div className={styles.navItem} data-active="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat
          </div>
        </nav>
        <div className={styles.sidebarHints}>
          <p className={styles.hintsTitle}>Try asking:</p>
          <ul>
            <li>"My CT1 marks?"</li>
            <li>"Physics class kahan hai?"</li>
            <li>"Attendance kitni hai?"</li>
            <li>"HOD ka room number?"</li>
            <li>"Aaj college hai?"</li>
          </ul>
        </div>
        <div className={styles.sidebarProfile}>
          <div className={styles.avatar}>
            {student?.name?.[0]?.toUpperCase() || "S"}
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>{student?.name}</span>
            <span className={styles.profileId}>{student?.studentId}</span>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <ChatHeader />
        <MessageList />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
