import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProblemById } from "../services/problemService";
import CodeEditor from "./CodeEditor";
import Navbar from "./Navbar";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

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

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="w-full max-w-6xl flex bg-gray-800 rounded-lg shadow-lg text-gray-100">
          <div className="w-1/2 p-6 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">{problem.title}</h2>
            <p className="mb-4">{problem.description}</p>
            <p className="mb-2">
              <strong>Difficulty:</strong> {problem.difficulty}
            </p>
            <p className="mb-2">
              <strong>Tags:</strong> {problem.tags.join(", ")}
            </p>
            <p className="mb-2">
              <strong>Input Format:</strong> {problem.input_format}
            </p>
            <p className="mb-2">
              <strong>Output Format:</strong> {problem.output_format}
            </p>
            <p className="mb-4">
              <strong>Constraints:</strong> {problem.constraints}
            </p>
            <div>
              <h3 className="text-2xl font-bold mt-6">Examples:</h3>
              {problem.examples.map((example, index) => (
                <div
                  key={index}
                  className="space-y-2 border border-gray-600 p-4 rounded bg-gray-700 mb-4"
                >
                  <p>
                    <strong>Input:</strong> {example.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {example.output}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-6 bg-gray-800 border-l border-gray-600">
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;
