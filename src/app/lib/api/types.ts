export type ApiErrorResponse = {
  error: { message: string }[];
  status?: string;
  statusCode?: number;
};

export class ApiError extends Error {
  status: number;
  details?: ApiErrorResponse;

  constructor(message: string, status: number, details?: ApiErrorResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}
