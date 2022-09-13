import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const NotMatch = () => {
  const history = useNavigate();

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h2>404</h2>
          <h3>Page not found</h3>
        </div>
        <button onClick={() => history(-1)}>Regresar</button>
      </div>
    </div>
  );
};

export default NotMatch;
