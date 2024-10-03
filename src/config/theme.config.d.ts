// theme.d.ts

declare module '@mui/material/styles' {
  interface Theme {
    test: string; // Add your custom property
  }

  // Allow configuration using `createTheme`
  interface ThemeOptions {
    test?: string; // Optional when creating the theme
  }
}
