import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
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
      "md": 960,
      "lg": 1280,
      "xl": 1920
    }
  },
  "direction": "ltr",
  "mixins": {
    "toolbar": {
      "minHeight": 56,
      "@media (min-width:0px) and (orientation: landscape)": {
        "minHeight": 48
      },
      "@media (min-width:600px)": {
        "minHeight": 64
      }
    }
  },
  "overrides": {},
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "type": "light",
    "primary": {
      "light": "#7986cb",
      "main": "#3f51b5",
      "dark": "#303f9f",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "#ff4081",
      "main": "#f50057",
      "dark": "#c51162",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#d5d5d5",
      "A200": "#aaaaaa",
      "A400": "#303030",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    },
    "divider": "rgba(0, 0, 0, 0.12)",
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "hover": "rgba(0, 0, 0, 0.08)",
      "hoverOpacity": 0.08,
      "selected": "rgba(0, 0, 0, 0.14)",
      "disabled": "rgba(0, 0, 0, 0.26)",
      "disabledBackground": "rgba(0, 0, 0, 0.12)"
    }
  },
  "props": {},
  "shadows": [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)"
  ],
  "typography": {
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "display4": {
      "fontSize": "7rem",
      "fontWeight": 300,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "letterSpacing": "-.04em",
      "lineHeight": "1.14286em",
      "marginLeft": "-.04em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "display3": {
      "fontSize": "3.5rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "letterSpacing": "-.02em",
      "lineHeight": "1.30357em",
      "marginLeft": "-.02em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "display2": {
      "fontSize": "2.8125rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.06667em",
      "marginLeft": "-.02em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "display1": {
      "fontSize": "2.125rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.20588em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "headline": {
      "fontSize": "1.5rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.35417em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "title": {
      "fontSize": "1.3125rem",
      "fontWeight": 500,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.16667em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "subheading": {
      "fontSize": "1rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.5em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "body2": {
      "fontSize": "0.875rem",
      "fontWeight": 500,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.71429em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "body1": {
      "fontSize": "0.875rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.46429em",
      "color": "rgba(0, 0, 0, 0.87)"
    },
    "caption": {
      "fontSize": "0.75rem",
      "fontWeight": 400,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "lineHeight": "1.375em",
      "color": "rgba(0, 0, 0, 0.54)"
    },
    "button": {
      "fontSize": "0.875rem",
      "textTransform": "uppercase",
      "fontWeight": 500,
      "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      "color": "rgba(0, 0, 0, 0.87)"
    }
  },
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
  "spacing": {
    "unit": 8
  },
  "zIndex": {
    "mobileStepper": 1000,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
});

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export { darkTheme, lightTheme }

const muiDefaultDarkTheme = {
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
}

const muiDefaultLightTheme = {
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