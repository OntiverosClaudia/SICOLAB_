import { Router } from 'express';
import {
  preloadHandler,
  getUserByCode,
  getHandler,
  getAllHandler,
  getAllUsersR2Handler,
  postHandler,
  putHandler,
  deleteHandler,
  authUser,
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.post('/auth', authUser);
router.get('/', getAllHandler);

router.get('/docentes', getAllUsersR2Handler);

router.param('CodigoInstitucional', getUserByCode);
router.route('/buscar/:CodigoInstitucional').get(getUserByCode);

router.param('idUsuario', preloadHandler);
router.route('/:idUsuario').get(getHandler).put(deleteHandler);
router.route('/modificar/:idUsuario').put(putHandler);

export default router;
