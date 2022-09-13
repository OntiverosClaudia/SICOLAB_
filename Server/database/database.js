import { Sequelize } from 'sequelize';
import { dbConfig } from './configure-env.js';
import { Console } from '../utils/index.js';
//
import {
  Rol,
  Usuario,
  Estudiante,
  Laboratorio,
  Materia,
  Registro,
  RegistroEstudiante,
  Clase,
  //
  Herramienta,
  RegistroHerramienta,
} from '../modules/index.js';

const db = {
  sequelize: null,

  async connect() {
    this.sequelize = new Sequelize(dbConfig());
    this.Rol = Rol(this.sequelize);
    this.Usuario = Usuario(this.sequelize);
    this.Estudiante = Estudiante(this.sequelize);
    this.Laboratorio = Laboratorio(this.sequelize);
    this.Materia = Materia(this.sequelize);
    this.Clase = Clase(this.sequelize);
    this.Registro = Registro(this.sequelize);
    this.RegistroEstudiante = RegistroEstudiante(this.sequelize);
    //
    this.Herramienta = Herramienta(this.sequelize);
    this.RegistroHerramienta = RegistroHerramienta(this.sequelize);

    // Muchos a muchos
    this.Estudiante.belongsToMany(this.Registro, {
      through: this.RegistroEstudiante,
      foreignKey: 'id_estudiante',
      as: 'estudiante',
    });
    this.Registro.belongsToMany(this.Estudiante, {
      through: this.RegistroEstudiante,
      foreignKey: 'id_registro',
      as: 'registro',
    });
    //
    this.Herramienta.belongsToMany(this.Registro, {
      through: this.RegistroHerramienta,
      foreignKey: 'id_herramienta',
      as: 'herramienta',
    });
    this.Registro.belongsToMany(this.Herramienta, {
      through: this.RegistroHerramienta,
      foreignKey: 'id_registro',
      as: 'registroHerramienta',
    });
    //

    // 1 a muchos
    this.Materia.hasMany(this.Clase, { foreignKey: 'id_materia' });
    this.Clase.belongsTo(this.Materia, { foreignKey: 'id_materia' });

    this.Clase.hasMany(this.Registro, {
      foreignKey: 'id_clase',
    });
    this.Registro.belongsTo(this.Clase, {
      foreignKey: 'id_clase',
    });

    this.Laboratorio.hasMany(this.Clase, { foreignKey: 'id_laboratorio' });
    this.Clase.belongsTo(this.Laboratorio, { foreignKey: 'id_laboratorio' });

    //
    this.Laboratorio.hasMany(this.Herramienta, {
      foreignKey: 'id_laboratorio',
    });
    this.Herramienta.belongsTo(this.Laboratorio, {
      foreignKey: 'id_laboratorio',
    });
    //

    this.Rol.hasMany(this.Estudiante, { foreignKey: 'id_rol' });
    this.Estudiante.belongsTo(this.Rol, { foreignKey: 'id_rol' });

    this.Usuario.hasMany(this.Materia, { foreignKey: 'id_usuario' });
    this.Materia.belongsTo(this.Usuario, { foreignKey: 'id_usuario' });

    this.Rol.hasMany(this.Usuario, { foreignKey: 'id_rol' });
    this.Usuario.belongsTo(this.Rol, { foreignKey: 'id_rol' });

    this.sequelize
      .authenticate()
      .then(async () => {
        Console.log('✔️ La conexión se estableció correctamente');
        await this.sequelize.sync();
      })
      .catch((err) => {
        Console.error('❌ Error al conectar con la base de datos', err);
      });

    return db;
  },
};

export default db;
