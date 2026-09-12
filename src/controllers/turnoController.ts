import { Request, Response, NextFunction } from 'express';
import { TurnoService } from '../services/turnoService';
import { TurnoSchema, TurnoUpdateSchema } from '../schemas/turno.schema';

const turnoService = new TurnoService();

export class TurnoController {
  list(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        especialidad: typeof req.query.especialidad === 'string' ? req.query.especialidad : undefined,
        fecha: typeof req.query.fecha === 'string' ? req.query.fecha : undefined,
        medicoId: typeof req.query.medicoId === 'string' ? Number(req.query.medicoId) : undefined
      };

      const turnos = turnoService.getAll(filters);
      res.status(200).json(turnos);
    } catch (error) {
      next(error);
    }
  }

  getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const turno = turnoService.getById(id);
      if (!turno) return res.status(404).json({ status: 404, message: 'Turno no encontrado', code: 'NOT_FOUND', details: [] });
      return res.status(200).json(turno);
    } catch (error) {
      return next(error);
    }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = TurnoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          status: 400,
          message: 'Error de validación en los datos ingresados',
          code: 'VALIDATION_ERROR',
          details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
        });
      }

      const turno = turnoService.create(parsed.data);
      return res.status(201).json(turno);
    } catch (error) {
      return next(error);
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = TurnoUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          status: 400,
          message: 'Error de validación en los datos ingresados',
          code: 'VALIDATION_ERROR',
          details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
        });
      }

      const turno = turnoService.update(Number(req.params.id), parsed.data);
      if (!turno) return res.status(404).json({ status: 404, message: 'Turno no encontrado', code: 'NOT_FOUND', details: [] });
      return res.status(200).json(turno);
    } catch (error) {
      return next(error);
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const removed = turnoService.delete(Number(req.params.id));
      if (!removed) return res.status(404).json({ status: 404, message: 'Turno no encontrado', code: 'NOT_FOUND', details: [] });
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
