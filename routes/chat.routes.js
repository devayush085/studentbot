import express from "express";
import {
  sendMessage,
  getMessages,
} from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/message", protect, sendMessage);
router.get("/messages", protect, getMessages);


export default router;