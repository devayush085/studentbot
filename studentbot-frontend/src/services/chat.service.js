// services/chat.service.js
import api from "./api.js";

export const sendMessage = async (message) => {
  const { data } = await api.post("/chat/message", { message });
  return data;
};

export const getMessages = async () => {
  const { data } = await api.get("/chat/messages");
  return data;
};
