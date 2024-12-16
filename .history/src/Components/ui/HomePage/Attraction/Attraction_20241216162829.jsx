import React from 'react';
import classes from './Attraction.module.css';
import { useNavigate } from 'react-router-dom';

function Attraction({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
<img src=''
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span>Всероссийский фестиваль «Притяжение» </span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>Фирменный стиль Всероссийского фестиваля «Притяжение»</span>
            <div>
            <button onClick={() => navigate('/cases')}>
              ЛОГОТИП И ФИРСТИЛЬ
            </button>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attraction;
