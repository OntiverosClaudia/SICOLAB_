import { DataTypes } from 'sequelize';

function usuarios(sequelize) {
  const Usuario = sequelize.define('usuarios', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Contraseña: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    CodigoInstitucional: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Usuario;
}

export default usuarios;
