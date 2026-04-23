// // services/chat.service.js

// import { getIntentAndEntities } from "./llm.service.js";
// import * as handlers from "../handlers/index.js";

// export const processMessage = async (studentId, message,history = "") => {
//   const data = await getIntentAndEntities(message,history);
//     console.log(data);
    
//   switch (data.intent) {
//     case "get_marks":
//         return handlers.marksHandler(studentId, data);

//     case "get_attendance":
//       return handlers.attendanceHandler(studentId);

//     case "get_staff":
//         return handlers.staffHandler(data);

//     case "get_room":
//       return handlers.roomHandler(data);

//     case "get_class_location":
//       return handlers.classHandler(studentId, data);

//     case "check_college_status":
//       return handlers.holidayHandler();

//     default:
//       return "I couldn't understand your query.";
//   }
// };

// services/chat.service.js
import { getStudentContext } from "./context.service.js";
import { getSmartResponse } from "./llm.service.js";
import Message from "../models/Message.js";

export const processMessage = async (studentId, message) => {

  // 1. last 8 messages fetch karo for conversation history
  const history = await Message.find({ studentId })
    .sort({ createdAt: -1 })
    .limit(8);

  const historyText = history
    .reverse()
    .map(m => `${m.sender === "user" ? "Student" : "Bot"}: ${m.message}`)
    .join("\n");

  // 2. student ka saara data ek baar fetch karo
  const context = await getStudentContext(studentId);

  // 3. LLM ko context + history + message do, answer lo
  const reply = await getSmartResponse(message, context, historyText);

  return reply;
};