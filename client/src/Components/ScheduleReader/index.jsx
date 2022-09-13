import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col } from 'react-bootstrap';
import { getClasesByIdLaboratory, getLaboratoryForId } from '../../API/index';
import './styles.css';

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

const HorarioVistaDetalles = (props) => {
  const { selectedLab, setMat } = props;
  const [laboratorio, setLaboratorio] = useState(null);
  const [clases, setClases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    if (selectedLab) {
      getClasesByIdLaboratory(selectedLab).then((response) => {
        setClases(response.data);
        setLoading(false);
      });
      getLaboratoryForId(selectedLab).then((response) => {
        setLaboratorio(response.data);
      });
    }
  }, [selectedLab]);

  if (loading) {
    return (
      <div className="Loader-container-start">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

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
      for (const [index, col] of columnsHeader.entries()) {
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
                for (let i = tempSlot[0]; i <= tempSlot[1]; i++) {
                  if (i == row) {
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
                  className={`table-entryH ${
                    row === selectedCell?.row && index === selectedCell?.index
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setMat(data);
                    setSelectedCell({ row, index });
                  }}
                >
                  <span>{data['materia']?.Clave}</span>
                  <span>{data['materia']?.NombreMateria}</span>
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
      <div className="container-elementos">
        <div className="container-InfoAcceso">
          <h5>Datos de laboratorio</h5>
          <Row className="container-division">
            <Col xs={6}>
              <h6>
                <b>Laboratorio:</b> {laboratorio?.NombreLaboratorio}
              </h6>

              <h6>
                <b>Clave:</b> {laboratorio?.ClaveLaboratorio}
              </h6>
            </Col>
            {/* <Col xs={6}>
              <h6>Fecha: {hoy.toLocaleDateString()}</h6>
            </Col> */}
          </Row>
        </div>
      </div>
      <br></br>

      {/* <label className="mb-1">Seleccione una materia </label> */}

      <div className="container-Horario">
        <table className="table">
          <tbody>
            <tr>{generateColumns()}</tr>
            {generateTableData()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HorarioVistaDetalles;
