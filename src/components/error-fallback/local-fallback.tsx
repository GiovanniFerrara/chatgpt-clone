import React from "react";
import { Button, Typography, Box } from "@mui/material";
import type { FallbackProps } from "react-error-boundary";

const LocalFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  console.error(error);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      <Typography variant="body1" gutterBottom>
        Ops, there was an error: {error.message}
      </Typography>
      <Typography variant="body2" gutterBottom>
        That's probably our fault, not yours.
      </Typography>
      <Button variant="contained" size="small" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
};

export default LocalFallback;
