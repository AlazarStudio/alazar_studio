import React from 'react';
import classes from './Service.module.css';

function Service({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={clas}
       <div className={classes.containerLeft}>
        <img src='/images/Service.png'/>
       </div>
       <div className={classes.containerRight}>
        <div className={classes.containerRightTop}>
          Услуги
        </div>
        <div className={classes.containerRightBottom}>
          <div className={classes.containerRightBottomBlock}>
            <span>01</span>
            <span>ЛОГОТИП И ФИРСТИЛЬ</span>
          </div>
          <div className={classes.containerRightBottomBlock}>
            <span>02</span>
            <span>WEB-ДИЗАЙН</span>
          </div>
          <div className={classes.containerRightBottomBlock}>
            <span>03</span>
            <span>МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ</span>
          </div>
          <div className={classes.containerRightBottomBlock}>
            <span>04</span>
            <span>ПРЕЗЕНТАЦИИ</span>
          </div>
          <div className={classes.containerRightBottomBlock}>
            <span>05</span>
            <span>РЕКЛАМНАЯ ПРОДУКЦИЯ</span>
          </div>
          <div className={classes.containerRightBottomBlock}>
            <span>06</span>
            <span>ВИДЕО-ПРОДАКШН</span>
          </div>
        </div>
       </div>
      </div>
    </>
  );
}

export default Service;
