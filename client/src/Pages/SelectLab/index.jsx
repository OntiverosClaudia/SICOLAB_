import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer';
import { LabsSelect } from '../../Components/SelectOptions/selectLabs';
import './styles.css';

const SelectLab = (props) => {
  const { setCurrentPage, SelectLab } = props;
  const [selected, setSelected] = useState(null);
  let navigate = useNavigate();
  const handleSelectChange = ({ value }) => {
    setSelected(value);
  };

  const handleCurrentLaboratory = () => {
    if (selected) {
      SelectLab(selected);
      setCurrentPage(1);
    } else {
      // error de no laboratorio
      toast.warning('Seleccione un laboratorio', {
        position: 'top-right',
        hideProgressBar: false,
      });
    }
  };

  return (
    <>
      <div className="box-selectLab">
        <h2>SICOLAB</h2>
        <span>Seleccione el laboratorio</span>
        <div className="selectdiv">
          <label>
            <LabsSelect onChange={handleSelectChange} />
          </label>
        </div>

        <div className="form-group mt-2">
          <button
            type="submit"
            className="btn-md btn-fg btn-block"
            onClick={() => {
              handleCurrentLaboratory();
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelectLab;
