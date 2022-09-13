import db from '../../database/database.js';

const preloadHandler = (req, res, next, idHerramienta) => {
  const { Herramienta } = db;
  Herramienta.findByPk(idHerramienta)
    .then((herramienta) => {
      if (!herramienta) return res.sendStatus(404);

      if (herramienta.Activo === 0) return res.sendStatus(404);

      req.Herramienta = herramienta;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Herramienta } = req;
  res.send(Herramienta);
};

// Ver todo
const getAllHandler = (req, res) => {
  const { Herramienta, Laboratorio } = db;
  Herramienta.findAll({
    where: { Activo: 1 },
    attributes: ['id_herramienta', 'NombreHerramienta'],
    include: [
      {
        model: Laboratorio,
        attributes: ['id_laboratorio', 'NombreLaboratorio', 'ClaveLaboratorio'],
      },
    ],
  })
    .then((herramientas) => res.send(herramientas))
    .catch(() => res.sendStatus(500));
};

// Ver por Id de laboratorio
const getHerramientasByIdLaboratory = (req, res) => {
  const { Herramienta, Laboratorio } = db;
  Herramienta.findAll({
    where: { Activo: 1, id_laboratorio: req.params.id_laboratorio },
    attributes: ['id_herramienta', 'NombreHerramienta'],
    include: [
      {
        model: Laboratorio,
        attributes: ['id_laboratorio', 'NombreLaboratorio', 'ClaveLaboratorio'],
      },
    ],
  })
    .then((herramientas) => res.send(herramientas))
    .catch(() => res.sendStatus(500));
};

// Crear
const postHandler = (req, res) => {
  const { Herramienta } = db;
  const { NombreHerramienta, id_laboratorio } = req.body;

  Herramienta.create({ NombreHerramienta, id_laboratorio })
    .then((herramientas) => res.send({ success: true, response: herramientas }))
    .catch(() => res.sendStatus(500));
};

// Editar
const putHandler = (req, res) => {
  const { Herramienta } = req;
  const { NombreHerramienta, id_laboratorio } = req.body;

  if (NombreHerramienta) Herramienta.NombreHerramienta = NombreHerramienta;
  if (id_laboratorio) Herramienta.id_laboratorio = id_laboratorio;

  Herramienta.save()
    .then((herramientas) => res.send({ success: true, response: herramientas }))
    .catch((err) => res.send(err));
};

// Eliminar
const deleteHandler = (req, res) => {
  const { Herramienta } = req;

  Herramienta.Activo = 0;

  Herramienta.save()
    .then((updateHerramienta) => res.send(updateHerramienta))
    .catch((err) => res.send(err));
};

export {
  preloadHandler,
  getHerramientasByIdLaboratory,
  getHandler,
  getAllHandler,
  putHandler,
  postHandler,
  deleteHandler,
};
