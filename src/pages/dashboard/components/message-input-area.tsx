import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  InputArea,
  MessageInput,
  SendButton,
} from "./message-input-area.styles";
import ArrowUp from "@mui/icons-material/ArrowUpward";

interface MessageInputAreaProps {
  onSubmit: (messageText: string) => void;
  disabled: boolean;
}

const MessageInputArea: React.FC<MessageInputAreaProps> = ({
  disabled,
  onSubmit,
}) => {
  const [messageText, setMessageText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
    handleInputChange(e);
  };

  const handleSendMessage = () => {
    onSubmit(messageText);
    setMessageText("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit(messageText);
      setMessageText("");
    }
  };

  return (
    <>
      <InputArea>
        <MessageInput
          placeholder="Type your message..."
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          multiline
          inputProps={{ "aria-label": "message input" }}
        />
      </InputArea>
      <SendButton
        color="primary"
        disabled={disabled}
        variant="contained"
        onClick={handleSendMessage}
        aria-label="send message"
      >
        <ArrowUp color={"action"} />
      </SendButton>
    </>
  );
};

export default MessageInputArea;
