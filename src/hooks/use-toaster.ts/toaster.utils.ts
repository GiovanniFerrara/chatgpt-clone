import { toast } from "react-toastify";
import { ToasterMessage, ToasterMessageType, ToasterState } from "./toaster.types";
import { pushByType } from "./use-toaster";


export const pushErrorToast = (message?: ToasterMessageType) => {
  return toast.error(
    message || "Something went wrong, please try again later",
  );
};

export const pushSuccessToast = (
  message?: ToasterMessageType
) => {
  return toast.success(message || "Successfully created");
};


export function pushMessagesToToaster(messages: ToasterMessage[]) {
  if (!messages.length) {
    return;
  }
  messages.forEach((message) => {
    const pushFunction = pushByType[message.type];
    pushFunction(message.message);
  });
}

export function getMessagesDiff(
  newState: ToasterState,
  oldState?: ToasterState
): ToasterMessage[] {
  const newMessages = [] as ToasterMessage[];
  if (!oldState || oldState?.messages?.length === 0) {
    return [];
  }

  newState.messages.forEach((message, i) => {
    if (
      oldState?.messages[i].condition !== newState.messages[i].condition &&
      newState.messages[i].condition === true
    ) {
      newMessages.push(message);
    }
  });

  return newMessages || [];
}