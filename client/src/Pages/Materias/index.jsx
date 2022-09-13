import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import DataTable from 'react-data-table-component';
import NotFoundData from '../../Components/dataNotFound';
import Modal from './Components/ModalMaterias';
import { GetMaterias, GetUsersDetails, DeleteMateria } from '../../API/index';
import { TbClipboardPlus } from 'react-icons/tb';
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

const Materias = () => {
  const [query, setQuery] = useState('');
  const columnas = [
    {
      name: 'Clave',
      selector: (row) => row.clave,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombreMateria,
    },
    {
      name: 'Docente',
      selector: (row) => row.docente,
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
  const [materias, setMaterias] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  const keys = ['clave', 'nombreMateria', 'docente'];

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
    Confirm(row.id_materia, row.clave, row.nombreMateria);
  };

  const Confirm = async (id_materia, Clave, NombreMateria) => {
    await Swal.fire({
      title: '<strong>¿Desea eliminar?</strong>',
      html:
        '<b>' +
        Clave +
        ' - ' +
        NombreMateria +
        '</b> ' +
        'se eliminará, esta acción no se puede revertir.',
      color: '#333',
      iconHtml: '<strong><span style="color: #d5303e">🗑</span></strong>',
      iconColor: '#d5303e',

      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar ',
      confirmButtonColor: '#d5303e',
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: '#ccc',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteMateria(id_materia);
        handleData(); //
        toast.success('Materia eliminada con éxito', {
          position: 'top-right',
          hideProgressBar: false,
        });
      }
    });
  };

  const handleDocentes = (data) => {
    let temp = [];
    data.map((data) => {
      if (data.id_rol === 2) {
        temp.push({
          label: data.Nombre + ' ' + data.Apellido,
          value: data.id_usuario,
        });
      }
    });
    setUsuarios(temp);
  };

  const handleData = async () => {
    await GetMaterias()
      .then((result) => {
        setMaterias(result.data);

        const prueba = result.data.map((materia, index) => {
          return {
            id_materia: materia.id_materia,
            nombreMateria: materia.NombreMateria,
            clave: materia.Clave,
            docente: materia.usuario.Nombre + ' ' + materia.usuario.Apellido,
          };
        });
        setData(prueba);
      })
      .finally(() => {
        setIsFetching(false);
        GetUsersDetails().then((result) => {
          handleDocentes(result.data);
        });
      });
  };

  const handleCurrentRow = (id_materia) => {
    return (
      materias.filter((materia) => materia.id_materia === id_materia)[0] || {}
    );
  };

  tippy('#TT-BuscarMaterias', {
    content: 'Buscar por: Clave, Nombre o Docente',
    placement: 'bottom-start',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  tippy('#TT-IconAddMat', {
    content: 'Agregar materia',
    placement: 'top',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  return (
    <div className="">
      <Header />
      <h1 style={{ paddingTop: '2vw' }}>Administración de materias</h1>
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
            <MdOutlineSearch size={22} id="TT-BuscarMaterias" />
          </div>
          <div
            className="div-iconAdd"
            onClick={() => {
              setCurrentRow(null);
              handleShow();
            }}
          >
            <TbClipboardPlus size={22} id="TT-IconAddMat" />
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
            title={'Materias'}
            pagination
            paginationComponentOptions={optionsPagination}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setCurrentRow(handleCurrentRow(row.id_materia));
              handleShow();
            }}
            noDataComponent={<NotFoundData />}
          />
        )}
      </div>
      <Modal
        show={modalShow}
        onClose={handleClose}
        usuarios={usuarios !== null ? usuarios : null}
        currentRow={currentRow !== null ? currentRow : null}
      />
    </div>
  );
};

export default Materias;
