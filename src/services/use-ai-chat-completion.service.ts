import { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types/message';

interface UseAiChatCompletionReturn {
  textResponse: string;
  isLoading: boolean;
  error: string | null;
  isResponseComplete: boolean;
  sendMessages: (conversationId: string, messages: Message[]) => void;
  abortGeneration: () => void;
  adaptiveCardResponse: string;
}

export const useAiChatCompletion = (): UseAiChatCompletionReturn => {
  const [textResponse, setTextResponse] = useState<string>('');
  const [adaptiveCardResponse, setAdaptiveCardResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isResponseComplete, setIsResponseComplete] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const openaiToken = sessionStorage.getItem("openai-token");

  const sendMessages = useCallback((conversationId:string, messages: Message[]) => {
    // Abort any ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    setTextResponse('');
    setAdaptiveCardResponse("");
    setIsLoading(true);
    setError(null);
    setIsResponseComplete(false);

    fetch('http://localhost:5120/api/chat-completion-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          "x-openai-token": openaiToken || '',
      },
      body: JSON.stringify({ messages, conversationId }),
      signal: controllerRef.current.signal,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || 'Unknown error');
          });
        }

        const reader = res.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder('utf-8');

        const stream = new ReadableStream({
          start(controller) {
            const pump = async () => {
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  const chunk = decoder.decode(value, { stream: true });
                  const lines = chunk.split('\n').filter((line) => line.trim() !== '');
                  for (const line of lines) {
                    if (line.startsWith('data: ')) {
                      const data = line.replace(/^data: /, '');
                      if (data === '[DONE]') {
                        controller.close();
                        setIsLoading(false);
                        setIsResponseComplete(true);
                        return;
                      }
                      try {
                        const parsed: Message = JSON.parse(data);

                        const text = parsed.content || '';

                          const adaptiveResponseString =
                            parsed.adaptiveCard || "";
                        setTextResponse((prev) => prev + text);
                        if(adaptiveResponseString) {
                            setAdaptiveCardResponse(adaptiveResponseString);
                        }
                      } catch (e) {
                        console.error('Error parsing JSON:', e);
                      }
                    }
                  }
                  controller.enqueue(value);
                }
                controller.close();
                setIsLoading(false);
                setIsResponseComplete(true);
              } catch (err: unknown) {
                if (!(err instanceof Error)) {
                  console.error('Unknown error:', err);
                  return;
                }
                if (err.name !== 'AbortError') {
                  console.error('Stream error:', err);
                  setError(err.message);
                  setIsLoading(false);
                }
              }
            };
            pump();
          },
        });

        return new Response(stream, { headers: { 'Content-Type': 'text/plain' } }).text();
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      });
    },
    []
  );

  const abortGeneration = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setIsLoading(false);
      setIsResponseComplete(true);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return { textResponse, adaptiveCardResponse, isLoading, error, isResponseComplete, sendMessages, abortGeneration };
};