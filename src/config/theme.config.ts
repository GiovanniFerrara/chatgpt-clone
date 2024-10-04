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
      main: '#D7D7D7',
      light: '#F4F4F4',
    },
    secondary: {
      main: '#3c3c50',
      light: '#B4B4B4',
    },
    action: {
      hover: '#F7F7F8',
      selected: '#ECECF1',
     
    },
    background: {
      default: '#FFFFFF',
      paper: '#F7F7F8',
    },
    text: {
      primary: '#000000',
      secondary: '#6E6E80',
    },
    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
      contrastText: '#ffffff',
    },
    divider: '#E5E5E5',
    grey: {
      100: '#F7F7F8',
      200: '#ECECF1',
     
    },
   
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
  },
  typography: {
   
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
   
  },
  components: {
   
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
   
  },
});

export default lightTheme;


const darkTheme = createTheme({
  ...themeCommon,
  palette: {
    mode: 'dark',
    primary: {
      main: '#676767',
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
