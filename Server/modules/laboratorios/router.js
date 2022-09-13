import { Router } from 'express';
import {
  preloadHandler,
  getHandler,
  getAllHandler,
  postHandler,
  putHandler,
  deleteHandler,
  UseReport,
  UseReportNoGroup
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);
router.post('/reporte', UseReport);
router.post('/reporteDetallado', UseReportNoGroup);

router.param('idLaboratorio', preloadHandler);

router.route('/:idLaboratorio').get(getHandler).put(deleteHandler);
router.route('/modificar/:idLaboratorio').put(putHandler);

export default router;
