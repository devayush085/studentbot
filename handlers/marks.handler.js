// handlers/marks.handler.js

import Student from "../models/Student.js";
import Marks from "../models/Marks.js";
import Subject from "../models/Subject.js";
import Exam from "../models/Exam.js";

export const marksHandler = async (studentId, data) => {
  const student = await Student.findOne({ studentId });

  if (!student) return "Student not found";

  const { examType, subject, semester } = data;

  let query = {
    student: student._id,
  };

  // 🔥 exam filter
  if (examType) {
    const exam = await Exam.findOne({ name: examType });
    if (exam) query.exam = exam._id;
  }

  // 🔥 subject filter
  if (subject) {
    const sub = await Subject.findOne({
      name: subject,
      course: student.course,
      year: student.year,
    });

    if (sub) query.subject = sub._id;
    else return `No subject ${subject} found in your course`;
  }

  // 🔥 semester filter
  if (semester) {
    query.semester = semester;
  }

  // 🔥 fetch marks
  const marks = await Marks.find(query)
    .populate("subject")
    .populate("exam");

  if (marks.length === 0) {
    return "No marks found for given query";
  }

  // 🔥 format response
  let response = "Here are your marks:\n";

  marks.forEach((m) => {
    response += `${m.subject.name} (${m.exam.name}): ${m.marks}/${m.maxMarks}\n`;
  });

  return response;
};