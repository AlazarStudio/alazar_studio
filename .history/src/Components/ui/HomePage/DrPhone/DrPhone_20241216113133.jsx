import React from 'react';
import classes from './DrPhone.module.css';

function DrPhone({ children, ...props }) {
  return (
    <>

        <div className={classes.boxContainer}>
          <div className={classes.boxContainerLeft}>
            <img src="/images/drName.png" alt="" />
            <img src="/images/drImg.png" alt="" />
          </div>
          <div className={classes.boxContainerRight}>123</div>
          <div className={classes.boxContainerBottom}></div>
        </div>

    </>
  );
}

export default DrPhone;
