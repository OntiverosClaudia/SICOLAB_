import { DataTypes } from 'sequelize';

function clases(sequelize) {
  const Clase = sequelize.define('clases', {
    id_clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    HoraInicio: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    HoraFinal: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    Dia: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Slot: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT(50),
      allowNull: false,
      defaultValue: 1,
    },
    CustomID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Clase;
}
export default clases;
