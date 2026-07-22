import LanguageSelector from "./LanguageSelector.jsx";

function EditorToolbar({ languages, selectedLanguage, isRunning, onLanguageChange, onRunCode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
      <h2 className="font-semibold text-white">Code Editor</h2>
      <div className="flex items-center gap-3">
        <LanguageSelector languages={languages} selectedLanguage={selectedLanguage} onChange={onLanguageChange} disabled={isRunning} />
        <button type="button" onClick={onRunCode} disabled={isRunning} className="rounded-lg bg-[#0084ff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0074e8] disabled:cursor-not-allowed disabled:opacity-50">
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
}

export default EditorToolbar;
