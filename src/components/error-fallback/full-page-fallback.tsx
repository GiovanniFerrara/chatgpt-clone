import React from "react";
import { Button, Typography, Box } from "@mui/material";
import type { FallbackProps } from "react-error-boundary";

const FullPageFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h6" gutterBottom>
        Ops, there was an error with your request: {error.message}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Please consider that there are worse things than a broken app.
      </Typography>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
};

export default FullPageFallback;
