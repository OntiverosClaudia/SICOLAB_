import db from '../../database/database.js';
import { Console } from '../../utils/index.js';

const preloadHandler = (req, res, next, idRegistro) => {
  const { Registro } = db;
  Registro.findByPk(idRegistro)
    .then((reg) => {
      if (!reg) return res.sendStatus(404);

      if (reg.Activo === 0) return res.sendStatus(404);

      req.Registro = reg;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { Registro } = db;
  Registro.findAll({ where: { Activo: 1 } })
    .then((registros) => res.send(registros))
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Registro } = req;
  res.send(Registro);
};

//
const postHandler = (req, res) => {
  const { Registro } = db;
  const { id_clase, Fecha, Observaciones } = req.body;
  Registro.create({ id_clase, Fecha, Observaciones })
    .then((registro) => res.send(registro))
    .catch(() => res.sendStatus(500));
};

const putHandler = (req, res) => {
  const { Registro } = req;
  const { id_clase, Fecha, Observaciones } = req.body;

  if (id_clase) Registro.id_clase = id_clase;
  if (Fecha) Registro.Fecha = Fecha;
  if (Observaciones) Registro.Observaciones = Observaciones;

  Registro.save()
    .then((updateRegistro) => res.send(updateRegistro))
    .catch((err) => res.send(err));
};

const deleteHandler = (req, res) => {
  const { Registro } = req;

  Registro.Activo = 0;

  Registro.save()
    .then((updateRegistro) => res.send(updateRegistro))
    .catch((err) => res.send(err));
};

export {
  preloadHandler,
  getHandler,
  getAllHandler,
  putHandler,
  postHandler,
  deleteHandler,
};
