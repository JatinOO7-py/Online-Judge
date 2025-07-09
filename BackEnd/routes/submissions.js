import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import UserCode from "../models/userCode.js";

const router = express.Router();

router.get("/submissions/:problemId", authMiddleware, async (req, res) => {
  try {
    const submissions = await UserCode.find({
      problemId: req.params.problemId,
    }).populate("userId", "userName");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/submissions/solved/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    const solvedProblems = await UserCode.find({
      userId: userId,
      status: "solved",
    }).populate("problemId", "title description difficulty tags");

    res.json(solvedProblems);
  } catch (error) {
    console.error("Error in fetching solved problems:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
