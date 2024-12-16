import React from 'react';
import classes from './VeloMoto.module.css';
import { Navigate } from 'react-router-dom';

function VeloMoto({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <img src="/imajes/.png" />
        <img src="/imajes/.png" />
        <img src="/imajes/.png" />
        <div className={classes.ContainerBottom2}>
          <span>Ремонт и продажа мобильных устройств</span>
          <button onClick={() => Navigate('/cases')}>WEB-ДИЗАЙН</button>
        </div>
      </div>
    </>
  );
}

export default VeloMoto;
