import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { runCode } from "../services/compilerService";
import { getProblemById } from "../services/problemService";
import {
  getUserCode,
  saveUserCode,
  getAllSubmissions,
} from "../services/codeService";
import { getUserProfile } from "../services/userService";

const codeTemplates = {
  cpp: `#include <iostream>
int main() {
    std::cout << "Hello World!";
    return 0;
}
`,
  py: `print('Hello, world!')`,
  c: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`,
  java: `import java.util.Scanner;
class Test
{
    public static void main(String []args)
    {
        System.out.println("My First Java Program.");
    }
}`,
};

const CodeEditor = () => {
  const [code, setCode] = useState(codeTemplates.cpp);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [testCases, setTestCases] = useState([]);
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("unsolved");
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserId(profile._id);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId && id && language) {
      const fetchUserCode = async () => {
        try {
          const userCode = await getUserCode(id, userId, language);
          if (userCode && userCode.code) {
            setCode(userCode.code);
            setStatus(userCode.status);
          }
        } catch (error) {
          console.error("Failed to fetch user code:", error);
        }
      };

      fetchUserCode();
    }
  }, [userId, id, language]);

  useEffect(() => {
    setCode(codeTemplates[language]);
  }, [language]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(id);
        setProblem(data);
        setTestCases(data.test_cases || []);
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

  const handleViewSubmissions = async () => {
    try {
      const data = await getAllSubmissions(id);
      setSubmissions(data);
      setShowSubmissions(true);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  const handleRunCode = async () => {
    if (testCases.length > 0) {
      const results = [];
      let allPassed = true;
      for (let i = 0; i < testCases.length; i++) {
        const selectedTestCase = testCases[i];
        try {
          const result = await runCode(language, code, selectedTestCase.input);
          const isPassed =
            result.output.trim() === selectedTestCase.output.trim();
          if (!isPassed) {
            allPassed = false;
          }
          results.push({
            input: selectedTestCase.input,
            expected: selectedTestCase.output,
            output: result.output,
            passed: isPassed,
          });
        } catch (error) {
          results.push({
            input: selectedTestCase.input,
            expected: selectedTestCase.output,
            output:
              "Error executing code: " + (error.message || "Unknown error"),
            passed: false,
          });
          allPassed = false;
        }
      }
      setTestResults(results);
      setOutput(
        results
          .map(
            (res, idx) =>
              `Test Case ${idx + 1}: ${res.passed ? "Passed" : "Failed"}`
          )
          .join("\n")
      );

      let newStatus = "unsolved";
      if (allPassed) {
        newStatus = "solved";
      } else if (results.some((result) => result.passed)) {
        newStatus = "attempted";
      }
      setStatus(newStatus);

      if (userId && id && language) {
        try {
          await saveUserCode(id, userId, code, language, newStatus);
        } catch (error) {
          console.error("Failed to save user code:", error);
        }
      }
    } else {
      setOutput("No test cases available");
    }
  };

  const languageMode = () => {
    switch (language) {
      case "cpp":
      case "c":
        return cpp();
      case "py":
        return python();
      case "java":
        return java();
      default:
        return cpp();
    }
  };

  const handleCloseModal = () => {
    setShowSubmissions(false);
    setSelectedCode("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-900 text-white">
      <style>
        {`
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      background-color: #1f1f1f;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 800px;
      max-height: 80%;
      overflow-y: auto;
      position: relative; /* Make sure positioning works for the close button */
    }
    .close {
      color: #aaa;
      font-size: 28px;
      font-weight: bold;
      position: absolute;
      right: 20px;
      top: 7px; /* Adjust this value to position the close button higher */
      cursor: pointer;
    }
    .close:hover,
    .close:focus {
      color: white;
      text-decoration: none;
    }
    .modal-content pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `}
      </style>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 bg-gray-700 text-white border rounded"
      >
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
      </select>
      <CodeMirror
        value={code}
        height="600px"
        extensions={[languageMode()]}
        onChange={(value) => setCode(value)}
        theme="dark"
        className="cm-theme-dark"
      />
      <button
        onClick={handleRunCode}
        className="p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700"
      >
        Run Code
      </button>
      <button
        onClick={handleViewSubmissions}
        className="p-2 bg-green-600 text-white rounded mt-2 hover:bg-green-700"
      >
        View All Submissions
      </button>
      <textarea
        value={output}
        readOnly
        placeholder="Output"
        className="my-2 p-2 border rounded bg-gray-800 text-white"
      />
      {status && <div className="mt-2">Status: {status}</div>}
      {testResults.length > 0 && (
        <div className="mt-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-2 rounded mb-2 ${
                result.passed ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <p>
                Test Case {index + 1}: {result.passed ? "Passed" : "Failed"}
              </p>
            </div>
          ))}
        </div>
      )}
      {showSubmissions && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>All Submissions</h2>
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <div
                  key={index}
                  className="flex justify-between p-2 mb-2 border rounded bg-gray-800 text-white"
                >
                  <div>
                    <p>User: {submission.userId.userName}</p>
                    <p>Language: {submission.language}</p>
                    <p>Status: {submission.status}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCode(submission.code)}
                    className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600"
                  >
                    View Code
                  </button>
                </div>
              ))
            ) : (
              <p>No submissions available</p>
            )}
          </div>
        </div>
      )}
      {selectedCode && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Submitted Code</h2>
            <CodeMirror
              value={selectedCode}
              height="600px"
              extensions={[languageMode()]}
              readOnly
              theme="dark"
              className="cm-theme-dark"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
