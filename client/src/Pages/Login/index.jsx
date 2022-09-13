import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authContext';
import './styles.css';

const Login = () => {
  const { onLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await onLogin(data);
  };

  return (
    <>
      <div className="login-fg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-12 login">
              <div className="login-section">
                <div className="logo">
                  <h2>SICOLAB</h2>
                </div>
                <h3>Ingresa sesión en tu cuenta</h3>
                <div className="form-container">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group form-fg">
                      <input
                        type="text"
                        name="CodigoInstitucional"
                        className="input-text"
                        placeholder="Codigo institucional"
                        {...register('CodigoInstitucional', { required: true })}
                      />
                      <i className="fa fa-user"></i>
                      {errors.CodigoInstitucional && (
                        <span className="error">* requerido</span>
                      )}
                    </div>
                    <div className="form-group form-fg">
                      <input
                        type="password"
                        name="Contraseña"
                        className="input-text"
                        placeholder="Password"
                        {...register('Contraseña', { required: true })}
                      />
                      <i className="fa fa-unlock-alt"></i>
                      {errors.Contraseña && (
                        <span className="error">* requerido</span>
                      )}
                    </div>

                    <div className="form-group mt-2">
                      <button type="submit" className="btn-md btn-fg btn-block">
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="col-xl-8 col-lg-7 col-md-12 bg"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/2760242/pexels-photo-2760242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
              }}
            >
              <div className="info">
                <h2>SICOLAB</h2>
                <p>Sistema de Control de acceso a Laboratorios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
