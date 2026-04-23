// handlers/staff.handler.js

import Teacher from "../models/Teacher.js";
import Department from "../models/Department.js";

export const staffHandler = async (data) => {
  const { role, department } = data;

  if (!role) {
    return "Please specify role (HOD, Director, Professor etc.)";
  }

  let query = { role };

  // 🔥 department optional
  if (department) {
    const dept = await Department.findOne({ name: department });

    if (dept) {
      query.department = dept._id;
    }
  }

  const teacher = await Teacher.findOne(query).populate("department");

  if (!teacher) {
    return "No staff found for given query";
  }

  return `${teacher.name} (${teacher.role}) is in room ${teacher.roomNumber}`;
};