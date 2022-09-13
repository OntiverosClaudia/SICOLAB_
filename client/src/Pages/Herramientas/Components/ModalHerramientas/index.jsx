import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Modal as CustomModal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { styleSelect } from '../../../../styles/selectStyle';
import {
  CreateHerramienta,
  UpdateHerramienta,
  GetLaboratories,
} from '../../../../API';
import { toast } from 'react-toastify';
import './styles.css';

const ModalHerramientas = (props) => {
  const { show, onClose, currentRow } = props;
  const [laboratorios, setLaboratorios] = useState(null); //
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Asignar valores por defecto, para edicion de elementos
    HandleLabs();
    if (currentRow !== null) {
      // Sirve para editar, reinicia los valores dependiendo los existentes
      reset({
        NombreHerramienta: currentRow?.NombreHerramienta, //
      });
    } else {
      // sirve para limpiar el formulario
      reset(
        {
          NombreHerramienta: '',
          id_laboratorio: '',
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

  const onSubmit = async (data) => {
    if (currentRow !== null) {
      await UpdateHerramienta(data, currentRow.id_herramienta)
        .then((res) => {
          // Se edito correctamente
          if (res?.data.success) {
            toast.success('Herramienta editada con éxito', {
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
      await CreateHerramienta(data).then((res) => {
        if (res?.success) {
          toast.success('Herramienta agregada con éxito', {
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
                {currentRow !== null
                  ? 'Editar herramienta'
                  : 'Agregar herramienta'}
              </h4>
            </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <div className="container-herramientasList mx-5">
              <Row xs={2} md={2} className="mb-2">
                <Col className="input-LH">
                  <label className="mb-1">Nombre de herramienta</label>
                  {errors.NombreHerramienta && (
                    <span className="error">* requerido</span>
                  )}
                  <input
                    name="NombreHerramienta"
                    type="text"
                    {...register('NombreHerramienta', { required: true })}
                  />
                </Col>
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
              <Row className="mb-2"></Row>
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

export default ModalHerramientas;
