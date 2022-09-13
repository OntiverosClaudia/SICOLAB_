import React, { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; //Importar notificaciones
import { AuthLogin } from '../API/';
export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const onLogin = async (user) => {
    let resultado;
    if (user) {
      await AuthLogin(user).then((res) => {
        resultado = res.Nombre ? 200 : res.response.status;
        if (resultado === 200) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(res));
          setSession(true);
          if (res.id_rol == 1) {
            navigate('/Horario', { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        } else {
          setSession(false);

          toast.error('Usuario o contraseña incorrecto', {
            position: 'bottom-left',
            hideProgressBar: false,
          });
        }
      });
    }
    return session;
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setSession(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ user, session, onLogin, onLogout }}
      {...props}
    />
  );
};
