import React from 'react';
import classes from './VeloMoto.module.css';
import { useNavigate } from 'react-router-dom';

function VeloMoto({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <img src="/imajes/VeloLogo.png" />
        <img src="/imajes/VeloName.png" />
        <img src="/imajes/.png" />
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span>ВЕЛО & MOTO DRIVE</span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>Ремонт и продажа мобильных устройств</span>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VeloMoto;
