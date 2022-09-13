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
router.param('idRol', preloadHandler);

router.route('/:idRol').get(getHandler).put(deleteHandler);

router.route('/modificar/:idRol').put(putHandler);

export default router;
