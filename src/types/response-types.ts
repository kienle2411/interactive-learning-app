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

export interface PaginateReponse<T> {
  data: T;
  lastPage: number;
  page: number;
  total: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse<T>;
