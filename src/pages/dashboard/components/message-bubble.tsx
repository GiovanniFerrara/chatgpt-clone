import React from "react";
import { Box, useTheme } from "@mui/material";
import ReactMarkdown from "react-markdown";
import {
  MessageContainer,
  MessageBubbleStyled,
  LogoBox,
} from "./message-bubble.styles";
import { Message } from "../../../types/message";
import LogoSmall from "../../../assets/logo-small.svg?react";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const theme = useTheme();
  const isUser = message.role === "user";

  return (
    <MessageContainer isUser={isUser}>
      <MessageBubbleStyled isUser={isUser}>
        <Box sx={{ display: "flex" }}>
          {!isUser && (
            <LogoBox>
              <LogoSmall height={theme.spacing(2)} width={theme.spacing(2)} />
            </LogoBox>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Box>
        </Box>
      </MessageBubbleStyled>
    </MessageContainer>
  );
};

export default MessageBubble;
