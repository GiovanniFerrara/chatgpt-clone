import { styled, Theme } from "@mui/material";
import { Box } from "@mui/material";

export const MessagesContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));
