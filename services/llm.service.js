// // // services/llm.service.js
// // import { GoogleGenAI } from "@google/genai";
// // import dotenv from "dotenv";
// // dotenv.config(); 

// // const ai = new GoogleGenAI({
// //   apiKey: process.env.GEMINI_API_KEY,
// // });

// // // console.log("ai :- ",ai);

// // export async function getIntentFromLLM(message) {
// //   try {
// //     const prompt = `Return ONLY one: get_info / general_query / logout_intent / unknown Message: "${message}"`;

// //     const res = await ai.models.generateContent({
// //       model: "gemini-2.0-flash",
// //       contents: prompt,
// //     });


// //     console.log("ai generated intent :- ",res);

// //     const text = res.text.toLowerCase();

// //     if (text.includes("get_info")) return { intent: "get_info" };
// //     if (text.includes("general_query")) return { intent: "general_query" };
// //     if (text.includes("logout_intent")) return { intent: "logout_intent" };

// //     return { intent: "unknown" };
// //   } catch {
// //     return { intent: "unknown" };
// //   }
// // }

// // export async function getContextualResponseFromLLM(query, data, name) {
// //   try {
// //     const prompt = `
// // Student: ${name}
// // Data: ${data}

// // Answer clearly.

// // Query: ${query}
// // `;

// //     const res = await ai.models.generateContent({
// //       model: "gemini-2.0-flash",
// //       contents: prompt,
// //     });

// //     return res.text;
// //   } catch(error) {
// //     return error.message;
// //   }
// // }



// // services/llm.service.js
// // import axios from "axios";

// // const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

// // export async function getIntentFromLLM(message) {
// //   try {
// //     const res = await axios.post(
// //       BASE_URL,
// //       {
// //         model: "openrouter/free", // ✅ auto free model choose karega
// //         messages: [
// //           {
// //             role: "system",
// //             content: `You are an intent classifier. 
// // Return ONLY one word — nothing else, no explanation:
// // get_info / general_query / logout_intent / unknown`,
// //           },
// //           {
// //             role: "user",
// //             content: message,
// //           },
// //         ],
// //         max_tokens: 10,
// //         temperature: 0,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     const text = res.data.choices[0].message.content.trim().toLowerCase();

// //     if (text.includes("get_info")) return { intent: "get_info" };
// //     if (text.includes("general_query")) return { intent: "general_query" };
// //     if (text.includes("logout_intent")) return { intent: "logout_intent" };

// //     return { intent: "unknown" };
// //   } catch (err) {
// //     console.log(err.response?.data || err.message);
// //     return { intent: "unknown" };
// //   }
// // }

// // export async function getContextualResponseFromLLM(query, data, name) {
// //   try {
// //     const res = await axios.post(
// //       BASE_URL,
// //       {
// //         model: "openrouter/free", // ✅ auto free model choose karega
// //         messages: [
// //           {
// //             role: "system",
// //             content: `You are a helpful college chatbot assistant.
// // Always address the student by name: ${name}.
// // Be concise, friendly and accurate.
// // Only use the student data provided — do not make up information.

// // Student Data:
// // ${data}`,
// //           },
// //           {
// //             role: "user",
// //             content: query,
// //           },
// //         ],
// //         max_tokens: 500,
// //         temperature: 0.7,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     return res.data.choices[0].message.content;
// //   } catch (err) {
// //     console.log(err.response?.data || err.message);
// //     return "AI service not available.";
// //   }
// // }``


// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import dotenv from "dotenv";
// // dotenv.config();

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // ✅ Best free model — fast + generous limits
// // const intentModel = genAI.getGenerativeModel({
// //   model: "gemini-2.5-flash-lite-preview-06-17",
// //   generationConfig: {
// //     maxOutputTokens: 10,
// //     temperature: 0,
// //   },
// // });

// // const chatModel = genAI.getGenerativeModel({
// //   model: "gemini-2.5-flash",  // smarter responses ke liye
// //   generationConfig: {
// //     maxOutputTokens: 500,
// //     temperature: 0.7,
// //   },
// // });

// // // --- Intent Detection ---
// // export async function getIntentFromLLM(message) {
// //   try {
// //     const prompt = `
// // You are an intent classifier.
// // Return ONLY one word — no explanation, nothing else:
// // get_info / general_query / logout_intent / unknown

// // User message: "${message}"
// // `;

// //     const result = await intentModel.generateContent(prompt);
// //     const text = result.response.text().trim().toLowerCase();

// //     if (text.includes("get_info")) return { intent: "get_info" };
// //     if (text.includes("general_query")) return { intent: "general_query" };
    

// //     return { intent: "unknown" };
// //   } catch (err) {
// //     console.log("Intent Error:", err.message);
// //     return { intent: "unknown" };
// //   }
// // }

// // // --- Contextual Response ---
// // export async function getContextualResponseFromLLM(query, data, name) {
// //   try {
// //     const prompt = `
// // You are a helpful college chatbot assistant.
// // Always address the student by name: ${name}.
// // Be concise, friendly and accurate.
// // Only use the student data provided — do not make up information.

// // Student Data:
// // ${data}

// // Student Question: ${query}
// // `;

// //     const result = await chatModel.generateContent(prompt);
// //     return result.response.text();
// //   } catch (err) {
// //     console.log("Chat Error:", err.message);
// //     return "AI service not available.";
// //   }
// // }

// // services/llm.service.js
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const intentModel = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash-lite",   // ✅ fix #10
//   generationConfig: {
//     maxOutputTokens: 100,      // ✅ 10 se badhao — entities ke liye JSON chahiye
//     temperature: 0,
//   },
// });

// const chatModel = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",     // ✅ fix #10
//   generationConfig: {
//     maxOutputTokens: 500,
//     temperature: 0.7,
//   },
// });

// // ✅ Yeh function add karo — chat.service.js isko call karta hai
// export async function getIntentAndEntities(message, history = "") {
//   try {
//     const prompt = `
// You are an intent classifier for a college chatbot.
// Return ONLY a valid JSON object — no explanation, no markdown.

// ${history ? `Recent conversation:\n${history}\n` : ""}

// Intents: get_marks / get_attendance / get_staff / get_room / get_class_location / check_college_status / general_query / logout_intent / unknown

// Examples:
// "mera CT1 ka marks batao" → {"intent":"get_marks","examType":"CT1","subject":null}
// "physics class kahan hai" → {"intent":"get_class_location","subject":"physics"}
// "BCA 2nd year" → (history mein physics tha) → {"intent":"get_class_location","subject":"physics","course":"BCA","year":2}

// User message: "${message}"
// `;

//     const result = await intentModel.generateContent(prompt);
//     const text = result.response.text().trim();

//     // ✅ JSON safely parse karo
//     const clean = text.replace(/```json|```/g, "").trim();
//     return JSON.parse(clean);

//   } catch (err) {
//     console.error("IntentAndEntities Error:", err.message);
//     return { intent: "unknown" };
//   }
// }

// // Contextual Response — same as before
// export async function getContextualResponseFromLLM(query, data, name) {
//   try {
//     const prompt = `
// You are a helpful college chatbot assistant.
// Always address the student by name: ${name}.
// Be concise, friendly and accurate.
// Only use the student data provided — do not make up information.

// Student Data:
// ${data}

// Student Question: ${query}
// `;

//     const result = await chatModel.generateContent(prompt);
//     return result.response.text();

//   } catch (err) {
//     console.error("Chat Error:", err.message);
//     return "AI service not available.";
//   }
// }

// services/llm.service.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    maxOutputTokens: 500,
    temperature: 0.7,
  },
});

export async function getSmartResponse(message, context, history = "") {
  try {
    const prompt = `
You are a smart, friendly college assistant chatbot.
You have access to the student's complete college data below.
Answer naturally and conversationally — like a helpful senior student would.

Rules:
- Only use information from the data provided. Never make things up.
- If something isn't in the data, say "I don't have that info right now."
- Keep answers concise and clear.
- For greetings or general chat, respond warmly and mention what you can help with.
- Always address the student by their first name.
- If the student asks what you can do, tell them: attendance, marks, class schedule, staff info, college timings, holidays.

${context ? `STUDENT DATA:\n${context}` : "No student data available."}

${history ? `RECENT CONVERSATION:\n${history}` : ""}

Student's message: "${message}"

Reply:`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();

  } catch (err) {
    console.error("LLM Error:", err.message);
    return "Sorry, I'm having trouble responding right now. Please try again!";
  }
}