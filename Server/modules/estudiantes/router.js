import { Router } from 'express';
import {
  preloadHandler,
  getHandler,
  getAllHandler,
  postHandler,
  putHandler,
  deleteHandler,
  getEstudentByCode,
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);

router.param('NoControl', getEstudentByCode);
router.route('/buscar/:NoControl').get(getEstudentByCode);

router.param('idEstudiante', preloadHandler);
router.route('/:idEstudiante').get(getHandler).put(deleteHandler);
router.route('/modificar/:idEstudiante').put(putHandler);

export default router;
