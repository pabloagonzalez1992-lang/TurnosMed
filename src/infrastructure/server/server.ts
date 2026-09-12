import express, { Request, Response } from 'express';
import { TurnosController } from '../../application/controllers/turnosController';
import { EspecialidadesController } from '../../application/controllers/especialidadesController';
import { ProfesionalesController } from '../../application/controllers/profesionalesController';
import { GeneralController } from '../../application/controllers/generalController';
import { loadData } from '../../domain/services/dataService';
import { errorMiddleware } from '../../middlewares/errorMiddleware';
import turnoRoutes from '../../routes/turnoRoutes';
import medicoRoutes from '../../routes/medicoRoutes';
import generalRoutes from '../../routes/generalRoutes';

const app = express();
const port = process.env.PORT || 3000;
const controller = new TurnosController();
const especialidadesController = new EspecialidadesController();
const profesionalesController = new ProfesionalesController();
const generalController = new GeneralController();

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  return res.json({ ok: true, service: 'turnos-medicos' });
});

app.get('/api/dashboard', async (req: Request, res: Response) => {
  return await controller.getDashboard(req, res);
});

app.get('/api/hello', async (req: Request, res: Response) => {
  return await generalController.hello(req, res);
});

app.get('/api/especialidades', async (req: Request, res: Response) => {
  return await especialidadesController.list(req, res);
});

app.get('/api/profesionales', async (req: Request, res: Response) => {
  return await profesionalesController.list(req, res);
});

app.use('/api', generalRoutes);
app.use('/api', turnoRoutes);
app.use('/api', medicoRoutes);

app.use(errorMiddleware);

async function start(): Promise<void> {
  await loadData();
  app.listen(port, () => {
    console.log(`Servidor TurnosMedicos ejecutándose en http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exit(1);
});
