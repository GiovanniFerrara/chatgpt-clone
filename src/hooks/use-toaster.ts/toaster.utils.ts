import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToasterMessage, ToasterMessageType, ToasterState } from "./toaster.types";
import { pushByType } from "./use-toaster";


export const pushErrorToast = (message?: ToasterMessageType) => {
  return toast.error(
    message || "Something went wrong, please try again later",
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
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
    pushByType[message.type](message.message);
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