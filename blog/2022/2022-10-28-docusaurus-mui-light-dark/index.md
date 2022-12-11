---
title: Synchronizing light and dark modes when using Material UI with Docusaurus
draft: false
description: This post details how to synchronize Material UI's light and dark palettes with Docusaurus's light and dark modes, respectively.
tags: [Light/Dark Mode, Theming, Material UI]
keywords: [material ui, theming, light mode, dark mode, docusaurus]
authors: [farlow]
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LocalVarSpan from '@site/src/components/LocalVarSpan';
import VerticalLinearStepper from '@site/src/components/VerticalLinearStepper';
import CodeBlock from '@theme/CodeBlock';

import DataGridBad from '@site/src/components/_IllustrationsOnly/DataGridBad';
import DataGridGood from '@site/src/components/_IllustrationsOnly/DataGridGood';

This post details how to synchronize Material UI's light and dark palettes with Docusaurus's light and dark modes, respectively.

<!--truncate-->

<details open><summary> TLDR</summary>

To get MUI to play nicely with Docusaurus when it comes to light and dark modes, paste the following code after your normal `import` statements for a React component within which you plan to utilize MUI functionality:

```jsx
import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiLightTheme = createTheme({ palette: { mode: 'light' } });
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });
```

Paste the following *between* the component function signature and its `return` statement:

```jsx
const { colorMode } = useColorMode();
const muiTheme = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;
```

Finally, wrap everything in the `return` statement within `ThemeProvider` in the following manner:

```jsx
...
return (
  <ThemeProvider theme={muiTheme}>
    ...
  </ThemeProvider>
);
```

</details>

## Problem description and context

Getting Material UI (MUI) to work with a site powered by Docusaurus may not seem to be all that difficult at first &#8212; you can plug and play and largely be happy to see MUI components behaving as expected. Unless you have light and dark modes enabled for your Docusaurus site (i.e., *most* Docusaurus sites). This can become a real problem.

For example, suppose we are interested in using MUI's [`DataGrid`](https://mui.com/x/react-data-grid/) component. If we copy the code for the very first example in the MUI docs for the `DataGrid` component, then we will get the default behavior as shown below in the first tab (toggle the light and dark modes for this site to *see* the problem). The default behavior, for this site at least, is that the data grid is perfectly fine in light mode, but it quickly becomes almost incomprehensible in dark mode. We need a solution that will produce the behavior illustrated below in the second tab (toggle the light and dark modes for this site again to note the difference).

<Tabs>
<TabItem value='good' label='Default behavior'>

<DataGridBad />

</TabItem>
<TabItem value='bad' label='Desired behavior'>

<DataGridGood />

</TabItem>
</Tabs>

## One of many possible solutions

There are *many* possible solutions to the problem outlined above. I will present a stunningly simple solution that has worked for me &#8212; if you feel you have a better solution, then please share!

The following code was lifted directly from MUI's docs for the `DataGrid` example above (default behavior):

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function SampleDataGrid() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
```

To get the desired behavior, we just need to make the following code changes (only highlighted lines have been changed):

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// highlight-start
import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiLightTheme = createTheme({ palette: { mode: 'light' } });
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });
// highlight-end

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function SampleDataGrid() {
  // highlight-start
  const { colorMode } = useColorMode();
  const muiTheme = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;
  // highlight-end
  return (
    // highlight-next-line
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    // highlight-next-line
    </ThemeProvider>
  );
}
```

## Refinements

An immediate objection you may have to the solution above is that the styling for all of your components that use MUI will be different from the styling of your site. This is true. As with nearly all development tasks, you have a tradeoff decision to make: simplicity at the cost of quality or quality at the cost of simplicity?

In the solution above, the default MUI light and dark themes are being used, respectively:

```jsx
const muiLightTheme = createTheme({ palette: { mode: 'light' } });
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });
```

How are these light and dark themes actually defined though? As [the MUI docs note](https://mui.com/material-ui/customization/palette/):

> The palette enables you to modify the color of the components to suit your brand.

The palette's default values may be found using MUI's [theme explorer](https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on the [default values page](https://mui.com/material-ui/customization/palette/#default-values) and exploring `window.theme.palette`. As noted on [MUI's dark mode page](https://mui.com/material-ui/customization/dark-mode/):

> You can make your application use the dark theme as the default—regardless of the user's preference—by adding `mode: 'dark'` to the `createTheme` helper:
> 
> ```jsx
> // highlight-next-line
> import { ThemeProvider, createTheme } from '@mui/material/styles';
> import CssBaseline from '@mui/material/CssBaseline';
> 
> // highlight-start
> const darkTheme = createTheme({
>   palette: {
>     mode: 'dark',
>   },
> });
> // highlight-end
> 
> function App() {
>   return (
>     // highlight-next-line
>     <ThemeProvider theme={darkTheme}>
>       <CssBaseline />
>       <main>This app is using the dark mode</main>
>     // highlight-next-line
>     </ThemeProvider>
>   );
> }
> 
> export default App;
> ```
> 
> Adding `mode: 'dark'` to the `createTheme` helper modifies several palette values [...].
> 
> Adding `<CssBaseline />` inside of the `<ThemeProvider>` component will also enable dark mode for the app's background.
> 
> **Note:** setting the dark mode this way only works if you are using [the default palette](https://mui.com/material-ui/customization/default-theme/). If you have a custom palette, make sure that you have the correct values based on the `mode`.  [...]

The takeaway from the excerpts above? We are only interested in using the default palettes for light and dark mode. Only the highlighted lines of code above are of any interest to us for the very simple solution. If you want to get fancy with your palettes, ostensibly to make MUI's light and dark modes match those of your Docusaurus site, then you may be in for a bit of work. MUI's default light and dark palettes are included below for reference in case you want to really customize things.

<details><summary> Light and dark palettes for Material UI (default values)</summary>

Visit [MUI's default theme page](https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette) and run the following in the console (assuming you are using Chrome):

```js
copy(JSON.stringify(window.theme.palette,null,2))
```

Run the code above *twice* (once for when you have chosen light mode on the default theme page and again for when you have chosen dark mode). The resultant values are shown in the first two tabs below. You can also run

```js
copy(JSON.stringify(window.theme,null,2))
```

to get the *complete* themes (shown in the last two tabs below).

<Tabs>
<TabItem value='light' label='Light palette'>

```json
{
  "mode": "light",
  "primary": {
    "50": "#F0F7FF",
    "100": "#C2E0FF",
    "200": "#99CCF3",
    "300": "#66B2FF",
    "400": "#3399FF",
    "500": "#007FFF",
    "600": "#0072E5",
    "700": "#0059B2",
    "800": "#004C99",
    "900": "#003A75",
    "main": "#007FFF",
    "light": "#66B2FF",
    "dark": "#0059B2",
    "contrastText": "#fff"
  },
  "divider": "#E7EBF0",
  "primaryDark": {
    "50": "#E2EDF8",
    "100": "#CEE0F3",
    "200": "#91B9E3",
    "300": "#5090D3",
    "400": "#265D97",
    "500": "#1E4976",
    "600": "#173A5E",
    "700": "#132F4C",
    "800": "#001E3C",
    "900": "#0A1929",
    "main": "#5090D3"
  },
  "common": {
    "black": "#1D1D1D",
    "white": "#fff"
  },
  "text": {
    "primary": "#1A2027",
    "secondary": "#3E5060",
    "disabled": "rgba(0, 0, 0, 0.38)",
    "primaryChannel": "0 0 0",
    "secondaryChannel": "0 0 0"
  },
  "grey": {
    "50": "#F3F6F9",
    "100": "#E7EBF0",
    "200": "#E0E3E7",
    "300": "#CDD2D7",
    "400": "#B2BAC2",
    "500": "#A0AAB4",
    "600": "#6F7E8C",
    "700": "#3E5060",
    "800": "#2D3843",
    "900": "#1A2027",
    "main": "#E7EBF0",
    "contrastText": "#6F7E8C",
    "A100": "#f5f5f5",
    "A200": "#eeeeee",
    "A400": "#bdbdbd",
    "A700": "#616161"
  },
  "error": {
    "50": "#FFF0F1",
    "100": "#FFDBDE",
    "200": "#FFBDC2",
    "300": "#FF99A2",
    "400": "#FF7A86",
    "500": "#FF505F",
    "600": "#EB0014",
    "700": "#C70011",
    "800": "#94000D",
    "900": "#570007",
    "main": "#EB0014",
    "light": "#FF99A2",
    "dark": "#C70011",
    "contrastText": "#fff"
  },
  "success": {
    "50": "#E9FBF0",
    "100": "#C6F6D9",
    "200": "#9AEFBC",
    "300": "#6AE79C",
    "400": "#3EE07F",
    "500": "#21CC66",
    "600": "#1DB45A",
    "700": "#1AA251",
    "800": "#178D46",
    "900": "#0F5C2E",
    "main": "#1AA251",
    "light": "#6AE79C",
    "dark": "#1AA251",
    "contrastText": "#fff"
  },
  "warning": {
    "50": "#FFF9EB",
    "100": "#FFF3C1",
    "200": "#FFECA1",
    "300": "#FFDC48",
    "400": "#F4C000",
    "500": "#DEA500",
    "600": "#D18E00",
    "700": "#AB6800",
    "800": "#8C5800",
    "900": "#5A3600",
    "main": "#DEA500",
    "light": "#FFDC48",
    "dark": "#AB6800",
    "contrastText": "rgba(0, 0, 0, 0.87)"
  },
  "secondary": {
    "main": "#9c27b0",
    "light": "#ba68c8",
    "dark": "#7b1fa2",
    "contrastText": "#fff"
  },
  "info": {
    "main": "#0288d1",
    "light": "#03a9f4",
    "dark": "#01579b",
    "contrastText": "#fff"
  },
  "contrastThreshold": 3,
  "tonalOffset": 0.2,
  "background": {
    "paper": "#fff",
    "default": "#fff"
  },
  "action": {
    "active": "rgba(0, 0, 0, 0.54)",
    "hover": "rgba(0, 0, 0, 0.04)",
    "hoverOpacity": 0.04,
    "selected": "rgba(0, 0, 0, 0.08)",
    "selectedOpacity": 0.08,
    "disabled": "rgba(0, 0, 0, 0.26)",
    "disabledBackground": "rgba(0, 0, 0, 0.12)",
    "disabledOpacity": 0.38,
    "focus": "rgba(0, 0, 0, 0.12)",
    "focusOpacity": 0.12,
    "activatedOpacity": 0.12,
    "activeChannel": "0 0 0",
    "selectedChannel": "0 0 0"
  }
}
```

</TabItem>
<TabItem value='dark' label='Dark palette'>

```json
{
  "mode": "dark",
  "primary": {
    "50": "#F0F7FF",
    "100": "#C2E0FF",
    "200": "#99CCF3",
    "300": "#66B2FF",
    "400": "#3399FF",
    "500": "#007FFF",
    "600": "#0072E5",
    "700": "#0059B2",
    "800": "#004C99",
    "900": "#003A75",
    "main": "#3399FF",
    "light": "#66B2FF",
    "dark": "#0059B2",
    "contrastText": "rgba(0, 0, 0, 0.87)"
  },
  "divider": "rgba(194, 224, 255, 0.08)",
  "primaryDark": {
    "50": "#E2EDF8",
    "100": "#CEE0F3",
    "200": "#91B9E3",
    "300": "#5090D3",
    "400": "#265D97",
    "500": "#1E4976",
    "600": "#173A5E",
    "700": "#132F4C",
    "800": "#001E3C",
    "900": "#0A1929",
    "main": "#5090D3"
  },
  "background": {
    "default": "#001E3C",
    "paper": "#0A1929"
  },
  "common": {
    "black": "#1D1D1D",
    "white": "#fff"
  },
  "text": {
    "primary": "#fff",
    "secondary": "#B2BAC2",
    "disabled": "rgba(255, 255, 255, 0.5)",
    "icon": "rgba(255, 255, 255, 0.5)"
  },
  "grey": {
    "50": "#F3F6F9",
    "100": "#E7EBF0",
    "200": "#E0E3E7",
    "300": "#CDD2D7",
    "400": "#B2BAC2",
    "500": "#A0AAB4",
    "600": "#6F7E8C",
    "700": "#3E5060",
    "800": "#2D3843",
    "900": "#1A2027",
    "main": "#132F4C",
    "contrastText": "#6F7E8C",
    "A100": "#f5f5f5",
    "A200": "#eeeeee",
    "A400": "#bdbdbd",
    "A700": "#616161"
  },
  "error": {
    "50": "#FFF0F1",
    "100": "#FFDBDE",
    "200": "#FFBDC2",
    "300": "#FF99A2",
    "400": "#FF7A86",
    "500": "#FF505F",
    "600": "#EB0014",
    "700": "#C70011",
    "800": "#94000D",
    "900": "#570007",
    "main": "#EB0014",
    "light": "#FF99A2",
    "dark": "#C70011",
    "contrastText": "#fff"
  },
  "success": {
    "50": "#E9FBF0",
    "100": "#C6F6D9",
    "200": "#9AEFBC",
    "300": "#6AE79C",
    "400": "#3EE07F",
    "500": "#21CC66",
    "600": "#1DB45A",
    "700": "#1AA251",
    "800": "#178D46",
    "900": "#0F5C2E",
    "main": "#1DB45A",
    "light": "#6AE79C",
    "dark": "#1AA251",
    "contrastText": "rgba(0, 0, 0, 0.87)"
  },
  "warning": {
    "50": "#FFF9EB",
    "100": "#FFF3C1",
    "200": "#FFECA1",
    "300": "#FFDC48",
    "400": "#F4C000",
    "500": "#DEA500",
    "600": "#D18E00",
    "700": "#AB6800",
    "800": "#8C5800",
    "900": "#5A3600",
    "main": "#DEA500",
    "light": "#FFDC48",
    "dark": "#AB6800",
    "contrastText": "rgba(0, 0, 0, 0.87)"
  },
  "secondary": {
    "main": "#ce93d8",
    "light": "#f3e5f5",
    "dark": "#ab47bc",
    "contrastText": "rgba(0, 0, 0, 0.87)"
  },
  "info": {
    "main": "#29b6f6",
    "light": "#4fc3f7",
    "dark": "#0288d1",
    "contrastText": "rgba(0, 0, 0, 0.87)"
  },
  "contrastThreshold": 3,
  "tonalOffset": 0.2,
  "action": {
    "active": "#fff",
    "hover": "rgba(255, 255, 255, 0.08)",
    "hoverOpacity": 0.08,
    "selected": "rgba(255, 255, 255, 0.16)",
    "selectedOpacity": 0.16,
    "disabled": "rgba(255, 255, 255, 0.3)",
    "disabledBackground": "rgba(255, 255, 255, 0.12)",
    "disabledOpacity": 0.38,
    "focus": "rgba(255, 255, 255, 0.12)",
    "focusOpacity": 0.12,
    "activatedOpacity": 0.24,
    "activeChannel": "255 255 255",
    "selectedChannel": "255 255 255"
  }
}
```

</TabItem>
<TabItem value='light-complete' label='Complete theme (light palette)'>

```json
{
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      }
    },
    "MuiButtonBase": {
      "defaultProps": {
        "disableTouchRipple": true
      }
    },
    "MuiButton": {
      "defaultProps": {
        "disableElevation": true
      },
      "styleOverrides": {},
      "variants": [
        {
          "props": {
            "variant": "code"
          }
        },
        {
          "props": {
            "variant": "link"
          }
        }
      ]
    },
    "MuiIconButton": {
      "variants": [
        {
          "props": {
            "color": "primary"
          }
        }
      ]
    },
    "MuiMenu": {
      "styleOverrides": {}
    },
    "MuiPopover": {
      "styleOverrides": {}
    },
    "MuiDivider": {
      "styleOverrides": {}
    },
    "MuiLink": {
      "defaultProps": {
        "underline": "none"
      },
      "styleOverrides": {}
    },
    "MuiChip": {
      "styleOverrides": {}
    },
    "MuiList": {
      "styleOverrides": {
        "root": {
          "padding": 0
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {}
    },
    "MuiSelect": {
      "defaultProps": {
        "IconComponent": {
          "type": {},
          "compare": null
        }
      },
      "styleOverrides": {
        "iconFilled": {
          "top": "calc(50% - .25em)"
        }
      }
    },
    "MuiTab": {
      "defaultProps": {
        "disableTouchRipple": true
      }
    },
    "MuiPaper": {
      "styleOverrides": {}
    },
    "MuiTableCell": {
      "styleOverrides": {}
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {}
    },
    "MuiToggleButton": {
      "styleOverrides": {}
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "padding": "5px 9px"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 32,
          "height": 20,
          "padding": 0,
          "& .MuiSwitch-switchBase": {
            "&.Mui-checked": {
              "transform": "translateX(11px)",
              "color": "#fff"
            }
          }
        },
        "switchBase": {
          "height": 20,
          "width": 20,
          "padding": 0,
          "color": "#fff",
          "&.Mui-checked + .MuiSwitch-track": {
            "opacity": 1
          }
        },
        "thumb": {
          "flexShrink": 0,
          "width": "14px",
          "height": "14px"
        }
      }
    },
    "MuiPaginationItem": {
      "styleOverrides": {}
    }
  },
  "palette": {
    "mode": "light",
    "primary": {
      "50": "#F0F7FF",
      "100": "#C2E0FF",
      "200": "#99CCF3",
      "300": "#66B2FF",
      "400": "#3399FF",
      "500": "#007FFF",
      "600": "#0072E5",
      "700": "#0059B2",
      "800": "#004C99",
      "900": "#003A75",
      "main": "#007FFF",
      "light": "#66B2FF",
      "dark": "#0059B2",
      "contrastText": "#fff"
    },
    "divider": "#E7EBF0",
    "primaryDark": {
      "50": "#E2EDF8",
      "100": "#CEE0F3",
      "200": "#91B9E3",
      "300": "#5090D3",
      "400": "#265D97",
      "500": "#1E4976",
      "600": "#173A5E",
      "700": "#132F4C",
      "800": "#001E3C",
      "900": "#0A1929",
      "main": "#5090D3"
    },
    "common": {
      "black": "#1D1D1D",
      "white": "#fff"
    },
    "text": {
      "primary": "#1A2027",
      "secondary": "#3E5060",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "primaryChannel": "0 0 0",
      "secondaryChannel": "0 0 0"
    },
    "grey": {
      "50": "#F3F6F9",
      "100": "#E7EBF0",
      "200": "#E0E3E7",
      "300": "#CDD2D7",
      "400": "#B2BAC2",
      "500": "#A0AAB4",
      "600": "#6F7E8C",
      "700": "#3E5060",
      "800": "#2D3843",
      "900": "#1A2027",
      "main": "#E7EBF0",
      "contrastText": "#6F7E8C",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "error": {
      "50": "#FFF0F1",
      "100": "#FFDBDE",
      "200": "#FFBDC2",
      "300": "#FF99A2",
      "400": "#FF7A86",
      "500": "#FF505F",
      "600": "#EB0014",
      "700": "#C70011",
      "800": "#94000D",
      "900": "#570007",
      "main": "#EB0014",
      "light": "#FF99A2",
      "dark": "#C70011",
      "contrastText": "#fff"
    },
    "success": {
      "50": "#E9FBF0",
      "100": "#C6F6D9",
      "200": "#9AEFBC",
      "300": "#6AE79C",
      "400": "#3EE07F",
      "500": "#21CC66",
      "600": "#1DB45A",
      "700": "#1AA251",
      "800": "#178D46",
      "900": "#0F5C2E",
      "main": "#1AA251",
      "light": "#6AE79C",
      "dark": "#1AA251",
      "contrastText": "#fff"
    },
    "warning": {
      "50": "#FFF9EB",
      "100": "#FFF3C1",
      "200": "#FFECA1",
      "300": "#FFDC48",
      "400": "#F4C000",
      "500": "#DEA500",
      "600": "#D18E00",
      "700": "#AB6800",
      "800": "#8C5800",
      "900": "#5A3600",
      "main": "#DEA500",
      "light": "#FFDC48",
      "dark": "#AB6800",
      "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "secondary": {
      "main": "#9c27b0",
      "light": "#ba68c8",
      "dark": "#7b1fa2",
      "contrastText": "#fff"
    },
    "info": {
      "main": "#0288d1",
      "light": "#03a9f4",
      "dark": "#01579b",
      "contrastText": "#fff"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "background": {
      "paper": "#fff",
      "default": "#fff"
    },
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.04)",
      "hoverOpacity": 0.04,
      "selected": "rgba(0, 0, 0, 0.08)",
      "selectedOpacity": 0.08,
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(0, 0, 0, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.12,
      "activeChannel": "0 0 0",
      "selectedChannel": "0 0 0"
    }
  },
  "shape": {
    "borderRadius": 10
  },
  "typography": {
    "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
    "fontFamilyCode": "Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace",
    "fontFamilyTagline": "\"PlusJakartaSans-ExtraBold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
    "fontFamilySystem": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
    "fontWeightSemiBold": 600,
    "fontWeightExtraBold": 800,
    "h1": {
      "fontFamily": "\"PlusJakartaSans-ExtraBold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      "fontWeight": 800,
      "lineHeight": 1.1142857142857143,
      "color": "#0A1929",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h2": {
      "fontFamily": "\"PlusJakartaSans-ExtraBold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      "fontWeight": 800,
      "lineHeight": 1.2222222222222223,
      "color": "#132F4C",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h3": {
      "fontFamily": "\"PlusJakartaSans-Bold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "2.25rem",
      "lineHeight": 1.2222222222222223,
      "letterSpacing": 0.2,
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h4": {
      "fontFamily": "\"PlusJakartaSans-Bold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "1.75rem",
      "lineHeight": 1.5,
      "letterSpacing": 0.2,
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h5": {
      "fontFamily": "\"PlusJakartaSans-Bold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "1.5rem",
      "lineHeight": 1.5,
      "letterSpacing": 0.1,
      "color": "#007FFF",
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h6": {
      "fontSize": "1.25rem",
      "lineHeight": 1.5,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 500,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "button": {
      "textTransform": "initial",
      "fontWeight": 700,
      "letterSpacing": 0,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "subtitle1": {
      "fontSize": "1.125rem",
      "lineHeight": 1.3333333333333333,
      "letterSpacing": 0,
      "fontWeight": 500,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "body1": {
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "body2": {
      "fontSize": "0.875rem",
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "caption": {
      "display": "inline-block",
      "fontSize": "0.75rem",
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "fontWeight": 700,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "allVariants": {
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "htmlFontSize": 16,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "subtitle2": {
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "overline": {
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "textTransform": "uppercase",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    }
  },
  "nprogress": {
    "color": "#007FFF"
  },
  "props": {
    "MuiBadge": {
      "overlap": "rectangular"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}
```

</TabItem>
<TabItem value='dark-complete' label='Complete theme (dark palette)'>

```json
{
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "direction": "ltr",
  "components": {
    "MuiCssBaseline": {
      "defaultProps": {
        "enableColorScheme": true
      }
    },
    "MuiButtonBase": {
      "defaultProps": {
        "disableTouchRipple": true
      }
    },
    "MuiButton": {
      "defaultProps": {
        "disableElevation": true
      },
      "styleOverrides": {},
      "variants": [
        {
          "props": {
            "variant": "code"
          }
        },
        {
          "props": {
            "variant": "link"
          }
        }
      ]
    },
    "MuiIconButton": {
      "variants": [
        {
          "props": {
            "color": "primary"
          }
        }
      ]
    },
    "MuiMenu": {
      "styleOverrides": {}
    },
    "MuiPopover": {
      "styleOverrides": {}
    },
    "MuiDivider": {
      "styleOverrides": {}
    },
    "MuiLink": {
      "defaultProps": {
        "underline": "none"
      },
      "styleOverrides": {}
    },
    "MuiChip": {
      "styleOverrides": {}
    },
    "MuiList": {
      "styleOverrides": {
        "root": {
          "padding": 0
        }
      }
    },
    "MuiListItemButton": {
      "styleOverrides": {}
    },
    "MuiSelect": {
      "defaultProps": {
        "IconComponent": {
          "type": {},
          "compare": null
        }
      },
      "styleOverrides": {
        "iconFilled": {
          "top": "calc(50% - .25em)"
        }
      }
    },
    "MuiTab": {
      "defaultProps": {
        "disableTouchRipple": true
      }
    },
    "MuiPaper": {
      "styleOverrides": {}
    },
    "MuiTableCell": {
      "styleOverrides": {}
    },
    "MuiToggleButtonGroup": {
      "styleOverrides": {}
    },
    "MuiToggleButton": {
      "styleOverrides": {}
    },
    "MuiTooltip": {
      "styleOverrides": {
        "tooltip": {
          "padding": "5px 9px"
        }
      }
    },
    "MuiSwitch": {
      "styleOverrides": {
        "root": {
          "width": 32,
          "height": 20,
          "padding": 0,
          "& .MuiSwitch-switchBase": {
            "&.Mui-checked": {
              "transform": "translateX(11px)",
              "color": "#fff"
            }
          }
        },
        "switchBase": {
          "height": 20,
          "width": 20,
          "padding": 0,
          "color": "#fff",
          "&.Mui-checked + .MuiSwitch-track": {
            "opacity": 1
          }
        },
        "thumb": {
          "flexShrink": 0,
          "width": "14px",
          "height": "14px"
        }
      }
    },
    "MuiPaginationItem": {
      "styleOverrides": {}
    }
  },
  "palette": {
    "mode": "dark",
    "primary": {
      "50": "#F0F7FF",
      "100": "#C2E0FF",
      "200": "#99CCF3",
      "300": "#66B2FF",
      "400": "#3399FF",
      "500": "#007FFF",
      "600": "#0072E5",
      "700": "#0059B2",
      "800": "#004C99",
      "900": "#003A75",
      "main": "#3399FF",
      "light": "#66B2FF",
      "dark": "#0059B2",
      "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "divider": "rgba(194, 224, 255, 0.08)",
    "primaryDark": {
      "50": "#E2EDF8",
      "100": "#CEE0F3",
      "200": "#91B9E3",
      "300": "#5090D3",
      "400": "#265D97",
      "500": "#1E4976",
      "600": "#173A5E",
      "700": "#132F4C",
      "800": "#001E3C",
      "900": "#0A1929",
      "main": "#5090D3"
    },
    "background": {
      "default": "#001E3C",
      "paper": "#0A1929"
    },
    "common": {
      "black": "#1D1D1D",
      "white": "#fff"
    },
    "text": {
      "primary": "#fff",
      "secondary": "#B2BAC2",
      "disabled": "rgba(255, 255, 255, 0.5)",
      "icon": "rgba(255, 255, 255, 0.5)",
      "primaryChannel": "255 255 255",
      "secondaryChannel": "255 255 255"
    },
    "grey": {
      "50": "#F3F6F9",
      "100": "#E7EBF0",
      "200": "#E0E3E7",
      "300": "#CDD2D7",
      "400": "#B2BAC2",
      "500": "#A0AAB4",
      "600": "#6F7E8C",
      "700": "#3E5060",
      "800": "#2D3843",
      "900": "#1A2027",
      "main": "#132F4C",
      "contrastText": "#6F7E8C",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "error": {
      "50": "#FFF0F1",
      "100": "#FFDBDE",
      "200": "#FFBDC2",
      "300": "#FF99A2",
      "400": "#FF7A86",
      "500": "#FF505F",
      "600": "#EB0014",
      "700": "#C70011",
      "800": "#94000D",
      "900": "#570007",
      "main": "#EB0014",
      "light": "#FF99A2",
      "dark": "#C70011",
      "contrastText": "#fff"
    },
    "success": {
      "50": "#E9FBF0",
      "100": "#C6F6D9",
      "200": "#9AEFBC",
      "300": "#6AE79C",
      "400": "#3EE07F",
      "500": "#21CC66",
      "600": "#1DB45A",
      "700": "#1AA251",
      "800": "#178D46",
      "900": "#0F5C2E",
      "main": "#1DB45A",
      "light": "#6AE79C",
      "dark": "#1AA251",
      "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "warning": {
      "50": "#FFF9EB",
      "100": "#FFF3C1",
      "200": "#FFECA1",
      "300": "#FFDC48",
      "400": "#F4C000",
      "500": "#DEA500",
      "600": "#D18E00",
      "700": "#AB6800",
      "800": "#8C5800",
      "900": "#5A3600",
      "main": "#DEA500",
      "light": "#FFDC48",
      "dark": "#AB6800",
      "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "secondary": {
      "main": "#ce93d8",
      "light": "#f3e5f5",
      "dark": "#ab47bc",
      "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "info": {
      "main": "#29b6f6",
      "light": "#4fc3f7",
      "dark": "#0288d1",
      "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "action": {
      "active": "#fff",
      "hover": "rgba(255, 255, 255, 0.08)",
      "hoverOpacity": 0.08,
      "selected": "rgba(255, 255, 255, 0.16)",
      "selectedOpacity": 0.16,
      "disabled": "rgba(255, 255, 255, 0.3)",
      "disabledBackground": "rgba(255, 255, 255, 0.12)",
      "disabledOpacity": 0.38,
      "focus": "rgba(255, 255, 255, 0.12)",
      "focusOpacity": 0.12,
      "activatedOpacity": 0.24,
      "activeChannel": "255 255 255",
      "selectedChannel": "255 255 255"
    }
  },
  "shape": {
    "borderRadius": 10
  },
  "typography": {
    "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
    "fontFamilyCode": "Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace",
    "fontFamilyTagline": "\"PlusJakartaSans-ExtraBold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
    "fontFamilySystem": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
    "fontWeightSemiBold": 600,
    "fontWeightExtraBold": 800,
    "h1": {
      "fontFamily": "\"PlusJakartaSans-ExtraBold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      "fontWeight": 800,
      "lineHeight": 1.1142857142857143,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h2": {
      "fontFamily": "\"PlusJakartaSans-ExtraBold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      "fontWeight": 800,
      "lineHeight": 1.2222222222222223,
      "color": "#E7EBF0",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h3": {
      "fontFamily": "\"PlusJakartaSans-Bold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "2.25rem",
      "lineHeight": 1.2222222222222223,
      "letterSpacing": 0.2,
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h4": {
      "fontFamily": "\"PlusJakartaSans-Bold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "1.75rem",
      "lineHeight": 1.5,
      "letterSpacing": 0.2,
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h5": {
      "fontFamily": "\"PlusJakartaSans-Bold\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "1.5rem",
      "lineHeight": 1.5,
      "letterSpacing": 0.1,
      "color": "#66B2FF",
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "h6": {
      "fontSize": "1.25rem",
      "lineHeight": 1.5,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 500,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "button": {
      "textTransform": "initial",
      "fontWeight": 700,
      "letterSpacing": 0,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontSize": "0.875rem",
      "lineHeight": 1.75,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "subtitle1": {
      "fontSize": "1.125rem",
      "lineHeight": 1.3333333333333333,
      "letterSpacing": 0,
      "fontWeight": 500,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "body1": {
      "fontSize": "1rem",
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "body2": {
      "fontSize": "0.875rem",
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 400,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "caption": {
      "display": "inline-block",
      "fontSize": "0.75rem",
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "fontWeight": 700,
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "allVariants": {
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "htmlFontSize": 16,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "subtitle2": {
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 500,
      "fontSize": "0.875rem",
      "lineHeight": 1.57,
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    },
    "overline": {
      "fontFamily": "\"IBM Plex Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"",
      "fontWeight": 400,
      "fontSize": "0.75rem",
      "lineHeight": 2.66,
      "textTransform": "uppercase",
      "scrollMarginTop": "calc(var(--MuiDocs-header-height) + 32px)"
    }
  },
  "nprogress": {
    "color": "#3399FF"
  },
  "props": {
    "MuiBadge": {
      "overlap": "rectangular"
    }
  },
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          "minHeight": 48
        }
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "shadows": [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "fab": 1050,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
}
```

</TabItem>
</Tabs>

</details>

Customize at your own risk!
