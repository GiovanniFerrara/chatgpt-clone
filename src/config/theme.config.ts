import '@fontsource/noto-sans/400.css'; 
import '@fontsource/noto-sans/500.css'; 
import '@fontsource/noto-sans/700.css'; 
import { createTheme, ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

const typography = {
  fontFamily: '"Noto Sans", sans-serif',
  h1: {
    fontWeight: 700,
  },
  h2: {
    fontWeight: 700,
  },
  h3: {
    fontWeight: 700,
  },
  body1: {
    fontWeight: 400,
    fontSize: "1rem",
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.875rem",
  },
  button: {
    textTransform: 'none',
  },
};

const themeCommon: ThemeOptions = {
  typography: {
    ...typography,
    button: {
      ...typography.button,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
}

const lightTheme = createTheme({
  ...themeCommon,
  palette: {
    mode: 'light',
    primary: {
      main: '#10A37F', 
    },
    secondary: {
      main: '#0F4C75', 
    },
    action: {
      hover: "#2F2F2F",
    },
    background: {
      default: '#F5F5F5', 
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#333333', 
      secondary: '#555555', 
    },
    divider: grey[300],
  },
});

const darkTheme = createTheme({
  ...themeCommon,
  palette: {
    mode: 'dark',
    primary: {
      main: '#10A37F', 
      light: "#2F2F2F",
    },
    secondary: {
      main: '#3c3c50', 
      light: "#B4B4B4",
    },
    action: {
      hover: "#2F2F2F",
    },
    background: {
      default: '#212121', 
      paper: '#171717', 
    },
    text: {
      primary: '#E0E0E0', 
      secondary: '#B0B0B0',
    },
    success: {
      main: '#B4B4B4',
    },
    divider: grey[700],
  },
});

export { lightTheme, darkTheme };
