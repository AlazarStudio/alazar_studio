import React from 'react';
import classes from './VeloMoto.module.css';
import { useNavigate } from 'react-router-dom';

function VeloMoto({ children, ...props }) {
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
            <span>
              Магазин официального регионального дилера велосипедов в КЧР
            </span>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
          </div>
        </div>
        <div className={classes.ContainerMediaBottom1}>
            <span>ВЕЛО & MOTO DRIVE</span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>
              Магазин официального регионального дилера велосипедов в КЧР
            </span>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VeloMoto;
