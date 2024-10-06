export interface Message {
  role: "user" | "assistant";
  content: string;
  adaptiveCard: { cardData: string } | null;
}