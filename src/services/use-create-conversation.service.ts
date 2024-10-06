import { useCallback } from "react";
import { useAsync } from "../utils/use-async";

// normally I'd use react-query here
// but I'm trying not to shoot to flies with a cannon
export const useCreateConversation = () => {
  const data = useAsync<{ id: string }>();
  
  const run = useCallback((userMessage: string) => {
    const request = fetch("http://localhost:5120/api/conversations", {
      method: "POST",
      body: JSON.stringify({ userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json()).catch((error) => {
      throw new Error(error);
    });;
    
    data.run(request);
  }, [data]);

  return {
    ...data,
    run
  };
};
