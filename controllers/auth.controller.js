import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

export const login = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const student = await Student.findOne({ studentId });

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { studentId: student.studentId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      student: {
        name: student.name,
        studentId: student.studentId,
      },
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });  // ✅
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });  // ✅
  }
};