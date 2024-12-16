import React from 'react';
import classes from './VeloMoto.module.css';

function VeloMoto({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <img src="/imajes/.png" />
        <img src="/imajes/.png" />
        <img src="/imajes/.png" />
        <div className={classes.ContainerBottom2}>
                 <span>Ремонт и продажа мобильных устройств</span>
                 <button onClick={() => navigate('/cases')}>ЛОГОТИП И ФИРСТИЛЬ</button>
                 <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
                 <button onClick={() => navigate('/cases')}>РЕКЛАМНАЯ ПРОДУКЦИЯ</button>
               </div>
      </div>
    </>
  );
}

export default VeloMoto;
