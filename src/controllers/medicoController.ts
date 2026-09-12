import { Request, Response, NextFunction } from 'express';
import { MedicoService } from '../services/medicoService';
import { MedicoSchema, MedicoUpdateSchema } from '../schemas/medico.schema';

const medicoService = new MedicoService();

export class MedicoController {
  list(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        especialidad: typeof req.query.especialidad === 'string' ? req.query.especialidad : undefined,
        disponible: typeof req.query.disponible === 'string' ? req.query.disponible.toLowerCase() === 'true' : undefined
      };

      const medicos = medicoService.getAll(filters);
      return res.status(200).json(medicos);
    } catch (error) {
      return next(error);
    }
  }

  getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const medico = medicoService.getById(id);
      if (!medico) return res.status(404).json({ status: 404, message: 'Médico no encontrado', code: 'NOT_FOUND', details: [] });
      return res.status(200).json(medico);
    } catch (error) {
      return next(error);
    }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = MedicoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          status: 400,
          message: 'Error de validación en los datos ingresados',
          code: 'VALIDATION_ERROR',
          details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
        });
      }

      const medico = medicoService.create(parsed.data);
      return res.status(201).json(medico);
    } catch (error) {
      return next(error);
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = MedicoUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          status: 400,
          message: 'Error de validación en los datos ingresados',
          code: 'VALIDATION_ERROR',
          details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
        });
      }

      const medico = medicoService.update(Number(req.params.id), parsed.data);
      if (!medico) return res.status(404).json({ status: 404, message: 'Médico no encontrado', code: 'NOT_FOUND', details: [] });
      return res.status(200).json(medico);
    } catch (error) {
      return next(error);
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const removed = medicoService.delete(Number(req.params.id));
      if (!removed) return res.status(404).json({ status: 404, message: 'Médico no encontrado', code: 'NOT_FOUND', details: [] });
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
