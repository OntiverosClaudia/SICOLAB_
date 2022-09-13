import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import DataTable from 'react-data-table-component';
import NotFoundData from '../../Components/dataNotFound';
import Modal from './Components/ModalHerramientas';
import { GetHerramientas, DeleteHerramienta } from '../../API';
import { MdAddCircleOutline, MdOutlineSearch } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import tippy from 'tippy.js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'tippy.js/dist/tippy.css';

const optionsPagination = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const Herramientas = () => {
  const [query, setQuery] = useState('');
  const columnas = [
    {
      name: 'Nombre de herramienta',
      selector: (row) => row.nombreHerramienta,
    },
    {
      name: 'Laboratorio',
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
  const [herramientas, setHerramientas] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  const keys = ['nombreHerramienta', 'nombreLaboratorio'];

  const handleShow = () => setModalShow(true);
  const handleClose = () => {
    setModalShow(false);
    handleData();
  };

  useEffect(() => {
    handleData();
  }, []);

  const clickHandler = (row) => {
    // Mensaje de confirmacion
    Confirm(row.id_herramienta, row.nombreHerramienta);
  };

  const Confirm = async (id_herramienta, NombreHerramienta) => {
    await Swal.fire({
      title: '<strong>¿Desea eliminar?</strong>',
      html:
        '<b>' +
        NombreHerramienta +
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
        await DeleteHerramienta(id_herramienta);
        handleData(); //
        toast.success('Herramienta eliminada con éxito', {
          position: 'top-right',
          hideProgressBar: false,
        });
      }
    });
  };

  const handleData = async () => {
    await GetHerramientas()
      .then((result) => {
        setHerramientas(result.data);

        const prueba = result.data.map((herramienta, index) => {
          return {
            id_herramienta: herramienta.id_herramienta,
            nombreHerramienta: herramienta.NombreHerramienta,
            nombreLaboratorio:
              herramienta.laboratorio.ClaveLaboratorio +
              ' - ' +
              herramienta.laboratorio.NombreLaboratorio,
          };
        });
        setData(prueba);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleCurrentRow = (id_herramienta) => {
    return (
      herramientas.filter(
        (herramienta) => herramienta.id_herramienta === id_herramienta
      )[0] || {}
    );
  };

  tippy('#TT-BuscarHerramientas', {
    content: 'Buscar por: Nombre de herramienta o Laboratorio',
    placement: 'bottom-start',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  tippy('#TT-IconAddHerramientas', {
    content: 'Agregar herramienta',
    placement: 'top',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  return (
    <div className="">
      <Header />
      <h1 style={{ paddingTop: '2vw' }}>Administración de herramientas</h1>
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
            <MdOutlineSearch size={22} id="TT-BuscarHerramientas" />
          </div>
          <div
            className="div-iconAdd"
            onClick={() => {
              setCurrentRow(null);
              handleShow();
            }}
          >
            <MdAddCircleOutline size={22} id="TT-IconAddHerramientas" />
            {/* */}
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
            title={'Herramientas'}
            pagination
            paginationComponentOptions={optionsPagination}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setCurrentRow(handleCurrentRow(row.id_herramienta));
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

export default Herramientas;
