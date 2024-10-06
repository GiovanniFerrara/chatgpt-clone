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
      {messages.map((message, parentIndex) => {
        const cardParsed = getCardStructure(message?.adaptiveCard);

        return (
          <div key={"list" + parentIndex}>
            <MessageBubble message={message} />
            {Array.isArray(cardParsed) ? (
              cardParsed.map((card, index) => (
                <AdaptiveCardRenderer key={"card" + index} cardPayload={card} />
              ))
            ) : cardParsed ? (
              <AdaptiveCardRenderer cardPayload={cardParsed} />
            ) : null}
          </div>
        );
      })}
    </MessagesContainer>
  );
};

export default MessageList;
