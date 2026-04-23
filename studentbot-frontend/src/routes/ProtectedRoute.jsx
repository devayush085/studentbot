// routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { student } = useAuth();
  return student ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
