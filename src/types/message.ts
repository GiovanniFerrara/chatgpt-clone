export interface Message {
  role: "user" | "assistant";
  content: string;
  adaptiveCard: { body: string } | null;
}