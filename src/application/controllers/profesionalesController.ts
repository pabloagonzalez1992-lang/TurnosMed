import { Request, Response } from 'express';
import { profesionales, loadData } from '../../domain/services/dataService';

export class ProfesionalesController {
  async list(req: Request, res: Response): Promise<Response> {
    let status = 200;

    try {
      await loadData();

      const especialidad = typeof req.query.especialidad === 'string' ? req.query.especialidad.trim().toLowerCase() : undefined;
      const matricula = typeof req.query.matricula === 'string' ? req.query.matricula.trim() : undefined;

      if (especialidad && especialidad.length < 2) {
        status = 400;
        throw new Error('La especialidad ingresada es inválida.');
      }

      const filtered = profesionales.filter((profesional) => {
        const byEspecialidad = especialidad ? profesional.especialidad.toLowerCase() === especialidad : true;
        const byMatricula = matricula ? profesional.matricula.toLowerCase() === matricula.toLowerCase() : true;
        return byEspecialidad && byMatricula;
      });

      if (!filtered.length) {
        status = 404;
        throw new Error('No existen profesionales con esos filtros.');
      }

      return res.status(status).json({
        status,
        data: filtered,
        message: 'Profesionales obtenidos correctamente.'
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Error al consultar profesionales.';
      return res.status(status >= 200 && status < 600 ? status : 500).json({
        status: status >= 200 && status < 600 ? status : 500,
        message: err,
        code: status === 404 ? 'NOT_FOUND' : 'BAD_REQUEST',
        details: []
      });
    }
  }
}
