// models/message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  studentId: { type: String, required: true },  // ✅ String rakho — controller se match

  sender: {
    type: String,
    enum: ["user", "bot"],
  },

  message: String,
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);