import { Router } from 'express';
import {
  preloadHandler,
  getAllHandler,
  postHandler,
  getListDetails,
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);
router.get('/FormatoRegistro', getListDetails);

export default router;
