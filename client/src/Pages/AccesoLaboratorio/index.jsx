import React, { useState } from 'react';
import { SelectLab, SelectMat, ControlAcceso } from '../';
import Spinner from 'react-bootstrap/Spinner';

const AccesoLaboratorio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [SelectedLaboratory, setSelectedLaboratory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (currentPage === 0) {
    return (
      <SelectLab
        setCurrentPage={setCurrentPage}
        SelectLab={setSelectedLaboratory}
      />
    );
  }

  if (currentPage === 1 && SelectedLaboratory) {
    return (
      <SelectMat
        setCurrentPage={setCurrentPage}
        laboratorio={SelectedLaboratory}
        setMateria={setSelectedSubject}
      />
    );
  }

  if (currentPage === 2 && selectedSubject) {
    return (
      <ControlAcceso
        setCurrentPage={setCurrentPage}
        materia={selectedSubject}
      />
    );
  }

  return (
    <div className="Loader-container-start">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default AccesoLaboratorio;
