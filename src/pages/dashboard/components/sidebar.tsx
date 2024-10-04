import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DrawerStyled } from "./sidebar.styles";
import SidebarControl from "./sidebar-control";

interface SidebarProps {
  isMobile: boolean;
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  isDrawerOpen,
  handleDrawerToggle,
}) => {
  const drawerWidth = 240;

  const drawerContent = (
    <Box>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <SidebarControl handleDrawerToggle={handleDrawerToggle} />
      <List>
        <ListItem>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", marginLeft: 2 }}
          >
            Today
          </Typography>
        </ListItem>
        <ListItem disablePadding>
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            Chat 1
          </Typography>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {!isMobile && (
        <DrawerStyled variant="persistent" open={!isDrawerOpen}>
          {drawerContent}
        </DrawerStyled>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          aria-label="navigation drawer"
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
