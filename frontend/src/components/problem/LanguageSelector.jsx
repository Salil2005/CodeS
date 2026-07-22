import { LANGUAGE_CONFIG } from "../../data/problems.js";

function LanguageSelector({ languages, selectedLanguage, onChange, disabled }) {
  return (
    <select
      value={selectedLanguage}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Programming language"
      disabled={disabled}
      className="rounded-lg border border-slate-700 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none focus:border-[#0084ff] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {languages.map((language) => <option key={language} value={language}>{LANGUAGE_CONFIG[language].name}</option>)}
    </select>
  );
}

export default LanguageSelector;
