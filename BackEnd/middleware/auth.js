import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    //console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log("Decoded token:", decoded);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized access" });
    }
    //console.log("User authenticated:", req.user);
    next();
  } catch (error) {
    console.log("Invalid token:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
