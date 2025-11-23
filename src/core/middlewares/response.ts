import { NextFunction, Request, Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../models/response';

export const responseMiddleWare = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = function <T>({ data, message }: SuccessResponse<T>) {
    console.log('success', message, data);
    return res.json({
      message: message || 'SUCCESS',
      data,
    });
  };

  res.error = function <T>({ message, error }: ErrorResponse<T>) {
    console.log('error', message, error);
    return res.json({
      message: message || 'ERROR',
      error,
    });
  };

  next();
};
