import React from "react";
import { Drawer } from "@mui/material";
import { DrawerStyled } from "./sidebar.styles";
import DrawerContent from "./drawer-content";

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

  return (
    <>
      {!isMobile && (
        <DrawerStyled variant="persistent" open={!isDrawerOpen}>
          <DrawerContent
            isMobile={isMobile}
            handleDrawerToggle={handleDrawerToggle}
          />
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
          <DrawerContent
            isMobile={isMobile}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
