import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function CodeGridCell({ children, styles={} }) {
  const { colorMode } = useColorMode();
  const codeBackgroundColor = colorMode == 'dark' ? 'var(--color-gray-86)' : 'var(--color-gray-4)';

  let baseStyles = {
    backgroundColor: codeBackgroundColor,
    overflow: 'auto',
    maxWidth: '100%',
  };

  return (
    <div style={Object.assign({}, baseStyles, styles)}>
      {children}
    </div>
  );
}
