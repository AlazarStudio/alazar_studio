import React from 'react';
import classes from './Attraction.module.css';
import { useNavigate } from 'react-router-dom';

function Attraction({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <img src="/images/VeloLogo.png" />
        <img src="/images/VeloName.png" />
        <img src="/images/Velik.png" />
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span>ВСЕРОССИЙСКИЙ ФЕСТИВАЛЬ <<>>></span>
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

export default Attraction;
