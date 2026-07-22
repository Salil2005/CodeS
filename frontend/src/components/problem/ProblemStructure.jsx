import { Code2Icon } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../../lib/utils.js";

function ProblemContent({ problem }) {
  return (
    <section className="h-full space-y-5 overflow-y-auto bg-[#0c111b] p-3 sm:p-4">
      <article className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#0084ff]/10 text-[#0084ff]"><Code2Icon className="size-5" /></div><span className="text-sm font-medium text-slate-500">{problem.category}</span></div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
        </div>
        <h2 className="text-xl font-extrabold text-white">Description</h2>
        <p className="mt-4 text-sm font-medium leading-7 text-slate-300">{problem.description.text}</p>
        {problem.description.notes.map((note) => <p key={note} className="mt-3 text-sm font-medium leading-7 text-slate-300">{note}</p>)}
      </article>

      <article className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6">
        <h2 className="text-xl font-extrabold text-white">Examples</h2>
        <div className="mt-5 space-y-5">
          {problem.examples.map((example, index) => <div key={`${example.input}-${index}`}><h3 className="flex items-center gap-3 text-sm font-bold text-white"><span className="text-slate-500">{index + 1}</span>Example {index + 1}</h3><div className="mt-3 rounded-lg bg-[#1b2332] px-4 py-3 font-mono text-xs leading-6 sm:text-sm"><p><span className="font-bold text-emerald-400">Input:</span> <span className="ml-3 text-slate-200">{example.input}</span></p><p><span className="font-bold text-teal-400">Output:</span> <span className="ml-3 text-slate-200">{example.output}</span></p>{example.explanation && <p className="mt-3 border-t border-slate-700 pt-3 font-sans text-xs leading-5 text-slate-400"><span className="font-semibold text-slate-300">Explanation:</span> {example.explanation}</p>}</div></div>)}
        </div>
      </article>

      <article className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6">
        <h2 className="text-xl font-extrabold text-white">Constraints</h2>
        <ul className="mt-4 space-y-3 text-sm font-medium text-slate-300">{problem.constraints.map((constraint) => <li key={constraint} className="flex gap-3"><span className="text-emerald-400">•</span><span>{constraint}</span></li>)}</ul>
      </article>
    </section>
  );
}

function ProblemStructure({ problem, editor, output }) {
  return (
    <Group orientation="horizontal" className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0c111b]">
      <Panel defaultSize="42%" minSize="28%"><ProblemContent problem={problem} /></Panel>
      <Separator className="w-1.5 bg-slate-900 transition-colors hover:bg-[#0084ff]" />
      <Panel defaultSize="58%" minSize="32%">
        <Group orientation="vertical">
          <Panel defaultSize="70%" minSize="35%">{editor}</Panel>
          <Separator className="h-1.5 bg-slate-900 transition-colors hover:bg-[#0084ff]" />
          <Panel defaultSize="30%" minSize="20%">{output}</Panel>
        </Group>
      </Panel>
    </Group>
  );
}

export default ProblemStructure;
