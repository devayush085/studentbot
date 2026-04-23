import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },

  marks: Number,
  maxMarks: { type: Number, default: 100 },

  year: Number,
  semester: Number,
}, { timestamps: true });

// 🔥 important index
marksSchema.index({ student: 1, subject: 1, exam: 1 });

export default mongoose.model("Marks", marksSchema);