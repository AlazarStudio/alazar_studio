import React from 'react';
import classes from './Service.module.css';

function Service({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerLeft}>
          <img src="/images/Service.png" />
        </div>
        <div className={classes.containerRight}>
          <div className={classes.containerRightTop}>УСЛУГИ</div>
          <div className={classes.containerRightBottom}>
            <div className={classes.containerRightBotoomLeft}>
              <div className={classes.containerRightBotoomLeftBlock}>
                <span className={classes.containerRightBotoomLeftBlock1}>01</span>
                <span className={classes.containerRightBotoomLeftBlock2}>Логотип и фирстиль</span>
              </div>
              <div className={classes.containerRightBotoomLeftBlock}>
                <span className={classes.containerRightBotoomLeftBlock1}>02</span>
                <span className={classes.containerRightBotoomLeftBlock2}></span>
              </div>
              <div className={classes.containerRightBotoomLeftBlock}>
                <span className={classes.containerRightBotoomLeftBlock1}>03</span>
                <span className={classes.containerRightBotoomLeftBlock2}></span>
              </div>
            </div>
            <div className={classes.containerRightBotoomRight}>
            <div className={classes.containerRightBotoomLeftBlock}>
                <span className={classes.containerRightBotoomLeftBlock1}>04</span>
                <span className={classes.containerRightBotoomLeftBlock2}></span>
              </div>
              <div className={classes.containerRightBotoomLeftBlock}>
                <span className={classes.containerRightBotoomLeftBlock1}>05</span>
                <span className={classes.containerRightBotoomLeftBlock2}></span>
              </div>
              <div className={classes.containerRightBotoomLeftBlock}>
                <span className={classes.containerRightBotoomLeftBlock1}>06</span>
                <span className={classes.containerRightBotoomLeftBlock2}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
