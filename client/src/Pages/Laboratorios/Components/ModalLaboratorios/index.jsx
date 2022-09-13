import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Modal as CustomModal, Row } from 'react-bootstrap';
import { CreateLaboratory, UpdateLaboratory } from '../../../../API';
import { toast } from 'react-toastify';
import './styles.css';

const ModalLaboratorios = (props) => {
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
      setValue('ClaveLaboratorio', currentRow?.ClaveLaboratorio);
      setValue('NombreLaboratorio', currentRow?.NombreLaboratorio);
    } else {
      // sirve para limpiar el formulario
      reset(
        {
          ClaveLaboratorio: '',
          NombreLaboratorio: '',
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
      await UpdateLaboratory(data, currentRow.id_laboratorio)
        .then((res) => {
          // Se edito correctamente
          if (res?.data.success) {
            toast.success('Laboratorio editado con éxito', {
              position: 'top-right',
              hideProgressBar: false,
            });
            onClose();
          } else {
            toast.error('Ha ocurrido un error inesperado', {
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
      // edicion
    } else {
      // agregar
      await CreateLaboratory(data).then((res) => {
        if (res?.success) {
          toast.success('Laboratorio agregado con éxito', {
            position: 'top-right',
            hideProgressBar: false,
          });
          reset(); //
          onClose();
        }
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
                  ? 'Editar laboratorio'
                  : 'Agregar laboratorio'}
              </h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <div className="container-laboratoriosList mx-5">
              <Row xs={1} md={2} className="mb-2 input-LL">
                <Col>
                  <label className="mb-1">Clave de laboratorio</label>
                  {errors.ClaveLaboratorio && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="ClaveLaboratorio"
                    type="text"
                    {...register('ClaveLaboratorio', { required: true })}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Nombre de laboratorio</label>
                  {errors.NombreLaboratorio && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="NombreLaboratorio"
                    type="text"
                    {...register('NombreLaboratorio', { required: true })}
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

export default ModalLaboratorios;
