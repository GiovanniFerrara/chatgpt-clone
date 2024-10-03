import '@fontsource/noto-sans/400.css'; 
import '@fontsource/noto-sans/500.css'; 
import '@fontsource/noto-sans/700.css'; 
import { createTheme } from '@mui/material';
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
  },
  button: {
    textTransform: 'none',
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10A37F', 
    },
    secondary: {
      main: '#0F4C75', 
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
});


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10A37F', 
    },
    secondary: {
      main: '#3c3c50', 
    },
    background: {
      default: '#141414', 
      paper: '#282828', 
    },
    text: {
      primary: '#E0E0E0', 
      secondary: '#B0B0B0',
    },
    divider: grey[700],
  },
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
});



export { lightTheme, darkTheme };
