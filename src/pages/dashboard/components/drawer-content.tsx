import {
  Box,
  CircularProgress,
  IconButton,
  List,
  Switch,
  Typography,
} from "@mui/material";
import SidebarControl from "./sidebar-control";
import CloseIcon from "@mui/icons-material/Close";
import { Thread, ThreadButton, ThreadName } from "./thread-item.styles";
import useLayout from "../../../hooks/use-layout.ts/use-layout";
import { useConversations } from "../../../services/use-conversations.service";
import useToaster from "../../../hooks/use-toaster.ts/use-toaster";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, isToday, isYesterday, startOfDay } from "date-fns";

interface DrawerContentProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  isMobile,
  handleDrawerToggle,
}) => {
  const { useDarkTheme, setUseDarkTheme } = useLayout();
  const { data, isLoading, isError, error, run } = useConversations();
  const navigate = useNavigate();

  useEffect(() => {
    run();
  }, [run]);

  useToaster({
    messages: [
      {
        message: error?.message,
        condition: isError,
        type: "error",
      },
    ],
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleConversationClick = (id: string) => {
    navigate(`/dashboard/${id}`);
  };

  const groupedConversations = data?.reduce((acc, conversation) => {
    const conversationDate = new Date(conversation.createdAt);
    let period;

    if (isToday(conversationDate)) {
      period = "Today";
    } else if (isYesterday(conversationDate)) {
      period = "Yesterday";
    } else {
      period = format(startOfDay(conversationDate), "MMMM d / yyyy");
    }

    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(conversation);
    return acc;
  }, {} as Record<string, typeof data>);

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
        {groupedConversations &&
          Object.entries(groupedConversations).map(
            ([period, conversations]) => (
              <Box key={period}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.secondary", marginLeft: 2 }}
                >
                  {period}
                </Typography>
                {conversations.map((conversation) => (
                  <Thread key={conversation.id}>
                    <ThreadButton
                      onClick={() => handleConversationClick(conversation.id)}
                    >
                      <ThreadName>
                        {conversation.title ||
                          conversation.messages[0].content.slice(0, 25)}
                      </ThreadName>
                    </ThreadButton>
                  </Thread>
                ))}
              </Box>
            )
          )}
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
