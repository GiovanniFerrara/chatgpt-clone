import React from "react";
import { Toolbar, IconButton, Typography, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AppBarStyled } from "./app-bar.styles";
import NewChatIcon from "../../../assets/new-chat-icon.svg?react";
import { useNavigate } from "react-router-dom";

interface AppBarComponentProps {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  isDrawerOpen,
  handleDrawerToggle,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

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

        <IconButton onClick={() => navigate("/dashboard")}>
          <NewChatIcon color={theme.palette.secondary.light} />
        </IconButton>
      </Toolbar>
    </AppBarStyled>
  );
};

export default AppBarComponent;
