import React from 'react';
import Header from '../../Components/Header';
import HorarioDetalles from '../../Components/ScheduleDetails';

const Horario = (id_laboratorio) => {
  return (
    <>
      <Header />
      <h1 style={{ paddingTop: '2rem' }}>Horarios</h1>
      <HorarioDetalles />
    </>
  );
};

export default Horario;
