import db from '../../database/database.js';
import { Console } from '../../utils/index.js';
import bcrypt from 'bcrypt';

// Por idusuario
const preloadHandler = (req, res, next, idUsuario) => {
  const { Usuario } = db;
  Usuario.findByPk(idUsuario)
    .then((user) => {
      if (!user) return res.sendStatus(404);

      if (user.Activo === 0) return res.sendStatus(404);

      req.Usuario = user;
      return next();
    })
    .catch(() => res.sendStatus(500));
};

// Por CodigoInstitucional
const getUserByCode = (req, res, next, CodigoInstitucional) => {
  const { Usuario, Rol } = db;
  Usuario.findOne({
    include: { model: Rol, attributes: ['DescripcionRol'] },
    where: {
      CodigoInstitucional: CodigoInstitucional,
      Activo: 1,
    },
  })
    .then((usuario) => {
      if (!usuario) return res.sendStatus(404);

      //req.Usuario = usuario;
      res.send(usuario);
      return next();
    })
    .catch(() => res.sendStatus(500));
};

const getAllHandler = (req, res) => {
  const { Usuario, Rol } = db;
  Usuario.findAll({
    include: { model: Rol, attributes: ['DescripcionRol'] },
    where: { Activo: 1 },
  })
    .then((usuarios) => res.send(usuarios))
    .catch(() => res.sendStatus(500));
};

const getAllUsersR2Handler = (req, res) => {
  const { Usuario, Rol } = db;
  Usuario.findAll({
    include: { model: Rol, attributes: ['DescripcionRol'] },
    where: { Activo: 1, id_rol: 2 },
  })
    .then((usuarios) => res.send(usuarios))
    .catch(() => res.sendStatus(500));
};

const getHandler = (req, res) => {
  const { Usuario } = req;
  res.send(Usuario);
};

const authUser = (req, res) => {
  const { CodigoInstitucional, Contraseña } = req.body;
  const { Usuario } = db;

  Usuario.findOne({
    where: {
      CodigoInstitucional,
      Activo: 1,
    },
  })
    .then((usuario) => {
      if (!usuario) return res.sendStatus(404);

      if (bcrypt.compareSync(Contraseña, usuario.Contraseña)) res.send(usuario);
      else res.sendStatus(401);
    })
    .catch(() => res.sendStatus(500));
};

// Crear
const postHandler = (req, res) => {
  const { Usuario } = db;

  let { Nombre, Apellido, Correo, Contraseña, CodigoInstitucional, id_rol } =
    req.body;

  if (id_rol != 3) {
    Usuario.findOne({
      where: {
        CodigoInstitucional: CodigoInstitucional,
        Activo: 1,
      },
    }).then((result) => {
      if (result) return res.sendStatus(400);

      const hash = bcrypt.hashSync(Contraseña, 10);
      Contraseña = hash;

      Usuario.create({
        Nombre,
        Apellido,
        Correo,
        Contraseña,
        CodigoInstitucional,
        id_rol,
      })
        .then((usuario) => res.send({ success: true, usuario }))
        .catch((error) => res.sendStatus(500));
    });
  } else {
    res.sendStatus(203);
  }
};

// Editar
const putHandler = (req, res) => {
  const { Usuario } = req;
  const { Nombre, Apellido, Correo, Contraseña, CodigoInstitucional, id_rol } =
    req.body;

  if (Nombre) Usuario.Nombre = Nombre;
  if (Apellido) Usuario.Apellido = Apellido;
  if (Correo) Usuario.Correo = Correo;
  if (Contraseña) {
    const hash = bcrypt.hashSync(Contraseña, 10);
    Usuario.Contraseña = hash;
  }
  if (CodigoInstitucional) Usuario.CodigoInstitucional = CodigoInstitucional;
  if (id_rol) Usuario.id_rol = id_rol;

  Usuario.save()
    .then((usuario) => res.send({ success: true, usuario }))
    .catch((err) => res.send(err));
};

const deleteHandler = (req, res) => {
  const { Usuario } = req;

  Usuario.Activo = 0;

  Usuario.save()
    .then((updateUsuario) => res.send(updateUsuario))
    .catch((err) => res.send(err));
};

export {
  preloadHandler,
  getUserByCode,
  getHandler,
  getAllHandler,
  getAllUsersR2Handler,
  putHandler,
  postHandler,
  deleteHandler,
  authUser,
};
