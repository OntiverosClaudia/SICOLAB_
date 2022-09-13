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
router.param('idMateria', preloadHandler);

router.route('/:idMateria').get(getHandler).put(deleteHandler);

router.route('/modificar/:idMateria').put(putHandler);

export default router;
