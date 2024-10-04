import React from "react";
import { Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { AppBarStyled } from "./app-bar.styles";

interface AppBarComponentProps {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  isDrawerOpen,
  handleDrawerToggle,
}) => {
  return (
    <AppBarStyled position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle navigation drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Chat GPT
        </Typography>

        <IconButton
          color="inherit"
          aria-label="start new chat"
          edge="end"
          onClick={() => {}}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBarStyled>
  );
};

export default AppBarComponent;
