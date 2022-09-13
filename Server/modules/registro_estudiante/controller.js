import Sequelize from 'sequelize';
import db from '../../database/database.js';
import { Console } from '../../utils/index.js';

const preloadHandler = (req, res, next, idRegistro) => {
  const { RegistroEstudiante } = db;
  RegistroEstudiante.findByPk(idRegistro)
    .then((registro) => {
      if (!registro) return res.sendStatus(404);

      if (registro.Activo === 0) return res.sendStatus(404);

      req.RegistroEstudiante = registro;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { RegistroEstudiante } = db;
  RegistroEstudiante.findAll()
    .then((registro) => res.send(registro))
    .catch(() => res.sendStatus(500));
};

const postHandler = (req, res) => {
  const { RegistroEstudiante, Estudiante } = db;
  const { id_registro, Estudiantes } = req.body;

  let tempEstudiantes = JSON.parse(Estudiantes);

  for (let index = 0; index < tempEstudiantes.length; index++) {
    const tempEstudiante = tempEstudiantes[index];
    Estudiante.findOne({
      where: {
        id_estudiante: tempEstudiante.id_estudiante,
        Activo: 1,
      },
    })
      .then((estudiante) => {
        if (!estudiante) return res.sendStatus(400);

        RegistroEstudiante.findOne({
          where: {
            id_estudiante: tempEstudiante.id_estudiante,
            id_registro: id_registro,
          },
        }).then((result) => {
          if (result) return res.sendStatus(404);

          RegistroEstudiante.create({
            id_registro,
            id_estudiante: tempEstudiante.id_estudiante,
            Hora: tempEstudiante.Hora,
          }).catch((error) => console.log(error));
        });
      })
      .catch(() => res.sendStatus(500));
  }

  res.sendStatus(200);
};

const getListDetails = async (req, res) => {
  const {
    Herramienta, //
    Registro,
    Laboratorio,
    Materia,
    Estudiante,
    Usuario,
    Clase,
  } = db;
  const tasks = await Registro.findAll({
    include: [
      {
        model: Estudiante,
        as: 'registro',
        attributes: [
          'id_estudiante',
          'Nombre',
          'Apellido',
          'NoControl',
          'Correo',
        ],
      },
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
          },
          {
            model: Materia,
            attributes: ['id_materia', 'NombreMateria', 'Clave'],
            include: [
              {
                model: Usuario,
                attributes: [
                  'id_usuario',
                  'Nombre',
                  'Apellido',
                  'CodigoInstitucional',
                  'Correo',
                ],
              },
            ],
          },
        ],
      },
      {
        model: Herramienta,
        as: 'registroHerramienta',
      },
    ],
    attributes: ['id_registro', 'Fecha', 'Observaciones'],
    order: [
      [Sequelize.literal('`registro->registro_estudiantes`.`Hora`'), 'ASC'],
    ],
  });
  res.send(tasks);
};

export { preloadHandler, getAllHandler, postHandler, getListDetails };
