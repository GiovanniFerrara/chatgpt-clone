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
      {messages.map((message, index) => (
        //in case I messed up message ids
        <MessageBubble key={`${message.id} - ${index}`} message={message} />
      ))}
    </MessagesContainer>
  );
};

export default MessageList;
