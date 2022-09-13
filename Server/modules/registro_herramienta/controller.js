import db from '../../database/database.js';

const preloadHandler = (req, res, next, idRegistro) => {
  const { RegistroHerramienta } = db;
  RegistroHerramienta.findByPk(idRegistro)
    .then((registro) => {
      if (!registro) return res.sendStatus(404);

      if (registro.Activo === 0) return res.sendStatus(404);

      req.RegistroHerramienta = registro;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { RegistroHerramienta } = db;
  RegistroHerramienta.findAll()
    .then((registro) => res.send(registro))
    .catch(() => res.sendStatus(500));
};

const postHandler = (req, res) => {
  const { RegistroHerramienta, Herramienta } = db;
  const { id_registro, Herramientas } = req.body;

  let tempHerramientas = JSON.parse(Herramientas);

  for (let index = 0; index < tempHerramientas.length; index++) {
    const tempHerramienta = tempHerramientas[index];

    Herramienta.findOne({
      where: {
        id_herramienta: tempHerramienta.value,
        Activo: 1,
      },
    })
      .then((herramienta) => {
        if (!herramienta) return res.sendStatus(400);

        RegistroHerramienta.findOne({
          where: {
            id_herramienta: tempHerramienta.value,
            id_registro: id_registro,
          },
        }).then((result) => {
          if (result) return res.sendStatus(404);

          RegistroHerramienta.create({
            id_registro,
            id_herramienta: tempHerramienta.value,
          }).catch((error) => console.log(error));
        });
      })
      .catch((error) => res.sendStatus(error));
  }

  res.sendStatus(200);
};

export { preloadHandler, getAllHandler, postHandler };
