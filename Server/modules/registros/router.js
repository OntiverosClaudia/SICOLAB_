import { Router } from 'express';
import {
  preloadHandler,
  getHandler,
  getAllHandler,
  postHandler,
  putHandler,
  deleteHandler,
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);
router.param('idRegistro', preloadHandler);

router.route('/:idRegistro').get(getHandler).put(deleteHandler);

router.route('/modificar/:idRegistro').put(putHandler);

export default router;
