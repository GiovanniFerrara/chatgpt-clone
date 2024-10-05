import { useCallback } from "react";
import { useAsync } from "../utils/use-async";
import { Conversation } from "../types/conversation.type";

// normally I'd use react-query here
// but I'm trying not to shoot to flies with a cannon
export const useConversations = () => {
  const {run: runAsync, ...rest} = useAsync<Conversation[]>();
  
  const run = useCallback(
    () => {
      const request = fetch(`http://localhost:5120/api/conversations`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json());
    
    runAsync(request);
  }, [runAsync]);

  return {
    ...rest,
    run
  };
};
