import React from "react";

import { MessagesContainer } from "./message-list.styles";
import { Message } from "../../../types/message";
import MessageBubble from "./message-bubble";
import AdaptiveCardRenderer from "../../../components/adaptive-card-renderer";

const mockCard = {
  type: "AdaptiveCard",
  version: "1.3",
  body: [
    {
      type: "TextBlock",
      text: "Here is an option for you:",
      weight: "bolder",
      size: "medium",
    },
    {
      type: "Input.ChoiceSet",
      id: "choice",
      style: "expanded",
      isMultiSelect: false,
      choices: [
        {
          title: "Option 1",
          value: "option1",
        },
        {
          title: "Option 2",
          value: "option2",
        },
      ],
    },
  ],
  actions: [
    {
      type: "Action.Submit",
      title: "Submit",
    },
  ],
};

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <MessagesContainer>
      {messages.map((message, index) => (
        //in case I messed up message ids
        <>
          <MessageBubble key={index} message={message} />
          {message.adaptiveCard && (
            <AdaptiveCardRenderer cardPayload={mockCard} />
          )}
        </>
      ))}
    </MessagesContainer>
  );
};

export default MessageList;
