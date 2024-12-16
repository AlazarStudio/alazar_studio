import React from 'react';
import classes from './DrPhone.module.css';

function DrPhone({ children, ...props }) {
  return (
    <>
      <div className={classes.box}>
        <div className={classes.boxContainer1}>
          <div className={classes.boxContainer1Left}>
            <img src="/images/drName.png" alt="" />
            <img src="/images/drImg.png" alt="" />
          </div>
          <div className={classes.boxContainerRight}>123</div>
          <div className={classes.boxContainer1Bottom}></div>
        </div>
      </div>
    </>
  );
}

export default DrPhone;
