import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  InputBase,
  Button,
  ListItemButton,
  Container,
  styled,
  useTheme,
  Theme,
  BoxProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUp from "@mui/icons-material/ArrowUpward";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoSmall from "../../assets/logo-small.svg?react";
import NewChatIcon from "../../assets/new-chat-icon.svg?react";
import SidebarIcon from "../../assets/sidebar-icon.svg?react";

const drawerWidth = 240;
interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const AppBarStyled = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerStyled = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    borderRight: "none",
  },
});

const Main = styled("main")(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  marginLeft: drawerWidth,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const HeaderSpacer = styled("div")(({ theme }: { theme: Theme }) => ({
  ...theme.mixins.toolbar,
}));

const MessagesContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const InputArea = styled("div")(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  maxHeight: theme.spacing(12),
  overflowY: "auto",
  borderRadius: "26px",
  position: "relative",
  backgroundColor: theme.palette.primary.light,
  margin: "auto",
}));

const MessageInput = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  fontSize: "1rem",
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
}));

const SendButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  minWidth: "40px",
  padding: theme.spacing(1),
  borderRadius: "50%",
  backgroundColor: "#676767",
  position: "absolute",
  bottom: theme.spacing(1),
  right: theme.spacing(4),
}));

const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(2),
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: "75%",
  padding: theme.spacing(1.5, 2.5),
  backgroundColor: isUser ? theme.palette.primary.light : "inherit",
  borderRadius: "26px",
  fontSize: "1rem",
  wordBreak: "break-word",
}));

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "user", text: "What is the weather like today?" },
    { id: 2, sender: "bot", text: "Great!" },
  ]);
  const [messageText, setMessageText] = useState("");

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: messageText.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const NewChatBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
  }));

  const Thread = styled(ListItem)(({ theme }) => ({
    margin: theme.spacing(1, "auto"),
    display: "flex",
    justifyContent: "flex-start",
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
  }));

  const ThreadButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
  }));

  const ScrollableArea = styled(Box)(() => ({
    flexGrow: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  }));

  const ThreadName = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontSize: theme.typography.body2.fontSize,
    marginRight: theme.spacing(1),
  }));

  const LogoBox = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "50%",
    padding: theme.spacing(0.8),
    marginRight: theme.spacing(1),
  }));

  const SidebarControl = ({ tighten }: { tighten?: boolean }) => {
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
      <SidebarControl />
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

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
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

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Chat GPT
            </Typography>

            <IconButton
              color="inherit"
              aria-label="start new chat"
              edge="end"
              //TODO add new chat
              onClick={() => {}}
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Toolbar>
        </AppBarStyled>
      )}

      {/* Drawer for Desktop */}
      {!isMobile && (
        <DrawerStyled variant="persistent" open={!isDrawerOpen}>
          {drawerContent}
        </DrawerStyled>
      )}

      {/* Drawer for Mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{}}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          aria-label="navigation drawer"
        >
          {drawerContent}
        </Drawer>
      )}

      {isDrawerOpen && <SidebarControl tighten />}
      <Main>
        <HeaderSpacer />
        <ScrollableArea>
          <Container maxWidth="md">
            <MessagesContainer>
              {messages.map((message) => (
                <MessageContainer
                  key={message.id}
                  isUser={message.sender === "user"}
                >
                  <MessageBubble isUser={message.sender === "user"}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {message.sender !== "user" && (
                        <LogoBox>
                          <LogoSmall
                            height={theme.spacing(2)}
                            width={theme.spacing(2)}
                          />
                        </LogoBox>
                      )}
                      <Typography variant="body1">{message.text}</Typography>
                    </Box>
                  </MessageBubble>
                </MessageContainer>
              ))}
            </MessagesContainer>
          </Container>
        </ScrollableArea>
        <Container sx={{ marginBottom: 2, position: "relative" }} maxWidth="md">
          <InputArea>
            <MessageInput
              placeholder="Type your message..."
              value={messageText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              multiline
              inputProps={{ "aria-label": "message input" }}
            />
          </InputArea>
          <SendButton
            color="secondary"
            variant="contained"
            onClick={handleSendMessage}
            aria-label="send message"
          >
            <ArrowUp color={"action"} />
          </SendButton>
        </Container>
      </Main>
    </Box>
  );
};

export default Dashboard;
