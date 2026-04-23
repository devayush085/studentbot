// seed.js
// Run: node seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ── Models ──────────────────────────────────────────────
import Department  from "./models/Department.js";
import Teacher     from "./models/Teacher.js";
import Exam        from "./models/Exam.js";
import Subject     from "./models/Subject.js";
import ClassSchedule from "./models/ClassSchedule.js";
import Holiday     from "./models/Holiday.js";
import Student     from "./models/Student.js";
import Marks       from "./models/Marks.js";

// ── Connect ─────────────────────────────────────────────
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB connected");

// ── Clear old data ───────────────────────────────────────
await Promise.all([
  Department.deleteMany(),
  Teacher.deleteMany(),
  Exam.deleteMany(),
  Subject.deleteMany(),
  ClassSchedule.deleteMany(),
  Holiday.deleteMany(),
  Student.deleteMany(),
  Marks.deleteMany(),
]);
console.log("🗑️  Old data cleared");

// ─────────────────────────────────────────────────────────
// 1. DEPARTMENTS
// ─────────────────────────────────────────────────────────
const departments = await Department.insertMany([
  { name: "Computer Science", building: "Block A" },
  { name: "Mathematics",      building: "Block B" },
  { name: "Electronics",      building: "Block C" },
]);

const CS   = departments[0]._id;
const MATH = departments[1]._id;
// const ELEC = departments[2]._id;

console.log("✅ Departments inserted");

// ─────────────────────────────────────────────────────────
// 2. TEACHERS
// ─────────────────────────────────────────────────────────
const teachers = await Teacher.insertMany([
  { name: "Dr. Ramesh Sharma",  department: CS,   role: "HOD",       roomNumber: "A-101" },
  { name: "Dr. Priya Mehta",    department: CS,   role: "Professor",  roomNumber: "A-102" },
  { name: "Prof. Arvind Kumar", department: CS,   role: "Professor",  roomNumber: "A-103" },
  { name: "Dr. Sunita Rao",     department: MATH, role: "HOD",       roomNumber: "B-201" },
  { name: "Dr. Vikram Joshi",   department: CS,   role: "Director",  roomNumber: "ADM-001" },
  { name: "Prof. Neha Gupta",   department: CS,   role: "Professor",  roomNumber: "A-104" },
]);

const [tHOD, tPriya, tArvind, , , tNeha] = teachers;

console.log("✅ Teachers inserted");

// ─────────────────────────────────────────────────────────
// 3. EXAMS
// ─────────────────────────────────────────────────────────
const exams = await Exam.insertMany([
  { name: "CT1",        type: "internal" },
  { name: "CT2",        type: "internal" },
  { name: "PUT",        type: "internal" },
  { name: "UNIVERSITY", type: "external" },
]);

const [CT1, CT2, PUT, UNIV] = exams;

console.log("✅ Exams inserted");

// ─────────────────────────────────────────────────────────
// 4. SUBJECTS
// ─────────────────────────────────────────────────────────
const subjects = await Subject.insertMany([
  { name: "Data Structures",    course: "BCA", year: 2, semester: 3, department: CS   },
  { name: "DBMS",               course: "BCA", year: 2, semester: 4, department: CS   },
  { name: "Operating Systems",  course: "BCA", year: 3, semester: 5, department: CS   },
  { name: "Computer Networks",  course: "BCA", year: 3, semester: 6, department: CS   },
  { name: "Python Programming", course: "BCA", year: 1, semester: 2, department: CS   },
  { name: "Mathematics I",      course: "BCA", year: 1, semester: 1, department: MATH },
  { name: "Advanced Algorithms",course: "MCA", year: 1, semester: 2, department: CS   },
  { name: "Software Engineering",course: "MCA", year: 1, semester: 1, department: CS  },
  { name: "Machine Learning",   course: "MCA", year: 2, semester: 3, department: CS   },
  { name: "Cloud Computing",    course: "MCA", year: 2, semester: 4, department: CS   },
]);

const [DS, DBMS, OS, CN, PY, M1, AA, SE, ML, CC] = subjects;

console.log("✅ Subjects inserted");

// ─────────────────────────────────────────────────────────
// 5. CLASS SCHEDULES
// ─────────────────────────────────────────────────────────
await ClassSchedule.insertMany([
  { subject: DS._id, course: "BCA", year: 2, teacher: tPriya._id,  roomNumber: "A-301", day: "Monday",    startTime: "09:00", endTime: "10:00" },
  { subject: DBMS._id, course: "BCA", year: 2, teacher: tArvind._id, roomNumber: "A-302", day: "Tuesday",  startTime: "10:00", endTime: "11:00" },
  { subject: OS._id, course: "BCA", year: 3, teacher: tPriya._id,  roomNumber: "A-303", day: "Wednesday", startTime: "11:00", endTime: "12:00" },
  { subject: CN._id, course: "BCA", year: 3, teacher: tNeha._id,   roomNumber: "A-304", day: "Thursday",  startTime: "09:00", endTime: "10:00" },
  { subject: PY._id, course: "BCA", year: 1, teacher: tArvind._id, roomNumber: "A-201", day: "Friday",    startTime: "10:00", endTime: "11:00" },
  { subject: M1._id, course: "BCA", year: 1, teacher: tHOD._id,    roomNumber: "B-301", day: "Monday",    startTime: "11:00", endTime: "12:00" },
  { subject: AA._id, course: "MCA", year: 1, teacher: tPriya._id,  roomNumber: "A-401", day: "Monday",    startTime: "14:00", endTime: "15:00" },
  { subject: SE._id, course: "MCA", year: 1, teacher: tNeha._id,   roomNumber: "A-402", day: "Tuesday",   startTime: "13:00", endTime: "14:00" },
  { subject: ML._id, course: "MCA", year: 2, teacher: tPriya._id,  roomNumber: "A-403", day: "Wednesday", startTime: "15:00", endTime: "16:00" },
  { subject: CC._id, course: "MCA", year: 2, teacher: tNeha._id,   roomNumber: "A-404", day: "Thursday",  startTime: "14:00", endTime: "15:00" },
]);

console.log("✅ Class schedules inserted");

// ─────────────────────────────────────────────────────────
// 6. HOLIDAYS
// ─────────────────────────────────────────────────────────
await Holiday.insertMany([
  { title: "Republic Day",            date: new Date("2025-01-26"), type: "national", isHoliday: true },
  { title: "Holi",                    date: new Date("2025-03-14"), type: "festival", isHoliday: true },
  { title: "Good Friday",             date: new Date("2025-04-18"), type: "national", isHoliday: true },
  { title: "Independence Day",        date: new Date("2025-08-15"), type: "national", isHoliday: true },
  { title: "College Foundation Day",  date: new Date("2025-09-10"), type: "college",  isHoliday: true },
  { title: "Gandhi Jayanti",          date: new Date("2025-10-02"), type: "national", isHoliday: true },
  { title: "Diwali",                  date: new Date("2025-10-20"), type: "festival", isHoliday: true },
  { title: "Christmas",               date: new Date("2025-12-25"), type: "national", isHoliday: true },
]);

console.log("✅ Holidays inserted");

// ─────────────────────────────────────────────────────────
// 7. STUDENTS  (password bcrypt se hash hoga)
// ─────────────────────────────────────────────────────────
const hash = "pass123"

const students = await Student.insertMany([
  { studentId: "BCA2301", name: "Aarav Sharma",   rollNo: "2401320140001", course: "BCA", year: 2, department: CS, attendance: 85, password: hash },
  { studentId: "BCA2302", name: "Priya Singh",    rollNo: "2401320140002", course: "BCA", year: 2, department: CS, attendance: 90, password: hash },
  { studentId: "BCA2303", name: "Rahul Verma",    rollNo: "2401320140003", course: "BCA", year: 2, department: CS, attendance: 72, password: hash },
  { studentId: "BCA2304", name: "Sneha Patel",    rollNo: "2401320140004", course: "BCA", year: 2, department: CS, attendance: 95, password: hash },
  { studentId: "BCA2305", name: "Arjun Gupta",    rollNo: "2401320140005", course: "BCA", year: 2, department: CS, attendance: 68, password: hash },
  { studentId: "BCA2306", name: "Kavya Nair",     rollNo: "2401320140006", course: "BCA", year: 2, department: CS, attendance: 88, password: hash },
  { studentId: "BCA2307", name: "Rohit Mishra",   rollNo: "2401320140007", course: "BCA", year: 2, department: CS, attendance: 76, password: hash },
  { studentId: "BCA2401", name: "Ananya Joshi",   rollNo: "2401320140008", course: "BCA", year: 1, department: CS, attendance: 92, password: hash },
  { studentId: "BCA2402", name: "Vikram Yadav",   rollNo: "2401320140009", course: "BCA", year: 1, department: CS, attendance: 80, password: hash },
  { studentId: "BCA2403", name: "Pooja Desai",    rollNo: "2401320140010", course: "BCA", year: 1, department: CS, attendance: 65, password: hash },
  { studentId: "BCA2201", name: "Suresh Reddy",   rollNo: "2401320140011", course: "BCA", year: 3, department: CS, attendance: 87, password: hash },
  { studentId: "BCA2202", name: "Meera Iyer",     rollNo: "2401320140012", course: "BCA", year: 3, department: CS, attendance: 93, password: hash },
  { studentId: "BCA2203", name: "Karan Malhotra", rollNo: "2401320140013", course: "BCA", year: 3, department: CS, attendance: 70, password: hash },
  { studentId: "MCA2301", name: "Divya Kapoor",   rollNo: "2401320140014", course: "MCA", year: 1, department: CS, attendance: 91, password: hash },
  { studentId: "MCA2302", name: "Aditya Tiwari",  rollNo: "2401320140015", course: "MCA", year: 1, department: CS, attendance: 84, password: hash },
  { studentId: "MCA2303", name: "Ritika Chauhan", rollNo: "2401320140016", course: "MCA", year: 1, department: CS, attendance: 78, password: hash },
  { studentId: "MCA2304", name: "Nikhil Bajaj",   rollNo: "2401320140017", course: "MCA", year: 1, department: CS, attendance: 96, password: hash },
  { studentId: "MCA2201", name: "Simran Khanna",  rollNo: "2401320140018", course: "MCA", year: 2, department: CS, attendance: 89, password: hash },
  { studentId: "MCA2202", name: "Harish Pandey",  rollNo: "2401320140019", course: "MCA", year: 2, department: CS, attendance: 74, password: hash },
  { studentId: "MCA2203", name: "Tanvi Saxena",   rollNo: "2401320140020", course: "MCA", year: 2, department: CS, attendance: 82, password: hash },
  { studentId: "MCA2204", name: "Gaurav Sinha",   rollNo: "2401320140021", course: "MCA", year: 2, department: CS, attendance: 77, password: hash },
  { studentId: "MCA2205", name: "Pallavi Shukla", rollNo: "2401320140022", course: "MCA", year: 2, department: CS, attendance: 94, password: hash },
]);

const [
  sAarav, sPriya, sRahul, sSneha, sArjun, sKavya, sRohit,
  sAnanya, sVikram, sPooja,
  sSuresh, sMeera, sKaran,
  sDivya, sAditya, sRitika, sNikhil,
  sSimran, sHarish, sTanvi, sGaurav, sPallavi
] = students;

console.log("Students inserted");

// ─────────────────────────────────────────────────────────
// 8. MARKS
// ─────────────────────────────────────────────────────────
await Marks.insertMany([
  // ── Aarav (BCA yr2) ──
  { student: sAarav._id, subject: DS._id,   exam: CT1._id,  marks: 18, maxMarks: 25,  year: 2, semester: 3 },
  { student: sAarav._id, subject: DS._id,   exam: CT2._id,  marks: 21, maxMarks: 25,  year: 2, semester: 3 },
  { student: sAarav._id, subject: DS._id,   exam: PUT._id,  marks: 17, maxMarks: 25,  year: 2, semester: 3 },
  { student: sAarav._id, subject: DS._id,   exam: UNIV._id, marks: 72, maxMarks: 100, year: 2, semester: 3 },
  { student: sAarav._id, subject: DBMS._id, exam: CT1._id,  marks: 17, maxMarks: 25,  year: 2, semester: 4 },
  { student: sAarav._id, subject: DBMS._id, exam: CT2._id,  marks: 20, maxMarks: 25,  year: 2, semester: 4 },
  { student: sAarav._id, subject: DBMS._id, exam: UNIV._id, marks: 68, maxMarks: 100, year: 2, semester: 4 },

  // ── Priya (BCA yr2) ──
  { student: sPriya._id, subject: DS._id,   exam: CT1._id,  marks: 23, maxMarks: 25,  year: 2, semester: 3 },
  { student: sPriya._id, subject: DS._id,   exam: CT2._id,  marks: 24, maxMarks: 25,  year: 2, semester: 3 },
  { student: sPriya._id, subject: DS._id,   exam: PUT._id,  marks: 22, maxMarks: 25,  year: 2, semester: 3 },
  { student: sPriya._id, subject: DS._id,   exam: UNIV._id, marks: 88, maxMarks: 100, year: 2, semester: 3 },
  { student: sPriya._id, subject: DBMS._id, exam: CT1._id,  marks: 22, maxMarks: 25,  year: 2, semester: 4 },
  { student: sPriya._id, subject: DBMS._id, exam: CT2._id,  marks: 23, maxMarks: 25,  year: 2, semester: 4 },
  { student: sPriya._id, subject: DBMS._id, exam: UNIV._id, marks: 85, maxMarks: 100, year: 2, semester: 4 },

  // ── Rahul (BCA yr2) ──
  { student: sRahul._id, subject: DS._id,   exam: CT1._id,  marks: 14, maxMarks: 25,  year: 2, semester: 3 },
  { student: sRahul._id, subject: DS._id,   exam: CT2._id,  marks: 16, maxMarks: 25,  year: 2, semester: 3 },
  { student: sRahul._id, subject: DS._id,   exam: UNIV._id, marks: 58, maxMarks: 100, year: 2, semester: 3 },
  { student: sRahul._id, subject: DBMS._id, exam: CT1._id,  marks: 13, maxMarks: 25,  year: 2, semester: 4 },
  { student: sRahul._id, subject: DBMS._id, exam: CT2._id,  marks: 15, maxMarks: 25,  year: 2, semester: 4 },

  // ── Sneha (BCA yr2) ──
  { student: sSneha._id, subject: DS._id,   exam: CT1._id,  marks: 24, maxMarks: 25,  year: 2, semester: 3 },
  { student: sSneha._id, subject: DS._id,   exam: CT2._id,  marks: 25, maxMarks: 25,  year: 2, semester: 3 },
  { student: sSneha._id, subject: DS._id,   exam: UNIV._id, marks: 93, maxMarks: 100, year: 2, semester: 3 },
  { student: sSneha._id, subject: DBMS._id, exam: CT1._id,  marks: 23, maxMarks: 25,  year: 2, semester: 4 },
  { student: sSneha._id, subject: DBMS._id, exam: UNIV._id, marks: 90, maxMarks: 100, year: 2, semester: 4 },

  // ── Arjun (BCA yr2) ──
  { student: sArjun._id, subject: DS._id,   exam: CT1._id,  marks: 12, maxMarks: 25,  year: 2, semester: 3 },
  { student: sArjun._id, subject: DS._id,   exam: CT2._id,  marks: 14, maxMarks: 25,  year: 2, semester: 3 },
  { student: sArjun._id, subject: DS._id,   exam: UNIV._id, marks: 52, maxMarks: 100, year: 2, semester: 3 },

  // ── Kavya (BCA yr2) ──
  { student: sKavya._id, subject: DS._id,   exam: CT1._id,  marks: 21, maxMarks: 25,  year: 2, semester: 3 },
  { student: sKavya._id, subject: DS._id,   exam: UNIV._id, marks: 83, maxMarks: 100, year: 2, semester: 3 },
  { student: sKavya._id, subject: DBMS._id, exam: CT1._id,  marks: 20, maxMarks: 25,  year: 2, semester: 4 },

  // ── Rohit (BCA yr2) ──
  { student: sRohit._id, subject: DS._id,   exam: CT1._id,  marks: 15, maxMarks: 25,  year: 2, semester: 3 },
  { student: sRohit._id, subject: DS._id,   exam: UNIV._id, marks: 61, maxMarks: 100, year: 2, semester: 3 },
  { student: sRohit._id, subject: DBMS._id, exam: CT1._id,  marks: 14, maxMarks: 25,  year: 2, semester: 4 },

  // ── Ananya (BCA yr1) ──
  { student: sAnanya._id, subject: PY._id, exam: CT1._id,  marks: 20, maxMarks: 25,  year: 1, semester: 2 },
  { student: sAnanya._id, subject: PY._id, exam: CT2._id,  marks: 22, maxMarks: 25,  year: 1, semester: 2 },
  { student: sAnanya._id, subject: M1._id, exam: CT1._id,  marks: 18, maxMarks: 25,  year: 1, semester: 1 },
  { student: sAnanya._id, subject: M1._id, exam: UNIV._id, marks: 75, maxMarks: 100, year: 1, semester: 1 },

  // ── Vikram (BCA yr1) ──
  { student: sVikram._id, subject: PY._id, exam: CT1._id,  marks: 16, maxMarks: 25,  year: 1, semester: 2 },
  { student: sVikram._id, subject: PY._id, exam: CT2._id,  marks: 18, maxMarks: 25,  year: 1, semester: 2 },
  { student: sVikram._id, subject: M1._id, exam: CT1._id,  marks: 15, maxMarks: 25,  year: 1, semester: 1 },

  // ── Pooja (BCA yr1) ──
  { student: sPooja._id, subject: PY._id, exam: CT1._id,  marks: 12, maxMarks: 25,  year: 1, semester: 2 },
  { student: sPooja._id, subject: M1._id, exam: CT1._id,  marks: 11, maxMarks: 25,  year: 1, semester: 1 },

  // ── Suresh (BCA yr3) ──
  { student: sSuresh._id, subject: OS._id, exam: CT1._id,  marks: 20, maxMarks: 25,  year: 3, semester: 5 },
  { student: sSuresh._id, subject: OS._id, exam: CT2._id,  marks: 22, maxMarks: 25,  year: 3, semester: 5 },
  { student: sSuresh._id, subject: OS._id, exam: UNIV._id, marks: 79, maxMarks: 100, year: 3, semester: 5 },
  { student: sSuresh._id, subject: CN._id, exam: CT1._id,  marks: 19, maxMarks: 25,  year: 3, semester: 6 },
  { student: sSuresh._id, subject: CN._id, exam: UNIV._id, marks: 74, maxMarks: 100, year: 3, semester: 6 },

  // ── Meera (BCA yr3) ──
  { student: sMeera._id, subject: OS._id, exam: CT1._id,  marks: 24, maxMarks: 25,  year: 3, semester: 5 },
  { student: sMeera._id, subject: OS._id, exam: CT2._id,  marks: 25, maxMarks: 25,  year: 3, semester: 5 },
  { student: sMeera._id, subject: OS._id, exam: UNIV._id, marks: 91, maxMarks: 100, year: 3, semester: 5 },
  { student: sMeera._id, subject: CN._id, exam: CT1._id,  marks: 23, maxMarks: 25,  year: 3, semester: 6 },
  { student: sMeera._id, subject: CN._id, exam: UNIV._id, marks: 88, maxMarks: 100, year: 3, semester: 6 },

  // ── Karan (BCA yr3) ──
  { student: sKaran._id, subject: OS._id, exam: CT1._id,  marks: 15, maxMarks: 25,  year: 3, semester: 5 },
  { student: sKaran._id, subject: OS._id, exam: UNIV._id, marks: 61, maxMarks: 100, year: 3, semester: 5 },
  { student: sKaran._id, subject: CN._id, exam: CT1._id,  marks: 14, maxMarks: 25,  year: 3, semester: 6 },

  // ── Divya (MCA yr1) ──
  { student: sDivya._id, subject: AA._id, exam: CT1._id,  marks: 22, maxMarks: 25,  year: 1, semester: 2 },
  { student: sDivya._id, subject: AA._id, exam: CT2._id,  marks: 23, maxMarks: 25,  year: 1, semester: 2 },
  { student: sDivya._id, subject: AA._id, exam: UNIV._id, marks: 85, maxMarks: 100, year: 1, semester: 2 },
  { student: sDivya._id, subject: SE._id, exam: CT1._id,  marks: 20, maxMarks: 25,  year: 1, semester: 1 },
  { student: sDivya._id, subject: SE._id, exam: UNIV._id, marks: 80, maxMarks: 100, year: 1, semester: 1 },

  // ── Aditya (MCA yr1) ──
  { student: sAditya._id, subject: AA._id, exam: CT1._id,  marks: 19, maxMarks: 25,  year: 1, semester: 2 },
  { student: sAditya._id, subject: AA._id, exam: UNIV._id, marks: 76, maxMarks: 100, year: 1, semester: 2 },
  { student: sAditya._id, subject: SE._id, exam: CT1._id,  marks: 18, maxMarks: 25,  year: 1, semester: 1 },

  // ── Ritika (MCA yr1) ──
  { student: sRitika._id, subject: AA._id, exam: CT1._id,  marks: 17, maxMarks: 25,  year: 1, semester: 2 },
  { student: sRitika._id, subject: SE._id, exam: CT1._id,  marks: 16, maxMarks: 25,  year: 1, semester: 1 },
  { student: sRitika._id, subject: SE._id, exam: UNIV._id, marks: 67, maxMarks: 100, year: 1, semester: 1 },

  // ── Nikhil (MCA yr1) ──
  { student: sNikhil._id, subject: AA._id, exam: CT1._id,  marks: 25, maxMarks: 25,  year: 1, semester: 2 },
  { student: sNikhil._id, subject: AA._id, exam: UNIV._id, marks: 95, maxMarks: 100, year: 1, semester: 2 },
  { student: sNikhil._id, subject: SE._id, exam: CT1._id,  marks: 24, maxMarks: 25,  year: 1, semester: 1 },

  // ── Simran (MCA yr2) ──
  { student: sSimran._id, subject: ML._id, exam: CT1._id,  marks: 21, maxMarks: 25,  year: 2, semester: 3 },
  { student: sSimran._id, subject: ML._id, exam: CT2._id,  marks: 22, maxMarks: 25,  year: 2, semester: 3 },
  { student: sSimran._id, subject: ML._id, exam: UNIV._id, marks: 82, maxMarks: 100, year: 2, semester: 3 },
  { student: sSimran._id, subject: CC._id, exam: CT1._id,  marks: 19, maxMarks: 25,  year: 2, semester: 4 },
  { student: sSimran._id, subject: CC._id, exam: UNIV._id, marks: 78, maxMarks: 100, year: 2, semester: 4 },

  // ── Harish (MCA yr2) ──
  { student: sHarish._id, subject: ML._id, exam: CT1._id,  marks: 16, maxMarks: 25,  year: 2, semester: 3 },
  { student: sHarish._id, subject: ML._id, exam: UNIV._id, marks: 63, maxMarks: 100, year: 2, semester: 3 },
  { student: sHarish._id, subject: CC._id, exam: CT1._id,  marks: 15, maxMarks: 25,  year: 2, semester: 4 },

  // ── Tanvi (MCA yr2) ──
  { student: sTanvi._id, subject: ML._id, exam: CT1._id,  marks: 20, maxMarks: 25,  year: 2, semester: 3 },
  { student: sTanvi._id, subject: ML._id, exam: UNIV._id, marks: 79, maxMarks: 100, year: 2, semester: 3 },
  { student: sTanvi._id, subject: CC._id, exam: CT1._id,  marks: 18, maxMarks: 25,  year: 2, semester: 4 },

  // ── Gaurav (MCA yr2) ──
  { student: sGaurav._id, subject: ML._id, exam: CT1._id,  marks: 17, maxMarks: 25,  year: 2, semester: 3 },
  { student: sGaurav._id, subject: CC._id, exam: CT1._id,  marks: 16, maxMarks: 25,  year: 2, semester: 4 },
  { student: sGaurav._id, subject: CC._id, exam: UNIV._id, marks: 69, maxMarks: 100, year: 2, semester: 4 },

  // ── Pallavi (MCA yr2) ──
  { student: sPallavi._id, subject: ML._id, exam: CT1._id,  marks: 23, maxMarks: 25,  year: 2, semester: 3 },
  { student: sPallavi._id, subject: ML._id, exam: UNIV._id, marks: 90, maxMarks: 100, year: 2, semester: 3 },
  { student: sPallavi._id, subject: CC._id, exam: CT1._id,  marks: 22, maxMarks: 25,  year: 2, semester: 4 },
  { student: sPallavi._id, subject: CC._id, exam: UNIV._id, marks: 87, maxMarks: 100, year: 2, semester: 4 },
]);

console.log("✅ Marks inserted");

// ── Done ─────────────────────────────────────────────────
console.log("\n🎉 Seed complete!");
console.log("📌 Login with any studentId (e.g. BCA2301) and password: pass123");

await mongoose.disconnect();