import CssBaseline from "@mui/material/CssBaseline";

import { darkTheme, lightTheme } from "./config";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import LayoutProvider from "./context/layout-context/layout";
import useLayout from "./hooks/use-layout.ts/use-layout";

interface Props {
  children: React.ReactNode;
}

// just a trick to be able to use the theme provider inside the layout context
const NestedAppProviders = ({ children }: Props) => {
  const { useDarkTheme } = useLayout();
  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function AppProviders({ children }: Props) {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <NestedAppProviders>{children}</NestedAppProviders>
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
