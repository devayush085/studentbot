import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rollNo: String,

  course: { type: String }, // BCA, MCA
  year: Number, // 1,2,3

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);