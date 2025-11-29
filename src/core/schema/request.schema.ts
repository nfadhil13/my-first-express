import { ZodObject, ZodRawShape } from 'zod';
import { $strict } from 'zod/v4/core';

export type StrictZodObject = ZodObject<ZodRawShape, $strict>;
export type RequestSchema = {
  body?: StrictZodObject;
  query?: StrictZodObject;
  params?: StrictZodObject;
  headers?: StrictZodObject;
};
