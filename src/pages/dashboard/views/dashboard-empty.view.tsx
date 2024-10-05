import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AppBarComponent from "../components/app-bar";
import Sidebar from "../components/sidebar";
import MessageList from "../components/message-list";
import MessageInputArea from "../components/message-input-area";
import SidebarControl from "../components/sidebar-control";
import { Main, HeaderSpacer, ScrollableArea } from "../dashboard.page.styles";
import useToaster from "../../../hooks/use-toaster.ts/use-toaster";
import { useCreateConversation } from "../../../services/use-create-conversation.service";

const DashboardMain: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    run: createNewConversation,
    data: createdConversationData,
    error: createConversationError,
    isLoading: isCreateConversationLoading,
    isSuccess: isCreateConversationSuccess,
    isError: isCreateConversationError,
  } = useCreateConversation();

  useToaster({
    messages: [
      {
        condition: isCreateConversationError,
        message: createConversationError?.message,
        type: "error",
      },
    ],
  });

  useEffect(() => {
    if (isCreateConversationSuccess) {
      navigate(`/dashboard/${createdConversationData?.id}`);
    }
  }, [createdConversationData?.id, isCreateConversationSuccess, navigate]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    createNewConversation(messageText);

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
            <MessageList messages={[]} />
          </Container>
        </ScrollableArea>
        <Container sx={{ marginBottom: 2, position: "relative" }} maxWidth="md">
          <MessageInputArea
            disabled={isCreateConversationLoading}
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

export default DashboardMain;
