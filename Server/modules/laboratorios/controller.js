import db from '../../database/database.js';
import Sequelize, { Op } from 'sequelize';

const preloadHandler = (req, res, next, idLaboratorio) => {
  const { Laboratorio } = db;
  Laboratorio.findByPk(idLaboratorio)
    .then((lab) => {
      if (!lab) return res.sendStatus(404);

      if (lab.Activo === 0) return res.sendStatus(404);

      req.Laboratorio = lab;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

// Ver todo
const getAllHandler = (req, res) => {
  const { Laboratorio } = db;
  Laboratorio.findAll({ where: { Activo: 1 } })
    .then((laboratorios) => res.send(laboratorios))
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Laboratorio } = req;
  res.send(Laboratorio);
};

// Crear
const postHandler = (req, res) => {
  const { Laboratorio } = db;
  const { NombreLaboratorio, ClaveLaboratorio } = req.body;

  Laboratorio.findOne({
    where: {
      ClaveLaboratorio: ClaveLaboratorio,
      Activo: 1,
    },
  }).then((result) => {
    if (result) return res.sendStatus(400);

    Laboratorio.create({ NombreLaboratorio, ClaveLaboratorio })
      .then((laboratorio) => res.send({ success: true, laboratorio }))
      .catch(() => res.sendStatus(500));
  });
};

// Editar
const putHandler = (req, res) => {
  const { Laboratorio } = req;
  const { NombreLaboratorio, ClaveLaboratorio } = req.body;

  if (NombreLaboratorio) Laboratorio.NombreLaboratorio = NombreLaboratorio;
  if (ClaveLaboratorio) Laboratorio.ClaveLaboratorio = ClaveLaboratorio;

  Laboratorio.save()
    .then((laboratorio) => res.send({ success: true, laboratorio }))
    .catch((err) => res.send(err));
};

const deleteHandler = (req, res) => {
  const { Laboratorio } = req;

  Laboratorio.Activo = 0;

  Laboratorio.save()
    .then((updateLaboratorio) => res.send(updateLaboratorio))
    .catch((err) => res.send(err));
};
// Reporte con clases agrupadas
const UseReport = async (req, res) => {
  const { Registro, Clase, Laboratorio, Materia, Usuario } = db;
  const { id_laboratorio, FechaInicial, FechaFinal } = req.body;

  let tempResult = [];

  const result = await Registro.findAll({
    attributes: [
      'id_clase',
      'Fecha',
      [Sequelize.fn('count', 'id_clase'), 'Uso'],
    ],
    where: {
      Fecha: { [Op.between]: [FechaInicial, FechaFinal] },
    },
    include: [
      {
        model: Clase,
        attributes: ['id_clase', 'HoraInicio', 'HoraFinal', 'Dia'],
        include: [
          {
            model: Laboratorio,
            attributes: [
              'id_laboratorio',
              'NombreLaboratorio',
              'ClaveLaboratorio',
            ],
            where: { id_laboratorio: id_laboratorio },
          },
          {
            model: Materia,
            attributes: ['id_materia', 'NombreMateria', 'Clave'],
            include: [
              //
              {
                model: Usuario,
                attributes: ['id_usuario', 'Nombre', 'Apellido'],
              },
            ], //
          },
        ],
      },
    ],
    group: ['id_clase'],
  });

  result.forEach((item) => {
    if (item.clase !== null) {
      tempResult.push(item);
    }
  });

  res.send(tempResult.length > 0 ? tempResult : false);
};

//Reporte con clases individuales
const UseReportNoGroup = async (req, res) => {
  const { Registro, Clase, Laboratorio, Materia, Usuario } = db;
  const { id_laboratorio, FechaInicial, FechaFinal } = req.body;

  let tempResult = [];

  const result = await Registro.findAll({
    attributes: ['id_clase', 'Fecha'],
    where: {
      Fecha: { [Op.between]: [FechaInicial, FechaFinal] },
    },
    include: [
      {
        model: Clase,
        attributes: ['id_clase', 'HoraInicio', 'HoraFinal', 'Dia'],
        include: [
          {
            model: Laboratorio,
            attributes: [
              'id_laboratorio',
              'NombreLaboratorio',
              'ClaveLaboratorio',
            ],
            where: { id_laboratorio: id_laboratorio },
          },
          {
            model: Materia,
            attributes: ['id_materia', 'NombreMateria', 'Clave'],
            include: [
              //
              {
                model: Usuario,
                attributes: ['id_usuario', 'Nombre', 'Apellido'],
              },
            ], //
          },
        ],
      },
    ],
  });

  result.forEach((item) => {
    if (item.clase !== null) {
      tempResult.push(item);
    }
  });

  res.send(tempResult.length > 0 ? tempResult : false);
};

export {
  preloadHandler,
  getHandler,
  getAllHandler,
  putHandler,
  postHandler,
  deleteHandler,
  UseReport,
  UseReportNoGroup,
};
