import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  role: String, // HOD / Professor / Director
  roomNumber: String,
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);