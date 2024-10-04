import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import NewChatIcon from "../../../assets/new-chat-icon.svg?react";
import SidebarIcon from "../../../assets/sidebar-icon.svg?react";
import { NewChatBox } from "./sidebar-control.styles";
import { useNavigate } from "react-router-dom";

interface SidebarControlProps {
  tighten?: boolean;
  handleDrawerToggle: () => void;
}

const SidebarControl: React.FC<SidebarControlProps> = ({
  tighten,
  handleDrawerToggle,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        width: tighten ? theme.spacing(5) : "100%",
        position: tighten ? "absolute" : "relative",
      }}
    >
      <NewChatBox>
        <IconButton onClick={handleDrawerToggle}>
          <SidebarIcon color={theme.palette.secondary.light} />
        </IconButton>
        <IconButton onClick={() => navigate("/dashboard")}>
          <NewChatIcon color={theme.palette.secondary.light} />
        </IconButton>
      </NewChatBox>
    </Box>
  );
};

export default SidebarControl;
