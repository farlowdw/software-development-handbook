import React from 'react';

export default function DisplayPDF({
	width = '100%',
	height = '750px',
	filePath,
}) {
	return (
		<object
			width={width}
			height={height}
			data={filePath}
			type="application/pdf">
    </object>
	);
}
