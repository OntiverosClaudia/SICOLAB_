import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './style.css';

const Footer = () => {
  const { onLogout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <footer>
      <div className="container-footerBL">
        {user.id_rol === 1 && (
          <Link to="/horario">
            <span className="logout-button Power-off btn-Home">
              <i href="#" className="fa fa-home"></i>
            </span>
          </Link>
        )}
        <span
          className="logout-button Power-off btn-PowerOff"
          onClick={() => {
            onLogout();
          }}
        >
          <i href="#" className="fa fa-power-off"></i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
