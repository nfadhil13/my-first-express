import { NextFunction, Request, Response } from 'express';
import { AppError, InternalServerError } from '../models/apperror';

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.log('error', err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).error(err.toErrorResponse());
  }
  return res.status(500).error({
    message: 'INTERNAL_SERVER_ERROR',
  });
};

export const jsonParserErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).error({
      message: 'INVALID_JSON',
      error: err.message,
    });
  }
  next(err);
};
