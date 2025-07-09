import Problem from "../models/Problem.js";

// Add a problem
export const addProblem = async (req, res) => {
  try {
    const newProblem = new Problem({
      ...req.body,
      author: req.user.id,
    });
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all problems
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching all problems:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get problem by ID
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update problem
export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (problem.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own problems" });
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete problem
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (problem.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own problems" });
    }

    await Problem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get problems by user ID
export const getUserProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ author: req.user.id });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
