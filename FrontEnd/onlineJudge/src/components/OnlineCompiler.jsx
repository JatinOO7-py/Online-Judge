import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { runCode } from "../services/compilerService";
import "./OnlineCompiler.css";

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

const OnlineCompiler = () => {
  const [code, setCode] = useState(codeTemplates.cpp);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setCode(codeTemplates[language]);
  }, [language]);

  const handleRunCode = async () => {
    try {
      const result = await runCode(language, code, input);
      setOutput(result.output || "No output");
    } catch (error) {
      setOutput("Error executing code: " + (error.message || "Unknown error"));
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

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img
            src="/HackathonHub.png"
            alt="HackathonHub Logo"
            className="h-8 w-8 mr-2"
          />
          <div className="text-2xl font-bold">HackathonHub</div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <img src="/back_icon.png" alt="Back Icon" className="h-5 w-5" />
            <span>Back</span>
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="custom-select bg-gray-800 text-white border border-gray-700 rounded-md"
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
          <button
            onClick={handleRunCode}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            <img src="/run_icon.png" alt="Run Code Icon" className="h-5 w-5" />
            <span>Run Code</span>
          </button>
        </div>
      </header>
      <main className="flex-grow mb-4 pt-20">
        <CodeMirror
          value={code}
          height="calc(100vh - 300px)"
          extensions={[languageMode()]}
          onChange={(value) => setCode(value)}
          theme="dark"
          className="h-full"
        />
      </main>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your input here"
        className="textarea bg-gray-800 text-white border border-gray-700 rounded-md p-2"
      />
      <textarea
        value={output}
        readOnly
        placeholder="Output"
        className="textarea bg-gray-800 text-white border border-gray-700 rounded-md p-2 mt-4"
      />
    </div>
  );
};

export default OnlineCompiler;
