import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CodeBlock from '@theme/CodeBlock';

const CodeEditorOutput = ({
	editorRef,
	language,
	version,
	stdin,
	args,
	compile_timeout,
	run_timeout,
	compile_memory_limit,
	run_memory_limit,
	initial_code,
  foldCodeRegions, // Receive the function as a prop
}) => {
	const [output, setOutput] = useState(
		'Click "Run Code" to see the output here'
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isResetting, setIsResetting] = useState(false);
	const [copyStatus, setCopyStatus] = useState('idle'); // idle, success, failure for input
	const [copyOutputStatus, setCopyOutputStatus] = useState('idle'); // for output

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;

		setIsLoading(true);
		setOutput('Running...');

		try {
			const payload = {
				language,
				version,
				stdin,
				args,
				compile_timeout,
				run_timeout,
				compile_memory_limit,
				run_memory_limit,
				files: [{ content: sourceCode }],
			};

			const response = await axios.post(
				'https://emkc.org/api/v2/piston/execute',
				payload
			);
			const result = response.data.run;
			setOutput(result.output || 'No output');
		} catch (error) {
			setOutput('An error occurred while running the code.');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

  const resetCode = async () => {
    setIsResetting(true);
    if (editorRef.current) {
      editorRef.current.setValue(initial_code);
    }
    setOutput('Click "Run Code" to see the output here');

    // Re-apply code folding
    if (foldCodeRegions) {
      await foldCodeRegions();
    }

    setIsResetting(false);
  };

	const clearEditor = () => {
		if (editorRef.current) {
			editorRef.current.setValue(''); // Clear the editor
		}
		setOutput('Click "Run Code" to see the output here');
	};

	const copyToClipboard = () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;

		navigator.clipboard
			.writeText(sourceCode)
			.then(() => {
				setCopyStatus('success');
				setTimeout(() => setCopyStatus('idle'), 1500);
			})
			.catch(() => {
				setCopyStatus('failure');
				setTimeout(() => setCopyStatus('idle'), 1500);
			});
	};

	const copyOutputToClipboard = () => {
		if (!output) return;

		navigator.clipboard
			.writeText(output)
			.then(() => {
				setCopyOutputStatus('success');
				setTimeout(() => setCopyOutputStatus('idle'), 1500);
			})
			.catch(() => {
				setCopyOutputStatus('failure');
				setTimeout(() => setCopyOutputStatus('idle'), 1500);
			});
	};

	return (
		<div>
      <style>
        {`
          .button-container {
            display: flex;
            gap: 10px;
            justify-content: flex-start; /* Align buttons left */
            flex-wrap: wrap;
          }

          @media (max-width: 600px) {
            .button-container {
              flex-direction: column;
              align-items: stretch;
            }
            .button-container button {
              width: 100%;
              margin-bottom: -5px;
            }
            .button-container button:last-child {
              margin-bottom: 1rem;
            }
          }
        `}
      </style>

      <div className="button-container">
				<Button
					onClick={runCode}
					disabled={isLoading}
					variant="outlined"
					sx={{ marginTop: '5px', marginBottom: '10px' }}>
					{isLoading ? 'Running...' : 'Run Code'}
				</Button>
				<Button
					onClick={resetCode}
					disabled={isResetting}
					variant="outlined"
					sx={{ marginTop: '5px', marginBottom: '10px' }}>
					{isResetting ? 'Resetting code...' : 'Reset Code'}
				</Button>
				<Button
					onClick={clearEditor}
					variant="outlined"
					sx={{ marginTop: '5px', marginBottom: '10px' }}>
					Clear
				</Button>
				<Button
					onClick={copyToClipboard}
					variant="outlined"
					sx={{
						marginTop: '5px',
						marginBottom: '10px',
						backgroundColor:
							copyStatus === 'success'
								? 'green'
								: copyStatus === 'failure'
								? 'red'
								: '',
						color: copyStatus === 'idle' ? '' : 'white',
					}}>
					{copyStatus === 'success'
						? '✔ Copied!'
						: copyStatus === 'failure'
						? '✘ Failed'
						: 'Copy (Code)'}
				</Button>
				<Button
					onClick={copyOutputToClipboard}
					variant="outlined"
					sx={{
						marginTop: '5px',
						marginBottom: '10px',
						backgroundColor:
							copyOutputStatus === 'success'
								? 'green'
								: copyOutputStatus === 'failure'
								? 'red'
								: '',
						color: copyOutputStatus === 'idle' ? '' : 'white',
					}}>
					{copyOutputStatus === 'success'
						? '✔ Copied!'
						: copyOutputStatus === 'failure'
						? '✘ Failed'
						: 'Copy (Output)'}
				</Button>
			</div>
			<CodeBlock title="Output">{output}</CodeBlock>
		</div>
	);
};

export default CodeEditorOutput;
