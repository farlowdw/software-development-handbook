import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function CodeBlockPartial({
	content,
	language = 'a',
	showLineNumbers = false,
	title = '',
}) {
	if (!Array.isArray(content)) {
		content = [content];
	}

	content = content.join('\n\n');

	return (
		<div>
			<CodeBlock
				language={language}
				title={title}
				showLineNumbers={!!showLineNumbers}>
				{content}
			</CodeBlock>
		</div>
	);
}
