import { useCallback } from "react";
import { useAsync } from "../utils/use-async";

// normally I'd use react-query here
// but I'm trying not to shoot to flies with a cannon

export const useCreateConversation = () => {
  const data = useAsync<{ id: string }>();
  
  const run = useCallback(() => {
    const request = fetch("http://localhost:5120/api/conversations", {
      method: "POST",
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
