import { Box, IconButton, List, Switch, Typography } from "@mui/material";
import SidebarControl from "./sidebar-control";
import CloseIcon from "@mui/icons-material/Close";
import { Thread, ThreadButton, ThreadName } from "./thread-item.styles";
import useLayout from "../../../hooks/use-layout.ts/use-layout";

interface DrawerContentProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  isMobile,
  handleDrawerToggle,
}) => {
  const { useDarkTheme, setUseDarkTheme } = useLayout();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <SidebarControl handleDrawerToggle={handleDrawerToggle} />
      <List sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Thread>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", marginLeft: 2 }}
          >
            Today
          </Typography>
        </Thread>
        <Thread disablePadding>
          <ThreadButton>
            <ThreadName>Chat 1</ThreadName>
          </ThreadButton>
        </Thread>
      </List>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography typography="body2">Dark Mode</Typography>
        <Switch
          checked={useDarkTheme}
          onChange={() => setUseDarkTheme(!useDarkTheme)}
          color="secondary"
        />
      </Box>
    </Box>
  );
};

export default DrawerContent;
