// kinda of a expected error response type
export interface ErrorResponse {
  code: number;
  message: string;
  errorDetail: { error: string; message: string | string[]; status: number };
}
