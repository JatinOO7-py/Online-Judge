import mongoose from "mongoose";

const { Schema } = mongoose; // Import Schema from mongoose

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    input_format: {
      type: String,
      required: true,
    },
    output_format: {
      type: String,
      required: true,
    },
    constraints: String,
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    test_cases: [
      {
        input: String,
        output: String,
      },
    ],
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    tags: [String],
    author: {
      type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId correctly
      ref: "User", // Reference the "User" model
      required: true,
    },
    solutions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Solution",
      },
    ],
    submissions: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", ProblemSchema);

export default Problem;
