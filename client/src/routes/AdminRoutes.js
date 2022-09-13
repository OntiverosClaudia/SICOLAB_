import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'; //Importar notificaciones

const AdminRoutes = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  let location = useLocation();

  if (user.id_rol !== 1) {
    toast.error('No tienes los permisos suficientes', {
      position: 'top-right',
      hideProgressBar: false,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return props.children;
};

export default AdminRoutes;
