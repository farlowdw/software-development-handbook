import * as React from 'react';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../mui-theme';
import { useColorMode } from '@docusaurus/theme-common';

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

export default function ExportCustomToolbar() {
	const { data, loading } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 4,
		maxColumns: 6,
	});

	const { colorMode } = useColorMode();
	const themeToUse = colorMode === 'dark' ? darkTheme : lightTheme;
	const theme = createTheme(themeToUse);

	return (
		<ThemeProvider theme={theme}>
			<div style={{ height: 300, width: '100%' }}>
				<DataGrid
					{...data}
					loading={loading}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</div>
		</ThemeProvider>
	);
}
