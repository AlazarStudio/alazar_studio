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
            <span>Всероссийский фестиваль «Притяжение»  </span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>
            Фирменный стиль Всероссийского фестиваля «Притяжение»
            </span>
            <button onClick={() => navigate('/cases')}>ЛОГ</button>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attraction;
