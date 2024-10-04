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
import { useCreateConversation } from "../../services/use-create-conversation.service";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { sendMessages, response, error, isLoading } = useAiChatCompletion();

  const { conversationId } = useParams();

  const navigate = useNavigate();

  const {
    run: createNewConversation,
    data,
    status,
    isSuccess: isCreateConversationSuccess,
    isError: isCreateConversationError,
    error: createConversationError,
  } = useCreateConversation();

  useEffect(() => {
    if (!conversationId && status === "idle") {
      createNewConversation();
    }
  }, [conversationId, createNewConversation, status]);

  useEffect(() => {
    if (isCreateConversationSuccess && data) {
      navigate(`/dashboard/${data.id}`);
    }
  }, [data, isCreateConversationSuccess, navigate]);

  useToaster({
    messages: [
      {
        condition: !!error,
        message: error,
        type: "error",
      },
      {
        condition: isCreateConversationError,
        message: createConversationError?.message,
        type: "error",
      },
    ],
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      // this generates a unique ID for the user message, just to keep track of the order
      id: messages.length + 1,
      role: "user",
      content: messageText.trim(),
    };

    // I provide an empty message in order to have the assistant message appear after the user message
    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: "",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      assistantMessage,
    ]);

    setAssistantMessageId(assistantMessage.id);

    const chatMessages = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        id: msg.id,
      })),
      { role: "user", content: messageText.trim() },
    ];

    if (data?.id) {
      sendMessages(data?.id, chatMessages as Message[]);
      setMessageText("");
    }
  };

  // accessibility ++
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (assistantMessageId !== null && response) {
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
            disabled={isLoading}
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
