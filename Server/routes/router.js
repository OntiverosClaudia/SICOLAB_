import { Router } from 'express';

import {
  RolRouter,
  UsuarioRouter,
  EstudianteRouter,
  LaboratorioRouter,
  MateriaRouter,
  RegistroRouter,
  RegistroEstudianteRouter,
  ClasesRouter,
  HerramientaRouter,
  RegistroHerramientaRouter,
} from '../modules/index.js';

const router = Router();

router.use('/roles', RolRouter);
router.use('/usuarios', UsuarioRouter);
router.use('/estudiantes', EstudianteRouter);
router.use('/laboratorios', LaboratorioRouter);
router.use('/materias', MateriaRouter);
router.use('/registros', RegistroRouter);
router.use('/lista', RegistroEstudianteRouter);
router.use('/clases', ClasesRouter);
router.use('/registroHerramientas', RegistroHerramientaRouter);
router.use('/herramientas', HerramientaRouter);

export default router;
export { router };
