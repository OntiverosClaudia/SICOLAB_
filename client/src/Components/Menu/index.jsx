import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { FaBook, FaBookReader, FaEye, FaTools } from 'react-icons/fa';
require('./styles.css');

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { onLogout } = useContext(AuthContext);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <>
      <div className={`wrapper ${openMenu && 'openNav'}`}>
        <button
          className={` hamburger open-panel nav-toggle${openMenu && 'active'}`}
          onClick={handleMenu}
        />
        <nav role="navigation" className="menu">
          <span className="logotype">
            <span>SICO</span>LAB
          </span>

          <div className="overflow-container">
            <ul className="menu-dropdown">
              <li>
                <Link to="/Horario">Horarios</Link>
                <span className="icon">
                  <i className="fa fa-calendar"></i>
                </span>
              </li>

              <li>
                <Link to="/Laboratorios">Laboratorios</Link>
                <span className="icon">
                  <i className="fa fa-desktop"></i>
                </span>
              </li>

              <li>
                <Link to="/Herramientas">Herramientas</Link>
                <span className="icon">
                  <FaTools />
                </span>
              </li>

              <li>
                <Link to="/Materias">Materias</Link>
                <span className="icon">
                  {/* <i className="fa fa-book"></i> */}
                  <FaBook />
                </span>
              </li>

              <li>
                <Link to="/Estudiantes">Estudiantes</Link>
                <span className="icon">
                  <i className="fa fa-users"></i>
                </span>
              </li>

              <li>
                <Link to="/Registros">Registros de acceso</Link>
                <span className="icon">
                  <i className="fa fa-list"></i>
                </span>
              </li>

              <li>
                <Link to="/Cuentas">Administrar cuentas</Link>
                <span className="icon">
                  <i className="fa fa-gears"></i> {/* <FaCogs size={20} /> */}
                </span>
              </li>

              <li>
                <Link to="/">Vista docente</Link>
                <span className="icon">
                  <FaEye />
                </span>
              </li>

              <li>
                <Link to="/Manual">Manual de uso</Link>
                <span className="icon">
                  {/* <i className="fa fa-question"></i> */}
                  <FaBookReader />
                </span>
              </li>

              <li
                className="logout"
                onClick={() => {
                  onLogout();
                }}
              >
                <Link to="">Cerrar sesión</Link>
                <span className="icon">
                  <i className="fa fa-power-off"></i> {/* <FaPowerOff /> */}
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Menu;
