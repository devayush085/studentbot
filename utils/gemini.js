// utils/gemini.js (English version – refined and simplified)

import { config } from "dotenv";
config();

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

/**
 * Detects the user's intent using Gemini
 */
export async function getIntentFromLLM(message) {
  console.log("Intent Classification Message:", message);
  try {
    const prompt = `
      You are a helpful college chatbot.
      Analyze the student's message and return ONLY one of the following intent names:

      - get_info         (Personal academic data: marks, attendance, roll number, contact info)
      - general_query    (General or college-related info: fees, courses, admissions, location)
      - logout_intent    (When the student wants to logout)
      - unknown          (If the message is unclear or irrelevant)

      Student message: "${message}"

      Return only the intent name, nothing else.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = (response.text || "").trim().toLowerCase();
    const validIntents = ["get_info", "general_query", "logout_intent", "unknown"];
    const found = validIntents.find((i) => text.includes(i));
    console.log("Detected Intent:", found);
    return { intent: found || "unknown" };
  } catch (err) {
    console.error("Gemini Intent Classification Error:", err.message);
    return { intent: "unknown" };
  }
}

/**
 * Generates contextual response using Gemini LLM
 */
export async function getContextualResponseFromLLM(
  userQuery,
  studentData,
  studentName,
  universityURL = "https://aktu.ac.in/"
) {
  try {
    const prompt = `
      You are a friendly and intelligent college student assistant chatbot.
      Respond naturally and clearly in English.

      Student Name: ${studentName}
      Student Data:
      ---
      ${studentData}
      ---

      RULES:
      1. Always greet the student by name (${studentName}).
      2. If the message is a greeting ("hi", "hello", "hey") or thanks, reply politely and briefly, asking how you can help.
      3. If the student asks for their own details (marks, attendance, roll number, mobile, father mobile), use the provided data directly.
      4. If the query is unclear or incomplete (for example: “Show my marks” without specifying exam type or semester), ask a short clarification question like:
         - "Which marks do you want — class test, midterm, or semester?"
         - "Do you mean current semester or previous semester marks?"
      5. If the question refers to UNIVERSITY-level marks, respond:
         - "For university exam marks, please check the official university portal: ${universityURL}"
      6. If the student asks about admissions or fees, ask for clarification such as:
         - "Which course are you referring to — B.Tech, MCA, or another program?"
      7. If the requested data is not available, clearly say it is not available.
      8. If the message is irrelevant or still unclear after clarifications, politely guide the student to check the college website.
      9. Keep your tone formal but friendly, short, and easy to understand.

      Student Query: "${userQuery}"

      Your Response:
    `;

    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return (res.text || "Sorry, I couldn’t understand your question.").trim();
  } catch (err) {
    console.error("Contextual LLM error:", err.message);
    return `Sorry ${studentName}, there was a technical issue. Please try again later.`;
  }
}
