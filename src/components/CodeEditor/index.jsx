import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import CodeEditorOutput from '@site/src/components/CodeEditorOutput';
import { useColorMode } from '@docusaurus/theme-common';

// https://microsoft.github.io/monaco-editor/playground.html?source=v0.52.0
// https://www.npmjs.com/package/@monaco-editor/react#monaco-instance
const CodeEditor = ({ 
    initialCode = '', 
    editorSettings = {},
    outputSettings = {} 
  }) => {
  const editorRef = useRef();
  const [code, setCode] = useState(initialCode);
  const { colorMode } = useColorMode();
  const lightDarkTheme = colorMode == 'dark' ? 'vs-dark' : 'vs';

  const DEFAULT_EDITOR_SETTINGS = {
    height: '50vh',
    language: 'python',
    line: 1,
    theme: lightDarkTheme,
    value: code,
    options: { minimap: { enabled: false }, fontSize: 14 },
    onMount: (editor) => { editorRef.current = editor },
    onChange: (value) => setCode(value),
  }

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
    initial_code: initialCode
  }

  const FINAL_EDITOR_SETTINGS = Object.assign(DEFAULT_EDITOR_SETTINGS, editorSettings);
  const FINAL_OUTPUT_PROPS = Object.assign(DEFAULT_OUTPUT_PROPS, outputSettings);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Editor {...FINAL_EDITOR_SETTINGS} />
      <CodeEditorOutput {...FINAL_OUTPUT_PROPS} />
    </div>
  );
};

export default CodeEditor;