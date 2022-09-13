import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Col,
  Modal as CustomModalExcel,
  Row,
  ProgressBar,
} from 'react-bootstrap';
import { CreateStudents } from '../../../../API';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { WiCloudUp } from 'react-icons/wi';
import * as XLSX from 'xlsx';
import './styles.css';

const ModalEstudiantesExcel = (props) => {
  const { show, onClose } = props;
  const [fileName, setFileName] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [longitud, setLogintud] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const [errorNumber, setErrorNumber] = useState(0);
  const now = currentIndex;

  useEffect(() => {
    if (longitud === currentIndex + 1 && !error) {
      Confirm();
    } else if (longitud === currentIndex + 1 && error) {
      ConfirmError();
    }
  }, [currentIndex, longitud, error]);

  const Confirm = async () => {
    await Swal.fire({
      title: '<strong>Continuar</strong>',
      html: 'Usuarios registrados con éxito.',
      color: '#333',
      icon: 'info',
      iconColor: '#5fa2db',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#5fa2db',
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleReset();
        onClose();
      }
    });
  };

  const ConfirmError = async () => {
    await Swal.fire({
      title: '<strong>Continuar</strong>',
      html: ` ${errorNumber} usuarios no fueron registrados.`,
      color: '#333',
      icon: 'warning',
      iconColor: '#f1c40f',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f1c40f',
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleReset();
        onClose();
      }
    });
  };

  const onSubmit = () => {
    let dataParse = null;
    if (excelFile !== null) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        dataParse = XLSX.utils.sheet_to_json(worksheet, { header: 2 });

        setLogintud(dataParse.length);
        if (dataParse) {
          await dataParse.map(async (item, index) => {
            await hanldeCreate(item);
            setCurrentIndex(index);
          });
        }
      };

      reader.readAsBinaryString(excelFile);
    }
  };

  const handleReset = () => {
    setFileName(null);
    setExcelFile(null);
    setLogintud(null);
    setCurrentIndex(0);
    setErrorNumber(0);
    setError(false);
  };

  const hanldeCreate = async (estudiante) => {
    await CreateStudents(estudiante)
      .then((response) => {
        if (response?.Activo === 1) {
          setError(false);
        } else {
          if (response.response.status !== 400) {
            setError(false);
          } else {
            setErrorNumber((prev) => prev + 1);
            setError(true);
            toast.warning(`Error usuario duplicado ${estudiante.NoControl}`, {
              position: 'top-right',
              hideProgressBar: false,
            });
          }
        }
      })
      .catch((error) => {
        setError(true);
        toast.error('Ha ocurrido un error inesperado', {
          position: 'top-right',
          hideProgressBar: false,
        });
      });
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
    setFileName(file.name);
  };

  return (
    <>
      <CustomModalExcel
        show={show}
        onHide={() => {
          onClose();
          handleReset();
        }}
        animation={false}
        size={'lg'}
      >
        <CustomModalExcel.Header closeButton>
          <CustomModalExcel.Title>
            <h4>Agregar estudiantes</h4>
          </CustomModalExcel.Title>
        </CustomModalExcel.Header>
        <CustomModalExcel.Body>
          <div className="container-estudiantesList">
            {/* Seccion subir archivo */}
            <Row xs={1} md={1} className="mb-2">
              <Col>
                <div className="file">
                  <label htmlFor="input-file">
                    <WiCloudUp size={44} className="IconUploud" /> Seleccione un
                    archivo de excel
                  </label>
                  <input
                    name="excelFile"
                    id="input-file"
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFile}
                    required
                  />
                </div>
                {fileName && (
                  <h6 className="text-H6EstudiantesExcel p-3">
                    <b>Archivo: </b> {fileName}
                  </h6>
                )}
              </Col>
              {currentIndex !== 0 && (
                <>
                  <label>
                    Cargando {currentIndex + 1} / {longitud} estudiantes
                  </label>
                  <ProgressBar
                    animated
                    now={(now * 100) / longitud}
                    label={`${now}%`}
                    max={longitud}
                    visuallyHidden
                  />
                </>
              )}
              <Col>
                <div className="form-group mt-2">
                  {excelFile && (
                    <button
                      className={`btn-md btn-fg btn-block `}
                      style={{ marginTop: 5 + 'px' }}
                      onClick={() => onSubmit()}
                    >
                      Convertir
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </CustomModalExcel.Body>
      </CustomModalExcel>
    </>
  );
};
export default ModalEstudiantesExcel;
