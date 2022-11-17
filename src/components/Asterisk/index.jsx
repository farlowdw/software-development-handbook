import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { useColorMode } from '@docusaurus/theme-common';

/**
 *
 * @param {string} cursor Symbol to be used when hovering over the asterisk
 * @param {string} symbol Symbol to be used as asterisk
 */
export default function Asterisk({
	// symbol to be used as asterisk
  cursor = 'help',
	symbol = '[*]',
	children = '',
}) {
  const { colorMode } = useColorMode();
	return (
		<Tooltip
			title={children}
			placement="top"
			arrow
			componentsProps={{
				tooltip: {
					sx: {
						color: '#E3E3E3',
						backgroundColor: 'rgba(109, 109, 109, 1)',
					},
				},
			}}>
			<span style={{cursor, verticalAlign: 'super', marginLeft: '1px', fontSize: '0.65em'}}><Link color={colorMode == 'dark' ? '#48adf6' : '#0676c8'}>{symbol}</Link></span>
		</Tooltip>
	);
}
