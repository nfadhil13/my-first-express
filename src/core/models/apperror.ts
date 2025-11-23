import { ErrorResponse } from './response';

export class AppError extends Error {
  public statusCode: number;
  public isKnown: boolean;
  public error: any;

  constructor(
    message: string,
    statusCode: number,
    isKnown: boolean,
    error: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isKnown = isKnown;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }

  toErrorResponse<T>(): ErrorResponse<T> {
    return {
      message: this.message,
      error: this.error,
    };
  }
}

export class InternalServerError extends AppError {
  constructor(error: any) {
    super('INTERNAL_SERVER_ERROR', 500, false, error);
  }
}
