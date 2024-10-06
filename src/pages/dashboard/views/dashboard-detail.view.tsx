import React, { useState, useEffect, useLayoutEffect } from "react";
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
  const { sendMessages, response, error, isLoading, abortGeneration } =
    useAiChatCompletion();
  const {
    data: existingConversationData,
    run: fetchConversationData,
    error: fetchConversationError,
    isLoading: isFetchConversationLoading,
    isError: isFetchConversationError,
    reset: resetFetchConversation,
  } = useConversation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  useLayoutEffect(() => {
    if (conversationId) {
      fetchConversationData(conversationId);
    }
    return () => {
      resetFetchConversation();
      abortGeneration();
      setMessages([]);
    };
  }, [
    fetchConversationData,
    conversationId,
    resetFetchConversation,
    abortGeneration,
  ]);

  // stores messages from existing conversations and triggers a ai completion when starting with the first user message
  useEffect(() => {
    if (!existingConversationData?.messages) {
      return;
    }

    const lastMessage =
      existingConversationData.messages[
        existingConversationData.messages.length - 1
      ];

    if (
      existingConversationData.messages.length === 1 &&
      lastMessage?.role === "user" &&
      conversationId === existingConversationData.id
    ) {
      setMessages(existingConversationData.messages);
      sendMessages(conversationId!, existingConversationData.messages);
    } else {
      setMessages(existingConversationData.messages);
    }
  }, [conversationId, existingConversationData, sendMessages]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
  };

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim() === "" || !conversationId) return;

    const userMessage: Message = {
      role: "user",
      content: messageText.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const chatMessages = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: messageText.trim() },
    ];

    sendMessages(conversationId, chatMessages as Message[]);
  };

  useEffect(() => {
    if (response) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];

        if (lastMessage && lastMessage.role === "assistant") {
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            content: response,
          };
        } else {
          updatedMessages.push({
            role: "assistant",
            content: response,
          });
        }

        return updatedMessages;
      });
    }
  }, [response]);

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
              onSubmit={handleSendMessage}
              disabled={isLoading}
            />
          </Container>
        </Main>
      )}
    </Box>
  );
};

export default DashboardConversation;
