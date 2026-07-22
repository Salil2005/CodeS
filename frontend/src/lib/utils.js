export function getDifficultyBadgeClass(difficulty) {
  const difficultyClasses = {
    Easy: "bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/20",
    Medium:
      "bg-yellow-400/10 text-yellow-300 ring-1 ring-inset ring-yellow-400/20",
    Hard: "bg-red-400/10 text-red-300 ring-1 ring-inset ring-red-400/20",
  };

  return difficultyClasses[difficulty] ?? "bg-slate-800 text-slate-300";
}
