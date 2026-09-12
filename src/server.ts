import express, { Request, Response } from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import turnoRoutes from './routes/turnoRoutes';
import medicoRoutes from './routes/medicoRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'turnos-medicos' });
});

app.use('/api', turnoRoutes);
app.use('/api', medicoRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor TurnosMedicos ejecutándose en http://localhost:${port}`);
});
