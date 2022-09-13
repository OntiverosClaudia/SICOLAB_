import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import DataTable from 'react-data-table-component';
import NotFoundData from '../../Components/dataNotFound';
import Modal from './Components/ModalCuentas';
import { GetUsersDetails, GetRoleList, DeleteUsers } from '../../API/index';
import { MdPersonAddAlt } from 'react-icons/md';
import { MdOutlineSearch } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import tippy from 'tippy.js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'tippy.js/dist/tippy.css';

// import { toast } from 'react-toastify'; //Importar notificaciones
//Formato toast
/* toast.error('tkm joven uwur', {
  position: 'top-right',
  hideProgressBar: false,
}); */

const optionsPagination = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const Cuentas = () => {
  const [query, setQuery] = useState('');

  const columnas = [
    {
      name: 'Código institucional',
      selector: (row) => row.codigoInstitucional,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: (row) => row.rol,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
    },
    {
      name: 'Apellido',
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
  const [cuentas, setCuentas] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  const keys = ['rol', 'nombre', 'apellido', 'codigoInstitucional', 'correo'];

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
    Confirm(row.id_usuario, row.codigoInstitucional);
  };

  const Confirm = async (id_usuario, CodigoInstitucional) => {
    await Swal.fire({
      title: '<strong>¿Desea eliminar?</strong>',
      html:
        'El usuario con código institucional: <b>' +
        CodigoInstitucional +
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
        await DeleteUsers(id_usuario);
        handleData(); //
        toast.success('Usuario eliminado con éxito', {
          position: 'top-right',
          hideProgressBar: false,
        });
      }
    });
  };

  const handleRoles = (data) => {
    let temp = [];
    data.map((role) => {
      if (role.id_rol !== 3) {
        temp.push({
          label: role.DescripcionRol,
          value: role.id_rol,
        });
      }
      return temp;
    });
    setRoles(temp);
  };

  const handleData = async () => {
    await GetUsersDetails()
      .then((result) => {
        setCuentas(result.data);

        const prueba = result.data.map((cuenta, index) => {
          return {
            id_usuario: cuenta.id_usuario,
            rol: cuenta.role.DescripcionRol,
            nombre: cuenta.Nombre,
            apellido: cuenta.Apellido,
            codigoInstitucional: cuenta.CodigoInstitucional,
            correo: cuenta.Correo,
          };
        });
        setData(prueba);
      })
      .finally(() => {
        setIsFetching(false);
        GetRoleList().then((result) => {
          handleRoles(result.data);
        });
      });
  };

  const handleCurrentRow = (id_usuario) => {
    return (
      cuentas.filter((cuenta) => cuenta.id_usuario === id_usuario)[0] || {}
    );
  };

  tippy('#TT-BuscarUsuarios', {
    content:
      'Buscar por: Código institucional, Rol, Nombre(s), Apellido(s) o Correo electrónico',
    placement: 'bottom-start',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  tippy('#TT-IconAddUsers', {
    content: 'Agregar usuario',
    placement: 'top',
    theme: 'ThemeInfoTooltip',
    arrow: false,
  });

  return (
    <div className="">
      <Header />
      <h1 style={{ paddingTop: '2vw' }}>Administrar usuarios del sistema</h1>
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
            <MdOutlineSearch size={22} id="TT-BuscarUsuarios" />
          </div>
          <div
            className="div-iconAdd"
            onClick={() => {
              setCurrentRow(null);
              handleShow();
            }}
          >
            <MdPersonAddAlt size={22} id="TT-IconAddUsers" />
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
            title={'Cuentas'}
            pagination
            paginationComponentOptions={optionsPagination}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowClicked={(row) => {
              setCurrentRow(handleCurrentRow(row.id_usuario));
              handleShow();
            }}
            noDataComponent={<NotFoundData />}
          />
        )}
      </div>
      <Modal
        show={modalShow}
        onClose={handleClose}
        roles={roles !== null ? roles : null}
        currentRow={currentRow !== null ? currentRow : null}
      />
    </div>
  );
};

export default Cuentas;
