import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Câu hỏi không được để trống" });
  }

  const answer = await askAI(question);
  res.json({ answer });
});

export default router;
