import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { getUserProfile } from "../services/userService";
import { getSolvedProblems } from "../services/codeService";

function Profile() {
  const [user, setUser] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);

        if (data?._id) {
          await fetchSolvedProblems(data._id);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchSolvedProblems = async (userId) => {
      try {
        const problems = await getSolvedProblems(userId);
        setSolvedProblems(problems);
      } catch (error) {
        console.error("Failed to fetch solved problems:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  const { profile = {}, email, preferences = {} } = user;
  const { avatarUrl, name, bio } = profile;
  const { programmingLanguage } = preferences;

  // Pagination logic
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = solvedProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );
  const totalPages = Math.ceil(solvedProblems.length / problemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex-grow pt-20 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg mb-6 flex justify-between">
          <div className="flex items-center">
            <img
              src={avatarUrl || "default-avatar-url"}
              alt="Avatar"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{name || "Anonymous"}</h2>
              <p className="text-gray-400">{email}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end">
            <div className="text-right">
              <h3 className="text-xl font-bold mb-2">Bio</h3>
              <p>
                {bio ||
                  "This user prefers to keep an air of mystery about them."}
              </p>
            </div>
            <div className="mt-4 text-right">
              <h3 className="text-xl font-bold mb-2">Preferences</h3>
              <p>Programming Language: {programmingLanguage || "Python"}</p>
            </div>
          </div>
        </div>

        {/* Solved Problems Section */}
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Solved Problems</h3>
          {solvedProblems.length === 0 ? (
            <p>No problems solved yet.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {currentProblems.map((problem) => (
                  <li key={problem._id}>
                    <Link
                      to={`/problems/${problem.problemId._id}`}
                      className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                    >
                      <h4 className="text-lg font-bold">
                        {problem.problemId.title}
                      </h4>
                      <p className="text-gray-400">
                        Difficulty: {problem.problemId.difficulty}
                      </p>
                      <p className="text-gray-400">
                        Tags: {problem.problemId.tags.join(", ")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? "bg-gray-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-gray-800 rounded">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
