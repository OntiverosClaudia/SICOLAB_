import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getHerramientasByIdLaboratory } from '../../API/';
import { styleSelect } from '../../styles/StyleSelectHerramientas';

export const HerramientaSelect = (props) => {
  const [herramientas, setHerramientas] = useState(null);

  useEffect(() => {
    getHerramientasByIdLaboratory(props.laboratorio)
      .then((res) => {
        setHerramientas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Select
      className="react-select"
      classNamePrefix="react-select"
      isMulti
      styles={styleSelect}
      options={herramientas?.map((item) => ({
        label: item.NombreHerramienta,
        value: item.id_herramienta,
      }))}
      placeholder={'Seleccione una opción'}
      {...props}
    />
  );
};
