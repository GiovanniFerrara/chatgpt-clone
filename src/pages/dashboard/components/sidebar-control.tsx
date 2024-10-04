import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import NewChatIcon from "../../../assets/new-chat-icon.svg?react";
import SidebarIcon from "../../../assets/sidebar-icon.svg?react";
import { NewChatBox } from "./sidebar-control.styles";

interface SidebarControlProps {
  tighten?: boolean;
  handleDrawerToggle: () => void;
}

const SidebarControl: React.FC<SidebarControlProps> = ({
  tighten,
  handleDrawerToggle,
}) => {
  const theme = useTheme();

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
        <IconButton>
          <NewChatIcon color={theme.palette.secondary.light} />
        </IconButton>
        <IconButton onClick={handleDrawerToggle}>
          <SidebarIcon color={theme.palette.secondary.light} />
        </IconButton>
      </NewChatBox>
    </Box>
  );
};

export default SidebarControl;
