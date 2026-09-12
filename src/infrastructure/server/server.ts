import express, { Request, Response } from 'express';
import { TurnosController } from '../../application/controllers/turnosController';
import { loadData } from '../../domain/services/dataService';

const app = express();
const port = process.env.PORT || 3000;
const controller = new TurnosController();

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'turnos-medicos' });
});

app.get('/api/dashboard', async (req: Request, res: Response) => {
  await controller.getDashboard(req, res);
});

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
