// middleware/auth.middleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token; // ✅ cookie se

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.studentId = decoded.studentId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};