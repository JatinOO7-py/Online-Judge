import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import crypto from "crypto";
import "dotenv/config";
import dbConnect from "./database/db.js";
import problemRoutes from "./routes/problems.js";
import User from "./models/user.js";
import userRoutes from "./routes/user.js";
import submissionRoutes from "./routes/submissions.js";
import generateFile from "./Compiler/generateFile.js";
import executeCpp from "./Compiler/executeCpp.js";
import executePy from "./Compiler/executePy.js";
import executeC from "./Compiler/executeC.js";
import executeJava from "./Compiler/executeJava.js";
import generateInputFile from "./Compiler/generateInputFile.js";

const app = express();
const port = process.env.PORT || 3000;

// app.use(
//   cors({
//     origin: "https://hackathonhub.online",
//     credentials: true,
//   })
// );

app.use(cors({
  origin: 'http://localhost:5173',  // Vite dev server
  credentials: true                 // if you're using cookies or auth
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to DB when starting the server
dbConnect().then(() => {
  app.listen(port, () => {
    console.log("Changeddd");
    console.log(`Server running on port ${port}`);
  });
});

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`);
// });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use problem routes
app.use("/problems", problemRoutes);

app.use("/user", userRoutes);

app.use("/submissions", submissionRoutes);

// Endpoint to request password reset
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist." });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
             http://localhost:5173/reset-password/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to reset password
app.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup, login, and logout endpoints remain the same
app.post("/signUp", async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      name = "Anonymous", // Default value for name
      bio = "This user prefers to keep an air of mystery about them.", // Default value for bio
      programmingLanguage,
      theme,
      role,
    } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).send("Please enter all the required fields");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Generate avatar URL using DiceBear API
    const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
      name || userName
    )}`;

    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      role: role || "user",
      profile: {
        name,
        bio,
        avatarUrl,
      },
      preferences: {
        programmingLanguage: programmingLanguage || "Python",
        theme: theme || "light",
      },
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    user.token = token;
    user.password = undefined;

    res
      .status(200)
      .json({ message: "You have successfully registered!", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required data" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: "You have successfully logged in!",
        success: true,
        token,
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          profile: user.profile,
          preferences: user.preferences,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "You have successfully logged out!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputPath = input ? await generateInputFile(input) : null;

    let output;
    switch (language) {
      case "c":
        output = await executeC(filePath, inputPath);
        break;
      case "py":
        output = await executePy(filePath, inputPath);
        break;
      case "cpp":
        output = await executeCpp(filePath, inputPath);
        break;
      case "java":
        output = await executeJava(filePath, inputPath);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Invalid language!" });
    }

    res.json({ filePath, inputPath, output });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
