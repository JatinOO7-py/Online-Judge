import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { getAllProblems } from "../services/problemService";

function HomePage() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [customTag, setCustomTag] = useState(""); // State for custom tag input

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 5; // Number of items per page (adjust as needed)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getAllProblems();
        setProblems(data);
        setFilteredProblems(data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const filterProblems = () => {
      let filtered = problems;

      if (search) {
        filtered = filtered.filter((problem) =>
          problem.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (difficultyFilter) {
        filtered = filtered.filter(
          (problem) => problem.difficulty === difficultyFilter
        );
      }

      if (tagFilter || customTag) {
        filtered = filtered.filter((problem) =>
          problem.tags.some((tag) =>
            tag
              .toLowerCase()
              .includes(tagFilter.toLowerCase() || customTag.toLowerCase())
          )
        );
      }

      setFilteredProblems(filtered);
    };

    filterProblems();
  }, [search, difficultyFilter, tagFilter, customTag, problems]);

  // Calculate the problems to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProblems = filteredProblems.slice(startIndex, endIndex);

  // Determine the total number of pages
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to HackathonHub!</h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="w-full max-w-4xl mb-8">
          <div className="flex flex-wrap justify-between space-y-4">
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
            >
              <option value="">All Tags</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="dynamic programming">Dynamic Programming</option>
              <option value="graph">Graph</option>
              <option value="tree">Tree</option>
              <option value="Maths">Maths</option>
              <option value="addition">Addition</option>
              <option value="hash table">Hash Table</option>
              <option value="sorting">Sorting</option>
              <option value="greedy">Greedy</option>
              <option value="depth-first search">Depth-first Search</option>
              <option value="breadth-first search">Breadth-first Search</option>
              <option value="binary search">Binary Search</option>
              <option value="matrix">Matrix</option>
              <option value="bit manipulation">Bit Manipulation</option>
              <option value="two pointers">Two Pointers</option>
              <option value="binary tree">Binary Tree</option>
              <option value="heap(priority queue)">Heap(Priority Queue)</option>
              <option value="prefix sum">Prefix Sum</option>
              <option value="stack">Stack</option>
              <option value="simulation">Simulation</option>
              <option value="counting">Counting</option>
              <option value="sliding window">Sliding Window</option>
              <option value="backtracking">Backtracking</option>
              <option value="linked list">Linked List</option>
              <option value="set">Set</option>
              <option value="divide and conquer">Divide and Conquer</option>
              <option value="queue">Queue</option>
              <option value="recursion">Recursion</option>
              {/* Add more tags as needed */}
            </select>

            {/* Custom Tag Input */}
            <input
              type="text"
              placeholder="Type a specific tag"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </div>

        <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg text-gray-100 mb-16">
          <h2 className="text-3xl font-bold mb-6">All Problems</h2>
          {displayedProblems.length === 0 ? (
            <div className="text-center text-lg">No problems available.</div>
          ) : (
            <div className="space-y-6">
              {displayedProblems.map((problem) => (
                <div
                  key={problem._id}
                  className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => navigate(`/problems/${problem._id}`)}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm mb-4">{problem.description}</p>
                  <div className="flex justify-between text-sm">
                    <p>
                      <strong>Difficulty:</strong> {problem.difficulty}
                    </p>
                    <p>
                      <strong>Tags:</strong> {problem.tags.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mb-8">
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
      </div>
    </div>
  );
}

export default HomePage;
