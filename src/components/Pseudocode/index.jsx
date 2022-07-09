import React, { useEffect } from 'react';

export default function Pseudocode({ content, algID }) {
	useEffect(() => {
		if (window && document) {
			const script = document.createElement('script');
			const body = document.getElementsByTagName('body')[0];
			script.src =
				'https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.js';
			body.appendChild(script);
			script.addEventListener('load', () => {
				pseudocode.renderElement(document.getElementById(algID));
			});
		}
	}, []);
	return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
