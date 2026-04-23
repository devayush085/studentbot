// handlers/attendance.handler.js

import Student from "../models/Student.js";

export const attendanceHandler = async (studentId) => {
  const student = await Student.findOne({ studentId });

  if (!student) return "Student not found";

  return `Your attendance is ${student.attendance}%`;
};