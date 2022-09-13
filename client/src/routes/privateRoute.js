import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { UserExist } from '../API/';

const PrivateRoutes = (props) => {
  const { session } = useContext(AuthContext);
  var userExist = UserExist();
  let location = useLocation();
  if (!session && !userExist) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
};

export default PrivateRoutes;
