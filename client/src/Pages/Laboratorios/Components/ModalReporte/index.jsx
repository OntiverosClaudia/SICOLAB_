import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Modal as CustomModal, Row } from 'react-bootstrap';
import ReactExport from '@ibrahimrahmani/react-export-excel';
import {
  CreateReportLaboratory,
  CreateReportLaboratoryNoGroup,
  GetLaboratories,
} from '../../../../API';
import Select from 'react-select';
import { styleSelect } from '../../../../styles/selectStyle';
import { MdDownload } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import './styles.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ModalReporte = (props) => {
  const { show, onClose, currentRow } = props;
  const [laboratorios, setLaboratorios] = useState(null); //
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null); //
  const [reporteGenerado, setReporteGenerado] = useState(false); //
  const [jsonResult] = useState([]); //

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const HandleLabs = async () => {
    await GetLaboratories()
      .then((res) => {
        let tempData = [];
        res.data.map((item) =>
          tempData.push({
            label: item.ClaveLaboratorio + ' - ' + item.NombreLaboratorio,
            value: item.id_laboratorio,
          })
        );
        setLaboratorios(tempData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    HandleLabs();
  }, []);

  const onSubmit = async (data) => {
    let tempLaboratorio = laboratorios.filter(
      (item) => item.value === data.id_laboratorio.value
    );
    setLaboratorioSeleccionado(tempLaboratorio[0].label);

    if (jsonResult.length) jsonResult.splice(0, jsonResult.length);

    if (data.TipoReporte) {
      await CreateReportLaboratoryNoGroup({
        id_laboratorio: data.id_laboratorio.value,
        FechaInicial: data.FechaInicial,
        FechaFinal: data.FechaFinal,
      }).then((result) => {
        if (result) {
          handleReportNoGroup(result);
        } else {
          toast.warning('No existen registros dentro del rango de fechas', {
            position: 'top-right',
            hideProgressBar: false,
          });
        }
      });
    } else {
      await CreateReportLaboratory({
        id_laboratorio: data.id_laboratorio.value,
        FechaInicial: data.FechaInicial,
        FechaFinal: data.FechaFinal,
      }).then((result) => {
        if (result) {
          handleCreateReport(result);
        } else {
          toast.warning('No existen registros dentro del rango de fechas', {
            position: 'top-right',
            hideProgressBar: false,
          });
        }
      });
    }
  };

  const handleReportNoGroup = async (currentDataNoGroup) => {
    const tempDataNoGroup = [
      {
        columns: [
          {
            value: 'FECHA',
            widthPx: 120,
          },
          {
            value: 'LABORATORIO',
            widthPx: 250,
          },
          {
            value: 'MATERIA',
            widthPx: 250,
          },
          {
            value: 'DOCENTE',
            widthPx: 220,
          },
          {
            value: 'HORARIO',
            widthPx: 100,
          },
          {
            value: 'HORAS DE USO',
            widthPx: 100,
          },
        ],
        data: [],
      },
    ];

    if (currentDataNoGroup.length > 0) {
      await currentDataNoGroup.forEach((item) => {
        tempDataNoGroup[0].data.push([
          dayjs(item.Fecha).format('DD/MM/YYYY HH:mm'),
          item.clase.laboratorio.ClaveLaboratorio +
            ' - ' +
            item.clase.laboratorio.NombreLaboratorio,
          item.clase.materia.Clave + ' - ' + item.clase.materia.NombreMateria,
          item.clase.materia.usuario.Nombre +
            ' ' +
            item.clase.materia.usuario.Apellido,
          item.clase.HoraInicio + ' - ' + item.clase.HoraFinal,
          parseInt(item.clase.HoraFinal) - parseInt(item.clase.HoraInicio),
        ]);
      });
    }

    jsonResult.push(tempDataNoGroup[0]);
    setReporteGenerado(true);
  };

  const handleCreateReport = async (currentData) => {
    const tempData = [
      {
        columns: [
          { value: 'LABORATORIO', widthPx: 250 },
          { value: 'MATERIA', widthPx: 250 },
          { value: 'DOCENTE', widthPx: 220 },
          { value: 'HORAS DE USO', widthPx: 100 },
        ],
        data: [],
      },
    ];

    if (currentData.length > 0) {
      await currentData.forEach((item) => {
        let tempHoras =
          item.Uso *
          (parseInt(item.clase.HoraFinal) - parseInt(item.clase.HoraInicio));

        tempData[0].data.push([
          item.clase.laboratorio.ClaveLaboratorio +
            ' - ' +
            item.clase.laboratorio.NombreLaboratorio,
          item.clase.materia.Clave + ' - ' + item.clase.materia.NombreMateria,
          item.clase.materia.usuario.Nombre +
            ' ' +
            item.clase.materia.usuario.Apellido,
          tempHoras,
        ]);
      });
    }

    jsonResult.push(tempData[0]);
    setReporteGenerado(true);
  };

  const handleClose = () => {
    reset();
    setReporteGenerado(false);
    onClose();
    setLaboratorioSeleccionado(null);
  };

  const Confirm = async () => {
    await Swal.fire({
      title: '<strong>Continuar</strong>',
      html:
        'Reporte de uso del <b>' +
        laboratorioSeleccionado +
        '</b> guardado con éxito.',
      color: '#333',
      icon: 'info',
      iconColor: '#5fa2db',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#5fa2db',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleClose();
      }
    });
  };

  if (reporteGenerado) {
    Confirm();
    return (
      <CustomModal
        show={show}
        onHide={onClose}
        animation={false}
        size={'xs'}
        style={{ visibility: 'hidden' }}
      >
        <CustomModal.Footer>
          <ExcelFile
            hideElement={true}
            filename={`Reporte de uso ${dayjs(new Date()).format(
              'DD/MM/YYYY HH:mm'
            )}`}
            fileExtension="xlsx"
          >
            <ExcelSheet dataSet={jsonResult} name="Reporte de uso" />
          </ExcelFile>
        </CustomModal.Footer>
      </CustomModal>
    );
  }

  return (
    <CustomModal show={show} onHide={onClose} animation={false} size={'lg'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomModal.Header closeButton>
          <CustomModal.Title>
            <h4>Reporte de uso laboratorio</h4>
          </CustomModal.Title>
        </CustomModal.Header>
        <CustomModal.Body>
          <div className="container-laboratoriosList mx-5">
            <Row xs={1} md={1} className="mb-2">
              <Col>
                <span className="mb-1">Laboratorio </span>
                {errors.id_laboratorio && (
                  <span className="error">* requerido</span>
                )}
                <Controller
                  name="id_laboratorio"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <Select
                        styles={styleSelect}
                        placeholder={'Seleccione una opción'}
                        options={laboratorios}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={laboratorios.find((c) => c.value === value)}
                        defaultValue={laboratorios?.find(
                          (c) =>
                            c.value === currentRow?.laboratorio.id_laboratorio
                        )}
                      />
                    );
                  }}
                />
              </Col>
            </Row>
            <Row xs={1} md={2} className="mb-2 input-LL">
              <Col>
                <label className="mb-1">Fecha inicial</label>
                {errors.FechaInicial && (
                  <span className="error">* requerido</span>
                )}
                <input
                  type="date"
                  {...register('FechaInicial', { required: true })}
                />
              </Col>
              <Col>
                <label className="mb-1">Fecha final</label>
                {errors.FechaFinal && (
                  <span className="error">* requerido</span>
                )}
                <input
                  type="date"
                  {...register('FechaFinal', { required: true })}
                />
              </Col>
            </Row>
            <Row xs={1} md={1} className="mb-2">
              <Col>
                <div
                  className="contenedor-horario-dias mt-4"
                  style={{ float: 'right' }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                    }}
                    {...register('TipoReporte')}
                  />
                  <label>Reporte detallado</label>
                </div>
              </Col>
            </Row>
          </div>
        </CustomModal.Body>
        <CustomModal.Footer>
          <div className="containerdiv-btnDownload">
            <button type="submit" className="btnDownload">
              <MdDownload size={20} className="icon-Download" /> Generar reporte
            </button>
          </div>
        </CustomModal.Footer>
      </form>
    </CustomModal>
  );
};

export default ModalReporte;
