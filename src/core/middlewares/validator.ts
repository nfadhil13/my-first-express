import { ZodError, ZodObject, ZodRawShape } from 'zod';
import { RequestSchema } from '../schema/request.schema';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../models/apperror';
import { $ZodErrorMap, $ZodRawIssue } from 'zod/v4/core';

export const validatorMiddleware = <T>(schema?: RequestSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema?.body?.parse(req.body, {
        reportInput: true,
      });
      schema?.query?.parse(req.query);
      schema?.params?.parse(req.params);
      schema?.headers?.parse(req.headers);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new AppError('INVALID_REQUEST', 400, true, err.issues));
      }
      return next(new AppError('INVALID_REQUEST', 400, true, null));
    }
  };
};

export const zodErrorHandler = (err: ZodError) => {
  return err.issues.map((issue) => ({
    key: issue.path.join('.'),
    message: issue.message,
  }));
};

type parseWithSchemaType = {
  data: unknown;
  schema: ZodObject<ZodRawShape>;
  errorMessage: string;
};

const parseWithSchema = ({
  data,
  schema,
  errorMessage,
}: parseWithSchemaType) => {
  const errorMap: $ZodErrorMap = (issue: $ZodRawIssue) => {
    if (issue.code === 'unrecognized_keys') {
      return { message: errorMessage };
    }
    return undefined;
  };

  schema.parse(data, {
    error: errorMap,
  });
};
