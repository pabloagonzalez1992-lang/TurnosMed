import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export function errorMiddleware(error: ApiError, _req: Request, res: Response, _next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';

  res.status(status).json({
    status,
    message,
    code: status === 500 ? 'INTERNAL_SERVER_ERROR' : error.code || 'ERROR',
    details: []
  });
}
