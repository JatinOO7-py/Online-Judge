import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Add Navbar component to maintain consistency
import { getProblemById, updateProblem } from "../services/problemService";

function UpdateProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    input_format: "",
    output_format: "",
    constraints: "",
    examples: [],
    test_cases: [],
    difficulty: "",
    tags: [],
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(id);
        setProblem(data);
      } catch (error) {
        console.error("Failed to fetch problem:", error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestCases = [...problem.test_cases];
    updatedTestCases[index] = { ...updatedTestCases[index], [name]: value };
    setProblem((prevProblem) => ({
      ...prevProblem,
      test_cases: updatedTestCases,
    }));
  };

  const addTestCase = () => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      test_cases: [...prevProblem.test_cases, { input: "", output: "" }],
    }));
  };

  const removeTestCase = (index) => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      test_cases: prevProblem.test_cases.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProblem(id, problem);
      navigate("/my-problems");
    } catch (error) {
      console.error("Failed to update problem:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-20">
        <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Update Problem</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={problem.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Description</label>
              <textarea
                name="description"
                value={problem.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Input Format
              </label>
              <textarea
                name="input_format"
                value={problem.input_format}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Output Format
              </label>
              <textarea
                name="output_format"
                value={problem.output_format}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Constraints</label>
              <textarea
                name="constraints"
                value={problem.constraints}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Difficulty</label>
              <select
                name="difficulty"
                value={problem.difficulty}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                required
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold">Tags</label>
              <input
                type="text"
                name="tags"
                value={problem.tags.join(", ")}
                onChange={(e) =>
                  setProblem((prevProblem) => ({
                    ...prevProblem,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  }))
                }
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Test Cases</label>
              {problem.test_cases.map((testCase, index) => (
                <div
                  key={index}
                  className="border border-gray-600 p-4 mb-4 rounded bg-gray-800"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      Test Case {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Input</label>
                    <textarea
                      name="input"
                      value={testCase.input}
                      onChange={(e) => handleTestCaseChange(index, e)}
                      className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">
                      Output
                    </label>
                    <textarea
                      name="output"
                      value={testCase.output}
                      onChange={(e) => handleTestCaseChange(index, e)}
                      className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addTestCase}
                className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-500"
              >
                Add Test Case
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Update Problem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProblem;
