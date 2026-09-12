import { Request, Response } from 'express';
import { especialidades, loadData } from '../../domain/services/dataService';

export class EspecialidadesController {
  async list(req: Request, res: Response): Promise<Response> {
    let status = 200;

    try {
      await loadData();

      if (!Array.isArray(especialidades) || especialidades.length === 0) {
        status = 404;
        throw new Error('No existen especialidades cargadas.');
      }

      return res.status(status).json({
        status,
        data: especialidades,
        message: 'Especialidades obtenidas correctamente.'
      });
    } catch (error) {
      status = 500;
      const message = error instanceof Error ? error.message : 'Error al consultar especialidades.';
      return res.status(status).json({
        status,
        message,
        code: 'INTERNAL_SERVER_ERROR',
        details: []
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    let status = 200;

    try {
      await loadData();

      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        status = 400;
        throw new Error('El identificador de especialidad es inválido.');
      }

      const especialidad = especialidades[id - 1];
      if (!especialidad) {
        status = 404;
        throw new Error('Especialidad no encontrada.');
      }

      return res.status(status).json({
        status,
        data: especialidad,
        message: 'Especialidad obtenida correctamente.'
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Error al consultar especialidad.';
      return res.status(status >= 200 && status < 600 ? status : 500).json({
        status: status >= 200 && status < 600 ? status : 500,
        message: err,
        code: status === 404 ? 'NOT_FOUND' : 'BAD_REQUEST',
        details: []
      });
    }
  }
}
