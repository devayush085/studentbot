// services/auth.service.js
import api from "./api.js";

export const loginUser = async (studentId, password) => {
  const { data } = await api.post("/auth/login", { studentId, password });
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
