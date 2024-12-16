interface SuccessResponse<T> {
  status: string;
  statusCode: number;
  message?: string;
  errors?: string[];
  data: T;
}

interface ErrorResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  errors: string[];
  data?: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse<T>;
