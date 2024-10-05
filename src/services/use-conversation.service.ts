import { useCallback } from "react";
import { useAsync } from "../utils/use-async";

// normally I'd use react-query here
// but I'm trying not to shoot to flies with a cannon
export const useConversation = () => {
  const data = useAsync<{ id: string }>();
  
  const run = useCallback(
    (id: string) => {
      const request = fetch(`http://localhost:5120/api/conversations/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json());
    
    data.run(request);
  }, [data]);

  return {
    ...data,
    run
  };
};
