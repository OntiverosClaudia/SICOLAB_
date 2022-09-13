import React from 'react';
import { Modal as CustomModal, Table } from 'react-bootstrap';
import dayjs from 'dayjs';
import { printDocument } from '../../helper/CreatePDF';
import NotFoundData from '../dataNotFound';
import { MdDownload } from 'react-icons/md';
import './styles.css';

const Modal = (props) => {
  const { show, onClose, currentRow } = props;
  const inputRef = React.useRef(null);

  return (
    <>
      {currentRow !== null && (
        <CustomModal show={show} onHide={onClose} animation={false} size={'xl'}>
          <CustomModal.Header closeButton>
            <CustomModal.Title>
              <h4>Detalles del registro</h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <>
              <div className="containerdiv-btnDownload">
                <button
                  onClick={() => {
                    printDocument(
                      inputRef,
                      `${currentRow?.id_registro}-${currentRow.clase?.materia.NombreMateria}-${currentRow.clase?.laboratorio.NombreLaboratorio}.pdf`
                    );
                  }}
                  className="btnDownload"
                >
                  <MdDownload size={20} className="icon-Download" /> Guardar PDF
                </button>
              </div>
              <div
                className="container-modal mx-3"
                id="divToPrint"
                ref={inputRef}
              >
                <div className="container-division">
                  <div className="container-division-materia">
                    <h6>Registro: {currentRow?.id_registro}</h6>
                    <h6>Materia: {currentRow.clase?.materia.NombreMateria}</h6>
                    <h6>Clave: {currentRow.clase?.materia.Clave}</h6>
                  </div>
                  <div className="container-division-laboratorio">
                    <h6>
                      Laboratorio:{' '}
                      {currentRow.clase?.laboratorio.NombreLaboratorio}
                    </h6>
                    <h6>
                      Docente:{' '}
                      {currentRow.clase.materia.usuario?.Nombre +
                        ' ' +
                        currentRow.clase.materia.usuario?.Apellido}
                    </h6>
                    <h6>
                      Fecha: {dayjs(currentRow?.Fecha).format('DD/MM/YYYY')}
                    </h6>
                  </div>
                </div>
                {currentRow?.registro.length > 0 && (
                  <Table striped bordered borderless className="table-content">
                    <thead>
                      <tr className="table-titulo">
                        <th>#</th>
                        <th>No. Control</th>
                        <th>Alumno</th>
                        <th>Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRow?.registro.map((usuario, index) => {
                        return (
                          <tr key={usuario.NoControl}>
                            <td>{index + 1}</td>
                            <td>{usuario.NoControl}</td>
                            <td>{usuario?.Nombre + ' ' + usuario.Apellido}</td>
                            <td>{usuario?.registro_estudiantes.Hora}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
                {currentRow?.registro.length === 0 && (
                  <NotFoundData subtitulo="No existen registros." />
                )}
                <div className="container-division">
                  <div className="div-observacionesModal">
                    <h6 className="h6-Observaciones table-content">
                      <b>Observaciones: &nbsp;</b>{' '}
                      {currentRow?.Observaciones === 'null' || '""'
                        ? 'Ninguna'
                        : currentRow.Observaciones}
                    </h6>
                  </div>
                  <div className="div-herramientasModal">
                    <Table
                      bordered
                      borderless
                      className="table-content tabla-Herramientas"
                    >
                      <thead>
                        <tr className="table-titulo">
                          <th>Herramienta(s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRow?.registroHerramienta.map((herramienta) => {
                          return (
                            <tr key={herramienta.id_herramienta}>
                              <td>{herramienta.NombreHerramienta}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </>
          </CustomModal.Body>
        </CustomModal>
      )}
    </>
  );
};

export default Modal;
