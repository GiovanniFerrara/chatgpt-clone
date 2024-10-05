import { Message } from "./message";

export interface Conversation {
  id: string;
  createdAt: string;
  title: string;
  messages: Message[];
}