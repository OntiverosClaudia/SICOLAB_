import db from '../../database/database.js';
import { Console } from '../../utils/index.js';
import { MateriaRouter } from '../index.js';

const preloadHandler = (req, res, next, idMateria) => {
  const { Materia } = db;
  Materia.findByPk(idMateria)
    .then((mat) => {
      if (!mat) return res.sendStatus(404);

      if (mat.Activo === 0) return res.sendStatus(404);

      req.Materia = mat;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

// Ver todo
const getAllHandler = (req, res) => {
  const { Materia, Usuario } = db;
  Materia.findAll({
    where: { Activo: 1 },
    include: [
      {
        model: Usuario,
        attributes: ['id_usuario', 'Nombre', 'Apellido', 'CodigoInstitucional'],
      },
    ],
  })
    .then((materias) => res.send(materias))
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Materia } = req;
  res.send(Materia);
};

// Crear
const postHandler = (req, res) => {
  const { Materia } = db;
  const { NombreMateria, Clave, id_usuario } = req.body;

  Materia.findOne({
    where: {
      Clave: Clave,
      Activo: 1,
    },
  }).then((result) => {
    if (result) return res.sendStatus(400);

    Materia.create({ NombreMateria, Clave, id_usuario })
      .then((materia) => res.send({ success: true, materia }))
      .catch(() => res.sendStatus(500));
  });
};

// Editar
const putHandler = (req, res) => {
  const { Materia } = req;
  const { NombreMateria, Clave, id_usuario } = req.body;

  if (NombreMateria) Materia.NombreMateria = NombreMateria;
  if (Clave) Materia.Clave = Clave;
  if (id_usuario) Materia.id_usuario = id_usuario;

  Materia.save()
    .then((materia) => res.send({ success: true, materia }))
    .catch((err) => res.send(err));
};

const deleteHandler = (req, res) => {
  const { Materia } = req;

  Materia.Activo = 0;

  Materia.save()
    .then((updateMateria) => res.send(updateMateria))
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
