// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/auth.service.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem("student");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (studentId, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(studentId, password);
      setStudent(data.student);
      localStorage.setItem("student", JSON.stringify(data.student));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (_) {
      // silent
    } finally {
      setStudent(null);
      localStorage.removeItem("student");
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ student, loading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
