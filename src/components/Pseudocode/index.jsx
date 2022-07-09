import React, { useEffect } from 'react';

export default function Pseudocode({
	content,
	algID,
	options = {
		indentSize: '1.2em',
		commentDelimiter: '//',
		lineNumber: false,
		lineNumberPunc: ':',
		noEnd: false,
		captionCount: undefined,
	},
}) {
	useEffect(() => {
		if (window && document) {
			const script = document.createElement('script');
			const body = document.getElementsByTagName('body')[0];
			script.src =
				'https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.js';
			body.appendChild(script);
			script.addEventListener('load', () => {
				pseudocode.renderElement(document.getElementById(algID), options);
			});
		}
	}, []);
	return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
