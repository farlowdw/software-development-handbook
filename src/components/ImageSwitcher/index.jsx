import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const ImageSwitcher = ({ lightImageSrc, darkImageSrc }) => {
	const { colorMode } = useColorMode();

	return (
		<img
			src={colorMode === 'dark' ? darkImageSrc : lightImageSrc}
			alt="Example banner"
		/>
	);
};

export default ImageSwitcher;
