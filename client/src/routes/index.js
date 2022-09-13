import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  NotMatch,
  Login,
  Horario,
  Laboratorios,
  //
  Herramientas,
  Materias,
  Estudiantes,
  Registros,
  Cuentas,
  Manual,
  AccesoLaboratorio,
} from '../Pages';
import PrivateRoutes from './privateRoute';
import AdminRoutes from './AdminRoutes';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <AccesoLaboratorio />
          </PrivateRoutes>
        }
      />
      <Route
        path="/Horario"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Horario />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Laboratorios"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Laboratorios />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Herramientas"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Herramientas />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Materias"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Materias />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Estudiantes"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Estudiantes />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Registros"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Registros />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Cuentas"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Cuentas />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/Manual"
        element={
          <PrivateRoutes>
            <AdminRoutes>
              <Manual />
            </AdminRoutes>
          </PrivateRoutes>
        }
      />
      <Route path="*" element={<NotMatch />} />
    </Routes>
  );
};

export default MainRoutes;
