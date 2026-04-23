// import Message from "../models/Message.js";
// import { processMessage } from "../services/chat.service.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const studentId = req.studentId;

//     // ✅ Last 6 messages fetch karo — context ke liye
//     const history = await Message.find({ studentId })
//       .sort({ createdAt: -1 })
//       .limit(6);

//     const historyText = history
//       .reverse()
//       .map(m => `${m.sender === "user" ? "User" : "Bot"}: ${m.message}`)
//       .join("\n");

//     await Message.create({ studentId, sender: "user", message });

//     const reply = await processMessage(studentId, message, historyText); // ✅ history pass karo

//     await Message.create({ studentId, sender: "bot", message: reply });

//     res.json({ reply });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find({
//       studentId: req.studentId,
//     }).sort({ createdAt: 1 });

//     res.json(messages);

//   } catch (err) {
//     console.error("getMessages Error:", err.message);
//     res.status(500).json({ message: "Server error" });  // ✅
//   }
// };


import Message from "../models/Message.js";
import { processMessage } from "../services/chat.service.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const studentId = req.studentId;

    // Save user message FIRST — so service's history fetch includes it
    await Message.create({ studentId, sender: "user", message });

    // No need to pass history — processMessage handles it internally now
    const reply = await processMessage(studentId, message);

    await Message.create({ studentId, sender: "bot", message: reply });

    res.json({ reply });

  } catch (err) {
    console.error("sendMessage Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      studentId: req.studentId,
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    console.error("getMessages Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};