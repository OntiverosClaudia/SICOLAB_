import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import HorarioVistaDetalles from '../../Components/ScheduleReader';
import { toast } from 'react-toastify';
import './styles.css';

const SelectMat = (props) => {
  const { setCurrentPage, laboratorio, setMateria } = props;
  const [currentLab, setCurrentLab] = useState(null);
  const [currentMat, setCurrentMat] = useState(null);

  useEffect(() => {
    setCurrentLab(laboratorio);
  }, [laboratorio]);

  const hanldeSubmit = () => {
    if (currentMat) {
      setMateria(currentMat);
      setCurrentPage(2);
    } else {
      //error notificacion, seleccionar materia
      toast.warning('Debe seleccionar una materia', {
        position: 'top-right',
        hideProgressBar: false,
      });
    }
  };

  if (!laboratorio) {
    return (
      <div className="Loader-container-start">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <div className="container-selectMat">
        <div className="content-materia">
          <div className="materia">
            <HorarioVistaDetalles
              selectedLab={currentLab}
              setMat={setCurrentMat}
            />
          </div>

          <div className="form-group mt-2">
            <button
              type="submit"
              className="btn btn-md btn-outline-info"
              onClick={() => setCurrentPage(0)}
            >
              Cambiar laboratorio
            </button>

            <button
              type="submit"
              className="btn-md btn-fg btn-block"
              disabled={currentMat ? false : true}
              onClick={hanldeSubmit}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMat;
