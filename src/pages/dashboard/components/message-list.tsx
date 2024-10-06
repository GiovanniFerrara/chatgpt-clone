import React from "react";

import { MessagesContainer } from "./message-list.styles";
import { Message } from "../../../types/message";
import MessageBubble from "./message-bubble";
import AdaptiveCardRenderer from "../../../components/adaptive-card-renderer";
import { getCardsStructure } from "../../../utils/get-adaptive-card-structure";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <MessagesContainer>
      {messages.map((message, index) => {
        const cardsParsed = getCardsStructure(message?.adaptiveCard);

        return (
          <div key={index}>
            <MessageBubble key={index} message={message} />
            {cardsParsed?.map((cardParsed, index) => (
              <AdaptiveCardRenderer key={index} cardPayload={cardParsed} />
            ))}
          </div>
        );
      })}
    </MessagesContainer>
  );
};

export default MessageList;
