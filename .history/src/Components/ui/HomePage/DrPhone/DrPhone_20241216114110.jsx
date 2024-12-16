import React from 'react';
import classes from './DrPhone.module.css';

function DrPhone({ children, ...props }) {
  return (
    <>
      <div className={classes.Container}>
        <div className={classes.ContainerLeft}>
          <img src="/images/drName.png" alt="" />
          <img src="/images/drImg.png" alt="" />
        </div>
        <div className={classes.ContainerRight}>
        <img src="/images/drName.png" alt="" />
        </div>
        <div className={classes.ContainerBottom}></div>
      </div>
    </>
  );
}

export default DrPhone;
