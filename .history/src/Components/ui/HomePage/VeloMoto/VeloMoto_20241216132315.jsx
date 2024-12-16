import React from 'react';
import classes from './VeloMoto.module.css';
import { useNavigate } from 'react-router-dom';

function VeloMoto({ children, ...props }) {
    const navigate = use
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
