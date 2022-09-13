import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Modal as CustomModal, Row, Table } from 'react-bootstrap';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { styleSelect } from '../../../../styles/selectStyle';
import {
  GetLaboratories,
  GetMaterias,
  getClasesByIdLaboratory,
  CreateSchedules,
  DeactivateClass,
} from '../../../../API';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './styles.css';

const Dias = [
  { Name: 'Lunes' },
  { Name: 'Martes' },
  { Name: 'Miercoles' },
  { Name: 'Jueves' },
  { Name: 'Viernes' },
  { Name: 'Sabado' },
];

const Horas = [
  {
    value: 0,
    label: '7:00',
  },
  {
    value: 1,
    label: '8:00',
  },
  {
    value: 2,
    label: '9:00',
  },
  {
    value: 3,
    label: '10:00',
  },
  {
    value: 4,
    label: '11:00',
  },
  {
    value: 5,
    label: '12:00',
  },
  {
    value: 6,
    label: '13:00',
  },
  {
    value: 7,
    label: '14:00',
  },
  {
    value: 8,
    label: '15:00',
  },
  {
    value: 9,
    label: '16:00',
  },
  {
    value: 10,
    label: '17:00',
  },
  {
    value: 11,
    label: '18:00',
  },
  {
    value: 12,
    label: '19:00',
  },
  {
    value: 13,
    label: '20:00',
  },
  {
    value: 14,
    label: '21:00',
  },
  {
    value: 15,
    label: '22:00',
  },
];
let horarioTemporal = [null, null, null, null, null, null];

const ModalHorario = (props) => {
  const { show, onClose, currentRow } = props;
  const [laboratorios, setLaboratorios] = useState(null);
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [mostrarHoras, setMostrarHoras] = useState(false);
  const [materias, setMaterias] = useState(null);
  const [clases, setClases] = useState(null);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [longitud, setLogintud] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temp, setTemp] = useState([...Horas]);
  let Horario = [];
  const [checkedState, setCheckedState] = useState(
    new Array(Dias.length).fill(false)
  );

  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetLaboratories().then((response) => {
      setLaboratorios(response.data);
    });

    GetMaterias().then((response) => {
      setMaterias(response.data);
    });
  }, []);

  const Confirm = async () => {
    await Swal.fire({
      title: '<strong>Continuar</strong>',
      html: 'Horario creado con éxito.',
      color: '#333',
      icon: 'info',
      iconColor: '#5fa2db',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#5fa2db',
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleOnClear();
        onClose();
      }
    });
  };

  const ConfirmError = async () => {
    await Swal.fire({
      title: '<strong>Continuar</strong>',
      html: 'No se pudo crear el horario.',
      color: '#333',
      icon: 'warning',
      iconColor: '#f1c40f',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f1c40f',
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleOnClear();
        onClose();
      }
    });
  };

  useEffect(() => {
    if (longitud === 1) {
      if (deleteError) {
        ConfirmError();
      } else {
        Confirm();
      }
    } else {
      if (longitud === currentIndex + 1 && !error && !deleteError) {
        Confirm();
      }
    }
  }, [currentIndex, longitud, error, deleteError]);

  const onSubmit = async (data) => {
    let JsonFinal = [];
    await Object.entries(data).map((item, index) => {
      let diaTemp = item[0].split('-');
      if (diaTemp[1] === 'Inicio' && item[1] !== undefined) {
        let nextValue = Object.values(data)[index + 1];
        let temp = {
          Dia: diaTemp[0],
          Inicio: [],
          Fin: [],
        };

        temp.Inicio.push({
          HoraInicio: item[1].label,
          SlotInicial: item[1].value,
        });

        temp.Fin.push({
          HoraFinal: nextValue.label,
          SlotFinal: Number(nextValue.value) - 1,
        });

        JsonFinal.push(temp);
      }
    });

    let params = new URLSearchParams();
    let CustomID = uuidv4();

    setLogintud(JsonFinal.length);

    JsonFinal.map(async (item, index) => {
      params = new URLSearchParams();
      params.append('id_laboratorio', laboratorioSeleccionado.value);
      params.append('id_materia', materiaSeleccionada.value);
      params.append('Dia', item.Dia);
      params.append('HoraInicio', item.Inicio[0].HoraInicio);
      params.append('HoraFinal', item.Fin[0].HoraFinal);
      params.append('SlotInicial', item.Inicio[0].SlotInicial);
      params.append('SlotFinal', item.Fin[0].SlotFinal);
      params.append('CustomID', CustomID);
      const response = await handleCreateSchedule(params);

      if (response) {
        // Eliminar
        setCurrentIndex(0);
        await DeactivateClass(CustomID).then(({ data }) => {
          if (data.status) {
            ConfirmError();
          }
        });
        return;
      }

      setCurrentIndex(index);
    });
  };

  const handleCreateSchedule = async (params) => {
    let responseStatus = null;
    await CreateSchedules(params)
      .then((response) => {
        if (response.status !== false) {
          responseStatus = false;
        } else {
          responseStatus = true;
          setDeleteError(true);
          setError(true);
        }
      })
      .catch((error) => {
        responseStatus = true;
        setError(true);
      });
    return responseStatus;
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    if (updatedCheckedState[position]) {
      clases.map((item) => {
        if (item.Dia === Dias[position].Name) {
          let sucesionSlots = [];

          let slots = item.Slot.split('-');
          for (let i = parseInt(slots[0]); i <= parseInt(slots[1]); i++)
            sucesionSlots.push(Number(i));
          sucesionSlots.map((item) => delete temp[item]);
        }
      });

      if (Dias[position].Name === 'Lunes') {
        horarioTemporal[0] = temp;
      } else if (Dias[position].Name === 'Martes') {
        horarioTemporal[1] = temp;
      } else if (Dias[position].Name === 'Miercoles') {
        horarioTemporal[2] = temp;
      } else if (Dias[position].Name === 'Jueves') {
        horarioTemporal[3] = temp;
      } else if (Dias[position].Name === 'Viernes') {
        horarioTemporal[4] = temp;
      } else if (Dias[position].Name === 'Sabado') {
        horarioTemporal[5] = temp;
      }
    } else {
      if (Dias[position].Name === 'Lunes') {
        horarioTemporal[0] = null;
      } else if (Dias[position].Name === 'Martes') {
        horarioTemporal[1] = null;
      } else if (Dias[position].Name === 'Miercoles') {
        horarioTemporal[2] = null;
      } else if (Dias[position].Name === 'Jueves') {
        horarioTemporal[3] = null;
      } else if (Dias[position].Name === 'Viernes') {
        horarioTemporal[4] = null;
      } else if (Dias[position].Name === 'Sabado') {
        horarioTemporal[5] = null;
      }
    }

    setMostrarHoras(updatedCheckedState.includes(true));
    setCheckedState(updatedCheckedState);

    setTemp([...Horas]);
  };

  const handleSelectChange = ({ value }) => {
    getClasesByIdLaboratory(value).then((response) => {
      setClases(response.data);
    });
  };

  const handleSchedule = () => {
    checkedState.map((item, index) => {
      if (item)
        Horario.push(
          <div className="contenedor-Horario">
            <div className="contenedor-Horario-titulo">{Dias[index].Name}</div>

            <div className="contenedor-Horario-horas">
              <div>
                <label>Hora inicio</label>
                {errors[Dias[index].Name + '-Inicio'] && (
                  <span className="error">* requerido</span>
                )}
                <Controller
                  name={Dias[index].Name + '-Inicio'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Select
                        styles={styleSelect}
                        placeholder={'Seleccione una opción'}
                        onChange={(e) => {
                          let Fin = getValues(Dias[index].Name + '-Fin');
                          if (Fin !== undefined) {
                            if (e.value < Fin.value) {
                              onChange(e);
                            } else {
                              toast.warning(
                                'La hora final no puede ser menor o igual a la hora inicial',
                                {
                                  position: 'top-right',
                                  hideProgressBar: false,
                                }
                              );
                            }
                          } else {
                            onChange(e);
                          }
                        }}
                        value={value}
                        className="contenedor-horario-input-inicio"
                        options={horarioTemporal[index]?.map((item) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <label>Hora fin</label>
                {errors[Dias[index].Name + '-Fin'] && (
                  <span className="error">* requerido</span>
                )}
                <Controller
                  name={Dias[index].Name + '-Fin'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Select
                        styles={styleSelect}
                        onChange={(e) => {
                          let Inicio = getValues(Dias[index].Name + '-Inicio');

                          if (Inicio !== undefined) {
                            if (e.value > Inicio.value) {
                              onChange(e);
                            } else {
                              toast.warning(
                                'La hora inicial no puede ser mayor o igual a la hora final',
                                {
                                  position: 'top-right',
                                  hideProgressBar: false,
                                }
                              );
                            }
                          } else {
                            onChange(e);
                          }
                        }}
                        value={value}
                        placeholder={'Seleccione una opción'}
                        className="contenedor-horario-input-fin"
                        options={Horas}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        );
    });
    return Horario;
  };

  const handleOnClear = () => {
    setLaboratorioSeleccionado(null);
    setMateriaSeleccionada(null);
    setCheckedState(new Array(Dias.length).fill(false));
    setMostrarHoras(false);
    setLogintud(null);
    setCurrentIndex(0);
    setDeleteError(false);
    setError(false);
    reset();
  };

  return (
    <>
      <CustomModal
        show={show}
        onHide={() => {
          handleOnClear();
          onClose();
        }}
        animation={false}
        size={'lg'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomModal.Header closeButton>
            <CustomModal.Title>
              <h4>Agregar horario</h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <div className="container-cuentasUsuario mx-5">
              <Row xs={1} md={2} className="mb-2">
                <Col>
                  <label className="mb-1">Laboratorio </label>
                  <Select
                    styles={styleSelect}
                    placeholder={'Seleccione una opción'}
                    options={laboratorios?.map((item) => ({
                      label:
                        item.ClaveLaboratorio + ' - ' + item.NombreLaboratorio,
                      value: item.id_laboratorio,
                    }))}
                    onChange={(option) => {
                      if (laboratorioSeleccionado !== null) handleOnClear();
                      setLaboratorioSeleccionado(option);
                      handleSelectChange(option);
                    }}
                    value={laboratorioSeleccionado}
                    defaultValue={laboratorios?.find(
                      (c) => c.value === currentRow?.id_laboratorio
                    )}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Materia </label>

                  <Select
                    styles={styleSelect}
                    placeholder={'Seleccione una opción'}
                    options={materias?.map((item) => ({
                      label:
                        item.Clave +
                        ' - ' +
                        item.NombreMateria +
                        ' - ' +
                        item.usuario.Nombre +
                        ' ' +
                        item.usuario.Apellido,
                      value: item.id_materia,
                    }))}
                    onChange={(option) => setMateriaSeleccionada(option)}
                    value={materiaSeleccionada}
                    defaultValue={materias?.find(
                      (c) => c.value === currentRow?.id_materia
                    )}
                  />
                </Col>
              </Row>
              {laboratorioSeleccionado && materiaSeleccionada && (
                <>
                  <Row xs={1} md={1} className="mb-2">
                    <Col>
                      <label className="mb-1">Dias </label>
                      <div className="contenedor-horario-dias">
                        {Dias.map(({ Name }, index) => {
                          return (
                            <div className="contenedor-horario-dia">
                              <label htmlFor={`custom-checkbox-${index}`}>
                                {Name}
                              </label>
                              <input
                                name={Name}
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                value={Name}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                                style={{
                                  width: '1.5rem',
                                  height: '1.5rem',
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  {mostrarHoras && (
                    <Row xs={1} md={1} className="mb-2">
                      <Col>
                        <label className="mb-1">Horario</label>
                        <div className="Contenedor-Horarios">
                          {handleSchedule()}
                        </div>
                      </Col>
                    </Row>
                  )}
                </>
              )}
            </div>
          </CustomModal.Body>
          {mostrarHoras && (
            <CustomModal.Footer>
              <div className="form-group mt-2">
                <button type="submit" className="btn-md btn-fg btn-block">
                  Agregar
                </button>
              </div>
            </CustomModal.Footer>
          )}
        </form>
      </CustomModal>
    </>
  );
};

export default ModalHorario;
