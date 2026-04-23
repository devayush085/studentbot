// services/context.service.js
import Student from "../models/Student.js";
import Marks from "../models/Marks.js";
import ClassSchedule from "../models/ClassSchedule.js";
import Teacher from "../models/Teacher.js";
import Holiday from "../models/Holiday.js";

import Department from "../models/Department.js";
import Subject from "../models/Subject.js";
import Exam from "../models/Exam.js";


export const getStudentContext = async (studentId) => {

  // --- student basic info ---
  const student = await Student.findOne({ studentId }).populate("department");
  if (!student) return null;

  // --- marks ---
  const marks = await Marks.find({ student: student._id })
    .populate("subject")
    .populate("exam");

  const marksText = marks.length > 0
    ? marks.map(m => `  - ${m.subject.name} | ${m.exam.name}: ${m.marks}/${m.maxMarks}`).join("\n")
    : "  No marks available";

  // --- class schedule ---
  const schedule = await ClassSchedule.find({
    course: student.course,
    year: student.year,
  })
    .populate("subject")
    .populate("teacher");

  const scheduleText = schedule.length > 0
    ? schedule.map(s =>
        `  - ${s.subject?.name} | ${s.day} ${s.startTime}-${s.endTime} | Room ${s.roomNumber} | Teacher: ${s.teacher?.name || "TBD"}`
      ).join("\n")
    : "  No schedule available";

  // --- all staff/teachers ---
  const teachers = await Teacher.find({}).populate("department");

  const teachersText = teachers.length > 0
    ? teachers.map(t =>
        `  - ${t.name} | ${t.role} | Dept: ${t.department?.name || "N/A"} | Room: ${t.roomNumber}`
      ).join("\n")
    : "  No staff info available";

  // --- today's holiday check ---
  const today = new Date();
  const day = today.getDay();
  let holidayStatus = "";

  if (day === 0 || day === 6) {
    holidayStatus = "College is CLOSED today (Weekend)";
  } else {
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(); endOfDay.setHours(23, 59, 59, 999);

    const holiday = await Holiday.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      isHoliday: true,
    });

    holidayStatus = holiday
      ? `College is CLOSED today — ${holiday.title}`
      : "College is OPEN today";
  }

  // --- upcoming holidays ---
  const upcoming = await Holiday.find({
    date: { $gte: today },
    isHoliday: true,
  }).sort({ date: 1 }).limit(5);

  const upcomingText = upcoming.length > 0
    ? upcoming.map(h => `  - ${h.title}: ${new Date(h.date).toDateString()}`).join("\n")
    : "  No upcoming holidays";

  // --- return full context string ---
  return `
STUDENT INFO:
  Name: ${student.name}
  Student ID: ${student.studentId}
  Course: ${student.course}
  Year: ${student.year}
  Department: ${student.department?.name || "N/A"}
  Attendance: ${student.attendance !== undefined ? student.attendance + "%" : "Not recorded"}

MARKS:
${marksText}

CLASS SCHEDULE (${student.course} Year ${student.year}):
${scheduleText}

COLLEGE STAFF:
${teachersText}

TODAY'S STATUS:
  ${holidayStatus}

UPCOMING HOLIDAYS:
${upcomingText}
`.trim();
};