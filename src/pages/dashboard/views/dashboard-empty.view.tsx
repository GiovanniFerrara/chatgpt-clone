import React, { useState, useEffect } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AppBarComponent from "../components/app-bar";
import Sidebar from "../components/sidebar";
import MessageInputArea from "../components/message-input-area";
import SidebarControl from "../components/sidebar-control";
import { Main, HeaderSpacer, ScrollableArea } from "../dashboard.page.styles";
import useToaster from "../../../hooks/use-toaster.ts/use-toaster";
import { useCreateConversation } from "../../../services/use-create-conversation.service";
import MessageTemplates from "../components/message-templates";

const DashboardMain: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleSendMessage = (textMessage: string) => {
    if (textMessage.trim() === "") {
      return;
    }

    createNewConversation(textMessage);
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
            <MessageTemplates submitTemplate={handleSendMessage} />
          </Container>
        </ScrollableArea>
        <Container sx={{ marginBottom: 2, position: "relative" }} maxWidth="md">
          <MessageInputArea
            disabled={isCreateConversationLoading}
            onSubmit={handleSendMessage}
          />
        </Container>
      </Main>
    </Box>
  );
};

export default DashboardMain;
