import { DataTypes } from 'sequelize';

function registroEstudiantes(sequelize) {
  const RegistroEstudiante = sequelize.define('registro_estudiantes', {
    Hora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  RegistroEstudiante.removeAttribute('id');

  return RegistroEstudiante;
}

export default registroEstudiantes;
