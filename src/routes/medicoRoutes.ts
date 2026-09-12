import { Router } from 'express';
import { MedicoController } from '../controllers/medicoController';

const router = Router();
const controller = new MedicoController();

router.get('/medicos', controller.list.bind(controller));
router.get('/medicos/:id', controller.getById.bind(controller));
router.post('/medicos', controller.create.bind(controller));
router.put('/medicos/:id', controller.update.bind(controller));
router.delete('/medicos/:id', controller.delete.bind(controller));

export default router;
