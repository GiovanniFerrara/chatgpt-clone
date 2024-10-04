import React, { ChangeEvent, KeyboardEvent } from "react";
import {
  InputArea,
  MessageInput,
  SendButton,
} from "./message-input-area.styles";
import ArrowUp from "@mui/icons-material/ArrowUpward";

interface MessageInputAreaProps {
  messageText: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

const MessageInputArea: React.FC<MessageInputAreaProps> = ({
  messageText,
  handleInputChange,
  handleKeyPress,
  handleSendMessage,
}) => {
  return (
    <>
      <InputArea>
        <MessageInput
          placeholder="Type your message..."
          value={messageText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          multiline
          inputProps={{ "aria-label": "message input" }}
        />
      </InputArea>
      <SendButton
        color="secondary"
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
