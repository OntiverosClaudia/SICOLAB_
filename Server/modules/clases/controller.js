import { response } from 'express';
import db from '../../database/database.js';
import { Console } from '../../utils/index.js';
import { Usuario } from '../index.js';

const preloadHandler = (req, res, next, idClase) => {
  const { Clase } = db;
  Clase.findByPk(idClase)
    .then((response) => {
      if (!response) return res.sendStatus(404);

      if (response.Activo === 0) return res.sendStatus(404);

      req.Clase = response;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { Clase } = db;
  Clase.findAll({ where: { Activo: 1 } })
    .then((clases) => res.send(clases))
    .catch(() => res.sendStatus(500));
};

const getClasesByIdLaboratory = (req, res, id_laboratorio) => {
  const { Clase, Materia, Laboratorio, Usuario } = db;
  Clase.findAll({
    where: { Activo: 1, id_laboratorio: req.params.id_laboratorio },
    attributes: [
      'id_clase',
      'HoraInicio',
      'HoraFinal',
      'Dia',
      'Slot',
      'CustomID',
    ],
    include: [
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
      {
        model: Laboratorio,
        attributes: ['id_laboratorio', 'NombreLaboratorio', 'ClaveLaboratorio'],
      },
    ],
  })
    .then((clases) => res.send(clases))
    .catch(() => res.sendStatus(500));
};

const getClasesBySchedule = (req, res) => {
  const { Clase, Materia, Laboratorio } = db;
  Clase.findAll({
    where: {
      Activo: 1,
      id_laboratorio: req.params.id_laboratorio,
      id_materia: req.params.id_materia,
    },
    attributes: ['HoraInicio', 'HoraFinal', 'Dia'],
  })
    .then((clases) => {
      res.send(clases);
    })
    .catch(() => res.sendStatus(500));
};

const getDetailsEdit = async (req, res) => {
  const { Clase, Materia, Laboratorio, Usuario } = db;
  const Horas = await Clase.findAll({
    where: {
      Activo: 1,
      CustomID: req.params.CustomID,
    },
    attributes: ['id_clase', 'HoraInicio', 'HoraFinal', 'Dia'],
  });

  const Details = await Clase.findOne({
    where: {
      Activo: 1,
      CustomID: req.params.CustomID,
    },
    attributes: ['id_clase'],
    include: [
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
      {
        model: Laboratorio,
        attributes: ['id_laboratorio', 'NombreLaboratorio', 'ClaveLaboratorio'],
      },
    ],
  });

  res.send({ Horario: Horas, Clase: Details });
};

const postHandler = (req, res) => {
  const { Clase } = db;
  const {
    id_laboratorio,
    id_materia,
    HoraInicio,
    HoraFinal,
    Dia,
    SlotInicial,
    SlotFinal,
    CustomID,
  } = req.body;

  const Slot = SlotInicial + '-' + SlotFinal;

  let sucesionSlots = [];
  for (let i = parseInt(SlotInicial); i <= parseInt(SlotFinal); i++)
    sucesionSlots.push(parseInt(i));

  Clase.findAll({
    where: { Activo: 1, Dia: Dia, id_laboratorio: id_laboratorio },
  }).then((response) => {
    if (response.length === 0) {
      Clase.create({
        id_laboratorio,
        id_materia,
        HoraInicio,
        HoraFinal,
        Dia,
        Slot,
        CustomID,
      })
        .then((clase) => {
          return res.send(clase);
        })
        .catch(() => {
          return res.sendStatus(500).json({ status: false });
        });
    } else {
      let temp = false;

      response.map((clase, index) => {
        let tempSlot = clase.Slot.split('-');
        for (let i = parseInt(tempSlot[0]); i <= parseInt(tempSlot[1]); i++) {
          if (sucesionSlots.includes(parseInt(i))) temp = true;
        }
      });

      if (!temp) {
        Clase.create({
          id_laboratorio,
          id_materia,
          HoraInicio,
          HoraFinal,
          Dia,
          Slot,
          CustomID,
        })
          .then((ClaseActual) => {
            return res.send(ClaseActual);
          })
          .catch(() => {
            return res.sendStatus(500).json({ status: false });
          });
      } else {
        return res.status(203).json({ status: false });
      }
    }
  });
};

const deactivateHandler = async (req, res) => {
  const { Clase } = db;
  const [updatedRows] = await Clase.update(
    { Activo: 0 },
    { where: { CustomID: req.params.CustomID } }
  );
  if (updatedRows) return res.status(200).json({ status: true });
  else return res.status(203).json({ status: false });
};

const disableByLaboratory = async (req, res) => {
  const { Clase } = db;
  const [updatedRows] = await Clase.update(
    { Activo: 0 },
    { where: { id_laboratorio: req.params.id_laboratorio } }
  );

  if (updatedRows) return res.status(200).json({ status: true });
  else return res.status(203).json({ status: false });
};

const putHandler = (req, res) => {
  const { Clase } = req;
  const {
    id_materia,
    id_laboratorio,
    HoraInicio,
    HoraFinal,
    Dia,
    SlotInicial,
    SlotFinal,
  } = req.body;

  if (id_materia) Clase.id_materia = id_materia;
  if (id_laboratorio) Clase.id_laboratorio = id_laboratorio;
  if (HoraInicio) Clase.HoraInicio = HoraInicio;
  if (HoraFinal) Clase.HoraFinal = HoraFinal;
  if (Dia) Clase.Dia = Dia;
  if (SlotInicial && SlotFinal) Clase.Slot = SlotInicial + '-' + SlotFinal;

  Clase.save()
    .then((updateClase) => res.send(updateClase))
    .catch((err) => res.send(err));
};

export {
  preloadHandler,
  getAllHandler,
  putHandler,
  getClasesByIdLaboratory,
  postHandler,
  getClasesBySchedule,
  getDetailsEdit,
  deactivateHandler,
  disableByLaboratory,
};
