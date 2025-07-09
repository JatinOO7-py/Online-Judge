import mongoose from "mongoose";

const userCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem", // Reference the Problem model
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unsolved", "attempted", "solved"],
    default: "unsolved",
  },
});

const UserCode = mongoose.model("UserCode", userCodeSchema);

export default UserCode;
