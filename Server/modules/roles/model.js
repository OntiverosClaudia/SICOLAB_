import { DataTypes } from 'sequelize';

function roles(sequelize) {
  const Rol = sequelize.define('roles', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    DescripcionRol: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Rol;
}
export default roles;
