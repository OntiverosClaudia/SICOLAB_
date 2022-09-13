import React, { useState } from 'react';
import dayjs from 'dayjs';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { HerramientaSelect } from '../../Components/SelectOptions/selectHerramientas';
import { FaArrowRight } from 'react-icons/fa';
import { ImInfo } from 'react-icons/im';
import {
  SearchStudentByControlNumber,
  CreateRegisters,
  CreateRegistersStudents,
  CreateRegistersTools,
} from '../../API/';
import { toast } from 'react-toastify';
import './styles.css';

const ControlAcceso = (props) => {
  const { setCurrentPage, materia } = props;
  const { materia: DatosMateria, laboratorio, id_clase } = materia;
  const { id_laboratorio } = laboratorio;
  const [observaciones, setObservaciones] = useState(null);
  const { usuario: docente } = DatosMateria;
  const [dataTable, setData] = useState([]);
  let now = dayjs();
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const [herramientas, setHerramientas] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const columnas = [
    {
      name: 'No. Control',
      selector: (row) => row.NoControl,
    },
    {
      name: 'Nombre(s)',
      selector: (row) => row.Nombre,
    },
    {
      name: 'Apellido(s)',
      selector: (row) => row.Apellido,
    },
    {
      name: 'Hora',
      selector: (row) => row.Hora,
    },
  ];

  const handleCreate = async () => {
    if (dataTable.length > 0) {
      await CreateRegisters({
        id_clase,
        Fecha: hoy,
        Observaciones: observaciones,
      })
        .then(async (data) => {
          if (data !== undefined) {
            await CreateRegistersTools({
              id_registro: data.id_registro,
              Herramientas: JSON.stringify(herramientas),
            }).then((data) => {
              console.log(data);
            });

            await CreateRegistersStudents({
              id_registro: data.id_registro,
              Estudiantes: JSON.stringify(dataTable),
            })
              .then((response) => {
                Confirm();
              })
              .catch((error) => {
                //mensaje error
                toast.error('Ha ocurrido un error inesperado', {
                  position: 'top-right',
                  hideProgressBar: false,
                });
                // si da error eliminar el registro
              });
          } else {
            // Mensaje de error al crear el registro
            toast.error('Ha ocurrido un error inesperado', {
              position: 'top-right',
              hideProgressBar: false,
            });
          }
        })
        .catch((error) => {
          /* Mensaje de error con servidor o creacion de registro */
          toast.error('Ha ocurrido un error inesperado', {
            position: 'top-right',
            hideProgressBar: false,
          });
        });
    } else {
      // Mensaje de registrar usuarios
      toast.warning('Debe registrar estudiantes ', {
        position: 'top-right',
        hideProgressBar: false,
      });
    }
  };

  const handleUsers = async ({ ControlNumber }) => {
    await SearchStudentByControlNumber(ControlNumber)
      .then(({ data }) => {
        if (data !== undefined) {
          const tempData = { ...data, Hora: now.format('h:mm:ss a') };

          const prueba = dataTable.find(
            (current) => current.id_estudiante === tempData.id_estudiante
          );

          if (prueba === undefined) {
            setData((prevValue) => [...prevValue, tempData]);
          } else {
            // Notificacion de usuario ya registrado
            toast.warning('Estudiante registrado', {
              position: 'top-right',
              hideProgressBar: false,
            });
          }
          reset();
        } else {
          toast.error('Estudiante no encontrado', {
            position: 'top-right',
            hideProgressBar: false,
          });
        }
      })
      .catch((error) => {
        // Notificacion de usuario no registrado
        toast.error('Estudiante no encontrado', {
          position: 'top-right',
          hideProgressBar: false,
        });
      });
  };

  const Confirm = async () => {
    await Swal.fire({
      title: '<strong>Continuar</strong>',
      html: 'Registro guardado con éxito.',
      color: '#333',
      icon: 'info',
      iconColor: '#5fa2db',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#5fa2db',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCurrentPage(0);
      }
    });
  };

  return (
    <>
      <div className="box-controlAcceso">
        <div className="container-InfoAcceso">
          <h5>Datos del registro de acceso</h5>
          <Row className="container-division">
            <Col xs={6}>
              <h6>
                <b>Materia:</b>{' '}
                {DatosMateria?.Clave + ' - ' + DatosMateria?.NombreMateria}
              </h6>
              <h6>
                <b>Laboratorio:</b>{' '}
                {laboratorio?.ClaveLaboratorio +
                  ' - ' +
                  laboratorio?.NombreLaboratorio}
              </h6>
              <h6>
                {' '}
                <b>Docente:</b> {docente?.Nombre + ' ' + docente?.Apellido}
              </h6>
            </Col>
            <Col xs={6}>
              <h6>
                <b>Día:</b> {materia?.Dia}
              </h6>
              <h6>
                <b>Horario:</b>{' '}
                {materia?.HoraInicio + ' - ' + materia?.HoraFinal}
              </h6>
              <h6>
                <b>Fecha:</b> {hoy.toLocaleDateString()}
              </h6>
            </Col>
          </Row>
        </div>
        <div className="container-DataTable-ControlAcceso">
          <div className="container-DataTable-header">
            <div className="container-DataTable-title">Registros </div>
            <form onSubmit={handleSubmit(handleUsers)}>
              <div style={{ display: 'flex' }}>
                <div className="input-CU">
                  {errors.ControlNumber && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="ControlNumber"
                    type="text"
                    placeholder="Número de control"
                    {...register('ControlNumber', { required: true })}
                  />
                </div>
                <div>
                  <button type="submit" className="divContainer-BtnCA">
                    <FaArrowRight size={26} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {dataTable.length > 0 && (
            <div className="div-DataTable-ListaEstudiantes">
              <DataTable
                columns={columnas}
                data={dataTable}
                highlightOnHover={true}
                fixedHeader
                fixedHeaderScrollHeight={'15rem'}
              />
            </div>
          )}
          {dataTable.length === 0 && (
            <div className="divContainer-DatatableEmpty-CA">
              <h5>
                <ImInfo size={22} color={'#5fa2db'} /> No se han registrado
                estudiantes aún
              </h5>
              <h6>Comience a ingresar estudiantes por número de control.</h6>
            </div>
          )}
        </div>
      </div>
      <div className="container-ExtraCA">
        <Row xs={2} md={2} className="mb-2">
          <Col className=" input-CU">
            <label className="mb-1">Observaciones </label>
            <input
              placeholder="Observaciones del laboratorio"
              type="text"
              onBlur={(e) => {
                setObservaciones(e.target.value);
              }}
            />
          </Col>
          <Col>
            <p className="mb-1">Herramientas</p>
            <HerramientaSelect
              laboratorio={id_laboratorio}
              onChange={(item) => setHerramientas(item)}
            />
          </Col>
        </Row>
      </div>
      <div className="form-group mt-4">
        <button
          type="submit"
          className="btn btn-md btn-outline-info"
          onClick={() => setCurrentPage(1)}
        >
          Cambiar materia
        </button>

        <button
          type="submit"
          className="btn-md btn-fg btn-block"
          onClick={handleCreate}
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default ControlAcceso;
