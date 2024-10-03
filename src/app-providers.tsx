import CssBaseline from "@mui/material/CssBaseline";

import { darkTheme } from "./config";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function AppProviders({ children }: Props) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
