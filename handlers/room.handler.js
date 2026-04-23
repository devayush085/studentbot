// handlers/room.handler.js

import Teacher from "../models/Teacher.js";

export const roomHandler = async (data) => {
  const { role } = data;

  if (!role) return "Please specify whose room you want";

  const teacher = await Teacher.findOne({ role });

  if (!teacher) return "Room not found";

  return `${teacher.name}'s room number is ${teacher.roomNumber}`;
};