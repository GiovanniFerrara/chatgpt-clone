import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

import AppBarComponent from "../components/app-bar";
import Sidebar from "../components/sidebar";
import MessageList from "../components/message-list";
import MessageInputArea from "../components/message-input-area";
import SidebarControl from "../components/sidebar-control";
import { Main, HeaderSpacer, ScrollableArea } from "../dashboard.page.styles";
import { Message } from "../../../types/message";
import { useAiChatCompletion } from "../../../services/use-ai-chat-completion.service";
import { useConversation } from "../../../services/use-conversation.service";
import useToaster from "../../../hooks/use-toaster.ts/use-toaster";

const DashboardConversation: React.FC = () => {
  const { conversationId } = useParams<string>();
  const { sendMessages, response, error, isLoading } = useAiChatCompletion();
  const {
    data: existingConversationData,
    run: fetchConversationData,
    error: fetchConversationError,
    isLoading: isFetchConversationLoading,
    isError: isFetchConversationError,
  } = useConversation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [assistantMessageId, setAssistantMessageId] = useState<number | null>(
    null
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useToaster({
    messages: [
      {
        condition: !!error,
        message: error,
        type: "error",
      },
      {
        condition: isFetchConversationError,
        message: fetchConversationError?.message,
        type: "error",
      },
    ],
  });

  useEffect(() => {
    if (conversationId) {
      fetchConversationData(conversationId);
    }
  }, [fetchConversationData, conversationId]);

  useEffect(() => {
    if (existingConversationData && existingConversationData.messages) {
      const lastMessage =
        existingConversationData.messages[
          existingConversationData.messages.length - 1
        ];
      if (lastMessage && lastMessage.role === "user") {
        console.log("lastMessage", lastMessage);
        setMessages(existingConversationData.messages);
        sendMessages(conversationId!, existingConversationData.messages);
      } else {
        console.log(
          "existingConversationData.messages",
          existingConversationData.messages
        );
        setMessages(existingConversationData.messages);
      }
    }
  }, [conversationId, existingConversationData, sendMessages]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "" || !conversationId) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText.trim(),
    };

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

    sendMessages(conversationId, chatMessages as Message[]);
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

      {isFetchConversationLoading ? (
        <CircularProgress />
      ) : (
        <Main>
          <HeaderSpacer />
          <ScrollableArea>
            <Container maxWidth="md">
              <MessageList messages={messages} />
            </Container>
          </ScrollableArea>
          <Container
            sx={{ marginBottom: 2, position: "relative" }}
            maxWidth="md"
          >
            <MessageInputArea
              disabled={isLoading}
              messageText={messageText}
              handleInputChange={handleInputChange}
              handleKeyPress={handleKeyPress}
              handleSendMessage={handleSendMessage}
            />
          </Container>
        </Main>
      )}
    </Box>
  );
};

export default DashboardConversation;
