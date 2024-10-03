import { ErrorResponse } from "react-router-dom";

export type ToasterMessageType = string | null | undefined;


export type ToasterMessage = {
  condition: boolean;
  error?: string | ErrorResponse;
  message?: ToasterMessageType;
  type: "error" | "success";
};

export interface ToasterState {
  messages: ToasterMessage[];
}