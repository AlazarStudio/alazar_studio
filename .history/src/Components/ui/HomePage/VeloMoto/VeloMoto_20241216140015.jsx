import React from 'react';
import classes from './A';
import { useNavigate } from 'react-router-dom';

function Advocate({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <img src="/images/VeloLogo.png" />
        <img src="/images/VeloName.png" />
        <img src="/images/Velik.png" />
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

export default Advocate;
