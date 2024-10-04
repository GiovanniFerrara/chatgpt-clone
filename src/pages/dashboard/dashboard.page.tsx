import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";

import AppBarComponent from "./components/app-bar";
import Sidebar from "./components/sidebar";
import MessageList from "./components/message-list";
import MessageInputArea from "./components/message-input-area";
import SidebarControl from "./components/sidebar-control";
import { Main, HeaderSpacer, ScrollableArea } from "./dashboard.page.styles";
import { Message } from "../../types/message";

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

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <AppBarComponent
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}

      <Sidebar
        isMobile={isMobile}
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {isDrawerOpen && (
        <SidebarControl handleDrawerToggle={handleDrawerToggle} tighten />
      )}

      <Main>
        <HeaderSpacer />
        <ScrollableArea>
          <Container maxWidth="md">
            <MessageList messages={messages} />
          </Container>
        </ScrollableArea>
        <Container sx={{ marginBottom: 2, position: "relative" }} maxWidth="md">
          <MessageInputArea
            messageText={messageText}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            handleSendMessage={handleSendMessage}
          />
        </Container>
      </Main>
    </Box>
  );
};

export default Dashboard;
