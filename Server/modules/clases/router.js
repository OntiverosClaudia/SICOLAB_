import { Router } from 'express';
import {
  getAllHandler,
  postHandler,
  preloadHandler,
  putHandler,
  getClasesByIdLaboratory,
  getClasesBySchedule,
  getDetailsEdit,
  deactivateHandler,
  disableByLaboratory,
} from './controller.js';

const router = Router();
router.post('/', postHandler);
router.get('/', getAllHandler);
router.param('idClase', preloadHandler);

router.route('/horario/:id_laboratorio').get(getClasesByIdLaboratory);
router
  .route('/horarioMateria/:id_laboratorio/:id_materia')
  .get(getClasesBySchedule);
router.route('/detallesMateria/:CustomID').get(getDetailsEdit);
router.route('/modificar/:idClase').put(putHandler);

router.route('/eliminar/:CustomID').put(deactivateHandler);

router.route('/desactivar/:id_laboratorio').put(disableByLaboratory);

export default router;
