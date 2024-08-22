import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiLightTheme = createTheme({ palette: { mode: 'light' } });
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';


export default function ChipDivider({ children, dividerComponent='', chipSize='small', styles={marginBottom: '1rem'} }) {
  const { colorMode } = useColorMode();
  const muiTheme = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;

  return (
    <ThemeProvider theme={muiTheme}>
      <Divider component={dividerComponent} sx={styles}>
        <Chip label={children} size={chipSize} />
      </Divider>
    </ThemeProvider>
  );
}