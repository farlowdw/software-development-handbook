import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import CodeEditorOutput from '@site/src/components/CodeEditorOutput';
import { useColorMode } from '@docusaurus/theme-common';

const CodeEditor = ({
  initialCode = '',
  editorSettings = {},
  outputSettings = {},
  foldedRegions = [],
}) => {
  const editorRef = useRef();
  const monacoRef = useRef();
  const [code, setCode] = useState(initialCode);
  const { colorMode } = useColorMode();
  const lightDarkTheme = colorMode == 'dark' ? 'vs-dark' : 'vs';

  const handleEditorMount = async (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Wait for the editor to be ready
    await editor.getModel(); // Ensure the model is loaded

    if (foldedRegions && foldedRegions.length > 0) {
      // Fold the specified regions
      await foldSpecifiedRegions(editor, monaco, foldedRegions);
    }

    editor.setPosition({ lineNumber: 1, column: 1 });
    editor.revealLineInCenter(1);
  };

  const foldSpecifiedRegions = async (editor, monaco, regionsToFold) => {
    const model = editor.getModel();
    for (let i = 0; i < regionsToFold.length; i++) {
      const [startLineNumber, endLineNumber] = regionsToFold[i];
      // Create a selection for the range
      editor.setSelection(
        new monaco.Selection(startLineNumber, 1, endLineNumber + 1, 1)
      );
      // Create a folding range from the selection
      await editor
        .getAction('editor.createFoldingRangeFromSelection')
        .run();
    }
  };

  // Expose the foldCodeRegions function
  const foldCodeRegions = async () => {
    if (
      editorRef.current &&
      monacoRef.current &&
      foldedRegions &&
      foldedRegions.length > 0
    ) {
      await foldSpecifiedRegions(editorRef.current, monacoRef.current, foldedRegions);
    }
  };

  let DEFAULT_EDITOR_SETTINGS = {
    height: '50vh',
    language: 'python',
    line: 1,
    theme: lightDarkTheme,
    value: code,
    options: { minimap: { enabled: false }, fontSize: 14 },
    onChange: (value) => setCode(value),
    onMount: handleEditorMount,
  };

  const DEFAULT_OUTPUT_PROPS = {
    language: 'python',
    version: '3.10.0',
    stdin: '',
    args: [],
    editorRef: editorRef,
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
    initial_code: initialCode,
    foldCodeRegions: foldCodeRegions,
  };

  const FINAL_EDITOR_SETTINGS = {
    ...DEFAULT_EDITOR_SETTINGS,
    ...editorSettings,
  };
  const FINAL_OUTPUT_PROPS = {
    ...DEFAULT_OUTPUT_PROPS,
    ...outputSettings,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Editor {...FINAL_EDITOR_SETTINGS} />
      <CodeEditorOutput {...FINAL_OUTPUT_PROPS} />
    </div>
  );
};

export default CodeEditor;