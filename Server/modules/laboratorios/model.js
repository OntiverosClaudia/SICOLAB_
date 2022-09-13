import { DataTypes } from 'sequelize';

function laboratorios(sequelize) {
  const Laboratorio = sequelize.define('laboratorios', {
    id_laboratorio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NombreLaboratorio: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    ClaveLaboratorio: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return Laboratorio;
}
export default laboratorios;
