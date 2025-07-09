import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/user.js";
import UserCode from "../models/userCode.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { profile, preferences } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profile = profile;
    user.preferences = preferences;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/saveUserCode", authMiddleware, async (req, res) => {
  try {
    const { problemId, code, language, status } = req.body;
    const userId = req.user.id;

    let userCode = await UserCode.findOne({ userId, problemId, language });

    if (userCode) {
      userCode.code = code;
      userCode.status = status;
    } else {
      userCode = new UserCode({ userId, problemId, code, language, status });
    }

    await userCode.save();

    res.json({ message: "Code saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserCode", authMiddleware, async (req, res) => {
  try {
    const { problemId, language } = req.query;
    const userId = req.user.id;

    const userCode = await UserCode.findOne({ userId, problemId, language });

    if (!userCode) {
      return res.status(404).json({ message: "User code not found" });
    }

    res.json({ code: userCode.code, status: userCode.status });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
