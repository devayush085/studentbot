// routes/GuestRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const GuestRoute = ({ children }) => {
  const { student } = useAuth();
  return student ? <Navigate to="/chat" replace /> : children;
};

export default GuestRoute;
