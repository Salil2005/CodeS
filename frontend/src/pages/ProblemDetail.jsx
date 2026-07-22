import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import CodeEditorPanel from "../components/problem/CodeEditorPanel.jsx";
import OutputPanel from "../components/problem/OutputPanel.jsx";
import ProblemStructure from "../components/problem/ProblemStructure.jsx";
import { LANGUAGE_CONFIG, PROBLEMS } from "../data/problems.js";
import { executeCode } from "../lib/piston.js";

function normalizeOutput(output) {
  return output
    .trim()
    .split("\n")
    .map((line) => line.trim().replace(/\[\s+/g, "[").replace(/\s+\]/g, "]").replace(/\s*,\s*/g, ","))
    .filter(Boolean)
    .join("\n");
}

function ProblemDetail() {
  const { id } = useParams();
  const problem = PROBLEMS[id];
  const languages = useMemo(() => Object.keys(LANGUAGE_CONFIG), []);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const currentRunRef = useRef(0);

  useEffect(() => {
    if (!problem) return;

    currentRunRef.current += 1;
    setIsRunning(false);
    setCode(problem.starterCode[selectedLanguage] ?? "");
    setResult(null);
  }, [id, problem, selectedLanguage]);

  const handleRunCode = async () => {
    const currentRunId = currentRunRef.current + 1;
    currentRunRef.current = currentRunId;
    setIsRunning(true);
    setResult(null);

    try {
      const execution = await executeCode(selectedLanguage, code);
      const expectedOutput = problem.expectedOutput[selectedLanguage];
      const passed = execution.success && normalizeOutput(execution.output) === normalizeOutput(expectedOutput);

      if (currentRunId !== currentRunRef.current) {
        return;
      }

      setResult({ ...execution, passed });

      if (passed) {
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.7 } });
        toast.success("All test cases passed. Great work!");
      } else if (execution.success) {
        toast.error("Your output does not match all test cases.");
      } else {
        toast.error("Code execution failed. Check the output panel.");
      }
    } finally {
      if (currentRunId === currentRunRef.current) {
        setIsRunning(false);
      }
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#06080d] text-slate-100">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="text-3xl font-extrabold text-white">Problem not found</h1>
          <Link to="/problems" className="mt-6 inline-flex text-sm font-semibold text-[#0084ff] hover:text-white">Back to problems</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#06080d] text-slate-100">
      <Navbar />
      <main className="min-h-0 flex-1 p-3 sm:p-4">
        <ProblemStructure
          problem={problem}
          editor={<CodeEditorPanel languages={languages} selectedLanguage={selectedLanguage} code={code} isRunning={isRunning} onLanguageChange={setSelectedLanguage} onCodeChange={setCode} onRunCode={handleRunCode} />}
          output={<OutputPanel result={result} />}
        />
      </main>
    </div>
  );
}

export default ProblemDetail;
