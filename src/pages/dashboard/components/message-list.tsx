import React from "react";

import { MessagesContainer } from "./message-list.styles";
import { Message } from "../../../types/message";
import MessageBubble from "./message-bubble";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <MessagesContainer>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </MessagesContainer>
  );
};

export default MessageList;
