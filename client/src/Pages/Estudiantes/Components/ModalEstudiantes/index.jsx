import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Modal as CustomModal, Row } from 'react-bootstrap';
import { CreateStudents, UpdateStudents } from '../../../../API';
import { toast } from 'react-toastify';
import './styles.css';

const ModalEstudiantes = (props) => {
  const { show, onClose, currentRow } = props;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Asignar valores por defecto, para edicion de elementos
    if (currentRow !== null) {
      // Sirve para editar, reinicia los valores dependiendo los existentes
      setValue('Nombre', currentRow?.Nombre);
      setValue('Apellido', currentRow?.Apellido);
      setValue('NoControl', currentRow?.NoControl);
      setValue('Correo', currentRow?.Correo);
    } else {
      // sirve para limpiar el formulario
      reset(
        {
          Nombre: '',
          Apellido: '',
          NoControl: '',
          Correo: '',
        },
        {
          keepErrors: false,
          keepDirty: false,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false,
        }
      );
    }
  }, [currentRow]);

  const onSubmit = async (data) => {
    if (currentRow !== null) {
      await UpdateStudents(data, currentRow.id_estudiante)
        .then((res) => {
          // Se edito correctamente
          toast.success('Estudiante editado con éxito', {
            position: 'top-right',
            hideProgressBar: false,
          });
          onClose();
        })
        .catch((err) => {
          //  error
          toast.error('Ha ocurrido un error inesperado', {
            position: 'top-right',
            hideProgressBar: false,
          });
        });
      // edicion
    } else {
      // agregar
      reset();
      await CreateStudents(data)
        .then((res) => {
          if (res.response.status !== 400) {
            toast.success('Estudiante agregado con éxito', {
              position: 'top-right',
              hideProgressBar: false,
            });
            onClose();
          } else {
            toast.warning('error de usuario duplicado', {
              position: 'top-right',
              hideProgressBar: false,
            });
          }
        })
        .catch((err) => {
          //  error
          toast.error('Ha ocurrido un error inesperado', {
            position: 'top-right',
            hideProgressBar: false,
          });
        });
    }
  };
  return (
    <>
      <CustomModal show={show} onHide={onClose} animation={false} size={'lg'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomModal.Header closeButton>
            <CustomModal.Title>
              <h4>
                {currentRow !== null
                  ? 'Editar estudiante'
                  : 'Agregar estudiante'}
              </h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <div className="container-estudiantesList mx-5">
              <Row xs={2} md={2} className="mb-2 input-LE">
                <Col>
                  <label className="mb-1">Nombre</label>
                  {errors.Nombre && <span className="error">* requerido</span>}
                  <input
                    name="Nombre"
                    type="text"
                    {...register('Nombre', { required: true })}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Apellido</label>
                  {errors.Apellido && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="Apellido"
                    type="text"
                    {...register('Apellido', { required: true })}
                  />
                </Col>
              </Row>
              <Row xs={2} md={2} className="mb-2 input-LE">
                <Col>
                  <label className="mb-1">No. de control</label>
                  {errors.NoControl && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="NoControl"
                    type="text"
                    {...register('NoControl', { required: true })}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Correo electrónico</label>
                  {errors.Correo && <span className="error">* requerido</span>}
                  <input
                    name="Correo"
                    type="email"
                    {...register('Correo', { required: true })}
                  />
                </Col>
              </Row>
            </div>
          </CustomModal.Body>
          <CustomModal.Footer>
            <div className="form-group mt-2">
              <button type="submit" className="btn-md btn-fg btn-block">
                {currentRow !== null ? 'Editar' : 'Agregar'}
              </button>
            </div>
          </CustomModal.Footer>
        </form>
      </CustomModal>
    </>
  );
};

export default ModalEstudiantes;
