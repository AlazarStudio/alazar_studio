import React from 'react';
import classes from './Business.module.css';
import { useNavigate } from 'react-router-dom';

function Business({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
      <img src='/images/business.png'/>
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span> «Мой бизнес. Молодежь будущего»</span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>Брендирование форума «Мой бизнес. Молодежь будущего»</span>
            <div>
            <button onClick={() => navigate('/cases')}>
               РЕКЛАМНАЯ ПРОДУКЦИЯ
              </button>
              <button onClick={() => navigate('/cases')}> ЛОГОТИП И ФИРСТИЛЬ</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Business;
