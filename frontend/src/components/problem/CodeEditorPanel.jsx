import EditorToolbar from "./EditorToolbar.jsx";

function CodeEditorPanel({ languages, selectedLanguage, code, isRunning, onLanguageChange, onCodeChange, onRunCode }) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-[#0b1220]">
      <EditorToolbar languages={languages} selectedLanguage={selectedLanguage} isRunning={isRunning} onLanguageChange={onLanguageChange} onRunCode={onRunCode} />
      <textarea value={code} onChange={(event) => onCodeChange(event.target.value)} spellCheck="false" aria-label="Code editor" className="min-h-0 flex-1 resize-none bg-[#0b1220] p-4 font-mono text-sm leading-6 text-slate-200 outline-none caret-[#0084ff]" />
    </section>
  );
}

export default CodeEditorPanel;
