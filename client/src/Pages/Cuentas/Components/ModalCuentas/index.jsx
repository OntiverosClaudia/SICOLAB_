import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Modal as CustomModal, Row, Table } from 'react-bootstrap';
import Select from 'react-select';
import { styleSelect } from '../../../../styles/selectStyle';
import { CreateUsers, UpdateUsers } from '../../../../API';
import { toast } from 'react-toastify';
import './styles.css';

const ModalCuentas = (props) => {
  const { show, onClose, currentRow, roles } = props;

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
      setValue('Nombre', currentRow?.Nombre);
      setValue('Apellido', currentRow?.Apellido);
      setValue('CodigoInstitucional', currentRow?.CodigoInstitucional);
      setValue('Correo', currentRow?.Correo);
    } else {
      // sirve para limpiar el formulario
      reset(
        {
          id_rol: '',
          Nombre: '',
          Apellido: '',
          CodigoInstitucional: '',
          Correo: '',
          Contraseña: '',
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
      await UpdateUsers(data, currentRow.id_usuario)
        .then((res) => {
          // Se edito correctamente
          console.log(res?.data.success);
          if (res?.data.success) {
            toast.success('Usuario editado con éxito', {
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
      await CreateUsers(data).then((res) => {
        if (res?.success) {
          toast.success('Usuario agregado con éxito', {
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
                {currentRow !== null ? 'Editar usuario' : 'Agregar usuario'}
              </h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <div className="container-cuentasUsuario mx-5">
              <Row className="mb-2">
                <Col>
                  <label className="mb-1">Rol </label>
                  {errors.id_rol && <span className="error">* requerido</span>}
                  <Controller
                    name={'id_rol'}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <Select
                          styles={styleSelect}
                          placeholder={'Seleccione una opción'}
                          options={roles}
                          onChange={(options) => onChange(options.value)}
                          onBlur={onBlur}
                          value={roles.find((c) => c.value === value)}
                          defaultValue={roles.find(
                            (c) => c.value === currentRow?.id_rol
                          )}
                        />
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row xs={1} md={2} className="mb-2 input-CU">
                <Col>
                  <label className="mb-1">Nombre </label>
                  {errors.Nombre && <span className="error">* requerido</span>}
                  <input
                    name="Nombre"
                    type="text"
                    {...register('Nombre', { required: true })}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Apellido </label>
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
              <Row className="mb-2 input-CU">
                <Col>
                  <label className="mb-1">Código institucional </label>
                  {errors.CodigoInstitucional && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="CodigoInstitucional"
                    type="text"
                    {...register('CodigoInstitucional', { required: true })}
                  />
                </Col>
              </Row>
              <Row xs={1} md={2} className="mb-2 input-CU">
                <Col>
                  <label className="mb-1">Correo electrónico </label>
                  {errors.Correo && <span className="error">* requerido</span>}
                  <input
                    name="Correo"
                    type="email"
                    {...register('Correo', { required: true })}
                  />
                </Col>
                <Col>
                  <label className="mb-1">Contraseña </label>
                  {errors.Contraseña && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="Contraseña"
                    type="password"
                    {...register('Contraseña', {
                      required: currentRow ? false : true,
                    })}
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

export default ModalCuentas;
