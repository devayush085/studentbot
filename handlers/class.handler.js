import Student from "../models/Student.js";
import Subject from "../models/Subject.js";
import ClassSchedule from "../models/ClassSchedule.js";

export const classHandler = async (studentId, data) => {
  const student = await Student.findOne({ studentId });

  const subjectName = data.subject;
  const course = data.course || student.course;
  const year = data.year || student.year;

  const subject = await Subject.findOne({
    name: subjectName,
    course,
    year,
  });

  if (!subject) {
    return `Your course does not have ${subjectName}. Which course/year do you mean?`;
  }

  const schedule = await ClassSchedule.findOne({
    subject: subject._id,
    course,
    year,
  });

  return schedule
    ? `${subjectName} class is in room ${schedule.roomNumber}`
    : "Class not scheduled";
};