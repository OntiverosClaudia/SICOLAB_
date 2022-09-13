import db from '../../database/database.js';
import { Console } from '../../utils/index.js';

const preloadHandler = (req, res, next, idRol) => {
  const { Rol } = db;
  Rol.findByPk(idRol)
    .then((role) => {
      if (!role) return res.sendStatus(404);

      if (role.Activo === 0) return res.sendStatus(404);

      req.Rol = role;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { Rol } = db;
  Rol.findAll({ where: { Activo: 1 } })
    .then((roles) => res.send(roles))
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Rol } = req;
  res.send(Rol);
};

const postHandler = (req, res) => {
  const { Rol } = db;
  const { DescripcionRol } = req.body;
  Rol.create({ DescripcionRol })
    .then((rol) => res.send(rol))
    .catch(() => res.sendStatus(500));
};

const putHandler = (req, res) => {
  const { Rol } = req;
  const { DescripcionRol } = req.body;

  if (DescripcionRol) Rol.DescripcionRol = DescripcionRol;

  Rol.save()
    .then((updateRol) => res.send(updateRol))
    .catch((err) => res.send(err));
};

const deleteHandler = (req, res) => {
  const { Rol } = req;

  Rol.Activo = 0;

  Rol.save()
    .then((updateRol) => res.send(updateRol))
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
