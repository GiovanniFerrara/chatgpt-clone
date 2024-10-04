export type ToasterMessageType = string | null | undefined;


export type ToasterMessage = {
  condition: boolean;
  error?: string;
  message?: ToasterMessageType;
  type: "error" | "success";
};

export interface ToasterState {
  messages: ToasterMessage[];
}