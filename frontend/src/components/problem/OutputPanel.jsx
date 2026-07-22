import { CheckCircle2Icon, TerminalSquareIcon } from "lucide-react";

function OutputPanel({ result }) {
  const resultClass = result?.success
    ? result.passed
      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-100"
      : "border-amber-500/20 bg-amber-500/5 text-amber-100"
    : "border-red-500/20 bg-red-500/5 text-red-200";

  return (
    <section className="h-full overflow-y-auto bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-white"><TerminalSquareIcon className="size-4 text-[#0084ff]" />Output</div>
        {result?.passed && <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400"><CheckCircle2Icon className="size-4" />Passed</span>}
      </div>
      {result ? (
        <pre className={`mt-3 whitespace-pre-wrap wrap-break-words rounded-lg border p-3 font-mono text-xs leading-5 ${resultClass}`}>
          {result.success
            ? result.output
            : [result.output, result.error].filter(Boolean).join("\n\n")}
        </pre>
      ) : (
        <p className="mt-3 text-sm text-slate-500">Run your code to view its output.</p>
      )}
    </section>
  );
}

export default OutputPanel;
