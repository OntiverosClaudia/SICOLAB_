import React from 'react';
import data from './data.json';
import Lottie from 'react-lottie';
import './style.css';

const NotFoundData = (props) => {
  const { titulo, subtitulo } = props;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="container-dataNotFound my-5">
      <Lottie
        className="dnf-lottie"
        options={defaultOptions}
        height={150}
        width={210}
      />
      <h2>{titulo ? titulo : 'Ups!'}</h2>
      <h3>{subtitulo ? subtitulo : 'No se encontró ningún resultado.'}</h3>
    </div>
  );
};

export default NotFoundData;
