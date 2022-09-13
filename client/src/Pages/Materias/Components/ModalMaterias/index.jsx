import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Modal as CustomModal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { styleSelect } from '../../../../styles/selectStyle';
import { CreateMaterias, UpdateMaterias } from '../../../../API';
import { toast } from 'react-toastify';
import './styles.css';

const ModalMaterias = (props) => {
  const { show, onClose, currentRow, usuarios } = props;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Asignar valores por defecto, para edicion de elementos
    if (currentRow !== null) {
      // Sirve para editar, reinicia los valores dependiendo los existentes
      setValue('Clave', currentRow?.Clave);
      setValue('NombreMateria', currentRow?.NombreMateria);
      setValue('id_Usuario', currentRow?.id_Usuario);
    } else {
      // sirve para limpiar el formulario
      reset(
        {
          Clave: '',
          NombreMateria: '',
          id_usuario: '',
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
      await UpdateMaterias(data, currentRow.id_materia)
        .then((res) => {
          // Se edito correctamente
          if (res?.data.success) {
            toast.success('Materia editada con éxito', {
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
      await CreateMaterias(data).then((res) => {
        if (res?.success) {
          toast.success('Materia agregada con éxito', {
            position: 'top-right',
            hideProgressBar: false,
          });
          reset(); //
          onClose();
        } else {
          toast.error('Ha ocurrido un error inesperado', {
            position: 'top-right',
            hideProgressBar: false,
          });
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
                {currentRow !== null ? 'Editar materia' : 'Agregar materia'}
              </h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <div className="container-materiasList mx-5">
              <Row xs={2} md={2} className="mb-2 input-LM">
                <Col>
                  <label className="mb-1">Clave de la materia</label>
                  {errors.Clave && <span className="error">* requerido</span>}
                  <input
                    name="Clave"
                    type="text"
                    {...register('Clave', { required: true })}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Nombre de la materia</label>
                  {errors.NombreMateria && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="NombreMateria"
                    type="text"
                    {...register('NombreMateria', { required: true })}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <label className="mb-1">Docente </label>
                  {errors.id_usuario && (
                    <span className="error">* requerido</span>
                  )}
                  <Controller
                    name="id_usuario"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Select
                          styles={styleSelect}
                          placeholder={'Seleccione una opción'}
                          options={usuarios}
                          onChange={(options) => onChange(options.value)}
                          onBlur={onBlur}
                          value={usuarios.find(
                            (option) => option.value === value
                          )}
                          defaultValue={usuarios.find(
                            (option) => option.value === currentRow?.id_usuario
                          )}
                        />
                      );
                    }}
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

export default ModalMaterias;
