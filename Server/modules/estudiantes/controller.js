import db from '../../database/database.js';
import { Console } from '../../utils/index.js';

const preloadHandler = (req, res, next, idEstudiante) => {
  const { Estudiante } = db;
  Estudiante.findByPk(idEstudiante)
    .then((student) => {
      if (!student) return res.sendStatus(404);

      if (student.Activo === 0) return res.sendStatus(404);

      req.Estudiante = student;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { Estudiante } = db;
  Estudiante.findAll({ where: { Activo: 1, id_rol: 3 } })
    .then((estudiantes) => res.send(estudiantes))
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Estudiante } = req;
  res.send(Estudiante);
};

const postHandler = (req, res) => {
  const { Estudiante } = db;
  const { Nombre, Apellido, NoControl, Correo } = req.body;
  Estudiante.findOne({
    where: {
      NoControl: NoControl,
      Activo: 1,
    },
  }).then((result) => {
    if (result) return res.sendStatus(400);

    Estudiante.create({ Nombre, Apellido, NoControl, Correo, id_rol: 3 })
      .then((estudiante) => res.send(estudiante))
      .catch((error) => res.sendStatus(500));
  });
};

const putHandler = (req, res) => {
  const { Estudiante } = req;
  const { Nombre, Apellido, NoControl, Correo } = req.body;

  if (Nombre) Estudiante.Nombre = Nombre;
  if (Apellido) Estudiante.Apellido = Apellido;
  if (NoControl) Estudiante.NoControl = NoControl;
  if (Correo) Estudiante.Correo = Correo;

  Estudiante.save()
    .then((updateEstudiante) => res.send(updateEstudiante))
    .catch((err) => res.send(err));
};

const deleteHandler = (req, res) => {
  const { Estudiante } = req;

  Estudiante.Activo = 0;

  Estudiante.save()
    .then((updateEstudiante) => res.send(updateEstudiante))
    .catch((err) => res.send(err));
};

// Por NoControl
const getEstudentByCode = (req, res, next, NoControl) => {
  const { Estudiante } = db;
  Estudiante.findOne({
    where: {
      NoControl: NoControl,
      Activo: 1,
    },
  })
    .then((estudiante) => {
      if (!estudiante) return res.sendStatus(404);

      //req.Usuario = usuario;
      res.send(estudiante);
      return next();
    })
    .catch(() => res.sendStatus(500));
};

export {
  preloadHandler,
  getHandler,
  getAllHandler,
  putHandler,
  postHandler,
  deleteHandler,
  getEstudentByCode,
};
