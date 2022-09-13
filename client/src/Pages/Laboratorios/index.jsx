import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import DataTable from 'react-data-table-component';
import NotFoundData from '../../Components/dataNotFound';
import Modal from './Components/ModalLaboratorios';
import ModalReporte from './Components/ModalReporte';
import { GetLaboratories, DeleteLaboratory } from '../../API';
import { MdAddToQueue, MdOutlineSearch } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import { FaTrashAlt } from 'react-icons/fa';
import tippy from 'tippy.js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'tippy.js/dist/tippy.css';
import './styles.css';

const optionsPagination = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const Laboratorios = () => {
  const [query, setQuery] = useState('');
  const columnas = [
    {
      name: 'Clave',
      selector: (row) => row.claveLaboratorio,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombreLaboratorio,
    },
    {
      name: 'Acción',
      cell: (row) => (
        <div
          className="divContainer-BtnDeleteAction"
          onClick={() => {
            clickHandler(row);
          }}
        >
          <FaTrashAlt size={14} className="btn-DeleteAction" />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [modalShow, setModalShow] = useState(false);
  const [modalShowReporte, setModalShowReporte] = useState(false);
  const [laboratorios, setLaboratorios] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  const keys = ['nombreLaboratorio', 'claveLaboratorio'];

  // Mostrar modal
  const handleShow = () => setModalShow(true);
  const handleShowReporte = () => setModalShowReporte(true);
  // Cerrar modal
  const handleClose = () => {
    setModalShow(false);
    setModalShowReporte(false);
    handleData();
  };
  useEffect(() => {
    handleData();
  }, []);

  const clickHandler = (row) => {
    // Mensaje de confirmacion
    Confirm(row.id_laboratorio, row.claveLaboratorio, row.nombreLaboratorio);
  };

  const Confirm = async (
    id_laboratorio,
    ClaveLaboratorio,
    NombreLaboratorio
  ) => {
    await Swal.fire({
      title: '<strong>¿Desea eliminar?</strong>',
      html:
        '<b>' +
        ClaveLaboratorio +
        ' - ' +
        NombreLaboratorio +
        '</b> ' +
        'se eliminará, esta acción no se puede revertir.',
      color: '#333',
      iconHtml: '<strong><span style="color: #d5303e">🗑</span></strong>',
      iconColor: '#d5303e',

      /* showCloseButton: true, */
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar ',
      confirmButtonColor: '#d5303e',
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: '#ccc',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteLaboratory(id_laboratorio);
        handleData(); //
        toast.success('Laboratorio eliminado con éxito', {
          position: 'top-right',
          hideProgressBar: false,
        });
      }
    });
  };

  const handleData = async () => {
    await GetLaboratories()
      .then((result) => {
        setLaboratorios(result.data);

        const prueba = result.data.map((laboratorio, index) => {
          return {
            id_laboratorio: laboratorio.id_laboratorio,
            claveLaboratorio: laboratorio.ClaveLaboratorio,
            nombreLaboratorio: laboratorio.NombreLaboratorio,
          };
        });
        setData(prueba);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleCurrentRow = (id_laboratorio) => {
    return (
      laboratorios.filter(
        (laboratorio) => laboratorio.id_laboratorio === id_laboratorio
      )[0] || {}
    );
  };

  tippy('#TT-BuscarLaboratorios', {
    content: 'Buscar por: Clave o Nombre',
    placement: 'bottom-start',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  tippy('#TT-IconAddLabs', {
    content: 'Agregar laboratorio',
    placement: 'top',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  return (
    <div className="">
      <Header />
      <h1 style={{ paddingTop: '2vw' }}>Administración de laboratorios</h1>
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
            <MdOutlineSearch size={22} id="TT-BuscarLaboratorios" />
          </div>
          <div
            className="div-iconAdd"
            onClick={() => {
              setCurrentRow(null);
              handleShow();
            }}
          >
            <MdAddToQueue size={22} id="TT-IconAddLabs" />
          </div>
        </div>
        <div className="containerdiv-btnDownload paddingBoton">
          {' '}
          <button onClick={handleShowReporte}>
            <TbReport size={20} />
            Generar reporte
          </button>{' '}
        </div>

        {!isFetching && (
          <DataTable
            columns={columnas}
            data={data.filter((Data) =>
              keys.some((key) =>
                Data[key].toLowerCase().includes(query.toLowerCase())
              )
            )}
            title={'Laboratorios'}
            pagination
            paginationComponentOptions={optionsPagination}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setCurrentRow(handleCurrentRow(row.id_laboratorio));
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
      <ModalReporte show={modalShowReporte} onClose={handleClose} />
    </div>
  );
};

export default Laboratorios;
