import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ResumeViewer = () => {
	const { colorMode } = useColorMode();
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	return (
			<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
				<Viewer
					fileUrl={
						require('@site/static/docs/Daniel_Farlow_resume.pdf').default
					}
					plugins={[defaultLayoutPluginInstance]}
					theme={colorMode == 'dark' ? 'dark' : 'light'}
				/>
			</Worker>
	);
};

export default ResumeViewer;
