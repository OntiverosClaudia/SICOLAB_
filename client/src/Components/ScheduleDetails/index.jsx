import React, { useState } from 'react';
import {
  getClasesByIdLaboratory,
  DeactivateClassByLaboratory,
} from '../../API/index';
import { LabsSelect } from '../../Components/SelectOptions/selectLabs';
import { CgExtensionAdd } from 'react-icons/cg';
import Modal from './Components/ModalHorario/';
import ModalEditar from './Components/ModalHorarioEditar/';
import { MdDownload, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import './styles.css';
import { printDocument } from '../../helper/CreatePDF';

let columnsHeader = [
  '#',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

let rowsHeaders = [
  '07:00-08:00',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
];

const HorarioDetalles = () => {
  const inputRef = React.useRef(null);

  const [selected, setSelected] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [currentCustomId, setCurrentCustomId] = useState(null);
  const [clases, setClases] = useState(null);

  // Mostrar modal
  const handleShow = () => setModalShow(true);
  const handleShowEdit = () => setModalShowEdit(true);

  // Cerrar modal / Datos
  const handleClose = () => {
    setCurrentCustomId(null);
    setModalShow(false);
    setModalShowEdit(false);
    if (selected !== 0) {
      handleSelectChange({ value: selected });
    }
  };

  const handleSelectChange = ({ value }) => {
    setSelected(value);
    getClasesByIdLaboratory(value).then((res) => {
      setClases(res.data);
    });
  };

  const Confirm = async (id_laboratorio) => {
    await Swal.fire({
      title: '<strong>¿Desea desactivar?</strong>',
      html:
        'El horario del <b>laboratorio ' +
        selected +
        '</b> de este ciclo escolar se desactivará, esta acción no se puede revertir.',
      color: '#333',
      iconHtml: '<strong><span style="color: #d5303e">X</span></strong>',
      iconColor: '#d5303e',

      showCancelButton: true,
      confirmButtonText: 'Si, Desactivar ',
      confirmButtonColor: '#d5303e',
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: '#ccc',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeactivateClassByLaboratory(id_laboratorio);
        toast.success('Horarios desactivados con éxito', {
          position: 'top-right',
          hideProgressBar: false,
        });
      }
    });
  };

  const generateColumns = () => {
    let columns = [];
    columnsHeader.forEach((item, index) => {
      columns.push(
        <th className="th-tableH" key={index}>
          {item}
        </th>
      );
    });

    return columns;
  };

  const generateTableData = () => {
    let rows = [];
    for (let row = 0; row < rowsHeaders.length; row++) {
      let columns = [];
      for (const col of columnsHeader) {
        let data;
        if (col === '#') {
          data = rowsHeaders[row];
          columns.push(
            <td className="td-style" key={'0' + row}>
              {data}
            </td>
          );
        } else {
          data = '';
          if (clases !== null) {
            for (const [, value] of Object.entries(clases)) {
              if (value['Dia'].toLowerCase() === col.toLowerCase()) {
                let tempSlot = value['Slot'].split('-');
                for (
                  let i = parseInt(tempSlot[0]);
                  i <= parseInt(tempSlot[1]);
                  i++
                ) {
                  if (i === parseInt(row)) {
                    data = value;
                  }
                }
              }
            }
          }
          columns.push(
            <td className="td-style" key={'td-' + row + '-' + columns.length}>
              {data && (
                <div
                  className="table-entryH"
                  onClick={() => {
                    setCurrentCustomId(data.CustomID);
                    handleShowEdit();
                  }}
                >
                  <span>
                    {data['materia']?.Clave +
                      ' - ' +
                      data['materia']?.NombreMateria}
                  </span>
                  <p>
                    {data['materia']?.usuario.Nombre +
                      ' ' +
                      data['materia']?.usuario.Apellido}
                  </p>
                </div>
              )}
            </td>
          );
        }
      }
      rows.push(
        <tr className="tr" key={'tr' + row}>
          {columns}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="scheduleDetails-container">
      <label className="mb-1">Laboratorio </label>
      <div className="container-elementos">
        <LabsSelect onChange={handleSelectChange} />
        <div className="iconAddH" onClick={handleShow}>
          <CgExtensionAdd size={22} />
          <span>Crear horario</span>
        </div>
      </div>
      {selected !== 0 && (
        <div className="containerdiv-btnDownload mt-2">
          <button
            onClick={() => {
              printDocument(inputRef, `Horario - Laboratorio ${selected}.pdf`);
            }}
          >
            <MdDownload size={20} className="icon-Download" /> Guardar PDF
          </button>
        </div>
      )}
      <div ref={inputRef}>
        {selected !== 0 && (
          <div
            style={{
              /* textAlign: 'center', */
              color: '#5fa2db',
              fontSize: '22px',
              marginTop: '4px',
            }}
            className="mb-3"
          >
            Horario - Laboratorio {selected}
          </div>
        )}
        <div className="container-Horario mt-4">
          <table className="table">
            <tbody>
              <tr>{generateColumns()}</tr>
              {generateTableData()}
            </tbody>
          </table>
        </div>
      </div>
      {selected !== 0 && (
        <div className="containerdiv-btnDeleteTableClass mt-2">
          <button
            onClick={() => {
              Confirm(selected);
            }}
          >
            <MdClose size={20} className="icon-DeleteClass" /> Desactivar
            horario
          </button>
        </div>
      )}

      <Modal show={modalShow} onClose={handleClose} />
      <ModalEditar
        show={modalShowEdit}
        onClose={handleClose}
        currentRow={currentCustomId ? currentCustomId : null}
      />
    </div>
  );
};

export default HorarioDetalles;
