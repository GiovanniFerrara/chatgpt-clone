import { styled } from "@mui/material";
import { Box } from "@mui/material";

export const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(2),
}));

export const MessageBubbleStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: "75%",
  padding: theme.spacing(1.5, 2.5),
  backgroundColor: isUser ? theme.palette.primary.light : "inherit",
  borderRadius: "26px",
  fontSize: "1rem",
  wordBreak: "break-word",
}));

export const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50%",
  padding: theme.spacing(0.8),
  marginRight: theme.spacing(1),
}));
