import { Router } from 'express';
import { GeneralController } from '../application/controllers/generalController';

const router = Router();
const controller = new GeneralController();

router.get('/hello', controller.hello.bind(controller));
router.use((req, res) => controller.notFound(req, res));

export default router;
