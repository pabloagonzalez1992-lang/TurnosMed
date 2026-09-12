import { Request, Response } from 'express';

export class GeneralController {
  async hello(req: Request, res: Response): Promise<Response> {
    let status = 200;

    try {
      return res.status(status).json({
        status,
        message: 'Hello World from TurnosMed API',
        service: 'TurnosMed'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado.';
      return res.status(500).json({
        status: 500,
        message,
        code: 'INTERNAL_SERVER_ERROR',
        details: []
      });
    }
  }

  async notFound(req: Request, res: Response): Promise<Response> {
    let status = 404;

    try {
      return res.status(status).json({
        status,
        message: 'Ruta no encontrada.',
        code: 'NOT_FOUND',
        details: []
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado.';
      return res.status(500).json({
        status: 500,
        message,
        code: 'INTERNAL_SERVER_ERROR',
        details: []
      });
    }
  }
}
