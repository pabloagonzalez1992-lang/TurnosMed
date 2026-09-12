import { Router } from 'express';
import { TurnoController } from '../controllers/turnoController';

const router = Router();
const controller = new TurnoController();

router.get('/turnos', controller.list.bind(controller));
router.get('/turnos/:id', controller.getById.bind(controller));
router.post('/turnos', controller.create.bind(controller));
router.put('/turnos/:id', controller.update.bind(controller));
router.delete('/turnos/:id', controller.delete.bind(controller));

export default router;
