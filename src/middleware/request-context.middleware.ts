import { NextFunction, Request, Response } from 'express';

export function RequestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  (global as any).requestContext = req;
  next();
};