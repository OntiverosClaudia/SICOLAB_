import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserExist } from '../../API';
import Menu from '../Menu';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  var userExist = UserExist();

  return (
    <div className={userExist ? 'dashboardLayout' : 'basicLayout'}>
      {location.pathname === '/' ||
      location.pathname === '/SelectMat' ||
      location.pathname === '/ControlAcceso'
        ? null
        : userExist && <Menu className="menu" />}

      <main className={userExist ? 'main' : ''}>{children}</main>
    </div>
  );
};

export default Layout;
