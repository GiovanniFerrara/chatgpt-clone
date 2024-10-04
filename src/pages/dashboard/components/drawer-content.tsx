import { Box, IconButton, List, Typography } from "@mui/material";
import SidebarControl from "./sidebar-control";
import CloseIcon from "@mui/icons-material/Close";
import { Thread, ThreadButton, ThreadName } from "./thread-item.styles";

interface DrawerContentProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  isMobile,
  handleDrawerToggle,
}) => (
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
  </Box>
);

export default DrawerContent;
