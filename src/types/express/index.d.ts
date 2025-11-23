import 'express';
import { ErrorResponse, SuccessResponse } from '../../response';

declare module 'express-serve-static-core' {
  interface Response {
    success<T>(response?: SuccessResponse<T>): this;
    error<T>(error?: ErrorResponse<T>): this;
  }
}
