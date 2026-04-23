import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: String,

  date: Date, // single day

  startDate: Date, // optional (range)
  endDate: Date,

  type: String, // national / college / festival

  isHoliday: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Holiday", holidaySchema);