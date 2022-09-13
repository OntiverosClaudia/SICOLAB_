import { DataTypes } from 'sequelize';

function registroHerramientas(sequelize) {
  const RegistroHerramienta = sequelize.define('registro_herramientas', {});
  RegistroHerramienta.removeAttribute('id');

  return RegistroHerramienta;
}

export default registroHerramientas;
