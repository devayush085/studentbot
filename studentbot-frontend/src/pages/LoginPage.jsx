// pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { login, loading, error, clearError } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({ studentId: "", password: "" });
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (error) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleChange = (e) => {
    clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId.trim() || !form.password.trim()) return;
    const result = await login(form.studentId.trim(), form.password);
    if (result.success) navigate("/chat");
  };

  return (
    <div className={styles.page}>
      {/* Theme toggle top right */}
      <button className={styles.themeBtn} onClick={toggleTheme} title="Toggle theme">
        {theme === "dark" ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        <div className={styles.badge}>CAMPUS AI</div>
        <div>
          <img src="https://www.gniotgroup.edu.in/img/gniot-logo-new-2026.webp?v=11" alt="logo" />
        </div>
        <h1 className={styles.title}>
          Student<span className={styles.accent}>Bot</span>
        </h1>
        <p className={styles.subtitle}>Your intelligent campus companion</p>

        <form
          className={`${styles.form} ${shake ? styles.shake : ""}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.field}>
            <label className={styles.label} htmlFor="studentId">
              Student ID
            </label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              className={styles.input}
              placeholder="e.g. STU2024001"
              value={form.studentId}
              onChange={handleChange}
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className={styles.error}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={loading || !form.studentId || !form.password}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                Sign In
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p className={styles.hint}>Contact admin if you don't have credentials</p>
      </div>
    </div>
  );
};

export default LoginPage;
