import React, { useEffect, useState } from 'react';
import { Col, Modal as CustomModal, Row, Table } from 'react-bootstrap';
import { GetDetailsEdit, DeactivateClass } from '../../../../API';
import { toast } from 'react-toastify';
import './styles.css';

const ModalHorarioEditar = (props) => {
  const { show, onClose, currentRow } = props;
  const [clase, setClases] = useState(null);

  useEffect(() => {
    if (currentRow !== null) {
      GetDetailsEdit(currentRow).then(({ data }) => {
        if (data?.Clase !== null) {
          setClases(data);
        }
      });
    }
  }, [currentRow]);

  return (
    <>
      <CustomModal
        show={show}
        onHide={() => {
          onClose();
        }}
        animation={false}
        size={'lg'}
      >
        <CustomModal.Header closeButton>
          <CustomModal.Title>
            <h4>Detalles horario</h4>
          </CustomModal.Title>
        </CustomModal.Header>
        <CustomModal.Body>
          <div className="container-cuentasUsuario mx-5">
            <Row xs={1} md={2} className="mb-2">
              <Col>
                <label className="mb-1">
                  Laboratorio:{' '}
                  {clase?.Clase?.laboratorio.ClaveLaboratorio +
                    ' - ' +
                    clase?.Clase?.laboratorio.NombreLaboratorio}
                </label>
              </Col>
              <Col>
                <label className="mb-1">
                  Materia:{' '}
                  {clase?.Clase?.materia.Clave +
                    ' - ' +
                    clase?.Clase?.materia.NombreMateria}
                </label>
              </Col>
            </Row>

            <>
              <h6>Datos de horario</h6>
              <label className="mb-2">
                Docente:{' '}
                {clase?.Clase?.materia.usuario.Nombre +
                  ' ' +
                  clase?.Clase?.materia.usuario.Apellido}
              </label>
              {clase != null && (
                <Table striped bordered borderless className="table-content">
                  <thead>
                    <tr className="table-titulo">
                      <th>Dia</th>
                      <th>Hora inicial</th>
                      <th>Hora final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clase.Horario.map((dato) => {
                      return (
                        <tr key={dato.id_clase}>
                          <td>{dato?.Dia}</td>
                          <td>{dato.HoraInicio}</td>
                          <td>{dato.HoraFinal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </>
          </div>
        </CustomModal.Body>

        <CustomModal.Footer>
          <button
            className="btn btn-danger btn-borderRedondo"
            onClick={() => {
              if (currentRow)
                DeactivateClass(currentRow).then(({ data }) => {
                  if (data.status) {
                    //Notificacion
                    // Close hide, modal
                    onClose();
                  } else {
                    // error y no se cierra el modal
                  }
                });
            }}
          >
            Eliminar
          </button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
};

export default ModalHorarioEditar;
