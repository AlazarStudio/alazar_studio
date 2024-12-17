import React from 'react';
import classes from './Business.module.css';
import { useNavigate } from 'react-router-dom';

function Business({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
  
        </div>
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span>Всероссийский фестиваль «Притяжение» </span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>Фирменный стиль Всероссийского фестиваля «Притяжение»</span>
            <div>
              <button onClick={() => navigate('/cases')}>
               
              </button>
              <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Business;
