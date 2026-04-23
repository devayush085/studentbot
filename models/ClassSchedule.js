import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },

  course: String,
  year: Number,

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  roomNumber: String,

  day: String, // Monday, Tuesday
  startTime: String,
  endTime: String,
}, { timestamps: true });

export default mongoose.model("ClassSchedule", scheduleSchema);