const LANGUAGE_CONFIG = {
  javascript: {
    language: "javascript",
    version: "18.15.0",
    extension: "js",
  },
  python: {
    language: "python",
    version: "3.10.0",
    extension: "py",
  },
  java: {
    language: "java",
    version: "15.0.2",
    extension: "java",
  },
  cpp: {
    language: "c++",
    version: "10.2.0",
    extension: "cpp",
  },
};

export async function executeCode(language, sourceCode) {
  const config = LANGUAGE_CONFIG[language];

  if (!config) {
    return {
      success: false,
      error: `Unsupported language: ${language}`,
    };
  }

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch("/api/execute", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [
          {
            name: `main.${config.extension}`,
            content: sourceCode,
          },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json();

    const run = result.run ?? {};
    const compile = result.compile ?? {};

    const stdout = run.output?.trim() || "";
    const stderr = run.stderr?.trim() || "";
    const compileOutput = compile.output?.trim() || "";

    if (compile.code !== undefined && (compile.code !== 0 || compile.signal || compile.status)) {
      return {
        success: false,
        output: stdout,
        error: compileOutput || "Compilation failed.",
      };
    }

    if (run.code !== 0 || run.signal || run.status) {
      return {
        success: false,
        output: stdout,
        error: stderr || run.output?.trim() || "Execution failed.",
      };
    }    

    if (stderr) {
      return {
        success: false,
        output: stdout,
        error: stderr,
      };
    }

    return {
      success: true,
      output: stdout || "Program executed successfully with no output.",
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        success: false,
        error: "Execution timed out.",
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
}


function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
    cpp: "cpp",
  };

  return extensions[language] || "txt";
}