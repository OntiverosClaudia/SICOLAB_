import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import NotFoundData from '../../Components/dataNotFound';
import DataTable from 'react-data-table-component';
import Modal from '../../Components/Modal';
import { GetListDetails } from '../../API/index';
import { MdOutlineSearch } from 'react-icons/md';
import tippy from 'tippy.js';
import dayjs from 'dayjs';
import 'tippy.js/dist/tippy.css';

const columnas = [
  {
    name: 'Id',
    selector: (row) => row.id_registro,
    sortable: true,
  },
  {
    name: 'Laboratorio',
    selector: (row) => row.laboratorio,
  },
  {
    name: 'Materia',
    selector: (row) => row.materia,
  },
  {
    name: 'Fecha',
    selector: (row) => dayjs(row.fecha).format('DD/MM/YYYY'),
  },
  {
    name: 'Observaciones',
    selector: (row) =>
      row.observaciones === 'null' || '""' ? 'Ninguna' : row.observaciones,
  },
];

const optionsPagination = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const Registros = () => {
  const [query, setQuery] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [registros, setRegistros] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const keys = ['laboratorio', 'materia', 'fecha', 'observaciones'];

  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  useEffect(() => {
    GetListDetails()
      .then((result) => {
        setRegistros(result.data);
        handleData(result.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const handleData = (result) => {
    const prueba = result.map((registro, index) => {
      return {
        id_registro: registro.id_registro,
        laboratorio: registro.clase.laboratorio.NombreLaboratorio,
        materia: registro.clase.materia.NombreMateria,
        fecha: registro.Fecha,
        observaciones: registro.Observaciones,
      };
    });
    setData(prueba);
  };

  const handleCurrentRow = (id_registro) => {
    return (
      registros.filter((registro) => registro.id_registro === id_registro)[0] ||
      {}
    );
  };

  tippy('#TT-BuscarRegistros', {
    content: 'Buscar por: Laboratorio, Materia, Fecha u Observaciones',
    placement: 'bottom-start',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  return (
    <div className="">
      <Header />
      <h1 style={{ paddingTop: '2vw' }}>Registros de acceso a laboratorios</h1>
      <div className="table-responsive">
        <div className="input-wrapper">
          <input
            align="right"
            type="text"
            placeholder="Buscar..."
            className="inputSearch"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="icon-InfoInput">
            <MdOutlineSearch size={22} id="TT-BuscarRegistros" />
          </div>
        </div>

        {!isFetching && (
          <DataTable
            columns={columnas}
            data={data.filter((Data) =>
              keys.some((key) =>
                Data[key].toLowerCase().includes(query.toLowerCase())
              )
            )}
            title={'Registros'}
            pagination
            paginationComponentOptions={optionsPagination}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setCurrentRow(handleCurrentRow(row.id_registro));
              handleShow();
            }}
            noDataComponent={<NotFoundData />}
          />
        )}
      </div>
      <Modal
        show={modalShow}
        onClose={handleClose}
        currentRow={currentRow !== null ? currentRow : null}
      />
    </div>
  );
};

export default Registros;
