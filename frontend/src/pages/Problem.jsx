import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";
import { PROBLEMS } from "../data/problems.js";
import { ChevronRight, Code2 } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblems = problems.filter(
    (problem) => problem.difficulty === "Easy"
  ).length;

  const mediumProblems = problems.filter(
    (problem) => problem.difficulty === "Medium"
  ).length;

  const hardProblems = problems.filter(
    (problem) => problem.difficulty === "Hard"
  ).length;

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* ================= HEADER ================= */}

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Practice Problems
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Challenge yourself with handpicked coding problems and sharpen your
            algorithmic thinking.
          </p>
        </div>

        {/* ================= PROBLEM LIST ================= */}

        <div className="space-y-5">

          {problems.map((problem) => (

            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="
                group
                block
                rounded-3xl
                border
                border-slate-800
                bg-[#171717]
                p-6
                transition-all
                duration-300
                hover:border-blue-500/40
                hover:bg-[#1d1d1d]
                hover:shadow-xl
                hover:shadow-blue-500/5
              "
            >

              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">

                {/* LEFT */}

                <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5">

                  {/* ICON */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <Code2 className="h-6 w-6 text-blue-400" />
                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-bold text-white sm:text-2xl">
                        {problem.title}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyBadgeClass(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>

                      <span className="text-sm font-medium text-slate-500">
                        {problem.category}
                      </span>

                    </div>

                    <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
                      {problem.description.text}
                    </p>

                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-2 self-end text-blue-400 font-semibold transition-transform group-hover:translate-x-1 sm:self-auto">

                  <span>Solve</span>

                  <ChevronRight className="h-5 w-5" />

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* ================= STATS ================= */}

        <div className="mt-14 rounded-[36px] border border-slate-800 bg-[#171717] p-8">

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Total Problems
              </p>

              <h2 className="mt-3 text-5xl font-bold text-blue-400">
                {problems.length}
              </h2>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Easy
              </p>

              <h2 className="mt-3 text-5xl font-bold text-cyan-400">
                {easyProblems}
              </h2>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Medium
              </p>

              <h2 className="mt-3 text-5xl font-bold text-yellow-400">
                {mediumProblems}
              </h2>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Hard
              </p>

              <h2 className="mt-3 text-5xl font-bold text-red-400">
                {hardProblems}
              </h2>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProblemsPage;
