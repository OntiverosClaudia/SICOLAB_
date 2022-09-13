import { Router } from 'express';
import { getAllHandler, postHandler } from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);

export default router;
