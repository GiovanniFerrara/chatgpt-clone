import React from "react";

import { MessagesContainer } from "./message-list.styles";
import { Message } from "../../../types/message";
import MessageBubble from "./message-bubble";
import AdaptiveCardRenderer from "../../../components/adaptive-card-renderer";
import { getCardStructure } from "../../../utils/get-adaptive-card-structure";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <MessagesContainer>
      {messages.map((message, index) => {
        const cardParsed = getCardStructure(message.adaptiveCard);

        return (
          <div key={index}>
            <MessageBubble key={index} message={message} />
            {message.adaptiveCard && cardParsed && (
              <AdaptiveCardRenderer cardPayload={cardParsed} />
            )}
          </div>
        );
      })}
    </MessagesContainer>
  );
};

export default MessageList;
