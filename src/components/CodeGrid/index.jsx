import React from 'react';

export default function CodeGrid({ children, styles={} }) {
	let baseStyles = {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
		gridTemplateRows: '1fr',
		gridRowGap: '5px',
		gridColumnGap: '5px',
	};
	return (
		<div
			style={Object.assign(baseStyles, styles)}>
			{children}
		</div>
	);
}
