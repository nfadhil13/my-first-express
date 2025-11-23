import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  console.log(`Incoming request : ${req.method} ${req.url} ${req.body}`);
  next();
};

export const responseLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Outcoming reqsponse : ${req.method} ${req.url} ${res.status}`);
  next();
};

export default {
  requestLogger,
  responseLogged: responseLogger,
};
