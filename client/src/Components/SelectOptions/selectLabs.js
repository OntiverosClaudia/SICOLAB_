import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { GetLaboratories } from '../../API/';
import { styleSelect } from '../../styles/selectStyle';

import './selectLabs.css';

export const LabsSelect = (props) => {
  const [laboratorios, setLaboratorios] = useState(null);

  useEffect(() => {
    GetLaboratories()
      .then((res) => {
        setLaboratorios(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="selectLabs-container">
      <Select
        styles={styleSelect}
        options={laboratorios?.map((item) => ({
          label: item.NombreLaboratorio,
          value: item.id_laboratorio,
        }))}
        placeholder={'Seleccione una opción'}
        {...props}
      />
    </div>
  );
};
