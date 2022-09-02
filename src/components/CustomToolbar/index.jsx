import * as React from 'react';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });
const muiLightTheme = createTheme({ palette: { mode: 'light' } });

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

export default function ExportCustomToolbar () {
	const { data, loading } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 4,
		maxColumns: 6,
	});

  const { colorMode } = useColorMode();
  const muiThemeToUse = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;
  const muiTheme = createTheme(muiThemeToUse);

  return (
    <ThemeProvider theme={muiTheme}>
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