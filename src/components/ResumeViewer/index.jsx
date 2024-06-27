import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useMediaQuery } from '@mui/material';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ResumeViewer = () => {
	const isSmallScreen = useMediaQuery('(max-width:1050px)');
	const { colorMode } = useColorMode();
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	return (
		<>
			<style>
				{`@media print {
            .rpv-print__body-printing #__docusaurus {
              display: none;
            }
        }`}
			</style>
			<div style={{ height: '100%', width: '100%' }}>
				<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
					<Viewer
						fileUrl={
							require('@site/static/docs/Daniel_Farlow_resume.pdf').default
						}
						plugins={[defaultLayoutPluginInstance]}
						theme={colorMode == 'dark' ? 'dark' : 'light'}
						defaultScale={isSmallScreen ? SpecialZoomLevel.PageWidth : 1.75}
					/>
				</Worker>
			</div>
		</>
	);
};

export default ResumeViewer;
