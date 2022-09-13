import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import DataTable from 'react-data-table-component';
import NotFoundData from '../../Components/dataNotFound';
import Modal from './Components/ModalEstudiantes';
import ModalEstudiantesExcel from './Components/ModalEstudiantesExcel';
import { GetStudentsDetails, DeleteStudents } from '../../API/index';
import { MdPersonAddAlt } from 'react-icons/md';
import { SiMicrosoftexcel } from 'react-icons/si';
import { MdOutlineSearch } from 'react-icons/md';
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

const Estudiantes = () => {
  const [query, setQuery] = useState('');

  const columnas = [
    {
      name: 'No. Control',
      selector: (row) => row.noControl,
    },
    {
      name: 'Nombre(s)',
      selector: (row) => row.nombre,
    },
    {
      name: 'Apellido(s)',
      selector: (row) => row.apellido,
    },
    {
      name: 'Correo electrónico',
      selector: (row) => row.correo,
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
  const [modalShowExcel, setModalShowExcel] = useState(false);
  const [estudiantes, setEstudiantes] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  const keys = ['nombre', 'apellido', 'noControl', 'correo'];

  // Mostrar modal
  const handleShow = () => setModalShow(true);
  const handleShowExcel = () => setModalShowExcel(true);
  // Cerrar modal / Datos
  const handleClose = () => {
    setModalShow(false);
    setModalShowExcel(false);
    handleData();
  };

  useEffect(() => {
    handleData();
  }, []);

  const clickHandler = (row) => {
    // Mensaje de confirmacion
    Confirm(row.id_estudiante, row.noControl);
  };

  const Confirm = async (id_estudiante, NoControl) => {
    await Swal.fire({
      title: '<strong>¿Desea eliminar?</strong>',
      html:
        'El estudiante con número de control: <b>' +
        NoControl +
        '</b> se eliminará, esta acción no se puede revertir.',
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
        await DeleteStudents(id_estudiante);
        handleData();
        toast.success('Estudiante eliminado con éxito', {
          position: 'top-right',
          hideProgressBar: false,
        });
      }
    });
  };

  const handleData = async () => {
    await GetStudentsDetails()
      .then((result) => {
        setEstudiantes(result.data);

        const prueba = result.data.map((estudiante, index) => {
          return {
            id_estudiante: estudiante.id_estudiante,
            nombre: estudiante.Nombre,
            apellido: estudiante.Apellido,
            noControl: estudiante.NoControl,
            correo: estudiante.Correo,
          };
        });
        setData(prueba);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleCurrentRow = (id_estudiante) => {
    return (
      estudiantes.filter(
        (estudiante) => estudiante.id_estudiante === id_estudiante
      )[0] || {}
    );
  };

  // Tooltips
  tippy('#TT-BuscarEstudiantes', {
    content:
      'Buscar por: No. Control, Nombre(s), Apellido(s) o Correo electrónico',
    placement: 'bottom-start',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  tippy('#TT-IconAddStudents', {
    content: 'Agregar estudiante',
    placement: 'top',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  tippy('#TT-IconAddStudentsExcel', {
    content: 'Exportar estudiantes de excel',
    placement: 'top',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  return (
    <div className="">
      <Header />
      <h1 style={{ paddingTop: '2vw' }}>Administración de estudiantes</h1>
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
            <MdOutlineSearch size={22} id="TT-BuscarEstudiantes" />
          </div>
          <div
            className="div-iconAdd"
            onClick={() => {
              setCurrentRow(null);
              handleShow();
            }}
          >
            <MdPersonAddAlt size={22} id="TT-IconAddStudents" />
          </div>
          <div className="div-iconAdd">
            <SiMicrosoftexcel
              size={22}
              id="TT-IconAddStudentsExcel"
              onClick={() => {
                setCurrentRow(null);
                handleShowExcel();
              }}
            />
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
            title={'Estudiantes'}
            pagination
            paginationComponentOptions={optionsPagination}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setCurrentRow(handleCurrentRow(row.id_estudiante));
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
      <ModalEstudiantesExcel show={modalShowExcel} onClose={handleClose} />
    </div>
  );
};

export default Estudiantes;
