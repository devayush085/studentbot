import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },

  course: String, // BCA, MCA
  year: Number,
  semester: Number,

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
}, { timestamps: true });

export default mongoose.model("Subject", subjectSchema);