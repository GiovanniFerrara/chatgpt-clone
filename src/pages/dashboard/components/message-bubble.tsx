import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  MessageContainer,
  MessageBubbleStyled,
  LogoBox,
} from "./message-bubble.styles";
import LogoSmall from "../../../assets/logo-small.svg?react";
import { Message } from "../../../types/message";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const theme = useTheme();
  const isUser = message.role === "user";

  return (
    <MessageContainer isUser={isUser}>
      <MessageBubbleStyled isUser={isUser}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isUser && (
            <LogoBox>
              <LogoSmall height={theme.spacing(2)} width={theme.spacing(2)} />
            </LogoBox>
          )}
          <Typography variant="body1">{message.content}</Typography>
        </Box>
      </MessageBubbleStyled>
    </MessageContainer>
  );
};

export default MessageBubble;
