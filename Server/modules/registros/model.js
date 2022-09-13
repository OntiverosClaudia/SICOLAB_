import { DataTypes } from 'sequelize';

function registros(sequelize) {
  const Registro = sequelize.define('registros', {
    id_registro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Observaciones: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Registro;
}

export default registros;
