import { DataTypes } from 'sequelize';

function herramientas(sequelize) {
  const Herramienta = sequelize.define('herramientas', {
    id_herramienta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NombreHerramienta: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return Herramienta;
}
export default herramientas;
