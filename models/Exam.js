import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  name: { type: String, required: true }, // CT1, CT2, PUT, UNIVERSITY
  type: String, // internal / external
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);