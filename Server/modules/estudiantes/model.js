import { DataTypes } from 'sequelize';

function estudiantes(sequelize) {
  const Estudiante = sequelize.define('estudiantes', {
    id_estudiante: {
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
    NoControl: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    Correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Estudiante;
}

export default estudiantes;
