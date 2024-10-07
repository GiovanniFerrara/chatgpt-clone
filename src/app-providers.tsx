import CssBaseline from "@mui/material/CssBaseline";

import { darkTheme, lightTheme } from "./config";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import LayoutProvider from "./context/layout-context/layout";
import useLayout from "./hooks/use-layout.ts/use-layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import FullPageFallback from "./components/error-fallback/full-page-fallback";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

// just a trick to be able to use the theme provider inside the layout context
const NestedAppProviders = ({ children }: Props) => {
  const { useDarkTheme } = useLayout();
  const [currentKey, setCurrentKey] = useState(new Date().getTime());

  const handleResetApp = () => {
    setCurrentKey(new Date().getTime());
  };

  return (
    <ErrorBoundary
      FallbackComponent={FullPageFallback}
      onReset={handleResetApp}
    >
      <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <ToastContainer />
        <Fragment key={currentKey}>{children}</Fragment>
      </ThemeProvider>
    </ErrorBoundary>
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
