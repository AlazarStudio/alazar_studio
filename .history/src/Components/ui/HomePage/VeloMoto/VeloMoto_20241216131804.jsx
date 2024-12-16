import React from 'react';
import classes from './VeloMoto.module.css';
import { useNavigate } from 'react-router-dom';

function VeloMoto({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <img src="/imajes/.png" />
        <img src="/imajes/.png" />
        <img src="/imajes/.png" />
        <div className={classes.containerBottom2}>
          <span>Ремонт и продажа мобильных устройств</span>
          <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
        </div>
      </div>
    </>
  );
}

export default VeloMoto;
