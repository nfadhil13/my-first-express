interface Response<T> {
  message?: string;
}

interface SuccessResponse<T> extends Response<T> {
  data?: T;
}

interface ErrorResponse<T> extends Response<T> {
  error?: any;
}

export { Response, SuccessResponse, ErrorResponse };
