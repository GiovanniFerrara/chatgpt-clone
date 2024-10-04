import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";

import AppBarComponent from "./components/app-bar";
import Sidebar from "./components/sidebar";
import MessageList from "./components/message-list";
import MessageInputArea from "./components/message-input-area";
import SidebarControl from "./components/sidebar-control";
import { Main, HeaderSpacer, ScrollableArea } from "./dashboard.page.styles";
import { Message } from "../../types/message";
import { useAiChatCompletion } from "../../services/use-ai-chat-completion.service";
import useToaster from "../../hooks/use-toaster.ts/use-toaster";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { sendPrompt, response, error } = useAiChatCompletion();
  console.log({ error });

  useToaster({
    messages: [
      {
        condition: !!error,
        message: error,
        type: "error",
      },
    ],
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "user", content: "What is the weather like today?" },
    { id: 2, role: "assistant", content: "Great!" },
  ]);

  const [messageText, setMessageText] = useState("");
  const [assistantMessageId, setAssistantMessageId] = useState<number | null>(
    null
  );

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText.trim(),
    };

    // Assistant message with empty content
    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: "",
    };

    // Update messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      assistantMessage,
    ]);

    // Store assistant message ID for updates
    setAssistantMessageId(assistantMessage.id);

    // Send prompt
    sendPrompt(messageText);

    // Clear input
    setMessageText("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (assistantMessageId !== null && response) {
      // Update the content of the assistant message
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === assistantMessageId ? { ...msg, content: response } : msg
        )
      );
    }
  }, [response, assistantMessageId]);

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
