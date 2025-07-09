import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Add Navbar component to maintain consistency
import { getUserProblems, deleteProblem } from "../services/problemService";

function MyProblems() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProblems = async () => {
      try {
        const data = await getUserProblems();
        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch user problems:", error);
      }
    };

    fetchUserProblems();
  }, []);

  const handleDelete = async (problemId) => {
    try {
      await deleteProblem(problemId);
      setProblems(problems.filter((problem) => problem._id !== problemId));
    } catch (error) {
      console.error("Failed to delete problem:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex-grow pt-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">My Problems</h1>
          <div className="space-y-4">
            {problems.length === 0 ? (
              <div className="text-center">No problems posted by you.</div>
            ) : (
              problems.map((problem) => (
                <div
                  key={problem._id}
                  className="p-4 border border-gray-700 rounded bg-gray-900 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{problem.title}</h2>
                    <p className="mb-2">{problem.description}</p>
                    <p className="mb-2">
                      <strong>Difficulty:</strong> {problem.difficulty}
                    </p>
                    <p>
                      <strong>Tags:</strong> {problem.tags.join(", ")}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/my-problems/${problem._id}/update`)
                      }
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(problem._id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProblems;
