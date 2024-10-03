import { useEffect, useRef } from "react";
import { getMessagesDiff, pushErrorToast, pushMessagesToToaster, pushSuccessToast } from "./toaster.utils";
import { ToasterState } from "./toaster.types";

export const pushByType = {
  error: pushErrorToast,
  success: pushSuccessToast,
};

const useToaster = (toasterState: ToasterState) => {
  const prevState = useRef<ToasterState>();

  useEffect(() => {
    const newMessages = getMessagesDiff(toasterState, prevState?.current);

    pushMessagesToToaster(newMessages);

    prevState.current = toasterState;
  }, [toasterState]);
};

export default useToaster;


