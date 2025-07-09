// models/user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profile: {
    name: {
      type: String,
      default: "user",
    },
    bio: {
      type: String,
      default: "test bio",
    },
    avatarUrl: {
      type: String,
      default: "http://example.com/avatar.jpg",
    },
  },
  preferences: {
    programmingLanguage: {
      type: String,
      default: "C++",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
  },
  activity: {
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
