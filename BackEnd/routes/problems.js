import express from "express";
import {
  addProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getUserProblems,
} from "../controllers/problems.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addProblem);
router.get("/", getAllProblems);
router.get("/my-problems", authMiddleware, getUserProblems);
router.get("/:id", getProblemById);
router.put("/:id", authMiddleware, updateProblem);
router.delete("/:id", authMiddleware, deleteProblem);

export default router;
