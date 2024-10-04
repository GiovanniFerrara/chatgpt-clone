import { styled, Theme } from "@mui/material";
import { AppBar } from "@mui/material";

export const AppBarStyled = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));
