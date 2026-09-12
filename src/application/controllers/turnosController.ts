import { Request, Response } from 'express';
import { especialidades, profesionales, loadData } from '../../domain/services/dataService';
import { agendaConfig } from '../../infrastructure/config/agenda.config';

export class TurnosController {
  async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      await loadData();

      res.json({
        agendaConfig,
        totalEspecialidades: especialidades.length,
        totalProfesionales: profesionales.length,
        especialidades,
        profesionales
      });
    } catch (error) {
      res.status(500).json({ message: 'No se pudieron cargar los datos.', error });
    }
  }
}
