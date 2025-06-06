import React from 'react';
import classes from './ServicePage.module.css';

function ServicePage({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          <img src="" />
          <div className={classes.containerTopService}>
            <div className={classes.containerTopServiceTop}>
              <span>НАШИ</span>
              <span>УСЛУГИ</span>
            </div>
            <div className={classes.containerTopService}></div>
            <div className={classes.containerTopService}></div>
          </div>
        </div>
        <div className={classes.containerBottom}></div>
      </div>
    </>
  );
}

export default ServicePage;
