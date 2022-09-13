import { DataTypes } from 'sequelize';

function materias(sequelize) {
  const Materia = sequelize.define('materias', {
    id_materia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NombreMateria: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Clave: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Materia;
}
export default materias;
