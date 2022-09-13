import { Router } from 'express';
import {
  preloadHandler,
  getHerramientasByIdLaboratory,
  getHandler,
  getAllHandler,
  postHandler,
  putHandler,
  deleteHandler,
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);
router.param('idHerramienta', preloadHandler);

router.route('/filtro/:id_laboratorio').get(getHerramientasByIdLaboratory);

router.route('/:idHerramienta').get(getHandler).put(deleteHandler);

router.route('/modificar/:idHerramienta').put(putHandler);

export default router;
