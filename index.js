import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cookieParser());
// app.use(cors());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true,                                          
  methods: ["GET", "POST", "PUT", "DELETE"],                 
  allowedHeaders: ["Content-Type", "Authorization"],         
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});