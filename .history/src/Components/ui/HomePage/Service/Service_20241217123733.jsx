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
                <div className={classes.containerRightBotoomLeftBlo}
             <span className={classes.containerRightBotoomLeft1}></span>
             <span className={classes.containerRightBotoomLeft2}></span>
            </div>
            <div className={classes.containerRightBotoomRight}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
