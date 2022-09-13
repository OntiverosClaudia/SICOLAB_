import React, { useEffect, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import './styles.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <header className="admin_header">
        <div className="toolbar_header">
          <div className="text-header">
            <span>
              <HiUserCircle size={22} />
              {' ' + user.Nombre + ' ' + user.Apellido}
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
