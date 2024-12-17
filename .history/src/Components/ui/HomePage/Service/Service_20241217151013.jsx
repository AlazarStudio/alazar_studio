import React from 'react';
import classes from './Service.module.css';

function Service({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
       <div className={classes.containerLeft}>
        <img src='/images/Service.png'/>
       </div>
       <div className={classes.containerRight}>
        <div className={classes.containerRightTop}>
          Услуги
        </div>
        <div className={classes.}
       </div>
      </div>
    </>
  );
}

export default Service;
