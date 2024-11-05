import { useCallback } from "react";
import { useAsync } from "../utils/use-async";
import { Conversation } from "../types/conversation.type";

export const useConversation = () => {
  const { run: runAsync, ...rest } = useAsync<Conversation | null>();

  const run = useCallback(
    (id?: string) => {
      if (!id) {
        return runAsync(Promise.resolve(null));
      }

      const request = fetch(`${import.meta.env.VITE_BACKEND_URI}/api/conversations/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())

      return runAsync(request);
    },
    [runAsync]
  );

  return {
    ...rest,
    run,
  };
};
